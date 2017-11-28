import React from 'react';
import PropTypes from 'prop-types';
import SubroutineButton from './subroutine-button';

const SubroutineList = ({
  path,
  subroutineClick,
  subroutines,
}) => (
  <div>
    {subroutines.map(subroutine => (
      <span key={subroutine}>
        <SubroutineButton
          path={path}
          subroutine={subroutine}
          subroutineClick={subroutineClick}/>
        {' '}
      </span>
    ))}
  </div>
);

SubroutineList.propTypes = {
  path: PropTypes.string.isRequired,
  subroutineClick: PropTypes.func.isRequired,
  subroutines: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
};

export default SubroutineList;
