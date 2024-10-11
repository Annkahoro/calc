import React, { useState } from 'react';
import { Calculator, Equal, Plus, Minus, X, Divide, Percent } from 'lucide-react';

const Button = ({ onClick, className, children }) => (
  <button
    onClick={onClick}
    className={`w-full h-16 flex items-center justify-center text-xl font-semibold rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const inputOperator = (nextOperator) => {
    const value = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(value);
    } else if (operator) {
      const result = performCalculation();
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const value = parseFloat(display);
    if (operator === '+') return prevValue + value;
    if (operator === '-') return prevValue - value;
    if (operator === '*') return prevValue * value;
    if (operator === '/') return prevValue / value;
    return value;
  };

  const handleEqual = () => {
    if (!operator) return;

    const result = performCalculation();
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-md">
        <div className="p-8 bg-blue-600">
          <div className="flex justify-between items-center mb-4">
            <Calculator className="text-white" size={24} />
            <h1 className="text-2xl font-bold text-white">Calculator</h1>
          </div>
          <div className="bg-blue-500 rounded-xl p-4">
            <div className="text-right text-white text-4xl font-light truncate">
              {display}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-4">
          <Button onClick={clear} className="bg-red-100 text-red-600 hover:bg-red-200">
            C
          </Button>
          <Button onClick={inputPercent} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Percent size={20} />
          </Button>
          <Button onClick={() => inputOperator('/')} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Divide size={20} />
          </Button>
          <Button onClick={() => inputOperator('*')} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
            <X size={20} />
          </Button>
          {[7, 8, 9].map((digit) => (
            <Button key={digit} onClick={() => inputDigit(digit)} className="bg-white hover:bg-gray-100">
              {digit}
            </Button>
          ))}
          <Button onClick={() => inputOperator('-')} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Minus size={20} />
          </Button>
          {[4, 5, 6].map((digit) => (
            <Button key={digit} onClick={() => inputDigit(digit)} className="bg-white hover:bg-gray-100">
              {digit}
            </Button>
          ))}
          <Button onClick={() => inputOperator('+')} className="bg-gray-100 text-gray-600 hover:bg-gray-200">
            <Plus size={20} />
          </Button>
          {[1, 2, 3].map((digit) => (
            <Button key={digit} onClick={() => inputDigit(digit)} className="bg-white hover:bg-gray-100">
              {digit}
            </Button>
          ))}
          <Button onClick={handleEqual} className="bg-blue-600 text-white hover:bg-blue-700 row-span-2">
            <Equal size={20} />
          </Button>
          <Button onClick={() => inputDigit(0)} className="bg-white hover:bg-gray-100 col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal} className="bg-white hover:bg-gray-100">
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;