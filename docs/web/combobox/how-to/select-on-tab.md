---
title: Select item on TAB
page_title: Select item on TAB
description: Example that shows how to select item on TAB
---

# How to select item on TAB

The example below demonstrates how to select item on TAB.

#### Example:

```html
  <div id="example">

    <div id="shipping">
      <label for="countries" class="info">Choose shipping countries:</label>

      <input id="countries" />

      <div class="hint">Start typing the name of an European country</div>
    </div>

    <script>
      $(document).ready(function () {
        var data = [
          "Albania Test",
          "Andorra Test",
          "Turkey",
          "Ukraine",
          "United Kingdom 2test",
          "Vatican City 2test"
        ];

        //create AutoComplete UI component
        var combobox = $("#countries").kendoComboBox({
          dataSource: data,
          filter: "contains",
          placeholder: "Type '2t'",
          suggest: true
        }).data("kendoComboBox");

        combobox.input.on("keydown", function(e) {
          var filter = combobox.dataSource.filter() || { filters: [] };

          if (e.keyCode === 9 && filter.filters[0]) { //TAB
            combobox.select(combobox.current().index());
          }
        });
      });
    </script>
    <style scoped>
      .info {
        display: block;
        line-height: 22px;
        padding: 0 5px 5px 0;
        color: #36558e;
      }

      #shipping {
        width: 482px;
        height: 152px;
        padding: 110px 0 0 30px;
        background: url('../content/web/autocomplete/shipping.png') transparent no-repeat 0 0;
        margin: 100px auto;
      }

      .k-autocomplete
      {
        width: 250px;
        vertical-align: middle;
      }

      .hint {
        line-height: 22px;
        color: #aaa;
        font-style: italic;
        font-size: .9em;
        color: #7496d4;
      }
    </style>
  </div>
```
