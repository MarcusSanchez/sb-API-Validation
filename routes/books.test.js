process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const db = require("../db");
const Book = require("../models/book");

describe("Book Routes", () => {
  beforeEach(async () => {
    await Book.create({
      isbn: "test-isbn",
      amazon_url: "https://example.com/book",
      author: "Test Author",
      language: "English",
      pages: 200,
      publisher: "Test Publisher",
      title: "Test Book",
      year: 2022,
    });
  });

  afterEach(async () => {
    await db.query("DELETE FROM books");
  });

  it("should get all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.books).toBeDefined();
  });

  it("should get a book by ISBN", async () => {
    const response = await request(app).get("/books/test-isbn");
    expect(response.status).toBe(200);
    expect(response.body.book).toBeDefined();
  });

  it("should create a new book with valid data", async () => {
    const newBookData = {
      isbn: "new-isbn",
      amazon_url: "https://example.com/new-book",
      author: "New Author",
      language: "English",
      pages: 150,
      publisher: "New Publisher",
      title: "New Book",
      year: 2023,
    };
    const response = await request(app)
      .post("/books")
      .send(newBookData);
    expect(response.status).toBe(201);
    expect(response.body.book).toBeDefined();
  });

  it("should return 400 with invalid data on create", async () => {
    const invalidBookData = {};
    const response = await request(app)
      .post("/books")
      .send(invalidBookData);
    expect(response.status).toBe(400);
  });

  it("should update a book by ISBN", async () => {
    const updatedBookData = {
      amazon_url: "https://example.com/updated-book",
      author: "Updated Author",
      language: "Spanish",
      pages: 180,
      publisher: "Updated Publisher",
      title: "Updated Book",
      year: 2024,
    };
    const response = await request(app)
      .put("/books/test-isbn")
      .send(updatedBookData);
    expect(response.status).toBe(200);
    expect(response.body.book).toBeDefined();
  });

  it("should return 400 if trying to update ISBN", async () => {
    const invalidUpdateData = {
      isbn: "invalid-isbn",
    };
    const response = await request(app)
      .put("/books/test-isbn")
      .send(invalidUpdateData);
    expect(response.status).toBe(400);
  });

  it("should return 400 with invalid data on update", async () => {
    const invalidUpdateData = {};
    const response = await request(app)
      .put("/books/test-isbn")
      .send(invalidUpdateData);
    expect(response.status).toBe(400);
  });

  it("should delete a book by ISBN", async () => {
    const response = await request(app).delete("/books/test-isbn");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Book deleted");
  });
});