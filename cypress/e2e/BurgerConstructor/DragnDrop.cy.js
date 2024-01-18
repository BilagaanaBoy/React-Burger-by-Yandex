
describe('Проверка механизма перетаскивания и оформления заказа', function () {
    beforeEach(function () {
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
      cy.viewport(1300, 800);
      cy.goToDeployedSite();
    });
  
    it('Перетаскиваем булку и оформляем заказ', function () {
      cy.log('Перетаскиваем булку в конструктор');
      cy.get('[class^=burger-constructor]')
        .contains('Краторная булка')
        .should('not.exist');
      cy.get('[class^=Ingredient_content_]').first().trigger('dragstart');
      cy.get('[class^=BurgerConstructor_contentList_]').trigger('drop');
      cy.get('[class^=burger-constructor]')
        .contains('Краторная булка')
        .should('exist');
  
      cy.log('Пытаемся оформить заказ не авторизованным пользователем');
      cy.get('button').contains('Оформить заказ').click();
      cy.get('[class^=input__icon]').first().click();
  
      cy.log('Авторизуемся в системе');
      cy.get('form input[type=email]').type('tester@gmail.com');
      cy.get('form input[type=password]').type('tester123456');
      cy.contains('Войти').click();
      cy.contains('Вход').should('not.exist');
      cy.log('Оформляем заказ');
      cy.get('button').contains('Оформить заказ').click();
      cy.get('[class^=Modal_modal_]').should('exist');
      cy.contains('6491').should('exist');
      cy.contains('Ваш заказ начали готовить').should('exist');
  
      cy.log('Закрываем модальное окно');
      cy.get('[class^=Modal_closeButton_]').first().as('close');
      cy.get('@close').click();
      cy.get('[class^=Modal_modal_]').should('not.exist');
  
      cy.log('Проверяем, что конструктор пустой');
      cy.get('[class^=burger-constructor]')
        .contains('Краторная булка')
        .should('not.exist');
    });
  });