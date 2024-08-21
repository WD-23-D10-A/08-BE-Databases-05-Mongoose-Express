# deleting items from our todolistDB

inside list.ejs

```html
<%  newListItems.forEach((item)=>{ %>
  <form action="/delete" method="post">
    <div class="item">
      <input type="checkbox" name="checkbox" value="<%=item._id%>" onChange="this.form.submit()">
      <p><%=  item.name  %></p>
    </div>
  </form>
  <% }) %>
```

in app.js

```js
app.post("/delete", (req, res) => {
  console.log(req.body.checkbox);
});
```

if you now check console.log it will show what was checked

```js
app.post("/delete", async (req, res) => {
  try {
    const checkedId = req.body.checkbox;
    const result = await Item.deleteOne({ _id: checkedId });
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
```