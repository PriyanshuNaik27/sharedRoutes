// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('loginViaUi',(username,password)=>{
    cy.session([username,password],()=>{
        cy.visit('/login');
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="email"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[type="submit"]').click();

        cy.url().should('eq','http://localhost:5173/');
        cy.contains('Logout').should('be.visible');
    })   
})


Cypress.Commands.add('loginViaApi',(email,password)=>{
    cy.session([email,password],()=>{
        cy.request({
            method:'POST',
            url:'http://localhost:8000/api/v1/user/login',
            body:{
                email:email,
                password:password
            }
        })
        // .then((response)=>{
        //     cy.request();
        //     cy.getCookie('accessToken').should('exist');
        // })
    })
})