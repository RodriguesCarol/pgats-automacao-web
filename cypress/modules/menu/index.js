class Menu{
    navegarParaLogin(){
        cy.get ('a[href="/login"').click()
    }

    efetuarLogout(){
        cy.get('i.fa-user').parent().should('contain', 'QA tester')
    }

}

export default new Menu()
