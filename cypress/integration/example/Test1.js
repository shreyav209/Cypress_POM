import HomePage from "../POM/HomePage";
import ProductPage from "../POM/ProductPage";

describe("Test suite", function () {
  before(function () {
    // runs once before all tests in the block
    cy.fixture("example").then(function (data) {
      this.data = data;
      cy.log(data);
    });
  });

  it("Test", function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    cy.visit("https://rahulshettyacademy.com/angularpractice/");
    homePage.getName().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getShoptab().click();

    this.data.productName.forEach(function (element) {
      cy.selectProduct(element);
    });

    productPage.checkOutButton().click();
    var sum = 0;
    cy.get("tr td:nth-child(4) strong").each(($el, index, $list) => {
      const amount = $el.text();
      //cy.log(amount)
      var res = amount.split(" ");
      //cy.log(res)
      res = res[1].trim();
      //cy.log(res)
      sum = Number(sum) + Number(res);
      cy.log(sum);
    });

    cy.get("h3 > strong").then(function (element) {
      const totalAmount = element.text();
      cy.log(totalAmount);
      var res = totalAmount.split(" ");
      var total = res[1].trim();
      expect(Number(total)).to.equal(sum);
    });
    cy.contains("Checkout").click();
    cy.get("#country").type("India");
    cy.wait(4000)
    cy.get(".suggestions > ul > li > a").click();
    cy.get("#checkbox2").click({ force: true });
    cy.get('input[type="submit"]').click();
    cy.get(".alert").then(function (element) {
      const actualText = element.text();
      expect(actualText.includes("Success")).to.be.true;
    });
  });
});
