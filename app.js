//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
}
main().catch((err) => console.log(err));

const itemsSchema = {
  name: String,
};

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("List", listSchema);

const item1 = new Item({
  name: "Welcome to your todo list",
});

const item2 = new Item({
  name: "Press the + button to add new todos",
});

const item3 = new Item({
  name: "<-- press this checkbox to delete todos",
});

const defaultItems = [item1, item2, item3];

app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});

    if (items.length === 0) {
      await Item.insertMany(defaultItems);
      res.redirect("/");
    }
    return res.render("list", { listTitle: "Today", newListItems: items });
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const itemName = req.body.newItem;
    const item = new Item({
      name: itemName,
    });

    await item.save();
    res.redirect("/");
  } catch (error) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const checkId = req.body.checkbox;
  try {
    const result = await Item.deleteOne({ _id: checkId });
    console.log(result);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
