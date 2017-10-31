import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({
  message
}) => (
  <div>
    {message?(
      <div className="errorMessage">
        <h2>Error:</h2>
        {JSON.stringify(message)}
      </div>
    ):''}
  </div>
);

Error.propTypes = ({
  message: PropTypes.string
});

export default Error;
