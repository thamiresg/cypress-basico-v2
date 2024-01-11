///COMENTÁRIOS
/// Comando .only = Executa o único teste ao invés de todos;


/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    ///Antes de Cada Teste:
    beforeEach(function() {
        cy.visit('./src/index.html')  
    })
     
    //Enviar formulário com sucesso - Aula 01
    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Gualandi')
        cy.get('#email').type('thamiresgualandi@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible','')
    })

    ///Configurando o DELAY da aplicação - Exercício Extra 01
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longTest = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Gualandi')
        cy.get('#email').type('thamiresgualandi@gmail.com')
        cy.get('#open-text-area').type(longTest, {delay: 0}) //Sobrescrever o DELAY dos testes p/ executar mais rápido
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible','')
    })

    ///Enviar formulário com e-mail inválido - Exercício Extra 02
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Fulana')
        cy.get('#lastName').type('da Silva')
        cy.get('#email').type('fulanadaSilva@teste,com')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    
    ///Campo telefone recebe valor inválido - Exercício Extra 03
    it('campo telefone permanece vazio se informado valor nao numerico', function(){
        cy.get('#firstName').type('Fulana')
        cy.get('#lastName').type('da Silva')
        cy.get('#email').type('fulanadasilva@teste.com')
        cy.get('#phone')
            .type('abcdefg')
            .should('have.value', '')
    })

    ///Campo telefone obrigatório e não preenchido - Exercício Extra 04
    it('campo telefone obrigatorio mas nao preenchido', function(){
        cy.get('#firstName').type('Fulana')
        cy.get('#lastName').type('da Silva')
        cy.get('#email').type('fulanadaSilva@teste.com')
        cy.get('#check > [for="phone"]')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    }) 
    
    ///Cancelar operação de enviar formulário - Exercício Extra 05
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        //Preenchendo os Campos:
        cy.get('#firstName').type('Fulana').should('have.value', 'Fulana')
        cy.get('#lastName').type('da Silva').should('have.value', 'da Silva')
        cy.get('#email').type('fulanadaSilva@teste.com').should('have.value', 'fulanadaSilva@teste.com')
        cy.get('#phone').type('000000000').should('have.value', '000000000')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')

        //Limpando os campos:
        cy.get('#firstName').type('Fulana').clear().should('have.value', '')
        cy.get('#lastName').type('da Silva').clear().should('have.value', '')
        cy.get('#email').type('fulanadaSilva@teste.com').clear().should('have.value', '')
        cy.get('#phone').type('000000000').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste').clear().should('have.value', '')
    })

    ///Enviar formulário sem preencher os campos obrigatórios - Exercício Extra 06
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('#check > [for="phone"]')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    ///Enviar formulário com sucesso usando comando personalizado - Exercício Extra 07
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible','')
    })

    //Alterar o comando do botão de '' para 'cy.contains()' - Exercício Extra 08
    it('alterar comando de ação do botão', function(){
        cy.get('#firstName').type('Thamires')
        cy.get('#lastName').type('Gualandi')
        cy.get('#email').type('thamiresgualandi@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#check > [for="phone"]')
        cy.get('#phone').type('000000000')
        cy.contains('button', 'Enviar').click()
    })
    
    ///AULA 02: Selecionando opções em campos de seleção suspensa
    
    ///Selecionar um produto por seu texto - Exercício 01
    it('seleciona um produto por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    ///Selecionar um produto por seu valor (value) - Exercício Extra 01
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    ///Selecionar um produto (Blog) por seu índice - Exercício Extra 02
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    ///AULA 03: Selecionando opções em campos radio button

    ///Marcar o tipo de atendimento "Feedback" - Exercício 01
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    ///Marcar cada tipo de atendimento - Exercício Extra 01 (Function não funciona)
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function(radio){
            cy.wrap(radio).check()
            cy.wrap(radio).should('be.checked')
        })
    })

    ///AULA 04: Marcar e Desmarcar Checkbox

    ///Marcar ambos checkboxes, depois desmarca o último - Exercício 01
    it.only('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type=checkbox').check()
    })
  })