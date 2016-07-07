import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import config from 'config';
import actions from '../../redux/modules/analyticsReducer';
import AnalyticsPage from './AnalyticsPage';
import AnalyticsWidget from './AnalyticsWidget';

class Analytics extends Component {
  componentWillMount () {
    let { actions } = this.props; 

    // @TODO actually fetch
    // see '../../redux/modules/analyticsReducer';
    // actions.fetchRemote(config.apiUrl + 'analytics');
  }

  render () {
    let { display, analytics } = this.props;

    if(display === 'widget') {

      let link = (text) => <Link to="/analytics">{text}</Link>;
      
      return (
        <AnalyticsWidget
          analytics={analytics}
          link={link('See more')} />
      )
    }

    else {
      return (
        <AnalyticsPage
          analytics={analytics} />
      )
    }
  }
}

Analytics.propTypes = {
  actions: PT.object.isRequired,
  analytics: PT.object.isRequired
};

function mapStateToProps (state) {
  return {
    analytics: state.analyticsState
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics);
