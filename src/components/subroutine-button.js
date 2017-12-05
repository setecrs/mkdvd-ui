import React from 'react';
import PropTypes from 'prop-types';

const SubroutineButton = ({
  path,
  label,
  subroutine,
  subroutineClick,
}) => (
  <button
    type="button"
    className="subroutine-btn btn btn-default"
    href="#"
    onClick={() => subroutineClick(path, subroutine)}
  >
    {label || subroutine}
  </button>
);

SubroutineButton.propTypes = {
  label: PropTypes.string,
  path: PropTypes.string.isRequired,
  subroutineClick: PropTypes.func.isRequired,
  subroutine: PropTypes.string.isRequired
};

export default SubroutineButton;
