---
title: NumericTextBox Throws Error on Initialization
description: "NumericTextBox throws а *Cannot read property '_move' of undefined* error on initialization."
type: troubleshooting
page_title: Error Message Is Thrown When Creating NumericTextBox | Kendo UI NumericTextBox for jQuery
slug: numerictextbox-error-on-initialization
tags: numerictextbox, error
ticketid: 1130422, 1127229, 1122877, 1120172
res_type: kb
component: numeric-textbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI NumericTextBox</td>
 </tr>
</table>

## Description

When calling the `kendoNumericTextBox()` method to create or customize a NumericTextBox widget, I get the `Uncaught TypeError: Cannot read property '_move' of undefined` error.

## Possible Causes

This error is observed when you initialize a NumericTextBox from the same `input` element more than once. The reason for this behavior is due, but not limited, to the following scenarios:

* You create the NumericTextBox by using a Kendo UI for ASP.NET MVC wrapper. Then, you try to call the `kendoNumericTextBox()` method to apply new settings.
* You create the NumericTextBox by using an MVVM declarative initialization (`data-role='numerictextbox'` setting). Then, you try to call the `kendoNumericTextBox()` method to apply the settings.
* You create the NumericTextBox by using the `kendoNumericTextBox()` method. Then, you call it again to apply new settings.

All these scenarios lead to the same result&mdash;the NumericTextBox initializes multiple times, which triggers the error message.

## Solution

1. Identify where the double initialization occurs and refactor that code to apply changes to the existing NumericTextBox instance. To do this, access the widget through one of the following methods:

    ```
        var numeric = $("#numericId").data("kendoNumericTextBox");
        // or
        var numeric = $("#numericId").getKendoNumericTextBox();

    	// apply changes
        numeric.max(10);
    ```

1. If the changes that you need to apply cannot be set to an existing NumericTextBox instance and you need to completely recreate the widget, first destroy it. The NumericTextBox renders an additional `input` element and wrapping `span` elements around the original `<input id="numericId" />` element.

1. Take this input out of the rendered NumericTextBox and remove the wrapper element.

The following example demonstrates how to destroy and recreate a NumericTextBox.

```dojo
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
