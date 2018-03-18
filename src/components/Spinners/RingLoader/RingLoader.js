// @flow
import React from 'react';
import { RingLoader } from 'react-spinners';

import './css/styles.css';

export default () => (
  <div className="spinner__container_ring">
    <RingLoader
      color="#D73B3E"
      size={100}
    />
  </div>
);
