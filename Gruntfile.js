var fs               = require('fs'),
    path             = require('path'),
    _                = require('underscore'),
    buildOptions     = require('./app/build/options'),
    deployTime       = new Date().getTime();

// grunt tasks
module.exports = function (grunt) {
  // load all npm grunt tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  var appConfig = {
    tmp: '.tmp', // generated files, used by both app and dist
    app: 'app', // code files in source control
    dist: 'dist' // distribution files for deployment (not in source control)
  };

  // Project configuration.
  grunt.initConfig({
    appConfig: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['<%= appConfig.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true,
          interrupt: true
        }
      },
      less: {
        files: ['<%= appConfig.app %>/styles/**/*.less'],
        tasks: ['less:server']
      },
      jade: {
        files: ['<%= appConfig.app %>/**/*.jade'],
        tasks: ['jade:server']
      },
      css: {
        files: [
          '<%= appConfig.app %>/styles/app.css'
        ],
        options: {
          livereload: true
        }
      }
    },
    shell: {
      'npm-install': {
        command: 'npm install'
      },
      'bower-install': {
        command: 'bower install'
      }
    },
    jshint: {
      all: [
        'app/scripts/**/*.js',
        '!app/scripts/require-built.js'
      ],
      options: {
        jshintrc: true
      }
    },
    clean: {
      dist: ['<%= appConfig.tmp %>', '<%= appConfig.dist %>'],
      server: '<%= appConfig.tmp %>',
      jade: {
        src: [
          '<%= appConfig.app %>/*.html',
          '<%= appConfig.app %>/scripts/namespaces/**/*.html'
        ]
      }
    },
    less: {
      dist: {
        options: {
          compress: true,
          cleancss: true,
          optimization: 2
        },
        files: {
          'wp-content/themes/lbl/assets/styles/app.css': '<%= appConfig.app %>/styles/app.less'
        }
      },
      server: {
        src: '<%= appConfig.app %>/styles/app.less',
        dest: '<%= appConfig.app %>/styles/app.css'
      }
    },
    jade: {
      dist: {
        options: {
          data: {
            bust: '?bust=' + deployTime, // cache bust non-requirejs files
            version: deployTime // Could use grunt bump or gittags?
          }
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['**/*.jade'],
          // r.js copies the entire app folder before compiling,
          // including template files.  We need jade to complile down
          // to the app folder before that happens
          dest: '<%= appConfig.app %>',
          ext: ['.html']
        }]
      },
      server: {
        options: {
          pretty: true,
          data: {
            bust: '' // no bust during dev, so replace placeholder with empty string
          }
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['**/*.jade'],
          dest: '<%= appConfig.app %>',
          ext: ['.html']
        }]
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'app',
          baseUrl: './scripts',
          dir: './dist',
          modules: '<%= modules %>',
          paths: buildOptions.requirejs.paths,
          shim: buildOptions.requirejs.shim,
          map: buildOptions.requirejs.map,
          generateSourceMaps: true,
          preserveLicenseComments: false,
          optimize: 'uglify2',
          optimizeCss: 'none',
          stubModules: ['text', 'hbars'],
          onBuildWrite : function(moduleName, path, content){
            // replace handlebars with the runtime version
            if (moduleName === 'Handlebars') {
              path = path.replace('handlebars.js','handlebars.runtime.js');
              content = fs.readFileSync(path).toString();
              content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
            }
            return content;
          },
          removeCombined: true,
          skipDirOptimize: true // when running optimize, this prevents optimizing ALL libs
        }
      }
    },
    concat: {
      server: {
        src: [
          // need to use app version since dist versions are removed during requirejs task
          '<%= appConfig.app %>/bower_components/requirejs/require.js',
          '<%= appConfig.app %>/scripts/require-config.js'
        ],
        dest: 'app/scripts/require-built.js'
      },
      dist: {
        src: [
          '<%= appConfig.app %>/bower_components/requirejs/require.js',
          '<%= appConfig.app %>/scripts/require-config.js'
        ],
        dest: 'wp-content/themes/lbl/assets/scripts/require-built.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'wp-content/themes/lbl/assets/scripts/require-built.js': ['wp-content/themes/lbl/assets/scripts/require-built.js']
        }
      }
    },
    copy: {
      dist: {
        files: {
          'wp-content/themes/lbl/assets/scripts/main.js.map': '<%= appConfig.dist %>/scripts/main.js.map',
          'wp-content/themes/lbl/assets/scripts/main.js': '<%= appConfig.dist %>/scripts/main.js'
        }
      }
    }
  });

  grunt.registerTask('build-requirejs-config', 'builds the requirejs config file', function (target) {
    var config = buildOptions.requirejs;

    if (target === 'dist') { // add cache busting of js for production (css handled by jade task)
      config.urlArgs = 'bust=' + deployTime;
    }

    grunt.file.write(appConfig.app + '/scripts/require-config.js', 'require.config(' + JSON.stringify(config) + ');');
  });

  grunt.registerTask('create-requirejs-modules', 'creates the requirejs module definitions', function(){
    var requirejsModules = [];

    // create dependencies for main namespace
    // which includes all libs + models + collections
    var main = {
      name: 'main',
      include: _.keys(buildOptions.requirejs.paths),
      excludeShallow: []
    };
    main.include = main.include.concat(
      grunt.file.expand({ cwd: appConfig.app + '/scripts/' }, ['models/**/*.js', 'collections/**/*.js'])
        .map(function (path) { return path.replace('.js', ''); })
    );
    requirejsModules.push(main);

    // set the requirejs modules for use in other tasks
    grunt.config.set('modules', requirejsModules);
  });

  grunt.registerTask('default', ['server']);

  // grunt.registerTask('heroku:production', 'build:production');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:dist', 'express-keepalive']);
    }

    grunt.task.run([
      'shell:npm-install',
      'shell:bower-install',
      // 'clean:server', // empty tmp dir
      'less:server', // compile less into tmp dir
      'jade:server', // compile jade files into tmp dir
      'build-requirejs-config', // create requirejs config to be included with require lib
      'concat:server', // concat require config and require lib
      // 'express:server', // start express server
      'watch' // and wait...
    ]);
  });

  grunt.registerTask('build', function (target) {
    var taskList = [];

    // if not production, update dependencies
    // Note: we don't do this for production since 1) npm install is run by default on heroku
    // and 2) bower install is unreliable (we rely on checked in bower components for now)
    if (target !== 'production') {
      taskList.push('shell:npm-install'); // run npm install
      taskList.push('shell:bower-install'); // run bower install
    }

    taskList = taskList.concat([
      'jshint', // linting
      'clean:dist', // empty dist dir
      'jade:dist', // convert jade files into html files *in app dir* (needed for requirejs)
      'build-requirejs-config:dist', // create requirejs config to be included with require lib
      'create-requirejs-modules', // create list of requirejs modules to be used by requirejs task
      'requirejs', // requirejs optimization of js into dist dir
      'clean:jade', // remove generated html files from app dir
      'copy:dist', // remove generated html files from app dir
      'concat:dist', // concat require config and require lib
      'uglify:dist', // uglify concacted require file
      'less:dist' // compile less into 1 css file in dist
    ]);

    grunt.task.run(taskList);
  });
};