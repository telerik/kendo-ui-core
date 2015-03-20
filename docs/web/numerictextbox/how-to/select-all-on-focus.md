---
title: Select all text on focus
page_title: Select all text on focus
description: Select all text on focus
---

# Select all text on focus

The example below demonstrates how to select whole input value on focus

#### Example:

```html
<input id="numeric" type="number" value="17" min="0" max="100" step="1" />
<script>
    $(document).ready(function() {
        $("#numeric").kendoNumericTextBox();

        //wire focus of all numerictextbox widgets on the page
        $("[data-role=numerictextbox]").on("focus", function() {
            var element = this;
            setTimeout(function() {
                $(element).select();
            });
        });
    });
</script>
```
