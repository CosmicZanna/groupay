import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import JoinGroup from '../components/JoinGroup';


const MockJoinGroup = () => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <JoinGroup />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('JoinGroup', () => {

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockJoinGroup />);
  });

  it('should render the label', async () => {
    const label = screen.getByLabelText(/join group/i);
    expect(label).toBeInTheDocument();
  });

  it('should have the enter group form', () => {
    const input = screen.getByPlaceholderText(/Enter Groupin/i);
    expect(input).toBeInTheDocument();
  });

  it('should update the value', () => {

  });



});