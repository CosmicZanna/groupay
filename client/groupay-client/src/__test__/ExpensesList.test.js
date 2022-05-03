import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';
import ExpensesList from '../components/ExpensesList';


const MockExpensesList = ({ expenses, total }) => {
  act(() => {
    <AuthProvider />
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpensesList
          expenses={expenses}
          total={total}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('ExpensesList', () => {

  const mockExpenses = [
    {
      tag: 'mockTag1',
      title: "mockExpense1",
      payerName: "mockUser1",
      value: 1000
    },
    {
      tag: 'mockTag2',
      title: "mockExpense2",
      payerName: "mockUser2",
      value: 1000
    },
    {
      tag: 'mockTag3',
      title: "mockExpense3",
      payerName: "mockUser3",
      value: 1000
    },
  ];

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<MockExpensesList expenses={mockExpenses} total={3000}/>);
  });

  it('should render all tags', async () => {
    const tags = screen.getAllByText(/mockTag/i);
    expect(tags.length).toBe(3);
  });
  it('should render all titles', async () => {
    const titles = screen.getAllByText(/mockExpense/i);
    expect(titles.length).toBe(3);
  });
  it('should render all names', async () => {
    const names = screen.getAllByText(/mockUser/i);
    expect(names.length).toBe(3);
  });
  it('should render the correct total', async () => {
    const total = screen.getByText('Total Spent: €3000.00');
    expect(total).toBeInTheDocument();
  });

});