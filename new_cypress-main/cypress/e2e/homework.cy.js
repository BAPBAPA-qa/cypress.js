import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Chek Autorization', function () {

    beforeEach('Go to website', function () {
        cy.visit('/');//зашли на сайт
    })

    afterEach('Check closeButton', function () {
        cy.get(result_page.close).should('be.visible'); //проверили крестик
    })

    it('1 Right password and login', function () {
        cy.get(main_page.email).type(data.login); //ввели логин
        cy.get(main_page.password).type(data.password); //ввели пароль
        cy.get(main_page.login_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверили надпись
    })

    it('2 Forgot password', function () {
        cy.get(main_page.fogot_pass_btn).click(); //нажали на кнопку забыли пароль
        cy.get(recovery_password_page.email).type(data.login); //ввели почту
        cy.get(recovery_password_page.send_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');//проверили надпись
    })

    it('3 Wrong password and right login', function () {
        cy.get(main_page.email).type(data.login); //ввели логин
        cy.get(main_page.password).type('WrongPassword'); //ввели пароль
        cy.get(main_page.login_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверили надпись
    })

    it('4 Right password and wrong login', function () {
        cy.get(main_page.email).type('Wrong@Login.ru'); //ввели логин
        cy.get(main_page.password).type(data.password); //ввели пароль
        cy.get(main_page.login_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверили надпись
    })

    it('5 Right password and login without @', function () {
        cy.get(main_page.email).type(data.login.replace('@', '')); //ввели логин без @
        cy.get(main_page.password).type(data.password); //ввели пароль
        cy.get(main_page.login_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //проверили надпись
    })

    it('6 Right password and login with capital letter', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //ввели логин
        cy.get(main_page.password).type(data.password); //ввели пароль
        cy.get(main_page.login_button).click(); //нажали на кнопку
        cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверили надпись
    })
})