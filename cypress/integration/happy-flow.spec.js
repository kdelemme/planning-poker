/// <reference types="Cypress" />

context("Happy flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("should create a room and start a game", () => {
    cy.get("button.btn-primary").should("be.disabled");
    cy
      .get(".form-group input")
      .first()
      .type("Kevin")
      .should("have.value", "Kevin");

    cy
      .get(".form-group input")
      .last()
      .type("MyRoom")
      .should("have.value", "MyRoom");

    // Enter room
    cy
      .get("button.btn-primary")
      .should("not.be.disabled")
      .click();

    cy.get(".list-group-item .text-muted").contains("Awaiting new round");

    // Starting new game
    cy
      .get(".card .btn")
      .should("not.be.disabled")
      .click();

    // New game
    cy.get(".list-group-item .text-muted").contains("Awaiting vote");
    cy.get(".card .btn").should("be.disabled");
    cy
      .get(".list-inline-item")
      .first()
      .click();

    // Result received
    cy.get(".card .btn").should("not.be.disabled");
    cy.get(".badge.badge-secondary").contains("1");
    cy.get(".list-group-item .text-muted").contains("Awaiting new round");

    cy.get("button.btn-secondary").click();
    cy.get("button.btn-secondary").contains("Copied");
  });
});
