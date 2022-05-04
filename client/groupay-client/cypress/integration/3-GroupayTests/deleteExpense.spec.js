//sign in
//nav to group
//create expense 
//check for created exp (owes: cypress1 owes cypress2)
//all paid
//check empty expenses

//sign in
//nav to group
//create expense
//check for created exp (paid by: user, expense name, expense value)




/// <reference types="cypress" />
import { signIn } from "../utils/signInUtils";
import {newExpense} from "../utils/expenseUtils"

context('createExpense', function () {

  it('should login and redirect to dashboard', function () {
    signIn('cypress@testing2.com', 'password');

    const createLabel = cy.get(':nth-child(1) > .shadow > .card-body > form > .mb-3 > .form-label')
    createLabel.should('have.text', 'Create new group');

    const joinLabel = cy.get(':nth-child(2) > .shadow > .card-body > form > .mb-3 > .form-label')
    joinLabel.should('have.text', 'Join group');

  });

  it('should create an expense', function () {
    cy.wait(1000);
    cy.get('.card-body > :nth-child(2)').click();
    cy.wait(1000);
    newExpense('new expense 2', '50');
    cy.wait(500);
    cy.get('.m-0').should('be.visible')
    cy.get(':nth-child(2) > .p-2 > .mb-0').should('have.text', 'Paid by: cypress2');
    cy.get('.shadow-sm > :nth-child(2) > .border').should('have.text', '€50')
    cy.get(':nth-child(2) > .p-2 > h3').should('have.text', '💵 new expense 2');
    cy.get('#group-title').should('have.text', 'Total Spent: €150.00');
    cy.get('.list-group-item > .m-0').should('be.visible');
    cy.get('.list-group-item > .m-0').should('have.text', 'cypress2 owes cypress1 €25.00');

    cy.get('.mt-3 > .shadow').click();

    cy.get('#group-title').should('have.text', 'Total Spent: €0.00');
  
  });


  it('should logout', function () {
    cy.wait(2000);
    cy.get('.container > .m-3').click()
  });

});