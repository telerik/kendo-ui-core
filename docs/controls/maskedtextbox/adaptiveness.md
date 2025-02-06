---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure input mode for the Kendo UI for jQuery MaskedTextBox component."
slug: maskedtextbox_input_mode_kendo
position: 6
---

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the MaskedTextBox component.

To configure an on-screen keyboard for the MaskedTextBox, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery MaskedTextBox.

```dojo
    <input id="phone_number"/>   
    <script>
      $(document).ready(function() {
        $("#phone_number").kendoMaskedTextBox({
          inputMode: "numeric",
          mask: "(359) 000-00-00-00"         
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the MaskedTextBox](/api/javascript/ui/maskedtextbox)