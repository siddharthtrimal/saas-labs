import React, { Suspense } from 'react';
import './App.css';
import FundingTable from './FundingTable';

function App() {

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <FundingTable />
      </Suspense>
    </div>
  );
}

export default App;
