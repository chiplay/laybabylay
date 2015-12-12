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
    src: 'src', // code files in source control
    app: 'app', // code files built via babel
    dist: 'dist' // distribution files for deployment (not in source control)
  };

  // Project configuration.
  grunt.initConfig({
    appConfig: appConfig,
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      options: webpackConfig(true),
      dist: {}
    },
    'webpack-dev-server': {
      options: {
        port: 9000,
        host: 'localhost',
        webpack: webpackConfig(),
        contentBase: '.tmp',
        publicPath: webpackConfig().output.publicPath,
        progress: true,
        keepalive: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: {
          timings: true
        }
      },
      server: {
        webpack: {
          devtool: 'eval',
          debug: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= appConfig.src %>/scripts/**/*.js'],
        tasks: ['newer:eslint:all','babel:server'],
        options: {
          livereload: true,
          interrupt: true
        }
      },
      less: {
        files: ['<%= appConfig.app %>/styles/**/*.less'],
        tasks: ['less:server']
      },
      css: {
        files: [
          'wp-content/themes/lbl/assets/styles/app.css'
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
    eslint: {
      all: [
        'src/scripts/**/*.js',
        '!src/scripts/require-built.js'
      ]
    },
    clean: {
      dist: ['<%= appConfig.tmp %>', '<%= appConfig.dist %>'],
      server: '<%= appConfig.tmp %>'
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
        dest: 'wp-content/themes/lbl/assets/styles/app.css'
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
      'eslint:all', // linting
      'babel:server',
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
      'eslint:all', // linting
      'clean:dist', // empty dist dir
      'babel:dist',
      'build-requirejs-config:dist', // create requirejs config to be included with require lib
      'create-requirejs-modules', // create list of requirejs modules to be used by requirejs task
      'requirejs', // requirejs optimization of js into dist dir
      'copy:dist', // remove generated html files from app dir
      'concat:dist', // concat require config and require lib
      'uglify:dist', // uglify concacted require file
      'less:dist' // compile less into 1 css file in dist
    ]);

    grunt.task.run(taskList);
  });
};