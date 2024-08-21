# Adding new Items to our Todo List DB

delete these in post

```js
if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
```

saving as itemName

```js
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
});
```

now to save

```js
app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();
});
```

now it looks like nothing happened but if you check compass you will see it got added

```js
app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });

  item.save();

  res.redirect("/");
});
```

with redirect we will get it to show