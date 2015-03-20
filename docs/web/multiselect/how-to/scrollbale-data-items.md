---
title: Scrollbale data items
page_title: Scrollbale data items
description: Scrollbale data items
---

# Scrollbale data items

The example below demonstrates how to create a scrollable list of the selected items in the widget.

#### Example:

```html
    <div id="example" role="application">
    <div class="demo-section k-header">
        <h2>Invite Attendees</h2>
        <label for="required">Required</label>
        <select id="required" multiple="multiple" data-placeholder="Select attendees..." style="width:200px">
            <option selected>Steven White</option>
            <option selected>Nancy King</option>
            <option selected>Nancy Davolio</option>
            <option selected>Robert Davolio</option>
            <option selected>Michael Leverling</option>
            <option selected>Andrew Callahan</option>
            <option selected>Michael Suyama</option>
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
    <script>
      $("#required").kendoMultiSelect({
        select: onSelect
      });

      $("#required").data("kendoMultiSelect").wrapper.addClass("myClass");

      function onSelect(e) {
        setTimeout(function() {
          var container = e.sender.wrapper.children(".k-multiselect-wrap");
          container.scrollTop(container[0].scrollHeight);
        });
      }
    </script>

    <style>
      .myClass .k-multiselect-wrap
      {
        overflow: auto;
        max-height: 100px;
      }
    </style>
</div>
```
