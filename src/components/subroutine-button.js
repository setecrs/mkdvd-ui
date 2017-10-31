import React from 'react';
import PropTypes from 'prop-types';

const SubroutineButton = ({
  subroutine,
  subroutineClick,
}) => (
  <button
    type="button"
    className="subroutine-btn btn btn-default"
    href="#"
    onClick={() => subroutineClick(subroutine)}
  >
    {subroutine}
  </button>
);

SubroutineButton.propTypes = {
  subroutineClick: PropTypes.func.isRequired,
  subroutine: PropTypes.string.isRequired
};

export default SubroutineButton;
