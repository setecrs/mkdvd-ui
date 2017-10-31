import React from 'react';
import PropTypes from 'prop-types';
import DirectoryItem from './ls-item';

const Ls = ({
  items,
  onClick
}) => (
  <div>
    <h3>Content:</h3>
    <ul>
      {items.map(item =>
        <DirectoryItem
          key={item.path}
          {...item}
          onClick={() => onClick(item.path)}
        />
      )}
    </ul>
  </div>
);

Ls.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      isDir: PropTypes.bool.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired
};

export default Ls;
