import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
import MyInfoPage from '../pages/myinfoPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage =new MenuPage()
const myinfoPage = new MyInfoPage()

const Chance = require('chance')
const chance = new Chance()

describe('Orange HRM Tests', () => {

    it('User Info Update - Sucess', () => {
    //Fill login & password boxes  
    loginPage.acessLoginPage()
    loginPage.loginWithUser('Admin', 'admin123')
    
    //acess dashboard page and verify it
    dashboardPage.checkDashboardPage()

    //click on MyInfo menu
    menuPage.clickMyInfoPage()

    //Fill MyInfo menu with informations then save it
    myinfoPage.employeeFullName(chance.first(), chance.last(), chance.last())
    myinfoPage.employeeID(chance.cf(),chance.cf(),chance.cf(), chance.date({string: true, american: true}))
    myinfoPage.employeeStatus(chance.date({string: true, american: true}))
    myinfoPage.savePersonalDetails()
  })

})