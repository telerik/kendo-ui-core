---
title: Overview
---

# ColorPicker Overview

The ColorPicker is a drop-down widget for selecting colors.  It is
designed to replace the HTML5 `<input type="color">` tag, which is not
widely supported in browsers.

## Getting Started

### Initialize the ColorPicker via a jQuery ID selector
    
    <input type="color" id="myColorField" />
    
    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker();
        });
    </script>

The original `INPUT` element is kept in the DOM. The element `value`
attribute gets updated as the user selects a color. This allows forms with ColorPicker widgets to be submitted.

## Configuration

The default pop-up will contain a HSV (hue /
saturation / value) selector and looks like this:

![HSV picker](/web/colorpicker/hsv-dropdown.png)

### Get a simple color picker
    
    <input type="color" id="myColorField" />
    
    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({ palette: "basic" });
        });
    </script>

This renders a basic ColorPicker that contains 20 colors:

![Simple picker with basic palette](/web/colorpicker/simple-basic.png)

### Get the "web-safe" color palette
    <input type="color" id="myColorField" />
    
    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({ palette: "websafe" });
        });
    </script>

This renders the 216 colors "web-safe" palette that looks
like this:

![Simple picker with web-safe palette](/web/colorpicker/simple-web.png)

### Use custom colors for the basic palette picker

You can get the simple picker to display a custom list of colors,
by just passing them in the `palette` argument, for example:
    
    <input type="color" id="myColorField" />
    
    <script>
        $(document).ready(function(){
            $("#myColorField").kendoColorPicker({
                palette: "#fff,#000,#f00"
            });
        });
    </script>

This shows only white, black and red.  You can use any color in either short (3 digits) or long (6
digits) hex notation.  The `#` sign can be omitted.

### More options

For more options please see the [API page](../../api/javascript/color).
