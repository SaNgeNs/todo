import React, { Component } from "react";
import PropTypes from 'prop-types';

import './Comment.scss';

/**
 * @namespace Comment
 */
class Comment extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    activeTask: PropTypes.number,
    addComment: PropTypes.func.isRequired,
  };

  static defaultProps = {
    comments: [],
    activeTask: 1,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      comments,
      activeTask,
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      comments.length !== nextProps.comments.length
      || activeTask !== nextProps.activeTask
      || value !== nextState.value
    );
  }

  /**
   * changed field value
   * @param {object} event - default event
   * @memberof Comment
   */
  changeField = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  /**
   * push new comment
   * @param {object} event - default event
   * @param {number} index - current number task
   * @memberof Comment
   */
  submitComment = (event, index) => {
    const {
      value,
    } = this.state;

    if (value.trim().length === 0) {
      return;
    }

    if((event.ctrlKey) && (event.key === 'Enter')) {
      const {
        addComment
      } = this.props;

      addComment(index, value, this.color.value);

      this.setState({
        value: '',
      });
    }
  };

  render() {
    const {
      comments,
      activeTask,
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      <div className="Comments">
        <h3 className="Comments__title">
          Comments #{activeTask + 1}
        </h3>

        <div className="Comments__wrap">
          {comments.map((item, index) => {
            if (item.title && item.color) {
              return (
                <div
                  className="Comments__item"
                  key={item.title + index}
                >
                  <div
                    className="Comments__color"
                    style={{
                      background: item.color,
                    }}
                  />

                  <p className="Comments__text">
                    {item.title}
                  </p>
                </div>
              );
            }
          })}
        </div>

        <div className="Comments__form">
          <input
            className="Comments__fieldColor" type="color"
            ref={(node) => { this.color = node; }}
          />

          <textarea
            className="Comments__fieldText" name="text"
            onKeyPress={(event) => { this.submitComment(event, activeTask) }}
            onChange={this.changeField}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default Comment;