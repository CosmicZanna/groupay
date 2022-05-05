/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import GroupPage from '../screens/GroupPage';

jest.mock("../components/CreateExpense",  () => () => {
  const MockName = "default-awesome-component-mock";
  return <MockName />;
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      group: { groupName: 'MockGroupName', _id: '1', password: '123456789'}
    }
  })
}));

jest.mock("../context/AuthContext", () => ({
  ...jest.requireActual("../context/AuthContext"),
  useAuth: () => ({
    currentUser: {
      uid: '12345'
    },
    token: '54321'
  })
}));


const MockGroupPage = () => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <GroupPage />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('GroupPage', () => {

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockGroupPage />);
  });

  it('should render the Total Spent header', async () => {
    const header = screen.getByText(/Total Spent: €/i);
    expect(header).toBeInTheDocument();
  });

  it('should have the pin', async () => {
    const pin = screen.getByText(/Invite your friends with this Groupin:/i);
    expect(pin).toBeInTheDocument();
  });

  it('should have the All paid button', async () => {
    const pin = screen.getByText(/✔️ All paid/i);
    expect(pin).toBeInTheDocument();
  });

  it('should have three buttons', async () => {
    const button = screen.getAllByRole('button');
    expect(button.length).toBe(3);
  });

});
