/// <reference types="cypress" />
import { signIn } from "../utils/signInUtils";

context('joinGroup', function () {
  let inviteLink = "";

  before(() => {
    signIn('cypress@testing1.com', 'password');
    const createGroupInput = cy.get(':nth-child(1) > .shadow > .card-body > form > .mb-3 > #formGroupName');
    createGroupInput.type('test join group');
    cy.wait(500);
    cy.get('#create-group-button').click();
  });

  it('should copy the link', function () {
    // cy.get('.justify-content-center > .btn').click();
    cy.get('.justify-content-center > .mb-0').invoke('text').should((text) => {
      inviteLink = text.split(' ');
      inviteLink = inviteLink[inviteLink.length-1];
    });
  });
  
  it('should logout', function () {
    cy.get('.m-3').click();
  });

  it('should login and paste the invite link and join', function () {
    signIn('cypress@testing2.com', 'password');
    cy.get(':nth-child(2) > .shadow > .card-body > form > .mb-3 > #formGroupName').type(inviteLink);
    cy.get('#submit-join').click();
  });

  it('should logout', function () {
    cy.wait(3000)
    cy.get('.m-3').click();
  });
});