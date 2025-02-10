---
title: Getting Started
page_title: jQuery OTPInput Documentation - Getting Started with the OTPInput
description: "Get started with the jQuery OTPInput by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_otpinput
position: 1
---

# Getting Started with the OTPInput

This guide demonstrates how to get up and running with the Kendo UI for jQuery OTPInput.

After the completion of this guide, you will be able to achieve the following end result:

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
            },
            {
                groupLength: 3
            }
        ],       
        placeholder: "X",
        type: "number"
      });
    </script>
```

## 1. Create an input Element

First, create an `<input>` element on the page that will be used to initialize the component.

```html
<input id="otpinput" />
```

## 2. Initialize the OTPInput 

In this step, you will initialize the OTPInput from the `<input>` element. Upon its initialization, the OTPInput wraps the `<input>` element with a `<div>` tag.

```html
<input id="otpinput" />

<script>
    // Target the input element by using jQuery and then call the OTPInput() method.
    $("#otpinput").kendoOTPInput()
</script>
```

## 3. Configure the Items

The OTPInput's [items option](/api/javascript/ui/otpinput/configuration/items) can be configured either as a number or as an array. The latter allows you to configure the items in groups with a specified length.

```html
<input id="otpinput" />

<script>
    $("#otpinput").kendoOTPInput({
        items: [
            {
                groupLength: 3
            },
            {
                groupLength: 2
            },
            {
                groupLength: 3
            }
        ]
    })
</script>
```

## 4. Configure the Placeholder

You can configure a [placeholder](/api/javascript/ui/otpinput/configuration/placeholder) which will be displayed when the OTPInput items have no value.

```html
<input id="otpinput" />

<script>
    $("#otpinput").kendoOTPInput({
        items: [
            {
                groupLength: 3
            },
            {
                groupLength: 2
            },
            {
                groupLength: 3
            }
        ],
        placeholder:"X"
    })
</script>
```

## 5. Set the Type

The OTPInput supports three [types](/api/javascript/ui/otpinput/configuration/type)&mdash;`text`(default), `number`, and `password`. In the example, the type is changed to `number` so only numeric values can be entered.

```html
<input id="otpinput" />

<script>
    $("#otpinput").kendoOTPInput({
        items: [
            {
                groupLength: 3
            },
            {
                groupLength: 2
            },
            {
                groupLength: 3
            }
        ],       
        placeholder: "X",
        type: "number"
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the OTPInput](https://demos.telerik.com/kendo-ui/otpinput/index)

## See Also 

* [JavaScript API Reference of the OTPInput](/api/javascript/ui/otpinput)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>