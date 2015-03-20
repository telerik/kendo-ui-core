---
title: Automatically adjust the width of a DropDownList
page_title: Automatically adjust the width of a DropDownListetect input change event 
description: Example that shows how to automatically adjust the width of a DropDownList
---

# How to automatically adjust the width of a DropDownList

Example that shows how to automatically adjust the width of a DropDownList

#### Example:

```html
  <div id="example">
    <div id="cap-view" class="demo-section k-header">
      <h2>Customize your Kendo Cap</h2>
      <div id="options">
        <h3>Cap Color</h3>
        <input id="color" value="1" />

        <h3>Cap Size</h3>
        <select id="size" style="width:auto">
          <option>S - 6 3/4"</option>
          <option>M - 7 1/4"</option>
          <option>L - 7 1/8"</option>
          <option>aaaaaaaaaaaaaaaaaaXL - 7 5/8"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</option>
        </select>
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
          dataSource: data,
          index: 0,
          change: onChange
        });

        // create DropDownList from select HTML element
        $("#size").kendoDropDownList({
          filter: "contains"
        });

        var color = $("#color").data("kendoDropDownList");
        var size = $("#size").data("kendoDropDownList");

        size.list.width("auto");

        function onChange() {
          var value = $("#color").val();
          $("#cap")
          .toggleClass("black-cap", value == 1)
          .toggleClass("orange-cap", value == 2)
          .toggleClass("grey-cap", value == 3);
        };

        $("#get").click(function() {
          alert('Thank you! Your Choice is:\n\nColor ID: '+color.value()+' and Size: '+size.value());
        });
      });
    </script>
  </div>
```
