import React, { findDOMNode, Component, PropTypes } from 'react';

export default class TaskForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    const node = findDOMNode(this.refs.name);
    const name = node.value.trim();
    this.props.onSave(name);
    node.value = '';
  }

  render() {
    let {
      name
    } = this.props;

    return <form className='component-task-form' onSubmit={(e) => this.handleSubmit(e)}>
      <input type='text' ref='name' />
      <button type='submit'>Save</button>
    </form>;
  }
}

TaskForm.propTypes = {
  onSave: React.PropTypes.func.isRequired
};