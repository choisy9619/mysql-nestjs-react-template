import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MySQL-NestJS-React Auth</h1>
        <p>Frontend application initialized successfully!</p>
        <div className="card">
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Next: Add authentication forms with Shadcn/UI</p>
      </header>
    </div>
  );
}

export default App;
