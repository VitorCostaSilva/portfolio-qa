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
    
    employeeFullName(firstName, middleName, lastName) {
        cy.get(this.selectorsList().firstnameField).clear().type(firstName)
        cy.get(this.selectorsList().middlenameField).clear().type(middleName)
        cy.get(this.selectorsList().lastnameField).clear().type(lastName)
    }

    employeeID(employeeID, otherID, driverLicense, licenseExpiry) {
        cy.get(this.selectorsList().genericField).eq(3).clear().type(employeeID)
        cy.get(this.selectorsList().genericField).eq(4).clear().type(otherID)
        cy.get(this.selectorsList().genericField).eq(5).clear().type(driverLicense)
        cy.get(this.selectorsList().genericField).eq(6).clear().type(licenseExpiry)
        cy.get(this.selectorsList().dataCloseButton).click()
    }

    employeeStatus(birthDate) {
        cy.get(this.selectorsList().nationalityList).eq(0).click() 
        cy.contains("Bangladeshi").scrollIntoView().click()
        cy.get(this.selectorsList().relationList).eq(1).click()
        cy.contains("Married").scrollIntoView().click()
        cy.get(this.selectorsList().genericField).eq(8).clear().type(birthDate)
        cy.get(this.selectorsList().dataCloseButton).click()
    }

    savePersonalDetails() {
        cy.get(this.selectorsList().submmitButton).eq(1).click()
        cy.get('body').should('contain','Successfully Saved')
    }


}

export default MyInfoPage