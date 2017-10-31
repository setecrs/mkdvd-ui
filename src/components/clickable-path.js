import React from 'react';
import PropTypes from 'prop-types';

const ClickablePath = ({
  path,
  chdir
}) => {
  const splited = path.split('/').filter(x => !!x);
  let fullname = '';
  let parts = splited.map(basename => {
    fullname = fullname + '/' + basename;
    return {basename, fullname};
  });
  // const back = <span className="glyphicon glyphicon-backward"/>;
  // parts = [{basename:back, fullname:'/'}].concat(parts);
  return parts.map(({basename, fullname}) => (
    <span key={fullname} >
      {'/'}
      <button
        type="button"
        className="path-btn btn btn-link"
        onClick={() => chdir(fullname)}
      >{basename}</button>
    </span>
  ));
};
ClickablePath.propTypes = ({
  path: PropTypes.string.isRequired,
  chdir: PropTypes.func.isRequired,
});

export default ClickablePath;
