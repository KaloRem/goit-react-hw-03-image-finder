import React from 'react';
import { ProgressBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
<ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = 'black'
  barColor = 'red'
/>
    </div>
  );
};
export default Loader;