import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import Owes from '../components/Owes';

const MockOwes = ({ owe }) => {
  act(() => {
    <AuthProvider />
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <Owes owe={owe}/>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('MockOwes', () => {
  
  const mockOwe = "User1 owes User2 €3000.00"

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockOwes owe={mockOwe} />);
  });

  it('should display the correct owe', async () => {
    const tag = screen.getByText("User1 owes User2 €3000.00");
    expect(tag).toBeInTheDocument();
  });

});