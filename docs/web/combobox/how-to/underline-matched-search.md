---
title: Underline matched search 
page_title: Underline matched search
description: Example that shows how to underline matched search
---

# How to underline matched search

The example below demonstrates how to underline matched search.

#### Example:

```html
<input id="fabric" placeholder="Select fabric..." />
<script>
  function formatValue(value, text) {
    var textMatcher = new RegExp(text, "ig");

    return value.replace(textMatcher, function(match) {
      return "<u>" + match + "</u>";
    });
  }

  $(document).ready(function() {
    // create ComboBox from input HTML element
    var combo = $("#fabric").kendoComboBox({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
        { text: "Cotton", value: "1" },
        { text: "Polyester", value: "2" },
        { text: "Cotton/Polyester", value: "3" },
        { text: "Rib Knit", value: "4" }
      ],
      filter: "contains",
      suggest: true
    }).data("kendoComboBox");

    combo.setOptions({
      template: $.proxy(kendo.template("#= formatValue(text, this.text()) #"), combo)
    });
  });
</script>
```
