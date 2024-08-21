# Connecting with mongoose

first npm i mongoose


delete this array
```js
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
```

make connection to todolistDB

```js
main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
}
```

new Schema for todolist

```js
const itemsSchema = new mongoose.Schema({
  name: String,
});
```

new mongoose Model based on schema above

```js
const Item = new mongoose.model("Item", itemsSchema);

```

we will remove date to make it simpler

```js
  const day = date.getDate();
```

creating new items in our database for show

```js
const item1 = new Item({
  name: "Go To Gym",
});

const item2 = new Item({
  name: "Buy Milk",
});

const item3 = new Item({
  name: "Work",
});

const defaultItems = [item1, item2, item3];
```

insertMany

```js
Item.insertMany(defaultItems)
  .then(() => {
    console.log("Successfully saved defult items to DB");
  })
  .catch((err) => console.log(err));
```

now if you search for Dbs you will find todolistDB and if you search for collections then items will be shown and lastly if you find all items everything is there