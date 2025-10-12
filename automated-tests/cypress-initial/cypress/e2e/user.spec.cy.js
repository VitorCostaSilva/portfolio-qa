import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
import MyInfoPage from '../pages/myinfoPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage =new MenuPage()
const myinfoPage = new MyInfoPage()

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
    myinfoPage.employeeFullName('João', 'Apolinário', 'Silva')
    myinfoPage.employeeID('RG96845','AEE3453','DL094724','2030-07-08')
    myinfoPage.employeeStatus('1988-05-30')
    myinfoPage.savePersonalDetails()
  })

})