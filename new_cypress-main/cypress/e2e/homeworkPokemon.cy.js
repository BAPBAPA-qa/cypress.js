import * as data from "../helpers/pokemon_data.json"
import * as autorization_page from "../locators/autorization_pokemons_page.json"
import * as payment_page from "../locators/pay_pokemons_page.json"
import * as check_pay_page from "../locators/check_pay_pokemon_page.json"

describe('New Avatar', function () {

    it('Buy new avatar', function () {
        cy.visit('https://pokemonbattle.ru/'); //зашли на сайт
        cy.get(autorization_page.email).type(data.login); //ввели логин
        cy.get(autorization_page.password).type(data.password); //ввели пароль
        cy.get(autorization_page.login_button).click();  //нажали кнопку
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get('.header_card_trainer').click() //решила не выносить в файл,т.к. всего 1 клик в профиль
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get('.k_mobile > :nth-child(5)').click(); //решила не выносить в файл,т.к. всего 1 клик смена аватара
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get('.available > .shop__button').should('be.enabled').first().click();   // кликаем Купить у первого доступного аватара
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get(payment_page.card).type(data.card); //ввели номер карты тестовой
        cy.get(payment_page.date).type(data.date); //ввели срок карты
        cy.get(payment_page.cvc).type(data.cvc); //ввели cvc
        cy.get(payment_page.name).type(data.name); //ввели имя
        cy.get(payment_page.payment_button).click() //нажали оплатить
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get(check_pay_page.sms).type(data.sms); //ввели  смс
        cy.get(check_pay_page.payment_button).click() // нажали оплатить
        cy.wait(1000); //ждем чтоб страничка подгрузилась
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно'); //решила не выносить в файл,т.к. всего 1 клик проверяем надпись успеха
    })
}) 
