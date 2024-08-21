# Creating Custom Lists using Express Rute parameters

first delete this:

```js
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});
```

create express route paramateres:

```js
app.get("/category/:<paramName>", (req, res) => {
    //Access req.params.paramName
})
```

for us 

```js
app.get("/:customListName", (req, res) => {
  console.log(req.params.customListName);
});
```

Now head over to localhost:3000/Home it will get printed in the console

then do this

```js
app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;
  
});
```

afterwards below your new Items create a new schema

```js
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});
```

new model

```js
const List = mongoose.model("List", listSchema)
```

correct app.get

```js
app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  const list = new List({
    name: customListName,
    items: defaultItems,
  });

  list.save();
});
```

now if we save then go to localhost:3000/Test and check compass we have a new list


now we need to check if a name with that list already exists

```js
app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  const list = new List({
    name: customListName,
    items: defaultItems,
  });
  List.findOne({ name: customListName }).then((foundList, err) => {
    if (!err) {
      if (!foundList) {
        console.log("doesn't exist");
      } else {
        console.log("exists");
      }
    }
  });

  //list.save();
});
```

localhost:3000/bababooey will say doesn't exit
localhost:3000/Home will say exits


```js
app.get("/:customListName", (req, res) => {
  const customListName = req.params.customListName;

  List.findOne({ name: customListName }).then((foundList, err) => {
    if (!err) {
      if (!foundList) {
        // create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect(`/${customListName}`);
      } else {
        // show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});
```

dynamic lists

## Adding data to these Lists

```js
<button type="submit" name="list" value="<%=listTitle%>">+</button>
```


```js
app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }).then((foundList, err) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect(`/${listName}`);
    });
  }
});
```

## Deleting in custom list


```js
<%  newListItems.forEach((item)=>{ %>
  <form action="/delete" method="post">
    <div class="item">
      <input type="checkbox" name="checkbox" value="<%=item._id%>" onChange="this.form.submit()">
      <p><%=  item.name  %></p>
    </div>
    <input type="hidden" name="listName" value="<%=listTitle%>"></input>
  </form>
  <% }) %>
```


```js
app.post("/delete", async (req, res) => {
  try {
    const checkedId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
      const result = await Item.deleteOne({ _id: checkedId });
      console.log(result);
      res.redirect("/");
    } else {
      const result = await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: checkedId } } }
      );

      console.log(result);
      res.redirect(`/${listName}`);
    }
  } catch (error) {
    console.log(error);
  }
});
```


done