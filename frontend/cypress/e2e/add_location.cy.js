// describe('This add a new loca')

const locationName = "everytime n";
describe("this adds a new location ( protected route )", () => {
  beforeEach(() => {
    cy.loginViaApi("testUser11@gmail.com", "testUser11");
    cy.visit("http://localhost:5173/add-location");
  });

  // showing error if non-image file is uploaded

  it("should show an error if a non image file is uploaded", () => {
    const textFile = {
      contents: Cypress.Buffer.from("this is not an image"),
      fileName: "test.txt",
      mimeType: "text/plain",
    };
    cy.get('input[type="file"]').selectFile(textFile, { force: true });
    cy.contains("Please select a valid image file").should("be.visible");
  });

  it("should show an error if the image is too large(over 5 mb ) ", () => {
    const largeFile = {
      contents: Cypress.Buffer.alloc(6 * 1024 * 1024), // The "non-null contents"
      fileName: "large-image.jpg",
      mimeType: "image/jpeg",
    };
    // "Upload" the fake large file
    cy.get('input[type="file"]').selectFile(largeFile, { force: true });

    // Check that the error message from your component's state appears
    cy.contains("Image size must be less than 5MB").should("be.visible");
  });

  it("should FAIL to add a location if no image is provided (due to current bug)", () => {
    const locationName = "Cypress Test Location (No Image)";

    // 1. Intercept the API call so we can wait for it
    cy.intercept("POST", "http://localhost:8000/api/v1/fromLocation").as(
      "addLocation"
    );

    // 2. Type in the location name
    cy.get('input[placeholder="Enter location name"]').type(locationName);

    // 3. Click the submit button
    cy.get('button[type="submit"]').click();

    // 4. Wait for the API call to complete
    cy.wait("@addLocation");

    // 5. Assert the FAILURE. Check for the specific error message.
    cy.contains("locationImage file is required").should("be.visible");

    // 6. Assert the form was NOT cleared
    cy.get('input[placeholder="Enter location name"]').should(
      "have.value",
      locationName
    );
  });

  it("should successfully add a new location WITH an image", () => {
    // 1. GENERATE A UNIQUE NAME FOR THIS TEST RUN
    const uniqueLocationName = "Cypress Test Cafe " + Date.now();

    // Intercept the API call
    cy.intercept("POST", "http://localhost:8000/api/v1/fromLocation").as(
      "addLocation"
    );

    // 2. USE THE UNIQUE NAME
    cy.get('input[placeholder="Enter location name"]').type(uniqueLocationName);

    // Upload our valid fixture file
    cy.get('input[type="file"]').selectFile("cypress/fixtures/test-image.png", {
      force: true,
    });

    // Assert the preview image is now visible
    cy.get('img[alt="Preview"]').should("be.visible");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for the API call to complete
    cy.wait("@addLocation");

    // Assert success message appears
    cy.contains("successfully", { matchCase: false }).should("be.visible");
  });
});
