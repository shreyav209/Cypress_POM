class HomePage
{
    getName()
    {
        return cy.get(':nth-child(1) > .form-control')
    }
    getGender()
    {
        return cy.get('#exampleFormControlSelect1')
    }
    getShoptab()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }
}
export default HomePage