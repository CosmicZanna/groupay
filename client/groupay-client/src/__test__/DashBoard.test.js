import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import Dashboard from '../components/Dashboard';



const MockDashboard = () => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('Dashboard', () => {

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockDashboard />);
  });

  it('should render the create group label', async () => {
    const label = screen.getByLabelText(/create new group/i);
    expect(label).toBeInTheDocument();
  });
  it('should render the join group label', async () => {
    const label = screen.getByLabelText(/join group/i);
    expect(label).toBeInTheDocument();
  });

  it('should have the create group form', async () => {
    const input = screen.getByPlaceholderText(/Enter group name/i);
    expect(input).toBeInTheDocument();
  });
  it('should have the enter group form', async () => {
    const input = screen.getByPlaceholderText(/Enter Groupin/i);
    expect(input).toBeInTheDocument();
  });

  it('should have two buttons', async () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(3);
  });

});
