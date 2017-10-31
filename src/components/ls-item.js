import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { basename } from 'path';

const LsItem = ({
  path,
  isDir,
  onClick
}) => (
  <div className="container">
    <li>
      {isDir?
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={onClick}
        >
          {basename(path)}
        </button>
        :basename(path)}
    </li>
  </div>
);

LsItem.propTypes = {
  path: PropTypes.string.isRequired,
  isDir: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LsItem;
