/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
/* import { act } from 'react-dom/test-utils'; */
import CreateExpense from '../components/CreateExpense';
import "react-bootstrap";

const MockCreateExpense = ({group}) => {

  /* jest.mock("react-bootstrap/lib/Dropdown") */

  act(() => {
    <AuthProvider />
  });

 

  return (
    <BrowserRouter>
      <AuthProvider>
        <CreateExpense group={group}
            setExpenses={() => { }}/>
      </AuthProvider>
    </BrowserRouter>
  );
}



describe('CreateExpense', () => {



  const mockGroup = {
    groupName: 'MockGroupName'
  }

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach( async () => {

    
    render(<MockCreateExpense group={mockGroup}/>);

  });

  it('should render the label', async () => {
    const label = screen.getByLabelText(/create new expense/i);
    expect(label).toBeInTheDocument();
  });

  it('should have the expense form', async () => {
    const input = screen.getByPlaceholderText(/Enter expense name/i);
    expect(input).toBeInTheDocument();
  });

  it('should have the expense amount form', async () => {
    const input = screen.getByPlaceholderText(/Enter amount/i);
    expect(input).toBeInTheDocument();
  });

  it('should have a submit button', async () => {
    const button = screen.getByRole('button', {name: "Submit"});
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Submit');
    /* expect(button).toHaveProperty('type', "submit"); */

  });

  // it('should update the value', async () => {
  //   const input = screen.getByPlaceholderText(/Enter Groupin/i);
  //   act(() => {
  //     fireEvent.change(input, { target: { value: 'test' } });
  //   });
  //   expect(input.value).toBe('test');
  // });

});