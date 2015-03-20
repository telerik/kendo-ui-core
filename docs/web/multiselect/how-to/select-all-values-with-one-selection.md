---
title: Select all values with one selection
page_title: Select all values with one selection
description: Select all values with one selection
---

# Select all values with one selection

The example below demonstrates how to create a dataItem that holds value named "all" that will select all the items in the widget.

#### Example:

```html
    <div id="example" role="application">
    <div class="demo-section k-header">
      <h2>Invite Attendees</h2>
      <label for="required">Required</label>
      <select id="required" multiple="multiple" data-placeholder="Select attendees...">
        <option>ALL</option>
        <option>Steven White</option>
        <option>Nancy King</option>
        <option>Nancy Davolio</option>
        <option>Robert Davolio</option>
        <option>Michael Leverling</option>
        <option>Andrew Callahan</option>
        <option>Michael Suyama</option>
        <option selected>Anne King</option>
        <option>Laura Peacock</option>
        <option>Robert Fuller</option>
        <option>Janet White</option>
        <option>Nancy Leverling</option>
        <option>Robert Buchanan</option>
        <option>Margaret Buchanan</option>
        <option selected>Andrew Fuller</option>
        <option>Anne Davolio</option>
        <option>Andrew Suyama</option>
        <option>Nige Buchanan</option>
        <option>Laura Fuller</option>
      </select>
    </div>
    <style scoped>
      .demo-section {
        width: 350px;
        min-height: 140px;
      }
      .demo-section h2 {
        font-weight: normal;
      }
      .demo-section label {
        display: inline-block;
        margin: 15px 0 5px 0;
      }
      .demo-section select {
        width: 350px;
      }
      #get {
        float: right;
        margin: 25px auto 0;
      }
    </style>
    <script>
      $(document).ready(function() {
        // create MultiSelect from select HTML element
        var required = $("#required").kendoMultiSelect({
          select: function(e) {
            var dataItem = this.dataSource.view()[e.item.index()];
            var values = this.value();

            if (dataItem.value === "ALL") {
              this.value("");
            } else if (values.indexOf("ALL") !== -1) {
              values = $.grep(values, function(value) {
                return value !== "ALL";    
              });

              this.value(values);
            }
          }
        }).data("kendoMultiSelect");
      });
    </script>
  </div>
```
