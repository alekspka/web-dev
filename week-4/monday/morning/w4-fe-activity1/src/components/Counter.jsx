import { useState } from 'react';
import './Counter.css';

const Counter = () => {
    const [theme, setTheme] = useState('light');
    const [count, setCount] = useState(0);
    const handleToggle = () =>  setTheme (prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    

  return (
    <div className={`state ${theme}`}>
      <h1>UseState Component</h1>
      <button onClick = {() => setTheme('dark')}>Dark</button>
      <button onClick = {() => setTheme('light')}>Light</button>
      <button onClick = {handleToggle}>Toggle Theme</button>
      <h2>DISPLAY COUNT HERE: {count}</h2>
      <button onClick= {() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick= {() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;