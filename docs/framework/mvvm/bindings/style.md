---
title: Style
page_title: Style binding in Kendo UI MVVM | Kendo UI Documentation
description: How to set the style attributes of the target DOM element by using the style binding in Kendo UI MVVM.
---

# Style binding

The `style` binding sets the style (CSS) attributes of the target DOM element.

## Using the style binding

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

The output will be:

    <span style="color: #00ff00; font-weight: bold">42</span>


## Using style attributes which contain a dash

If the style attribute contains a dash (`font-weight, font-size, background-color etc`) you should omit the dash and capitalize the
next letter (`fontWeight, fontSize, backgroundColor`).

## Resetting style attributes to their original value

To reset the value of a style attribute set it to empty string: `""`.
