---
title: Appearance
page_title: jQuery FloatingActionButton Documentation
description: "Learn how to customize the jQuery FloatingActionButton by Kendo UI by setting its size, shape, color, icon and text."
slug: appearance_floatingactionbutton_widget
position: 3
---

# Appearance 

The Kendo UI FloatingActionButton allows you to customize the appearance of the component by setting its size, shape, color, icon and text.

## Best Practices

The Material Design guidelines dictate that:

* When you configure the FloatingActionButton to display additional related actions (speed dial actions), you should configure only an icon for the button, without a label. Use labels to display additional information for the related actions.

* If the application requires an icon and a label for the Kendo UI FloatingActionButton, consider omitting the additional actions.

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                icon:"plus",
                text: "Add To Cart"
            });
        });
    </script>
```

## Icons

The [`icon`](/api/javascript/ui/floatingactionbutton/configuration/icon) configuration option specifies the name of an icon. The selected icon must be available in the Kendo UI theme that is rendered by the FloatingActionButton. For more details on the available Web Font icons see [`the Web Font Icons article`](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

```
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                icon:"plus",
                items:[
                    {icon:"star",label:"Add Rating"},
                    {icon:"edit", label:"Add Comment"}
                ]
            });
        });
    </script>
```

## See Also

* [Basic Usage Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/basic-usage)
* [API Demo of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/api)
* [JavaScript API Reference of the FloatingActionButton](/api/javascript/ui/floatingactionbutton)
