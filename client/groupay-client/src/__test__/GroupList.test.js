import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import GroupList from '../components/GroupList';


const MockGroupList = ({ groupButtons }) => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <GroupList 
          groupButtons={groupButtons}
          handleGroupClick={() => { }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('GroupList', () => {

  const mockGroups = [
    { groupName: 'MockGroupName', _id: '1'},
    { groupName: 'MockGroupName1', _id: '2'},
    { groupName: 'MockGroupName2', _id: '3'},
  ];

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockGroupList groupButtons={mockGroups} />);
  });

  it('should render a list of groups', async () => {
    const groupTitles = screen.getAllByText(/MockGroupName/i);
    expect(groupTitles.length).toBe(3);
  });
  
});