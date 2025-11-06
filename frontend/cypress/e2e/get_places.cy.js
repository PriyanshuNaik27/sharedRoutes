describe('This retrives places to vist from a particular location',()=>{
    it('successfully gets places to visit from a location',()=>{
        cy.visit('http://localhost:5173/');
        cy.get('input[name="locationSearch"]').type('betul');
        cy.get('button[type="searchSubmit"]').click();
        cy.url().should('include','/location/betul');
        cy.contains('Places fetched successfully');

    })
})