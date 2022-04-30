import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NavBar } from "../components/NavBar";
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';

const MockNavBar = () => {
  
  act(()=> {
    <AuthProvider />
  });

  return (
  <BrowserRouter>
    <AuthProvider>
      <NavBar />
    </AuthProvider>
  </BrowserRouter>
)};

describe("NavBar", () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    render(<MockNavBar />);
  })

  it('should render an img', async () => {
    
    const imgLogo = screen.getByAltText(/GrouPay logo/i);
    expect(imgLogo).toBeInTheDocument()
  });


  it('should have the logout button', async () => {
    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();
  });

});