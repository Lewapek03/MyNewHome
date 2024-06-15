// Calculator.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Calculator({ initialLoanAmount }) {
  const [loanAmount, setLoanAmount] = useState(initialLoanAmount);
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanType, setLoanType] = useState('fixed');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  useEffect(() => {
    setLoanAmount(initialLoanAmount);
  }, [initialLoanAmount]);

  const calculatePayment = () => {
    const principal = parseFloat(loanAmount);
    const calculateInterest = parseFloat(interestRate) / 100 / 12;
    const calculatePayments = parseFloat(loanTerm) * 12;

    if (loanType === 'fixed') {
      const x = Math.pow(1 + calculateInterest, calculatePayments);
      const monthly = (principal * x * calculateInterest) / (x - 1);

      if (!isNaN(monthly) && monthly !== Infinity) {
        setMonthlyPayment(monthly.toFixed(2));
        setTotalPayment((monthly * calculatePayments).toFixed(2));
        setTotalInterest((monthly * calculatePayments - principal).toFixed(2));
      } else {
        setMonthlyPayment('Invalid input');
        setTotalPayment(null);
        setTotalInterest(null);
      }
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mb-4">Loan Calculator</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-2">
            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount:</label>
              <input
                type="number"
                className="form-control"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interestRate">Interest Rate (%):</label>
              <input
                type="number"
                className="form-control"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="loanTerm">Loan Term (years):</label>
              <input
                type="number"
                className="form-control"
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term in years"
              />
            </div>
            <button className="btn btn-primary btn-block mt-3" onClick={calculatePayment}>
              Calculate
            </button>
            {monthlyPayment && (
              <div className="alert alert-info mt-4">
                <h2>Monthly Payment: ${monthlyPayment}</h2>
                <p>Total Payment: ${totalPayment}</p>
                <p>Total Interest: ${totalInterest}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
