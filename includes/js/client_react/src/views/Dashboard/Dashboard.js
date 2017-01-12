import React, { Component, PropTypes as PT } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import config from 'config';
import Analytics from '../Analytics';
import { actions } from '../../redux/modules/appReducer';

class Dashboard extends Component {
  componentWillMount () {
    let { appState } = this.props; 
  }

  render () {
    return (
      <div className="dashboard">
        <h1>Dashboard Page</h1>
        <div className="row">
          <div className="col-sm-12">
            <Analytics display="widget" />
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  actions: PT.object.isRequired,
  appState: PT.object.isRequired
};

function mapStateToProps (state) {
  return {
    appState: state.appState
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
)(Dashboard);
