import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

describe('Orange HRM Tests', () => {

  it('Login Success', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithUser('Admin', 'admin123')
    dashboardPage.checkDashboardPage()
  })

  it('Login Fail', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithUser('Fail', 'Fail')
    loginPage.checkInvalid()
  })

})