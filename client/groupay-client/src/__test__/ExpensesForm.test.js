import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils'; 
import ExpensesForm from '../components/ExpensesForm';

jest.mock("../components/CreateExpense",  () => () => {
  const MockName = "default-awesome-component-mock";
  return <MockName />;
});


const MockExpensesForm = () => {

  act(() => {
    <AuthProvider />
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpensesForm/>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('ExpensesForm', () => {
  

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockExpensesForm/>);
  });


  it('should have a button', async () => {
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('✔️ All paid?');
  });
});