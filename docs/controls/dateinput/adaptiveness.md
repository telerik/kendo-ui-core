---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the input mode for the Kendo UI for jQuery DateInput component."
slug: dateinput_input_mode_kendo
position: 8
---

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the DateInput component.

To configure an on-screen keyboard for the DateInput, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery DateInput.

```dojo
    <input id="dateinput" style="width: 100%;" />                
    <script>
      $(document).ready(function() {
        $("#dateinput").kendoDateInput({
          inputMode: "numeric"
        })
      });
    </script>
```

## See Also

* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)