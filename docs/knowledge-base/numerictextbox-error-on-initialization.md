---
title: NumericTextBox Throws Error on Initialization
description: NumericTextBox throws Cannot read property '_move' of undefined error on initialization
type: troubleshooting
page_title: Error Message When Creating NumericTextBox | Kendo UI for jQuery
slug: numerictextbox-error-on-initialization
tags: numerictextbox, error
ticketid: 1130422, 1127229, 1122877, 1120172
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI NumericTextBox</td>
 </tr>
</table>

## Description

When calling `kendoNumericTextBox()` method to create or customize a NumericTextBox widget, I get the following error.

## Error Message

```
    Uncaught TypeError: Cannot read property '_move' of undefined
```

## Possible Causes

This error is observed when you initialize a NumericTextBox from the same input element more than once. This could happen but is not limited to the following scenarios:

* The NumericTextBox is created using an MVC wrapper and then you try to call `kendoNumericTextBox()` method to apply new settings.
* The NumericTextBox is created using MVVM declarative initialization (`data-role='numerictextbox'` setting) and then you try to call `kendoNumericTextBox()` method to apply settings.
* The NumericTextBox is created using `kendoNumericTextBox()` method but you call it again to apply new settings.

All these lead to the same result—the NumericTextBox is initialized multiple times, which triggers the error message.

## Solution

Identify where the double initialization occurs and refactor that code to apply changes to the existing NumericTextBox instance. To do this, access the widget using one of the methods shown below:

```
    var numeric = $("#numericId").data("kendoNumericTextBox");
    // or
    var numeric = $("#numericId").getKendoNumericTextBox();

	// apply changes
    numeric.max(10);
```

If the changes that you need to apply cannot be set to an existing NumericTextBox instance and you need to completely recreate the widget, you need to destroy it first. The NumericTextBox renders additional `input` element and wrapping `span` elements around the original `<input id="numericId" />` element. You need to take this input out of the rendered NumericTextBox and then remove the wrapper element. The following snippet demonstrates how to destroy and recreate a NumericTextBox:

```html
    <button id="destroy">Destroy and recreate without spinners</button>
    <div>
      <input id="numeric" />
    </div>
    <script>
      $(function() {
        $("#numeric").kendoNumericTextBox();

        $("#destroy").click(function() {
          destroyNumeric();
          $("#numeric").kendoNumericTextBox({
            spinners: false
          });
        });

        function destroyNumeric(){
          var numeric = $("#numeric").data("kendoNumericTextBox");
          var origin = numeric.element.show();

          origin.insertAfter(numeric.wrapper);

          numeric.destroy();
          numeric.wrapper.remove();
        }
      });
    </script>
```