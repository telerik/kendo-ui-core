---
title: Style
page_title: Style | Kendo UI MVVM
description: "Learn how to set the style attributes of the target DOM element by using the style binding in Kendo UI MVVM."
slug: stylebinding_mvvm_kendoui
---

# Style Binding

The `style` binding sets the style (CSS) attributes of the target DOM element.

The example below demonstrates how to use the `style` binding.

###### Example

    <span data-bind="style: {color: priceColor, fontWeight: priceFontWeight},
                 text: price"></span>

    <script>
    var viewModel = kendo.observable({
        price: 42,
        priceColor: function() {
            var price = this.get("price");

            if (price <= 42) {
                return "#00ff00";
            } else {
                return "#ff0000";
            }
        },
        priceFontWeight: function() {
            var price = this.get("price");

            if (price <= 42) {
                return "bold";
            } else {
                return ""; //will reset the font weight to its default value
            }
        }
    });

    kendo.bind($("span"), viewModel);
    </script>

This example results in the output below.

###### Example

    <span style="color: #00ff00; font-weight: bold">42</span>

## Common Scenarios

### Use Style Attributes Containing Dashes

If the `style` attribute contains a dash, such as `font-weight, font-size, background-color etc`) you should omit the dash and capitalize the
next letter (`fontWeight, fontSize, backgroundColor`).

### Reset Style Attributes to Their Original Value

To reset the value of a style attribute set it to empty string: `""`.

## See Also

Other articles on the Kendo UI MVVM component and bindings:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [Overview of the Attribute Binding]({% slug attributebinding_mvvm_kendoui %})
* [Overview of the Checked Binding]({% slug checkedbinding_mvvm_kendoui %})
* [Overview of the Click Binding]({% slug clickbinding_mvvm_kendoui %})
* [Overview of the CSS Binding]({% slug cssbinding_mvvm_kendoui %})
* [Overview of the Custom Binding]({% slug custombinding_mvvm_kendoui %})
* [Overview of the Disabled Binding]({% slug disabledbinding_mvvm_kendoui %})
* [Overview of the Enabled Binding]({% slug enabledbinding_mvvm_kendoui %})
* [Overview of the Events Binding]({% slug eventsbinding_mvvm_kendoui %})
* [Overview of the HTML Binding]({% slug htmlbinding_mvvm_kendoui %})
* [Overview of the Invisible Binding]({% slug invisiblebinding_mvvm_kendoui %})
* [Overview of the Source Binding]({% slug sourceblebinding_mvvm_kendoui %})
* [Overview of the Text Binding]({% slug textbinding_mvvm_kendoui %})
* [Overview of the Value Binding]({% slug valuebinding_mvvm_kendoui %})
* [Overview of the Visible Binding]({% slug visiblebinding_mvvm_kendoui %})
