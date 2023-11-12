Cypress.Cookies.debug(true)

it('Choose a talk and send a question', () => {
  cy.session('send question', () => {
    cy.task("executeSql", "DELETE FROM questions")

    cy.visit('http://localhost:8000')
    cy.get(".x-talk-list-item").first().click()

    cy.get('.x-talk-title').contains("The Mother of All Demos", { matchCase: true })
    cy.get('.x-talk-description').contains("The live demonstration featured the introduction", { matchCase: true })
    
    cy.get('.x-talk-section').eq(2).as("section")
    cy.get('@section').find('.x-talk-textarea').first().as("textarea")
    cy.get('@section').find('.x-talk-button').first().as("send")

    cy.get("@textarea").scrollIntoView({ duration: 250, easing: 'swing' })
    cy.get("@textarea").type("No one will ever use that thing called 'mouse'. Are you serious?")
    cy.get("@send").click()

    cy.get('.x-talk-notification').first().contains("¡Gracias por tu pregunta!", { matchCase: true })

    cy.visit("http://localhost:8000/admin", { headers: { 'authorization': 'Basic ' + btoa('admin:admin') } })
    cy.get(".x-talk-list-item")
      .first().click()
      .get("[data-testid='questions-link']").first().click()
    verifyQuestions([
      "No one will ever use that thing called 'mouse'. Are you serious?"
    ])
  })
})

it('Choose a talk and rate it', () => {
  cy.session('rate talk', () => {
    cy.task("executeSql", "DELETE FROM ratings")

    cy.visit('http://localhost:8000')
    cy.get(".x-talk-list-item").first().click()

    cy.get('.x-talk-title').contains("The Mother of All Demos", { matchCase: true })
    cy.get('.x-talk-description').contains("The live demonstration featured the introduction", { matchCase: true })

    cy.get('.x-talk-section').eq(3).as("section")
    cy.get('@section').find('label[for="star-4"]').first().as("4stars")
    cy.get('@section').find('.x-talk-textarea').first().as("textarea")
    cy.get('@section').find('.x-talk-button').first().as("send")

    cy.get("@4stars").click()
    cy.get("@textarea").scrollIntoView({ duration: 250, easing: 'swing' })
    cy.get("@textarea").type("None of these things has any future, but it was fun.")
    cy.get("@send").click()

    cy.get('.x-talk-notification').first().contains("¡Gracias por tu feedback!", { matchCase: true })
    cy.reload()
    cy.get('.x-talk-notification').first().contains("¡Gracias por tu feedback!", { matchCase: true })

    cy.visit("http://localhost:8000/admin", { headers: { 'authorization': 'Basic ' + btoa('admin:admin') } })
    cy.get(".x-talk-list-item")
      .first().click()
      .get("[data-testid='ratings-link']").first().click()
    verifyRatings('4', {
      1: 0,
      2: 0,
      3: 0,
      4: 1,
      5: 0
    }, [
      { comment: "None of these things has any future, but it was fun.", rating: 4 }
    ])
  })
})

it('Display talk ratings', () => {
  cy.session('display talk ratings', () => {
    cy.task("executeSql", "DELETE FROM ratings")
    cy.visit("http://localhost:8000/admin", { headers: { 'authorization': 'Basic ' + btoa('admin:admin') } })
    cy.get('p').first().contains('Hello Admin!')
    cy.get(".x-talk-list-item")
      .first().click()
      .get("[data-testid='ratings-link']").first().click()
    verifyRatings('--', {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }, [])
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

it('Display talk questions', () => {
  cy.session('display-talk-questions', () => {
    cy.task("executeSql", "DELETE FROM questions")
    cy.visit("http://localhost:8000/admin", { headers: { 'authorization': 'Basic ' + btoa('admin:admin') } })
    cy.get('p').first().contains('Hello Admin!')
    cy.get(".x-talk-list-item")
      .first().click()
      .get("[data-testid='questions-link']").first().click()
    cy.task("executeSql", "DELETE FROM questions")
    cy.task("executeSql", `
      INSERT INTO questions
        (visitor_id, talk_id, question)
      VALUES
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 'question 5'),
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 'question 4'),
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 'question 3'),
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 'question 2'),
        ('11125052-06a6-4cd2-a755-55f87e8e121e', (SELECT id FROM talks WHERE slug = 'the-mother-of-all-demos'), 'question 1')
    ;`)
    cy.reload()
    verifyQuestions([
      "question 1",
      "question 2",
      "question 3",
      "question 4",
      "question 5",
    ])
    cy.get('.x-talk-question-list-item-actions-fav').eq(2).click()
    cy.get('.x-talk-question-list-item-actions-fav').eq(4).click()
    verifyQuestions([
      "question 1",
      "question 2",
      "question 3",
      "question 4",
      "question 5",
    ])
    verifyQuestions([
      "question 3",
      "question 5"
    ], { favOnly: true })

    cy.get('#see_fav_only').check()
    cy.get('.x-talk-question-list.is-fav-only')
    cy.get('.x-talk-question-list-item-actions-unfav').eq(4).click()
    verifyQuestions([
      "question 3"
    ], { favOnly: true })

    cy.get('#see_fav_only').uncheck()
    cy.get('.x-talk-question-list:not(.is-fav-only)')

    cy.get('#see_fav_only').check()
    cy.reload()
    cy.get('#see_fav_only:checked')
    verifyQuestions([
      "question 3"
    ], { favOnly: true })
  })
})

function verifyRatings(average: string, stars: { [x: string]: number }, comments: { comment: string, rating: number }[]) {
  cy.get('.x-talk-rating-average-value').contains(average)
  for (const star in stars) {
    cy.get('.x-talk-rating-stars-numbers > span:nth-child(' + star + ')').contains(stars[star])
  }

  if (comments.length === 0) return
  cy.get('.x-talk-comment').as("comments")
  cy.get("@comments").should('have.length', comments.length)

  for (let i = 0; i < comments.length; i++) {
    cy.get("@comments").eq(i)
      .find('p').contains(comments[i].comment)
      .find('.x-talk-comment-stars').contains(comments[i].rating)
  }
}

function verifyQuestions(questions: string[], opts?: { favOnly?: boolean }) {
  if (questions.length === 0) return;
  cy.get(`.x-talk-question-list-item${opts?.favOnly ? '.is-fav' : ''}`).as("questions")
  cy.get("@questions").should('have.length', questions.length)

  for (let i = 0; i < questions.length; i++) {
    cy.get("@questions").eq(i)
      .find("p").contains(questions[i])
  }
}
