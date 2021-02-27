describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get("#volume-number").clear().type('75');

    cy.get("#volume-slider").then(($el) => {
      expect($el).to.have.value(75);
    })
  });

  it('Volume changes when slider input changes', () => {
    cy.get("#volume-slider").invoke('val', 33).trigger('input');

    cy.get("#volume-number").then(($el) => {
      expect($el).to.have.value(33);
    })
  });

  it('Audio volume changes when slider input changes', () => {
    cy.get("#volume-slider").invoke('val', 33).trigger('input');

    cy.get("#horn-sound").then(($el) => {
      expect($el).to.have.prop('volume', 0.33);
    })
  });

  it('image and sound source change when party radio is selected', () => {
    cy.get("#radio-party-horn").check();

    cy.get("#horn-sound").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/audio/party-horn.mp3");
    })

    cy.get("#sound-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/images/party-horn.svg");
    })
  });

  it('volume image changes when increasing volumes', () => {
    cy.get("#volume-number").clear().type('0');

    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-0.svg");
    })

    //test a value at the beginning of the range
    cy.get("#volume-number").clear().type('1');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-1.svg");
    })

    //test a value at the end of the range to ensure icon didn't change at wrong level
    cy.get("#volume-number").clear().type('33');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-1.svg");
    })

    cy.get("#volume-number").clear().type('34');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-2.svg");
    })

    cy.get("#volume-number").clear().type('66');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-2.svg");
    })

    cy.get("#volume-number").clear().type('67');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-3.svg");
    })

    cy.get("#volume-number").clear().type('100');
    cy.get("#volume-image").then(($el) => {
      expect($el).to.have.attr('src', "./assets/media/icons/volume-level-3.svg");
    })
  });

  it('honk button is disabled when input empty or NAN', () => {
    //check for disabled when input box empty
    cy.get("#volume-number").clear();

    cy.get("#honk-btn").then(($el) => {
      expect($el).to.have.prop('disabled', true);
    })

    //check for disabled when strings are input
    cy.get("#volume-number").clear().type('hello there');

    cy.get("#honk-btn").then(($el) => {
      expect($el).to.have.prop('disabled', true);
    })

    cy.get("#volume-number").clear().type('this is not a number');

    cy.get("#honk-btn").then(($el) => {
      expect($el).to.have.prop('disabled', true);
    })
    

  });

  it('error thrown when invalid volume typed in textbox', () => {
    //check for error when greater than valid range
    cy.get("#volume-number").clear().type('300');
    cy.get('#honk-btn').click();
    cy.get("input:invalid").then(($el) => {
      expect($el).to.exist;
    })

    //check for error when less than valid range
    cy.get("#volume-number").clear().type('-1');
    cy.get('#honk-btn').click();
    cy.get("input:invalid").then(($el) => {
      expect($el).to.exist;
    })
    

  });
});
