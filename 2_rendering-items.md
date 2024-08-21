# rendering items from db

first let's "find" the items

```js
app.get("/", function (req, res) {
  Item.find({})
    .then((item) => console.log(item))
    .catch((err) => console.log(err));
  res.render("list", { listTitle: "Today", newListItems: items });
});
```

now if we run nodemon app.js and go to localhost:3000 it will get logged in the console

next let's try to render inside of our find method

```js

app.get("/", function (req, res) {
  Item.find({})
    .then((item) => {
      res.render("list", { listTitle: "Today", newListItems: item });
    })
    .catch((err) => console.log(err));
});
```

the site works but something is off can you tell what

in list.ejs

```html
 <p><%=  newListItems[i].name  %></p>
```

let's use forEach instead

```ejs
  <%  newListItems.forEach((item)=>{ %>
  <div class="item">
    <input type="checkbox">
    <p><%=  item.name  %></p>
  </div>
  <% }) %>
```

we can now drop database and make a check if it's empty then add some custom todos

new todos

```js
const item1 = new Item({
  name: "Welcome to your todolist!!!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});
```


code to render


```js

app.get("/", function (req, res) {
  Item.find({})
    .then((items) => {
      if (items.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully saved defult items to DB");
          })
          .catch((err) => console.log(err));

        res.redirect("/");
      }

      res.render("list", { listTitle: "Today", newListItems: items });
    })
    .catch((err) => console.log(err));
});
```


async/await version

```js
const findItems = async (res) => {
  try {
    const result = await Item.find({});

    if (result.length === 0) {
      const insert = await Item.insertMany(defaultItems);
      console.log(insert);
    }

    return res.render("list", { listTitle: "Today", newListItems: result });
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  findItems(res);
});

// or

app.get("/", async (req, res) => {
  try {
    const result = await Item.find({});

    if (result.length === 0) {
      const insert = await Item.insertMany(defaultItems);
      console.log(insert);
      res.redirect("/");
    }

    return res.render("list", { listTitle: "Today", newListItems: result });
  } catch (error) {
    console.log(error);
  }
});
```