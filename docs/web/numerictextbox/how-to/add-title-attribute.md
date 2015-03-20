---
title: Add title attribute
page_title: Add title attribute
description: Add title attribute
---

# Add title attribute

The example below demonstrates how to add a title attribute to the input element of Kendo UI NumericTextBox

#### Example:

```html
<input id="numerictextbox" value="10" title="this is the numerictextbox title"/>
<script>
  $(function() {
    var widget = $("#numerictextbox").kendoNumericTextBox().data("kendoNumericTextBox");

    widget.wrapper
          .find(".k-formatted-value")
          .attr("title", widget.element.attr("title"));
  });
</script>
```
