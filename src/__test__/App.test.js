import { cleanup } from '@testing-library/react';
import App from '../App';
import React from 'react';
import reactDom from 'react-dom';

afterEach(cleanup);

it('renders without crashing', () => {
 const div = document.createElement('div');
 reactDom.render(<App></App>, div);
});
