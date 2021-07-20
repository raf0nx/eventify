/// <reference types="Cypress" />

import faker from "faker";

describe("Authentication", () => {
    before(() => {
        cy.refreshDatabase();
    });

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = "Password123!";

    it("Manually registers a user", () => {
        cy.visit("/auth/register");

        cy.get("[data-cy=name]")
            .type(name)
            .should("have.value", name);

        cy.get("[data-cy=email]")
            .type(email)
            .should("have.value", email);

        cy.get("[data-cy=password]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=password_confirmation]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=submit]", { timeout: 10000 }).click();

        cy.url().should("include", "/");
    });

    it("Manually login a user", () => {
        cy.visit("/auth/login");

        cy.get("[data-cy=email]")
            .type(email)
            .should("have.value", email);

        cy.get("[data-cy=password]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=submit]").click();

        cy.get("[data-cy=alert]").contains(email);
        cy.getCookie("eventify_session").should("exist");
        cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    });

    it("Logouts a user", () => {
        cy.login();

        cy.visit("/");

        cy.url().should("include", "/");

        cy.get("[data-cy=logout_button]").click();

        cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth/login`);

        cy.visit("/");

        cy.url().should("be.equal", `${Cypress.config("baseUrl")}/auth/login`);
    });

    it("Registers user with taken email", () => {
        cy.visit("/auth/register");

        cy.get("[data-cy=name]")
            .type(name)
            .should("have.value", name);

        cy.get("[data-cy=email]")
            .type(email)
            .should("have.value", email);

        cy.get("[data-cy=password]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=password_confirmation]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=submit]", { timeout: 10000 }).click();

        cy.contains("The email has already been taken.");
        cy.url().should(
            "be.equal",
            `${Cypress.config("baseUrl")}/auth/register`
        );
    });

    it("Tests registration UI error validation fields", () => {
        cy.visit("/auth/register");

        cy.get("[data-cy=name]").focus();
        cy.get("[data-cy=email]").focus();
        cy.get("[data-cy=password]").focus();
        cy.get("[data-cy=password_confirmation]").focus();
        cy.get("[data-cy=name]").focus();

        cy.contains("Name is required");
        cy.contains("E-mail is required");
        cy.contains("Password is required");
        cy.contains("Password Confirmation is required");

        cy.get("[data-cy=name]").type("Test1");
        cy.contains("Name should contain only alphabetic characters or spaces");

        cy.get("[data-cy=email]").type("valid_email");
        cy.contains("E-mail seems not to be valid");

        cy.get("[data-cy=password]").type("pass");
        cy.contains("Password must be at least 8 characters");

        cy.get("[data-cy=password]").type("word");
        cy.contains("Password must contain at least one uppercase character");

        cy.get("[data-cy=password]").type("D");
        cy.contains("Password must contain at least one special character");

        cy.get("[data-cy=password]").type("!");
        cy.contains("Password must contain at least one number");

        cy.get("[data-cy=password_confirmation]").type("not_the_same");
        cy.contains("Please make sure your passwords match");
    });

    it("Logins with incorrect email", () => {
        cy.visit("/auth/login");

        cy.get("[data-cy=email]")
            .type("not@existing.email")
            .should("have.value", "not@existing.email");

        cy.get("[data-cy=password]")
            .type(password)
            .should("have.value", password);

        cy.get("[data-cy=submit]").click();

        cy.contains("Email or password are incorrect!");

        cy.url().should("eq", `${Cypress.config("baseUrl")}/auth/login`);
    });

    it("Logins with incorrect password", () => {
        cy.visit("/auth/login");

        cy.get("[data-cy=email]")
            .type(email)
            .should("have.value", email);

        cy.get("[data-cy=password]")
            .type("bad_password")
            .should("have.value", "bad_password");

        cy.get("[data-cy=submit]").click();

        cy.contains("Email or password are incorrect!");

        cy.url().should("eq", `${Cypress.config("baseUrl")}/auth/login`);
    });

    it("Tests login UI error validation fields", () => {
        cy.visit("/auth/login");

        cy.get("[data-cy=email]").focus();
        cy.get("[data-cy=password]").focus();
        cy.get("[data-cy=email]").focus();

        cy.contains("E-mail is required");
        cy.contains("Password is required");

        cy.get("[data-cy=email]").type("valid_email");
        cy.contains("E-mail seems not to be valid");
    });
});
