---
title: Keeping Trailing Zeros in the NumericTextBox
page_title: Always Show Trailing Zeros in the NumericTextBox
description: "Learn how to always display the entire decimal portion in the Telerik UI for {{ site.framework }} NumericTextBox."
slug: numerictextbox-keep-trailing-zeros
tags: numerictextbox, html, helper, custom, mvc, telerik, zero, trailing, decimal, portion, float
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} NumericTextBox</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.314 version</td>
 </tr>
</table>

## Description

When I enter the `0.0010` value, it renders `0.001`. When the component loses focus, it re-formats the number to `0.0010`.

How can I format the number in a Telerik UI for {{ site.framework }} NumericTextBox so that it shows four decimal places?

## Solution

To achieve the desired result:

1. Create a common function that will add the trailing zeros programmatically.
1. Add the trailing zeros when you change the value through the **Spin** buttons by subscribing to the [`Spin`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/numerictextboxeventbuilder#spinsystemstring) event and call the common function.
1. Add the trailing zeros when the NumericTextBox's input is focused by subscribing to the [`focus`](https://api.jquery.com/focus/) event by using the [`HtmlAttributes()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/numerictextboxbuilder#htmlattributessystemobject) configuration method and call the common function.

> You can further elaborate on the example to reflect the globalization practices and check if the decimals are properly rendered when used on multiple NumericTextBoxes.


```Index.cshtml
    @(Html.Kendo().NumericTextBox<double>()
        .Name("currency")
        .Format("n4")
        .Decimals(4)
        .Value(0.0010)
        .Events(events => events.Spin("onSpin"))
        .HtmlAttributes(new {onfocus = "onFocus(event)" })
    )
```
```Script.js
    <script>
        function onSpin(e){ 
            var inputElement = this.element;
            addTrailingZeros(inputElement,this); // Pass both the input element and client-side reference of the widget to the common function.     
        }
        function onFocus(event){
            var inputElement = $(event.target);
            var numeric = $(inputElement).data("kendoNumericTextBox");
            addTrailingZeros(inputElement, numeric); // Pass both the input element and client-side reference of the widget to the common function.     
        }
        function addTrailingZeros(input, numeric) {
            // Floats Scenario
            if (input.val().split(".").length > 1
                && input.val().split(".")[1].length < numeric.options.decimals) { // Assert whether the floating input has missing zeros.
                var inputValue = input.val() + "0"; // Append the trailing zero to the input's value.
                input.val(inputValue); // Change the input's value.
            }
            // Integers Scenario
            if (input.val() && input.val().split(".").length === 1) { // Assert whether the integer input has missing zeros.
                var inputValue = input.val() + "." + Array(numeric.options.decimals + 1).join("0"); // Append the trailing zero to the input's value.
                input.val(inputValue); Change the input's value.
            }
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on keeping the trailing zeros in the NumericTextBox](https://netcorerepl.telerik.com/cxaSaSPq400vRo8o25).

## More {{ site.framework }} NumericTextBox Resources
{% if site.core %}
* [{{ site.framework }} NumericTextBox Product Page](https://www.telerik.com/aspnet-core-ui/numeric-textbox)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)
{% else %}
* [{{ site.framework }} NumericTextBox Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the NumericTextBox for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript//ui/numerictextbox)
* [Server-Side API Reference of the NumericTextBox for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/numerictextbox)
* [Telerik REPL: Keeping Trailing Zeros in the NumericTextBox](https://netcorerepl.telerik.com/cxaSaSPq400vRo8o25)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

