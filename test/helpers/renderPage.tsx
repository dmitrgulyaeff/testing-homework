import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import { render } from '@testing-library/react';
import initialState from './initialState';
import React from 'react';

export default function renderPage(path: string, state = initialState) {
  const store = createStore(() => state);
  const application = (
    <MemoryRouter initialEntries={[path]}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return {initialState, render: render(application)};
}
