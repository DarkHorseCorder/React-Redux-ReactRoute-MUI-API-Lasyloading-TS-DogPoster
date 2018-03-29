import MainLayout from 'layouts/MainLayout';
import React from 'react';

const mainLayoutWrapHOC = (Component: any) => ({...props})=> {
  return (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

export default mainLayoutWrapHOC;