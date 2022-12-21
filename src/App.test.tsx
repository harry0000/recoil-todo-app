import React from 'react';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';

import App from './App';

test('renders without crashing', () => {
  render(<RecoilRoot><App /></RecoilRoot>);
});
