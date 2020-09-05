import React from 'react';
import './App.css';
import Dropdown from './Dropdown';

const items = [
  {
    id: 1,
    value: 'Test 1'
  },
  {
    id: 2,
    value: 'Test 2'
  },
  {
    id: 3,
    value: 'Test 3'
  },
  {
    id: 4,
    value: 'Test 4'
  },
  {
    id: 5,
    value: 'Test 5'
  },
  {
    id: 6,
    value: 'Test 6'
  },
  {
    id: 7,
    value: 'Test 7'
  },
  {
    id: 8,
    value: 'Test 8'
  },
  {
    id: 9,
    value: 'Test 9'
  },
  {
    id: 10,
    value: 'Test 10'
  }
]

function App() {
  return (
    <div className="container">
      <Dropdown items={items} multiSelect />
    </div>
  );
}

export default App;
