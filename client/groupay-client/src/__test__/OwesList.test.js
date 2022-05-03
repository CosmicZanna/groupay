import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import OwesList from '../components/OwesList';


const MockOwesList = ({ owes }) => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <OwesList
          owes={owes}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('OwesList', () => {

  const mockOwes = [
    "User owes User €3000.00",
    "User owes User €2200.00",
    "User owes User €400.00"
  ];

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockOwesList owes={mockOwes}/>);
  });

  it('should render all the owes', async () => {
    const tags = screen.getAllByText(/User owes User €/i);
    expect(tags.length).toBe(3);
  });

});