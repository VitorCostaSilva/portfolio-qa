class DashboardPage{
    
    selectorsList() {
        
        const selectors = {
            dashbordGrid: '.orangehrm-dashboard-grid',
        } 

        return selectors
    }
    
    checkDashboardPage() {
        cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
        cy.get(this.selectorsList().dashbordGrid).should('be.visible')
    }
    

}

export default DashboardPage