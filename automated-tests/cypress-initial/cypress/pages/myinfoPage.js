class MyInfoPage{
    
    selectorsList() {
        
        const selectors = {
            firstnameField: "[name='firstName']",
            middlenameField: "[name='middleName']",
            lastnameField: "[name='lastName']",
            genericField: ".oxd-input--active",
            dataCloseButton: ".--close",
            submmitButton: "[type='submit']",
            nationalityList: ".oxd-select-text",
            relationList: ".oxd-select-text",
        } 

        return selectors
    }
    
    filIinfoPage() {
        cy.get(this.selectorsList().firstnameField).clear().type("FirstnameTest")
        cy.get(this.selectorsList().middlenameField).clear().type("MiddlenameTest")
        cy.get(this.selectorsList().lastnameField).clear().type("LastnameTest")
        cy.get(this.selectorsList().genericField).eq(4).clear().type("5566")
        cy.get(this.selectorsList().genericField).eq(5).clear().type("0023")
        cy.get(this.selectorsList().genericField).eq(6).clear().type("ABCH47987")
        cy.get(this.selectorsList().genericField).eq(7).clear().type("2025-07-01")
        cy.get(this.selectorsList().dataCloseButton).click()
        cy.get(this.selectorsList().nationalityList).eq(0).click() 
        cy.contains("Bangladeshi").scrollIntoView().click()
        cy.get(this.selectorsList().relationList).eq(1).click()
        cy.contains("Married").scrollIntoView().click()
        cy.get(this.selectorsList().genericField).eq(8).clear().type("1998-06-10")
        cy.get(this.selectorsList().dataCloseButton).click()
        cy.get(this.selectorsList().submmitButton).eq(1).click()
        cy.get('body').should('contain','Successfully Saved')
    }
    

}

export default MyInfoPage