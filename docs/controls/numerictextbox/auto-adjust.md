---
title: Automatic Correction
page_title: jQuery NumericTextBox Documentation - Automatic Correction
description: Get familiar with the autocorrect feature of the jQuery NumericTextBox by Kendo UI. Learn how to automatically correct the user input when it's outside of the pre-configured range."
slug: autocorrect_kendoui_numerictextbox
position: 8
---

# Automatic Correction

Starting with Kendo UI R3 2024, the NumericTextBox component provides an [`autoAdjust`](/api/javascript/ui/numerictextbox/configuration/autoadjust) feature. When you have `min` and `max` dates configured, the component will autocorrect the user input if it is not within the specified range. The autocorrected value will be either the `min` or the `max` value you have set for the component depending on which the invalid value is closer to.

```dojo
    <input id="numerictextbox" />

    <script>
      $(document).ready(function(){
        $("#numerictextbox").kendoNumericTextBox({
          min: 3,
          max: 10,
          autoAdjust: true
        });
      });
    </script>
```

## See Also

* [Using the API of the NumericTextBox (Demo)](https://demos.telerik.com/kendo-ui/numerictextbox/api)
* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)
