import React from 'react';
import PropTypes from 'prop-types';

export const Success = ({
  action
}) => (
  <div>
    {action?(
      <h3 className="successMessage text-success">
        Success: {action}
      </h3>
    ):''}
  </div>
);

Success.propTypes = ({
  action: PropTypes.string
});

export default Success;
