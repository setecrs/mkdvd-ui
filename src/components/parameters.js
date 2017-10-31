import React from 'react';
import PropTypes from 'prop-types';

import SubroutineButton from './subroutine-button';

export const Parameters = ({
  subroutine,
  subroutineClick,
  parameters,
  changeParameter
}) => {
  if ((!parameters) || (Object.keys(parameters).length === 0)) {
    return '';
  }
  return (
    <div className="parameterForm row container">
      <h2>{subroutine} parameters:</h2>
      <div className="row">
        <div className='form-group col-md-8'>
          {Object.keys(parameters).map(key => (
            parameters[key].hidden?'':
              <div key={key}>
                <label htmlFor={key}>
                  {key}
                  {parameters[key].error?
                    <div className="text-danger">{parameters[key].error}</div>
                    :''
                  }
                </label>
                <input type="text" className="form-control" id={key}
                  value={parameters[key].value}
                  onChange={(e) => {
                    changeParameter(key, e.target.value);
                  }}
                />
              </div>
          ))}
        </div>
      </div>
      <div className="row">
        <SubroutineButton
          subroutine={subroutine}
          subroutineClick={subroutineClick}/>
      </div>
    </div>
  );
};

Parameters.propTypes = ({
  subroutine: PropTypes.string,
  subroutineClick: PropTypes.func.isRequired,
  changeParameter: PropTypes.func.isRequired,
  parameters: PropTypes.object
});

export default Parameters;
