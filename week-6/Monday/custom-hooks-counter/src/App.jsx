// App.jsx
import SingleCounter from './singleCounter';  // Import the SingleCounter component
import './App.css';  // Import styles for the app

const App = () => {
  return (
    <div className="app-container">
      <SingleCounter />
      <SingleCounter />
      <SingleCounter />
    </div>
  );
};

export default App;