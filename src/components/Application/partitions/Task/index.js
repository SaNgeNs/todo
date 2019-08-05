import React, { Component } from "react";
import PropTypes from 'prop-types';

import './Task.scss';

/**
 * @namespace Task
 */
class Task extends Component {
  static propTypes = {
    className: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    activeTask: PropTypes.number,
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    clickTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tasks: [],
    activeTask: 0,
    className: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      tasks,
      activeTask,
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      JSON.stringify(tasks) !== JSON.stringify(nextProps.tasks)
      || activeTask !== nextProps.activeTask
      || value !== nextState.value
    );
  }

  /**
   * added new task
   * @memberof Task
   */
  addedTask = () => {
    const {
      value,
    } = this.state;

    if (value.trim().length === 0) {
      return;
    }

    const {
      addTask,
      tasks,
    } = this.props;

    const newTasks = [...tasks];

    newTasks.push({
      title: value,
      comments: [],
    });

    addTask(newTasks);

    this.setState({
      value: '',
    });
  };

  /**
   * delete task
   * @memberof Task
   */
  deleteTask = (index) => {
    const {
      tasks,
      deleteTask,
    } = this.props;

    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    deleteTask(newTasks);
  };

  /**
   * changed field value
   * @param {object} event - default event
   * @memberof Task
   */
  changeField = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const {
      value,
    } = this.state;

    const {
      tasks,
      clickTask,
      activeTask,
      className,
    } = this.props;

    return (
      <div className={`Task ${className}`}>
        <h3 className="Task__title">Items</h3>

        <div className="Task__wrap">
          <input
            className="Task__field"
            type="text"
            placeholder="Type name here... "
            value={value}
            onChange={this.changeField}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.addedTask();
              }
            }}
          />

          <button
            className="Task__button"
            onClick={this.addedTask}
          >
            Add new
          </button>
        </div>

        <div className="Task__list">
          {tasks.map((item, index) => (
            <div
              className={`Task__item ${activeTask === index ? 'Task__item--active' : ''}`}
              key={item.title + index}
            >
              <p
                className="Task__itemTitle"
                onClick={() => { clickTask(index) }}
              >
                {item.title}

                {item.comments.length !== 0 && (
                  <span className="Task__itemCount">
                  {item.comments.length}
                </span>
                )}
              </p>

              <button
                className="Task__itemDelete"
                onClick={() => { this.deleteTask(index) }}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Task;