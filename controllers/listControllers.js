const Item = require("../models/item");
const List = require("../models/list");

// Default Items
const defaultItems = [
  new Item({
    name: "Welcome to your todo list",
  }),
  new Item({
    name: "Press the + button to add new todos",
  }),
  new Item({
    name: "<-- press this checkbox to delete todos",
  }),
];

exports.getItems = async (req, res) => {
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
};

exports.addItems = async (req, res) => {
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
};

exports.deleteItems = async (req, res) => {
  const checkId = req.body.checkbox;
  try {
    const result = await Item.deleteOne({ _id: checkId });
    console.log(result);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.getWorkPage = function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
};

app.get("/about", function (req, res) {
  res.render("about");
});
