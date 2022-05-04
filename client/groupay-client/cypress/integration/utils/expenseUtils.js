export const signInUtil = {
  title: (title) => {
    cy.get(':nth-child(1) > #formExpense').type(title);

  },
  value: (value) => {
    cy.get(':nth-child(2) > #formExpense').type(value);
  },
  submit: () => {
    cy.get('#submit_button').click();
  }
}

export const newExpense = (title, value) => {

  signInUtil.title(title);
  signInUtil.value(value);
  cy.get(':nth-child(3) > #dropdown-basic').click();
  cy.get('.mb-3.show > .dropdown-menu > :nth-child(1)').click();
  cy.get(':nth-child(4) > #dropdown-basic').click();
  cy.get('.mb-3.show > .dropdown-menu > :nth-child(1)').click();
  signInUtil.submit();
}
