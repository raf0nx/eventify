describe("My first test!", () => {
    it("Visits the login page", () => {
        cy.visit("/auth/login");

        cy.get("#input-22")
            .type("dibbert.sibyl@example.net")
            .should("have.value", "dibbert.sibyl@example.net");

        cy.get("#input-26")
            .type("password")
            .should("have.value", "password");

        cy.get("button").click();

        cy.contains("Home");
    });
});
