import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ClickablePath = ({
  path,
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
      <Link to={fullname}>
        {basename}
      </Link>
    </span>
  ));
};
ClickablePath.propTypes = ({
  path: PropTypes.string.isRequired,
});

export default ClickablePath;
