import './App.css';
import Form from './components/form';
import Calculation from './components/calculation';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState("");
  const [className, setClassName] = useState("");

  const alertSuccess = (value, className) => {
    setAlert(value);
    setClassName(className);
    console.log('실행되었습니다.');
  }

  return (
    <div>
      {alert && <div className={className}>{alert}</div>}
      <div className="App">
        <h1 className="title">예산 계산기</h1>
        <div className="container">
          <Form alertSuccess={alertSuccess} />
        </div>
        <div className="total__price">
          <Calculation />
        </div>
      </div>
    </div>
  );
}

export default App;
