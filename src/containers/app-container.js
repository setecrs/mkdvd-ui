import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../components/app';
import {
  chdir,
  getDir,
  subroutineSetParameter,
  subroutine,
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    const { getDir } = this.props;
    getDir();
  }
  render() {
    return (
      <App {...this.props}/>
    );
  }
}
AppContainer.propTypes = {
  getDir: PropTypes.func.isRequired
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
  getDir: () => dispatch(getDir()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
