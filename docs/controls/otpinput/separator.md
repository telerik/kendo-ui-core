---
title: Separator
page_title: jQuery OTPInput Documentation - OTPInput Separator
description: "Learn how to configure different separators between the items of the OTPInput component."
components: ["otpinput"]
slug: separator_kendoui_otpinput
position: 3
---

# Separator

In this article, you will find information about the different ways to add a [separator](/api/javascript/ui/otpinput/configuration/separator) between the OTPInput items. The option accepts either a string or a function. In order for the configuration to work, the [items](/api/javascript/ui/otpinput/configuration/items) need to be configured as an array.

The below example demonstrates how to add a separator as a string. 

```dojo
    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: [
                {
                    groupLength: 3
                },
                {
                    groupLength: 2
                }
            ],
            separator: "--"
        });
    </script>
```

The next example show how to add a separator as a function using the [`kendo.ui.icon`](/api/javascript/ui/ui/methods/icon) method.

```dojo
    <input id="otpinput" />
    <script>
        $("#otpinput").kendoOTPInput({
            items: [
                {
                    groupLength: 3
                },
                {
                    groupLength: 2
                }
            ],
            separator: () => kendo.ui.icon({icon: "shape-line", type: "svg"})
        });
    </script>
```

## See Also

* [JavaScript API Reference of the OTPInput](/api/javascript/ui/otpinput)
