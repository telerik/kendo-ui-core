---
title: Overview
page_title: Overview | Kendo UI ColorPicker
description: "Learn how to initialize the Kendo UI ColorPicker widget and configure its options."
slug: overview_kendoui_colorpicker_widget
position: 1
---

# ColorPicker Overview

The [Kendo UI ColorPicker widget](http://demos.telerik.com/kendo-ui/colorpicker/index) is a drop-down widget for selecting colors. It is designed to replace the HTML5 `<input type="color">` tag, which is not widely supported in browsers.

## Getting Started

### Initialize the ColorPicker

Initialize the ColorPicker by using a jQuery ID selector:

    <input type="color" id="myColorField" />

    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker();
        });
    </script>

The original `input` element is kept in the DOM. The `value` attribute element gets updated as the user selects a color. This allows the sumbmission of forms with ColorPicker widgets.

## Configuration

The default pop-up contains an HSV (hue, saturation, value) selector and looks like this:

![HSV picker](/controls/editors/colorpicker/hsv-dropdown.png)

### Simple Color Picker

Create a simple color picker in the following way:

    <input type="color" id="myColorField" />

    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({ palette: "basic" });
        });
    </script>

This renders a basic ColorPicker that contains 20 colors:

![Simple picker with basic palette](/controls/editors/colorpicker/simple-basic.png)

### Web-Safe Color Palette

Create the Web-safe color palette in the following way:

    <input type="color" id="myColorField" />

    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({ palette: "websafe" });
        });
    </script>

This renders the 216-color "web-safe" palette that looks like this:

![Simple picker with web-safe palette](/controls/editors/colorpicker/simple-web.png)

### Custom Colors

Get the simple color picker to display a custom list of colors by passing them in the `palette` argument.

###### Example

    <input type="color" id="myColorField" />

    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({
                palette: "#fff,#000,#f00"
            });
        });
    </script>

This shows only white, black and red. Use any color in either short (3 digits) or long (6 digits) hex notation. The `#` sign can be omitted.

### More Options

For more options please see the [API page](../../api/javascript/color).

## See Also

Other articles on Kendo UI ColorPicker:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ColorPicker Widget](/aspnet-mvc/helpers/colorpicker/overview)
* [Overview of the ColorPicker JSP Tag]({% slug overview_colorpicker_uiforjsp %})
* [Overview of the ColorPicker PHP Class](/php/widgets/colorpicker/overview)
* [ColorPicker JavaScript API Reference](/api/javascript/ui/colorpicker)

Articles on Kendo UI ColorPalette:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the ColorPalette Widget](/aspnet-mvc/helpers/colorpalette/overview)
* [Overview of the ColorPalette JSP Tag]({% slug overview_colorpalette_uiforjsp %})
* [Overview of the ColorPalette PHP Class](/php/widgets/colorpalette/overview)
* [ColorPalette JavaScript API Reference](/api/javascript/ui/colorpalette)
