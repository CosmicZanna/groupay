//sign in
//nav to group
//create expense
//check for created exp (paid by: user, expense name, expense value)




/// <reference types="cypress" />
import { signIn } from "../utils/signInUtils";
import {newExpense} from "../utils/expenseUtils"

context('createExpense', function () {

  it('should login and redirect to dashboard', function () {
    signIn('cypress@testing1.com', 'password');

    const createLabel = cy.get(':nth-child(1) > .shadow > .card-body > form > .mb-3 > .form-label')
    createLabel.should('have.text', 'Create new group');

    const joinLabel = cy.get(':nth-child(2) > .shadow > .card-body > form > .mb-3 > .form-label')
    joinLabel.should('have.text', 'Join group');

  });

  it('should create an expense', function () {
    cy.wait(1000);
    cy.get('.card-body > :nth-child(2)').click();
    cy.wait(1000);
    newExpense('new expense 1', '100');
    cy.wait(500);
    cy.get('.m-0').should('be.visible')
    cy.get('.p-2 > .mb-0').should('have.text', 'Paid by: cypress1');
    cy.get('.m-0 > .border').should('have.text', '€100')
    cy.get('.p-2 > h3').should('have.text', '💵 new expense 1')
  
  });


  it('should logout', function () {
    cy.wait(2000);
    cy.get('.container > .m-3').click()
  });

});