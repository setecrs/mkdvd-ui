import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../components/app';
import {
  chdir,
  gotoBasePath,
  subroutineSetParameter,
  subroutine,
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    const { gotoBasePath } = this.props;
    gotoBasePath();
  }
  render() {
    return (
      <App {...this.props}/>
    );
  }
}
AppContainer.propTypes = {
  gotoBasePath: PropTypes.func.isRequired
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
});

const mapDispatchToProps = dispatch => ({
  chdir: (path) => dispatch(chdir(path)),
  subroutineClick: (type) => dispatch(subroutine(type)),
  changeParameter: (key, value) => dispatch(subroutineSetParameter(key, value)),
  gotoBasePath: () => dispatch(gotoBasePath()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
