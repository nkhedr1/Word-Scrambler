import React from 'react';
import reactDom from 'react-dom';
import GuessingBlock from '../components/GuessingBlock';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it('renders without crashing', () => {
 const div = document.createElement('div');
 reactDom.render(<GuessingBlock></GuessingBlock>, div);
});