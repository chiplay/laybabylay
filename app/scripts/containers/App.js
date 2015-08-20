import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

import {
    taskAdd,
    taskDone,
    taskUndone,
    setVisibilityFilter
} from './../actions';

/*
 * Import the selector defined in the example above.
 * This allows your to separate your components from the structure of your stores.
 */
import selector from '../selectors/TaskSelectors';

class App extends Component {

  render() {
    const {
      visibleTasks,
      visibilityFilter
    } = this.props;

    return (
      <div>
        <TaskForm
          onSave={(name) => this.props.dispatch(taskAdd(name))} />
        <TaskList
          tasks={visibleTasks}
          onTaskDone={(id) => this.props.dispatch(taskDone(id))}
          onTaskUndone={(id) => this.props.dispatch(taskUndone(id))} />
        <Footer
          filter={visibilityFilter}
          onFilterChange={(nextFilter) => this.props.dispatch(setVisibilityFilter(nextFilter))} />
      </div>
    );
  }
}

// App.propTypes = {
//   visibleTodos: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired
//   })),
//   visibilityFilter: PropTypes.oneOf([
//     'SHOW_ALL',
//     'SHOW_COMPLETED',
//     'SHOW_ACTIVE'
//   ]).isRequired
// };

export default connect(selector)(App);