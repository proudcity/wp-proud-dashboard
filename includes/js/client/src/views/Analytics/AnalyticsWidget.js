import React, { Component, PropTypes as PT } from 'react';

class AnalyticsWidget extends Component {

  render () {
    return (
      <div className="analytics">
        <h2>Analytics Widget</h2>
        {this.props.link}
      </div>
    );
  }
}

AnalyticsWidget.propTypes = {
  header: PT.object,
  link: PT.object.isRequired
};

export default AnalyticsWidget;
