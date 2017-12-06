import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { basename } from 'path';
import SubroutineButton from './subroutine-button';
import { Link } from 'react-router-dom';

const LsItem = ({
  path,
  isDir,
  subroutines,
  callAction,
}) => (
  <div className="container">
    <li>
      {isDir?
        <Link to={path}>
          {basename(path)}
        </Link>
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
  callAction: PropTypes.func.isRequired,
};

export default LsItem;
