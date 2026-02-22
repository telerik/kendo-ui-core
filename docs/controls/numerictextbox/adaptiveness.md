---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure input mode for the Kendo UI for jQuery NumericTextBox component."
components: ["numerictextbox"]
slug: numerictextbox_input_mode_kendo
position: 9
---

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the NumericTextBox component.

To configure an on-screen keyboard for the NumericTextBox, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery NumericTextBox.

```dojo
    <input id="numeric" />   
    <script>
      $(document).ready(function() {
        $("#numeric").kendoNumericTextBox({
          inputMode: "numeric"         
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the NumericTextBox](/api/javascript/ui/numerictextbox)