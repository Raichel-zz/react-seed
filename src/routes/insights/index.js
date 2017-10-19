import React from 'react';
import Bundle from '../../utils/bundle';
import InsightsPage from 'bundle-loader?lazy!./containers';

const InsightsBundle = () => {
  return <Bundle load={InsightsPage}>
    {(Comp) => (Comp
            ? <Comp/>
            : ""
    )}
  </Bundle>;
};

export default InsightsBundle;