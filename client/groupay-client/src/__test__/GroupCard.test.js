import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import { GroupCard } from '../components/GroupCard';

const MockGroupCard = ({ group }) => {
  act(() => {
    <AuthProvider />
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <GroupCard group={group} handleGroupClick={() => { }}/>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('GroupCard', () => {
  
  const mockGroup = {
    groupName: 'MockGroupName'
  }

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockGroupCard group={mockGroup} />);
  });

  it('should have the users image', async () => {
    const usersImage = screen.getByAltText(/users/i);
    expect(usersImage).toBeInTheDocument();
  });

  it('should have the card title', async () => {
    const title = screen.getByText('MockGroupName');
    expect(title).toBeInTheDocument();
  });

  it('should have a button', async () => {
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Go to group');
  });
});