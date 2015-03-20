---
title: Change text color
page_title: Change text color
description: Change text color
---

# Change text color

The example below demonstrates how to change the color of the Kendo UI NumericTextBox value

#### Example:

```html
<input id="numeric" value="10" />
<script>
$(function() {
    var widget = $("#numeric").kendoNumericTextBox().data("kendoNumericTextBox");

    //find the wrapper of the widget
    //get all input elements, as the widget creates two - for formatted value and real value
    //set text color

    widget.wrapper.find("input").css("color", "red");
});
</script>
```
