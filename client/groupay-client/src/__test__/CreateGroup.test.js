import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import CreateGroup from '../components/CreateGroup';


const MockCreateGroup = () => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <CreateGroup />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('CreateGroup', () => {

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockCreateGroup />);
  });

  it('should render the label', async () => {
    const label = screen.getByLabelText(/create new group/i);
    expect(label).toBeInTheDocument();
  });

  it('should have the create group form', async () => {
    const input = screen.getByPlaceholderText(/Enter group name/i);
    expect(input).toBeInTheDocument();
  });

  it('should have a button', async () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  // it('should update the value', async () => {
  //   const input = screen.getByPlaceholderText(/Enter Groupin/i);
  //   act(() => {
  //     fireEvent.change(input, { target: { value: 'test' } });
  //   });
  //   expect(input.value).toBe('test');
  // });

});
