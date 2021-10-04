describe("My First Test", () => {
  beforeEach(function () {
    cy.visit("http://localhost:4200");
  });

  // ...`

  it("Button has correct naming", () => {
    cy.get("#addtodobutton").should("contain", "Add");
  });

  it("Add Todo button is disabled when input is empty", () => {
    cy.get("#addtodobutton").should("have.attr", "disabled");
  });

  it("Add Todo button is enabled when input is not empty", () => {
    cy.get("#addtodobutton")
      .should("have.attr", "disabled")
      .get("#todoinput")
      .type("SomeTodo")
      .get("#addtodobutton")
      .should("not.have.attr", "disabled");
  });

  it("Add a todo item", () => {
    cy.get("#todoinput")
      .type("SomeTodo")
      .get("#addtodobutton")
      .click()
      .get("#todo-list tr")
      .its("length")
      .should("be.eq", 2);
  });
});
