// yarn add core-js mobx redoc styled-components
import React from 'react';
import { RedocStandalone } from 'redoc';
export default () => (
  <RedocStandalone specUrl="http://petstore.swagger.io/v2/swagger.json"></RedocStandalone>
);
