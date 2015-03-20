---
title: Remove DropDownList items
page_title: Remove DropDownList items
description: Example that shows how to remove DropDownList items
---

# How to remove DropDownList items

Example that shows how to remove Kendo UI DropDownList items

#### Example:

```html
  <div id="example">
    <div id="cap-view" class="demo-section k-header">
      <h2>Customize your Kendo Cap</h2>
      <div id="cap" class="black-cap"></div>
      <div id="options">

        <input id="color" />
        <button class="k-button" id="remove">Remove items</button>
      </div>
    </div>
    <style scoped>
      .demo-section {
        width: 460px;
        height: 300px;
      }
      .demo-section h2 {
        text-transform: uppercase;
        font-size: 1em;
        margin-bottom: 30px;
      }
      #cap {
        float: left;
        width: 242px;
        height: 225px;
        margin: 20px 30px 30px 0;
        background-image: url('../content/web/dropdownlist/cap.png');
        background-repeat: no-repeat;
        background-color: transparent;
      }
      .black-cap {
        background-position: 0 0;
      }
      .grey-cap {
        background-position: 0 -225px;
      }
      .orange-cap {
        background-position: 0 -450px;
      }
      #options {
        padding: 1px 0 30px 30px;
      }
      #options h3 {
        font-size: 1em;
        font-weight: bold;
        margin: 25px 0 8px 0;
      }
      #get {
        margin-top: 25px;
      }
    </style>

    <script>
      $(document).ready(function() {
        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        // create DropDownList from input HTML element
        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data
        });

        $("#remove").click(function() {
          var ddl =  $("#color").data("kendoDropDownList");

          var oldData = ddl.dataSource.data();

          ddl.dataSource.remove(oldData[0]); //remove first item
          ddl.dataSource.remove(oldData[oldData.length - 1]); //remove last item
        });
      });
    </script>
  </div>
```
