/// <reference types="Cypress" />

import faker from "faker";

describe("Authentication", () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    it("Manually registers a user", () => {
        cy.visit("/auth/register");

        cy.get('.v-form > :nth-child(1) > .v-input input')
            .type(name)
            .should("have.value", name);

        cy.get('.v-form > :nth-child(2) > .v-input input')
            .type(email)
            .should("have.value", email);

        cy.get(".v-form :nth-child(3) > :nth-child(1) > .v-input input")
            .type(password)
            .should("have.value", password);

        cy.get(".v-form :nth-child(3) > :nth-child(2) > .v-input input")
            .type(password)
            .should("have.value", password);

        cy.get("button", { timeout: 10000 }).click();

        cy.url().should("include", "/");
    });
    
    it("Manually login a user", () => {
        cy.visit("/auth/login");
        
        cy.get(":nth-child(1) > .v-input input")
        .type(email)
        .should("have.value", email);
        
        cy.get(":nth-child(2) > .v-input input")
        .type(password)
        .should("have.value", password);
        
        cy.get("button").click();
        
        cy.get(".v-system-bar").contains(email);
        cy.getCookie("eventify_session").should("exist");
        cy.url().should("eq", "http://localhost/");
    });
    
    it("Logouts a user", () => {
        cy.login();

        cy.visit("/");

        cy.url().should("include", "/");

        cy.get(".container-fluid > :nth-child(2)").click();

        cy.url().should("include", "/auth/login");
    });
});
