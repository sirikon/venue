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

describe.only('Display talk ratings', () => {
  before(() => {
    cy.clearCookies()
    cy.task("executeSql", "DELETE FROM ratings")
  })
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('venue_visitor', 'venue_visitor.sig', 'venue_admin', 'venue_admin.sig')
  })
  it('Login as admin', () => {
    cy.visit("http://localhost:8000/admin", { headers: { 'authorization': 'Basic ' + btoa('admin:admin') } })
  })
  it('Verify login is successful', () => {
    cy.get('p').first().contains('Hello Admin!')
  })
  it('Go to first talk ratings', () => {
    cy.get(".x-talk-list-item")
      .first().click()
      .get("[data-testid='ratings-link']").first().click()
  })
  it('Verify information with no ratings', () => {
    verifyRatings('--', {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }, [])
  })
  it('Verify information with one rating', () => {
    cy.task("executeSql", "DELETE FROM ratings")
    cy.task("executeSql", `
      INSERT INTO ratings
        (visitor_id, talk_id, rating, comment)
      VALUES
        ('11125047-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 4, 'henlo')
      ;`)
    cy.reload()
    verifyRatings('4', {
      1: 0,
      2: 0,
      3: 0,
      4: 1,
      5: 0
    }, [
      { comment: 'henlo', rating: 4 }
    ])
  })
  it('Verify information with many ratings', () => {
    cy.task("executeSql", "DELETE FROM ratings")
    cy.task("executeSql", `
      INSERT INTO ratings
        (visitor_id, talk_id, rating, comment)
      VALUES
        ('11125047-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 2, 'henlo 2'),
        ('11125048-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 4, 'henlo 4'),
        ('11125049-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 5, 'henlo 5'),
        ('11125050-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 300'),
        ('11125051-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 301'),
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 302'),
        ('11125053-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 303'),
        ('11125054-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 304'),
        ('11125055-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 305'),
        ('11125056-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 306'),
        ('11125057-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 307'),
        ('11125058-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 308'),
        ('11125059-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 309'),
        ('11125060-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 3, 'henlo 310')
      ;`)
    cy.reload()
    verifyRatings('3.14', {
      1: 0,
      2: 1,
      3: 11,
      4: 1,
      5: 1
    }, [
      { comment: 'henlo 2', rating: 2 },
      { comment: 'henlo 4', rating: 4 },
      { comment: 'henlo 5', rating: 5 },
      { comment: 'henlo 300', rating: 3 },
      { comment: 'henlo 301', rating: 3 },
      { comment: 'henlo 302', rating: 3 },
      { comment: 'henlo 303', rating: 3 },
      { comment: 'henlo 304', rating: 3 },
      { comment: 'henlo 305', rating: 3 },
      { comment: 'henlo 306', rating: 3 },
      { comment: 'henlo 307', rating: 3 },
      { comment: 'henlo 308', rating: 3 },
      { comment: 'henlo 309', rating: 3 },
      { comment: 'henlo 310', rating: 3 }
    ])
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

function verifyRatings(average: string, stars: { [x: string]: number }, comments: { comment: string, rating: number }[]) {
  cy.get('.x-talk-rating-average-value').contains(average)
  for (const star in stars) {
    cy.get('.x-talk-rating-stars-numbers > span:nth-child(' + star + ')').contains(stars[star])
  }

  if (comments.length === 0) return
  cy.get('.x-talk-comment').as("comments")

  for (let i = 0; i < comments.length; i++) {
    cy.get("@comments").eq(i)
      .find('p').contains(comments[i].comment)
      .find('.x-talk-comment-stars').contains(comments[i].rating)
  }
}