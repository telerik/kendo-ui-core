---
title: Focus widget on label click
page_title: Focus widget on label click
description: Focus widget on label click
---

# Focus widget on label click

The example below demonstrates how to focus Kendo UI NumericTextBox when click label element

#### Example:

```html
<label for="numerictextbox">Number: </label>
<input id="numerictextbox" />
<script>
  $(function() {
    $("#numerictextbox").kendoNumericTextBox();

    //global click handler for all label elements
    $("label").click(function(e) {
       var label = $(this);
       var id = label.attr("for");
       var widget;

       if (id) {
           widget = kendo.widgetInstance($("#" + id), kendo.ui);

           if (widget) {
               e.preventDefault();
               widget.focus();
           }
       }
    });
  });
</script>
```
