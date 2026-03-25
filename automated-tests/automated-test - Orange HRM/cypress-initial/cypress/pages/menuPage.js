class MenuPage{
    
    selectorsList() {
        
        const selectors = {
            myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
        } 

        return selectors
    }
    
    clickMyInfoPage() {
        cy.get(this.selectorsList().myInfoButton).click()
    }
    

}

export default MenuPage