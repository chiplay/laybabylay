import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Task extends Component {

  handleToggleStatus() {
    let {
      id,
      done,
      onTaskDone,
      onTaskUndone,
    } = this.props;

    if (done) {
      onTaskUndone(id);
    } else {
      onTaskDone(id);
    }
  };

  render() {
    let {
      id,
      name,
      done
    } = this.props,
    componentClassName;

    componentClassName = classNames('component-todo-item', {
      'status-done': done
    });

    return (
      <div className={componentClassName}>
        <span className='name'>{name}</span>
        <div className='toggle-status' onClick={() => this.handleToggleStatus()}></div>
      </div>
    );
  }
}

Task.propTypes = {
  id: React.PropTypes.string.isRequired,
  done: React.PropTypes.bool.isRequired,
  onTaskDone: React.PropTypes.func.isRequired,
  onTaskUndone: React.PropTypes.func.isRequired
};