import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import Expense from '../components/Expense';

const MockExpense = ({ expense }) => {
  act(() => {
    <AuthProvider />
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <Expense expense={expense}/>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('MockExpense', () => {
  
  const expenseMock = {
    tag: 'mockTag',
    title: "mockExpense",
    payerName: "mockUser",
    value: 1000
  }

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockExpense expense={expenseMock} />);
  });

  it('should display correct tag', async () => {
    const tag = screen.getByText(/mockTag/i);
    expect(tag).toBeInTheDocument();
  });
  it('should display correct name', async () => {
    const name = screen.getByText(/mockUser/i);
    expect(name).toBeInTheDocument();
  });
  it('should display correct value', async () => {
    const value = screen.getByText(/1000/i);
    expect(value).toBeInTheDocument();
  });
  it('should display correct title', async () => {
    const title = screen.getByText(/mockExpense/i);
    expect(title).toBeInTheDocument();
  });

});