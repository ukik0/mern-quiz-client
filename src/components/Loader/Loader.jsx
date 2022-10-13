import React from 'react';

import { Triangle } from 'react-loader-spinner';

import cl from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={cl.loader}>
      <Triangle
        height="150"
        width="150"
        color="#d4546a"
        visible={true}
      />
    </div>
  );
};

export default Loader;
