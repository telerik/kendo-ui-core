---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure input mode for the Kendo UI for jQuery TextArea component."
slug: textarea_input_mode_kendo
position: 5
---

# On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the TextArea component.

To configure an on-screen keyboard for the TextArea, set the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery TextArea.

```dojo
    <textarea id="description"></textarea>
    <script>
      $(document).ready(function() {
        $("#numeric").kendoTextArea({
          inputMode: "search"         
        });
      });
    </script>
```

## See Also

* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)