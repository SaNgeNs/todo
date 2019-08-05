import React, { Component } from "react";
import Comment from "./partitions/Comment";
import Task from "./partitions/Task";

import './Application.scss';

/**
 * @namespace Application
 */
class Application extends Component {
  constructor(props) {
    super(props);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    this.state = {
      activeTask: 0,
      tasks: tasks,
    };
  }

  shouldComponentUpdate({}, nextState) {
    const {
      tasks,
      activeTask,
    } = this.state;

    return (
      JSON.stringify(tasks) !== JSON.stringify(nextState.tasks)
      || activeTask !== nextState.activeTask
    );
  }

  /**
   * save tasks on localStorege
   * @param {array} tasks - tasks list
   * @memberof Application
   */
  saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  /**
   * added new task
   * @param {array} tasks - tasks list
   * @memberof Application
   */
  addedTask = (tasks) => {
    this.saveTasks(tasks);

    this.setState({
      tasks: tasks,
    });
  };

  /**
   * delete task
   * @param {array} tasks - tasks list
   * @memberof Application
   */
  deleteTask = (tasks) => {
    this.saveTasks(tasks);

    this.setState({
      tasks: tasks,
      activeTask: 0,
    });
  };

  /**
   * current active task
   * @param {number} index - number of the selected task
   * @memberof Application
   */
  clickTask = (index) => {
    this.setState({
      activeTask: index,
    });
  };

  /**
   * add comment to task
   * @param {number} index - number of the selected task
   * @param {string} value - comment text
   * @param {string} color - avatar color
   * @memberof Application
   */
  addComment = (index, value, color) => {
    const {
      tasks,
    } = this.state;

    const newTasks = [...tasks];

    if (newTasks[index]) {
      newTasks[index] = {
        ...newTasks[index],
        comments: [
          ...newTasks[index].comments,
          {
            color: color,
            title: value,
          }
        ]
      };

      this.saveTasks(newTasks);

      this.setState({
        tasks: newTasks,
      });
    }
  };

  render() {
    const {
      tasks,
      activeTask,
    } = this.state;

    const currentTask = tasks[activeTask];

    return (
      <div className="Application">
        <Task
          className="Application__taskWrap"
          tasks={tasks}
          addTask={this.addedTask}
          deleteTask={this.deleteTask}
          clickTask={this.clickTask}
          activeTask={activeTask}
        />

        {currentTask && (
          <Comment
            comments={currentTask.comments}
            activeTask={activeTask}
            addComment={this.addComment}
          />
        )}
      </div>
    );
  }
}

export default Application;