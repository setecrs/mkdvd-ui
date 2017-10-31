import React from 'react';
import PropTypes from 'prop-types';
import SubroutineButton from './subroutine-button';

const SubroutineList = ({
  subroutineClick,
  subroutines,
}) => (
  <div>
    {subroutines.map(subroutine => (
      <span key={subroutine}>
        <SubroutineButton
          subroutine={subroutine}
          subroutineClick={subroutineClick}/>
        {' '}
      </span>
    ))}
  </div>
);

SubroutineList.propTypes = {
  subroutineClick: PropTypes.func.isRequired,
  subroutines: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
};

export default SubroutineList;
