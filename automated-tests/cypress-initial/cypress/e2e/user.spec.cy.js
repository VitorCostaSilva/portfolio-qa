import userData from '../fixtures/users/user-data.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    dashbordGrid: '.orangehrm-dashboard-grid',
    wrongCredentialAlert: '.oxd-alert',
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstnameField: "[name='firstName']",
    middlenameField: "[name='middleName']",
    lastnameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dataCloseButton: ".--close",
    submmitButton: "[type='submit']",

  }

  it.only('Login Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashbordGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstnameField).clear().type("FirstnameTest")
    cy.get(selectorsList.middlenameField).clear().type("MiddlenameTest")
    cy.get(selectorsList.lastnameField).clear().type("LastnameTest")
    cy.get(selectorsList.genericField).eq(3).clear().type("5566")
    cy.get(selectorsList.genericField).eq(4).clear().type("0023")
    cy.get(selectorsList.genericField).eq(5).clear().type("ABCH47987")
    cy.get(selectorsList.genericField).eq(6).clear().type("2025-07-01")
    cy.get(selectorsList.dataCloseButton).click()
    cy.get(selectorsList.submmitButton).eq(1).click()
    cy.get('body').should('contain','Successfully Saved')
  })

    it('Login Fail', () => {
    cy.visit('auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })

})