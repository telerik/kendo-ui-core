---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the input mode of the Kendo UI for jQuery OTPInput component."
slug: otpinput_input_mode_kendo
position: 4
---

# Adaptiveness

The Kendo UI for jQuery OTPInput does not require specific adaptive rendering but enables you to configure a suitable input-specific keyboard that appears on touchscreen devices upon interaction.

## On-Screen Keyboard

To enhance the mobile user experience of your application, you can configure the type of the on-screen keyboard for the OTPInput component.

To configure an on-screen keyboard for the OTPInput, use the `inputMode` property to a supported value. Based on the defined setting, the browser will display the most appropriate virtual keyboard on the screen.

The following example demonstrates how to configure an on-screen keyboard for the Kendo UI for jQuery OTPInput.

```dojo
    <input id="dateinput" style="width: 100%;" />                
    <script>
      $(document).ready(function() {
        $("#dateinput").kendoOTPInput({
          items: 3,
          type:"number",
          inputMode: "numeric"
        })
      });
    </script>
```

## See Also

* [JavaScript API Reference of the OTPInput](/api/javascript/ui/otpinput)