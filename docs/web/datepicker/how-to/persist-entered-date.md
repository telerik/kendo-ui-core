---
title: Persist entered date in the widget (IE9 and older)
page_title: Persist entered date in the widget (IE9 and older)
description: Persist entered date in the widget (IE9 and older)
---

# Persist entered date in the widget (IE9 and older)

The example below demonstrates how to persist the data inside the Kendo UI DatePicker when user navigates to another page and comes back. This functionality is supported by default in modern browsers, but not in IE9 and older, so we need this custom functionality.

#### Example:

```html
    <a href="http://www.telerik.com" alt="navigate">navigate</a>
    <div id="example">
      <div id="cap-view" class="demo-section k-header">
        <input id="color" name="color" />
        <input id="color_hidden" name="color" type="hidden" />

        <input id="datepicker" name="datepicker" />
        <input id="datepicker_hidden" name="datepicker" type="hidden" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        var datepicker_hidden = $("#datepicker_hidden");

        $("#datepicker").kendoDatePicker({
          value: datepicker_hidden.val(),
          change: function() {
            datepicker_hidden.val(this.element.val());
          }
        });

        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        var color_hidden = $("#color_hidden");

        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          value: color_hidden.val(),
          change: function() {
            color_hidden.val(this.value());
          },
          index: 0
        });
      });
    </script>    
```
