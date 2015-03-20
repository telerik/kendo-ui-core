---
title: Select/deselect all items
page_title: Select/deselect all items
description: Select/deselect all items
---

# Select/deselect all items

The example below demonstrates how to select/deselect all items using external buttons.

#### Example:

```html
    <div id="example" role="application">
      <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees...">
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
        <button class="k-button" id="select">Select All</button>
        <button class="k-button" id="deselect">Deselect All</button>
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
          var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");

          $("#select").click(function() {
            var values = $.map(required.dataSource.data(), function(dataItem) {
              return dataItem.value;
            });

            required.value(values);
          });

          $("#deselect").click(function() {
            required.value([]);
          });
        });
      </script>
    </div>
```
