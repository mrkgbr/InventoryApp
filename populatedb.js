#! /usr/bin/env node
require("dotenv").config();
const mongoose = require("mongoose");

console.log("This script populates some test data to your database.");

// // Get arguments passed on command line
// const userArgs = process.argv.slice(2);

// const Book = require("./models/book");
// const Author = require("./models/author");
// const Genre = require("./models/genre");
// const BookInstance = require("./models/bookinstance");
const Brand = require("./models/brand");
const Category = require("./models/category");
const Item = require("./models/item");

// const genres = [];
// const authors = [];
// const books = [];
// const bookinstances = [];
const brands = [];
const categories = [];
const items = [];

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = process.env.MONGODB_URI;

// async function main() {
//   console.log("Debug: About to connect");
//   await mongoose.connect(mongoDB);
//   console.log("Debug: Should be connected?");
//   await createGenres();
//   await createAuthors();
//   await createBooks();
//   await createBookInstances();
//   console.log("Debug: Closing mongoose");
//   mongoose.connection.close();
// }

async function brandCreate(index, name, location, year_of_foundation) {
  const brand = new Brand({
    name,
    location,
    year_of_foundation,
  });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({
    name,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  price,
  number_in_stock,
  brand,
  category
) {
  const item = new Item({
    name,
    description,
    price,
    number_of_stock: number_in_stock,
    brand,
    category,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Sony", "Japan", 1946),
    brandCreate(1, "Nikon", "Japan", 1917),
    brandCreate(2, "Canon", "Japan", 1937),
    brandCreate(3, "Olympus", "Japan", 1919),
    brandCreate(4, "Samsung", "South-Korea", 1938),
    brandCreate(5, "Apple", "American", 1976),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Camera"),
    categoryCreate(1, "Lens"),
    categoryCreate(2, "TV"),
    categoryCreate(3, "Phone"),
    categoryCreate(4, "Notebook"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Z9",
      "Professional mirrorless camera without mechanical shutter",
      6000,
      2,
      brands[1],
      categories[0]
    ),
    itemCreate(
      0,
      "R3",
      "Professional mirrorless camera",
      6500,
      1,
      brands[2],
      categories[0]
    ),
    itemCreate(
      0,
      "MacBook PRO",
      "Apple M1 chip, 16GB RAM, 500GB SSD",
      3000,
      12,
      brands[5],
      categories[4]
    ),
    itemCreate(
      0,
      "Aplha 7IV",
      "Professional camera",
      2000,
      4,
      brands[0],
      categories[0]
    ),
    itemCreate(
      0,
      "S11",
      "Fastest smartphone",
      1000,
      24,
      brands[4],
      categories[3]
    ),
    itemCreate(0, "Q80", "4K resolution", 1500, 7, brands[4], categories[2]),
  ]);
}

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

main().catch((err) => console.log(err));
