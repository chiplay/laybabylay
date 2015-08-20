import React, { Component, PropTypes } from 'react';
import Task from './Task';
import Immutable from 'immutable';

export default class TaskList extends Component {
  render() {
    let {
      tasks,
      onTaskDone,
      onTaskUndone
    } = this.props;

    return (
      <ul>
        {tasks.map(task =>
          <li key={task.get('id')}>
            <Task
              id={task.get('id')}
              name={task.get('name')}
              done={task.get('done')}
              onTaskDone={onTaskDone}
              onTaskUndone={onTaskUndone} />
          </li>)}
      </ul>
    );
  }
}

TaskList.propTypes = {
  tasks: React.PropTypes.instanceOf(Immutable.List).isRequired
};