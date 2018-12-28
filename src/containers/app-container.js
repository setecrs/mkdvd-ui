import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../components/app';
import {
  chdir,
  subroutineSetParameter,
  subroutine,
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    const { chdir, router } = this.props;
    chdir(router.location.pathname);
  }
  render() {
    return (
      <App {...this.props}/>
    );
  }
}
AppContainer.propTypes = {
  chdir: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  mystate: state,
  path: state.path,
  content: state.content,
  successAction: state.subroutine.success,
  subroutines: state.subroutines,
  subroutine: state.subroutine.type,
  subroutineParameters: state.subroutine.parameters,
  subroutineError: state.subroutine.error,
  getDirError: state.getDir.error,
  getRunError: state.getRun.error,
  running: state.getRun.payload,
  router: state.router,
});

const mapDispatchToProps = dispatch => ({
  chdir: (path) => dispatch(chdir(path)),
  subroutineClick: (path, type) => dispatch(subroutine(path, type)),
  changeParameter: (key, value) => dispatch(subroutineSetParameter(key, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
