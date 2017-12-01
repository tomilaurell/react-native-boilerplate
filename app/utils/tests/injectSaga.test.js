/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { put } from 'redux-saga/effects';
import React from 'react';

import configureStore from 'store/configureStore';
import injectSaga from 'utils/injectSaga';
import * as sagaInjectors from 'utils/sagaInjectors';

// Fixtures
const Component = () => null;

function* testSaga() {
  yield put({ type: 'TEST', payload: 'yup' });
}

describe('injectSaga decorator', () => {
  let store;
  let injectors;
  let ComponentWithSaga;

  beforeAll(() => {
    sagaInjectors.default = jest.fn().mockImplementation(() => injectors);
  });

  beforeEach(() => {
    store = configureStore({}, memoryHistory);
    injectors = {
      injectSaga: jest.fn(),
      ejectSaga: jest.fn(),
    };
    ComponentWithSaga = injectSaga({ key: 'test', saga: testSaga, mode: 'testMode' })(Component);
    sagaInjectors.default.mockClear();
  });

  it('should set a correct display name', () => {
    expect(ComponentWithSaga.displayName).toBe('withSaga(Component)');
    expect(injectSaga({ key: 'test', saga: testSaga })(() => null).displayName).toBe('withSaga(Component)');
  });

});
