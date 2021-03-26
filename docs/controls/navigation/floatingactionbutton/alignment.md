---
title: Alignment
page_title: jQuery FloatingActionButton Documentation
description: "Learn about the alignment options of the jQuery FloatingActionButton by Kendo UI and learn how to configure the positioning of the widget."
slug: alignment_floatingactionbutton_widget
position: 2
---

# Alignment 

The Kendo UI FloatingActionButton exposes the [`align`](/api/javascript/ui/floatingactionbutton/configuration/align),[`alignOffset`](/api/javascript/ui/floatingactionbutton/configuration/alignoffset) and [`positionMode`](/api/javascript/ui/floatingactionbutton/configuration/positionmode) configuration options. These three options work together and allow you to position the FloatingActionButton component precisely as per the application requirements.


* [Alignment Demo for the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/alignment) 

## Align

The [`align`](/api/javascript/ui/floatingactionbutton/configuration/align) configuration option specifies position of the FloatingActionButton relative to its container. When using this option it is important to ensure that the FloatingActionButton container has a [CSS position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow). For available positions refer to the [FloatingActionButton `align` API section](/api/javascript/ui/floatingactionbutton/configuration/align)

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                align: "top center"
            });
        });
    </script>
```

## AlignOffset

The [`alignOffset`](/api/javascript/ui/floatingactionbutton/configuration/alignoffset) configuration option specifies the horizontal and vertical offset of the FloatingActionButton relative to the `align` configuration defined.

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                align: "bottom start",
                alignOffset: { 
                    x: 50, 
                    y: 50 
                }
            });
        });
    </script>
```

## PositonMode

The [`positionMode`](/api/javascript/ui/floatingactionbutton/configuration/positionmode) configuration option specifies the CSS position of the FloatingActionButton in the document. You can position the FloatingActionButton relative to the closest ancestor or position it relative to the viewport.

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                align: "bottom start",
                alignOffset: { 
                    x: 50, 
                    y: 50 
                },
                positionMode:"fixed" //positions the button relative to the viewport
            });
        });
    </script>
```

## See Also

* [Alignment Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/alignment)
* [JavaScript API Reference of the FloatingActionButton](/api/javascript/ui/floatingactionbutton)
