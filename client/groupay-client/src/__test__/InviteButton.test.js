import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import InviteButton from '../components/InviteButton';

const MockInviteButton = ({ group }) => {
  act(() => {
    <AuthProvider />
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <InviteButton group={group}/>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('InviteButton', () => {
  
  const mockGroup = {
    password: "123456789"
  } 

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockInviteButton group={mockGroup} />);
  });

  it('should display the correct password', async () => {
    const invite = screen.getByText("Invite your friends with this Groupin: 123456789");
    expect(invite).toBeInTheDocument();
  });

});