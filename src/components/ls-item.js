import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { basename } from 'path';
import SubroutineButton from './subroutine-button';

const LsItem = ({
  path,
  isDir,
  subroutines,
  changeDir,
  callAction,
}) => (
  <div className="container">
    <li>
      {isDir?
        <button
          type="button"
          className="btn btn-default btn-xs"
          onClick={() => changeDir(path)}
        >
          {basename(path)}
        </button>
        :(<span>
          {basename(path)}
          {subroutines.map(s => (
            <span key={s}>
              {' '}
              <SubroutineButton
                path={path}
                subroutine={s}
                subroutineClick={callAction}/>
            </span>
          ))}
        </span>)
      }
    </li>
  </div>
);

LsItem.propTypes = {
  path: PropTypes.string.isRequired,
  isDir: PropTypes.bool.isRequired,
  subroutines: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  changeDir: PropTypes.func.isRequired,
  callAction: PropTypes.func.isRequired,
};

export default LsItem;
