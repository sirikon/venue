Cypress.Cookies.debug(true)

describe('Choose a talk and send a question', () => {
  before(() => {
    cy.clearCookies()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('venue_visitor', 'venue_visitor.sig')
  })
  chooseFirstTalk()
  it('Ask something', () => {
    cy.get('.x-talk-section').eq(2).as("section")
    cy.get('@section').find('.x-talk-textarea').first().as("textarea")
    cy.get('@section').find('.x-talk-button').first().as("send")

    cy.get("@textarea").scrollIntoView({ duration: 250, easing: 'swing' })
    cy.get("@textarea").type("No one will ever use that thing called 'mouse'. Are you serious?")
    cy.get("@send").click()
  })
  it('Verify success message', () => {
    cy.get('.x-talk-notification').first().contains("¡Gracias por tu pregunta!", { matchCase: true })
  })
})

describe('Choose a talk and rate it', () => {
  before(() => {
    cy.clearCookies()
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('venue_visitor', 'venue_visitor.sig')
  })
  chooseFirstTalk()
  it('Rate it', () => {
    cy.get('.x-talk-section').eq(3).as("section")
    cy.get('@section').find('label[for="star-4"]').first().as("4stars")
    cy.get('@section').find('.x-talk-textarea').first().as("textarea")
    cy.get('@section').find('.x-talk-button').first().as("send")

    cy.get("@4stars").click()
    cy.get("@textarea").scrollIntoView({ duration: 250, easing: 'swing' })
    cy.get("@textarea").type("None of these things has any future, but it was fun.")
    cy.get("@send").click()
  })
  it('Verify success message', () => {
    cy.get('.x-talk-notification').first().contains("¡Gracias por tu feedback!", { matchCase: true })
  })
})

function chooseFirstTalk() {
  it('Visit the home', () => {
    cy.visit('http://localhost:8000')
  })
  it('Navigate thru first talk', () => {
    cy.get(".x-talk-list-item").first().click()
  })
  it('Verify information', () => {
    cy.get('.x-talk-title').contains("The Mother of All Demos", { matchCase: true })
    cy.get('.x-talk-description').contains("The live demonstration featured the introduction", { matchCase: true })
  })
}
