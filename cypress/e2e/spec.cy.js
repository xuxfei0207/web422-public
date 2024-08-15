it('cannot navigate to / without being logged in', () => {
  cy.visit("/")
  .url().should('include', "/login");
});

it('rejects a login attempt by an invalid github user: !!!', () => {
  cy.visit("/login")
  .get('input[name="username"]').type("invalid_user").type("{enter}")
  .url().should('include', "/login");
});

it('successfully authenticates a valid user: test-account and logs out', () => {
  cy.visit("/login")
  .get('input[name="username"]').type("123")
  .get('input[name="password"]').type("123")
  .type("{enter}")
  .url().should('include', '/')
  .get("nav").contains("Log out").click()
  .url().should('include', "/login");
});