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
    // eslint-disable-next-line testing-library/no-render-in-setup
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

  it('should have two buttons', async () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(2);
  });
});