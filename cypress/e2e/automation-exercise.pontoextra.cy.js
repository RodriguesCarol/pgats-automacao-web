/// <reference types="cypress"/>

const timesTamp = new Date().getTime()

import userData from '../fixtures/example.json'

import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import { faker } from '@faker-js/faker'






describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        cy.xpath('//a[@href="/login"]').click();



    });
    it('Cadastrar um usuário', () => {


        cy.xpath('//input[@data-qa="signup-name"]').type('QA tester');
        cy.xpath('//input[@data-qa="signup-email"]').type(getRandomEmail());

        cy.xpath('//button[contains(text(), "Signup")]').click();

        // radio ou checkboxes -> check
        // cy.get ('#id_gender1').check()
        cy.xpath('//input[@type="radio" and @value="Mrs"]').check();

        cy.xpath('//input[@id="password"]').type('12345', { log: false });

        // para comboboxes ou selects -> select

        cy.xpath('//input[@id="first_name"]').type(faker.person.firstName());
        cy.xpath('//input[@id="last_name"]').type(faker.person.lastName());
        cy.xpath('//input[@id="company"]').type(`PGATS ${faker.company.name()}`);
        cy.xpath('//input[@id="address1"]').type(faker.location.streetAddress());
        cy.xpath('//select[@id="country"]').select('Canada');
        cy.xpath('//input[@id="state"]').type(faker.location.state());
        cy.xpath('//input[@id="city"]').type(faker.location.city());
        cy.xpath('//input[@data-qa="zipcode"]').type(faker.location.zipCode());
        cy.xpath('//input[@data-qa="mobile_number"]').type('111 222 333');

        cy.xpath('//button[@data-qa="create-account"]').click();

        // Assert

        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created!')


    });
    /// e mail: 

    it('Login do Usuário com email e senha corretos', () => {


        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1760562472318@test.com');
        cy.xpath('//input[@data-qa="login-password"]').type('12345');
        cy.xpath('//button[@data-qa="login-button"]').click();

        const nomeDoUsuario = "QA tester"

        cy.xpath('//i[contains(@class, "fa-user")]/parent::*').should('contain.text', nomeDoUsuario);
        cy.xpath('//a[@href="/logout"]').should('be.visible');

        cy.get(':nth-child(10) > a')
            .should('be.visible')
            .and('have.text', ` Logged in as ${nomeDoUsuario}`);


        cy.xpath(`//b[text()="${nomeDoUsuario}"]`).should('exist');





    });

    it('Login do Usuário com email e senha corretos', () => {


        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1760562472318@test.com');
        cy.xpath('//input[@data-qa="login-password"]').type('2345');
        cy.xpath('//button[@data-qa="login-button"]').click();

        cy.xpath('//div[contains(@class, "login-form")]//form//p')
            .should('contain', 'Your email or password is incorrect!')

    });

    it('Logout de Usuário', () => {


        cy.xpath('//input[@data-qa="login-email"]').type('qa-tester-1760562472318@test.com');
        cy.xpath('//input[@data-qa="login-password"]').type('12345');
        cy.xpath('//button[@data-qa="login-button"]').click();

        cy.xpath('//a[i[contains(@class, "fa-user")] and contains(., "QA tester")]')
            .should('contain', 'QA tester')

        cy.xpath('//a[@href="/logout"]').should('be.visible').click();

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')

        cy.xpath('//a[@href="/logout"]').should('not.exist');
        cy.xpath('//a[@href="/login"]').should('contain.text', 'Signup / Login');



    });

    it('Cadastrar usuário com email existente no sistema', () => {



        cy.xpath('//input[@data-qa="signup-name"]').type('QA tester');
        cy.xpath('//input[@data-qa="signup-email"]').type('qa-tester-1760562472318@test.com');

        cy.xpath('//button[contains(text(), "Signup")]').click();

        cy.xpath('//div[contains(@class, "signup-form")]//form//p')
            .should('contain.text', 'Email Address already exist!');





    });




});

/// <reference types="cypress-xpath" />

/// <reference types="cypress" />
/// <reference types="cypress-xpath" />






