---
title: Use a custom culture script
page_title: Use a custom culture script
description: Use a custom culture script
---

# Use a custom culture script

The example below demonstrates how to extend an existing culture script, create a custom script and use it with Kendo UI NumericTextBox

#### Example:

```html
<script src="http://cdn.kendostatic.com/2014.3.1119/js/cultures/kendo.culture.en-GB.min.js"></script>

<div id="example">
    <input id="initial" value="10" min="1"/>
    <script>
        //extend en-GB
        var customGB = $.extend({}, kendo.culture(), {
            name: "custom-GB",
            numberFormat: {
              ",": " "
            }
        });

        //add a reference to the custom culture script
        kendo.cultures["custom-GB"] = customGB";
    </script>
    <script>
        kendo.culture("en-GB");

        $(document).ready(function() {
            $("#initial").kendoNumericTextBox({
              culture: "custom-GB" //use custom culture
            });
        });
    </script>
</div>
```
