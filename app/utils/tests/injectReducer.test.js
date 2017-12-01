/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import React from 'react';
import identity from 'lodash/identity';

import configureStore from 'store/configureStore';
import injectReducer from 'utils/injectReducer';
import * as reducerInjectors from 'utils/reducerInjectors';

// Fixtures
const Component = () => null;

const reducer = identity;

describe('injectReducer decorator', () => {
  let store;
  let injectors;
  let ComponentWithReducer;

  beforeAll(() => {
    reducerInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectReducer: jest.fn(),
    };
    ComponentWithReducer = injectReducer({ key: 'test', reducer })(Component);
    reducerInjectors.default.mockClear();
  });

  it('should set a correct display name', () => {
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(injectReducer({ key: 'test', reducer })(() => null).displayName).toBe('withReducer(Component)');
  });

});
