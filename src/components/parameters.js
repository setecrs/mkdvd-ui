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
      <h2>Action: {subroutine}</h2>
      <h3>parameters:</h3>
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
                {
                  (parameters[key].type === 'options')
                    ?
                    <div key={key}>
                      {parameters[key].options.map(option => (
                        <label key={option['_id']}>
                          <input
                            name="_id"
                            id="_id"
                            type="radio"
                            className="form-control"
                            value={option['_id']}
                            onChange={(e) => {
                              changeParameter(key, e.target.value);
                            }}
                          />
                          {option.value?
                            <pre>{option.value}</pre>
                            :
                            <pre>{JSON.stringify(option, null, 2)}</pre>
                          }
                        </label>
                      ))}
                    </div>
                    :
                    <input type="text" className="form-control" id={key}
                      value={parameters[key].value}
                      onChange={(e) => {
                        changeParameter(key, e.target.value);
                      }}
                    />
                }
              </div>
          ))}
        </div>
      </div>
      <div className="row">
        <SubroutineButton
          label='Confirm'
          path={(parameters.path||{}).value}
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
