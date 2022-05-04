

export const signInUtil = {
  email: (email) => {
    cy.get('#email > .form-control').type(email);
  },
  password: (password) => {
    cy.get('#password > .form-control').type(password);
  },
  submit: () => {
    cy.get('form > .w-100').click();
  }
}

export const signIn = (email, password) => {
  cy.visit('http://localhost:3000');

  signInUtil.email(email);
  signInUtil.password(password);
  signInUtil.submit();
}

