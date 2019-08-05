import React, { Component } from "react";
import PropTypes from 'prop-types';

import './LeftSidebar.scss';

class LeftSidebar extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      className,
    } = this.props;

    return (
      <div className={`LeftSidebar ${className}`}>
        <h1 className="LeftSidebar__title">Dairy App</h1>
        <p className="LeftSidebar__description">Comment with no sense</p>
      </div>
    );
  }
}

export default LeftSidebar;