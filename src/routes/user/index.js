import React from 'react';
import Bundle from '../../utils/bundle';
import UserPage from 'bundle-loader?lazy!./userpage';

const UserBundle = () => {
  return <Bundle load={UserPage}>
    {(Comp) => (Comp
            ? <Comp/>
            : ""
    )}
  </Bundle>;
};

export default UserBundle;