---
title: Reorder selected items
page_title: Reorder selected items
description: Reorder selected items
---

# Reorder selected items

The example below demonstrates how to use the Kendo UI Sortable widget to reorder the selected values.

#### Example:

```html
     <div id="example" role="application">
      <form method="post" action="http://trykendoui.telerik.com/@ggkrustev/oDEW">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" name="required" multiple="multiple" data-placeholder="Select attendees...">
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
        <button>Post</button>
      </form>
      <script>
        $(document).ready(function() {
          // create MultiSelect from select HTML element
          var required = $("#required").kendoMultiSelect().data("kendoMultiSelect");

          required.tagList.kendoSortable({
            hint:function(element) {
              return element.clone().addClass("hint");
            },
            placeholder:function(element) {
              return element.clone().addClass("placeholder").text("drop here");
            }
          });
        });
      </script>
    </div>
```
