/// <reference types="cypress"/>

const timesTamp = new Date().getTime()

import userData from '../fixtures/example.json'



import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import produto from '../modules/produto'
import assinatura from '../modules/assinatura'
import carrinho from '../modules/carrinho'
import pagamento from '../modules/pagamento'




describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
        menu.navegarParaLogin()
    });
    it('Cadastrar um usuário', () => {
        login.preencherFormularioDePreCadastro()

        cadastro.preencherFormularioDeCadastroCompleto()

        cy.contains('b', 'Account Created!')
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="continue-button"]').should('be.visible')

    });

    it('Login do Usuário com email e senha corretos', () => {
        login.preencherFormularioDeLogin(userData.user, userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
        cy.contains(`Logged in as ${userData.name}`).should('be.visible')

    });

    it('Login do Usuário com email e senha incorretos', () => {
        login.preencherFormularioDeLogin(userData.user, '2564')

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
        cy.get('a[href="/login"]').should('be.visible')
        cy.url().should('contain', 'login')
    });

    it('Logout de Usuário', () => {
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        cy.get('a[href="/logout"]').should('be.visible').click()
        cy.url().should('contain', 'login')
        cy.contains('Login to your account')
        cy.get('a[href="/logout"]').should('not.exist')
        cy.get('a[href="/login"]').should('contain', 'Signup / Login')


    });

    it('Cadastrar usuário com email existente no sistema', () => {

        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(userData.email)

        cy.contains('button', 'Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
        cy.url().should('contain', 'signup')

    });

    it('Enviar um Formulario de Contato com upload de arquivo', () => {
        contato.preencherFormularioDeContato()


        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

    it('Verificar todos os produtos e a página de detalhes do produto', () => {

        cy.get('.logo.pull-left').should('be.visible')

        produto.clicarMenuProdutos()

        cy.url().should('contain', 'products')
        cy.get('.title').should('contain', 'All Products')
        cy.get('[data-product-id]').should('have.attr', 'data-product-id')

        produto.clicarVerProdutoPrimeiroProduto()

        cy.url().should('contain', 'product_details/1')
        cy.contains('h2', 'Blue Top').should('be.visible')
        cy.contains('p', 'Category').should('be.visible')
        cy.contains('Rs. 500').should('be.visible')
        cy.contains('p', 'Availability:')
            .invoke('text')
            .should((text) => {
                expect(text.trim()).to.not.eq('Availability:')
            })
        cy.contains('p', 'Condition:')
            .invoke('text')
            .should((text) => {
                expect(text.trim()).to.not.eq('Condition:')
            })

        cy.contains('p', 'Brand:')
            .invoke('text')
            .should((text) => {
                expect(text.trim()).to.not.eq('Brand:')
            })

    });

    it('Verificar o campo Pesquisa de Produto', () => {

        cy.get('.logo.pull-left').should('be.visible')

        produto.clicarMenuProdutos()

        cy.url().should('contain', 'products')

        produto.realizarPesquisa()

        cy.contains('h2', 'Searched Products').should('be.visible')

        cy.get('.productinfo')
            .should('have.length.at.least', 1)
            .each(($el) => {
                cy.wrap($el).should('be.visible')
            })



    });

    it('Verificar assinatura na pagina inicial', () => {
        cy.get('.logo.pull-left').should('be.visible')

        assinatura.rolarFimDaPaginaInicial()

        cy.get('.row > .pull-left').should('be.visible')

        assinatura.inserirEmailEEnviar()

        cy.get('#success-subscribe .alert-success')
            .should('be.visible')
            .and('contain.text', 'You have been successfully subscribed')


    });

    it('Verificar o pedido concluído e conta excluída com registro criado anteriormente', () => {
        cy.get('.logo.pull-left').should('be.visible')

        menu.navegarParaLogin()
        login.preencherFormularioDeLoginDeExclusao()
        cadastro.preencherFormularioDeCadastroCompleto()

        cy.url().should('includes', 'account_created')

        cadastro.clicarNoBotaoContinuar()

        cy.contains(`Logged in as ${userData.name}`).should('be.visible')

        produto.adicionarProdutosNoCarrinho()

        menu.navegarParaCarrinho()

        cy.url().should('contain', 'view_cart')

        cy.get('.active').should('be.visible')

        carrinho.clicarNoBotaoProsseguir()

        cy.get('.heading').should('contain.text', 'Address Details')
        cy.get('.heading').should('contain.text', 'Review Your Order')

        carrinho.inserirComentarioPedido()
        carrinho.clicarNoBotaoFazerPedido()
        pagamento.inserirDadosDoCartao()
        pagamento.pagarEConfirmarPedido()

        cy.get('[data-qa="order-placed"] > b').should('be.visible')
        cy.get('[data-qa="order-placed"] > b').should('contain', 'Order Placed!')

        login.clicarEmExcluirConta()

        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="account-deleted"]').should('contain', 'Account Deleted!')

        login.clicarNoBotãoContinuarAoExcluirConta()






        // arquivo excluir txt














    });

















































})
