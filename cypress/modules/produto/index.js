class Produto {
    clicarMenuProdutos() {
        return cy.get('a[href="/products"]').click()


    }

    clicarVerProdutoPrimeiroProduto() {
        cy.get('a[href="/product_details/1"]').click()

    }

    realizarPesquisa() {
        cy.get('#search_product').type('Blue')
        cy.get('#submit_search').click()
    }

    adicionarProdutosNoCarrinho() {
        cy.get('[data-product-id="1"]').first().click()

        cy.get('[data-product-id="2"]').first().scrollIntoView().click()

    }











}




export default new Produto()