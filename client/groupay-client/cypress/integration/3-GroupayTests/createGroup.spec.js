/// <reference types="cypress" />
import { signIn } from "../utils/signInUtils";

context('createGroup', function () {

  it('should login and redirect to dashboard', function () {
    signIn('cypress@testing1.com', 'password');

    const createLabel = cy.get(':nth-child(1) > .shadow > .card-body > form > .mb-3 > .form-label')
    createLabel.should('have.text', 'Create new group');

    const joinLabel = cy.get(':nth-child(2) > .shadow > .card-body > form > .mb-3 > .form-label')
    joinLabel.should('have.text', 'Join group');

  });

  it('should create a group', function () {
    const createGroupInput = cy.get(':nth-child(1) > .shadow > .card-body > form > .mb-3 > #formGroupName');
    createGroupInput.type('test group');
    cy.wait(500);
    cy.get('#create-group-button').click();
  });

  it('should get on the group page', function () {

    cy.get('#group-title').should('be.visible');
    cy.wait(500);
    cy.get('.d-inline-block').click();
  });

  it('should appear the group in the group list', function () {
    cy.get('.card-body').should('be.visible');
  });

  it('should delete the group', function () {
    cy.wait(1000);
    cy.get(':nth-child(1) > .text-white > .card-body > .mx-4').click();
  });

  it('should logout', function () {
    cy.wait(2000);
    cy.get('.container > .m-3').click()
  });

});