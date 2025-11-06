describe('the login page ',()=>{
    it('successfully logs a user in and redirects to the home page ',()=>{
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="email"]').type('testUser11@gmail.com');
        cy.get('input[name="password"]').type('testUser11');
        cy.get('button[type="submit"]').click();

        cy.url().should('eq','http://localhost:5173/');
        cy.contains('Logout').should('be.visible');
    })
})