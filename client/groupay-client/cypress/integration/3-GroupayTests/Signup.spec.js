/// <reference types="cypress" />

const signupUtil = {
  email: (email) => {
    cy.get(':nth-child(1) > .form-control').type(email);
  },
  name: (name) => {
    cy.get('#name > .form-control').type(name);
  },
  password: (password)=> {
    cy.get('#password > .form-control').type(password);
  },
  passwordConfirmation: (confirm) =>  {
    cy.get(':nth-child(4) > .form-control').type(confirm);
  },
  submit: () => {
    cy.get('form > .w-100').click();
  }
}

context('signup', function () {

  it('should sign up', function () {
    cy.visit('http://localhost:3000/signup');
    signupUtil.email('cypress@testing1.com');
    signupUtil.name('cypress1');
    signupUtil.password('password');
    signupUtil.passwordConfirmation('password');
    signupUtil.submit();
  });
  
  it('should log out', function () {
    cy.wait(2000);
    cy.get('.container > .m-3').click();
  });

  it('should sign up', function () {
    cy.visit('http://localhost:3000/signup');
    signupUtil.email('cypress@testing2.com');
    signupUtil.name('cypress2');
    signupUtil.password('password');
    signupUtil.passwordConfirmation('password');
    signupUtil.submit();
  });

  it('should log out', function () {
    cy.wait(2000);
    cy.get('.container > .m-3').click();
  });


})