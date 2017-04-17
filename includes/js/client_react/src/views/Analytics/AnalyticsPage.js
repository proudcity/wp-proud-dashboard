import React, { Component, PropTypes as PT } from 'react';

class AnalyticsPage extends Component {

  render () {
    return (
      <div className="analytics">
        <h1>Analytics Page</h1>
      </div>
    );
  }
}

AnalyticsPage.propTypes = {
  header: PT.object
};

export default AnalyticsPage;