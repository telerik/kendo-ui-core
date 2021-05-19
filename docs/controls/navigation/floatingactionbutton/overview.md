---
title: Overview
page_title: jQuery FloatingActionButton Documentation
description: "Get started with the jQuery FloatingActionButton by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_floatingactionbutton_widget
position: 1
---

# Overview 

The FloatingActionButton is a UI component that is tied to the most logical action that we expect from a user looking at a particular screen. For example, the most logical action for a user looking at the main screen of a mobile messaging app is to write a message. You can implement a FloatingActionButton that allows the user to compose a new message. 

The FloatingActionButton floats in the application above other items, and its main action directly corresponds to the content on the screen. Apart from being a single button with a single action, the FloatingActionButton can also be configured to display additional related actions or speed dial actions.

* [Demo page for the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/index) 

## Initializing the FloatingActionButton

The following example demonstrates how to initialize the FloatingActionButton.

```dojo
    <div id="fab"></div>

    <script>
        $(document).ready(function () {
            $("#fab").kendoFloatingActionButton({
                align: "bottom end",
                alignOffset:{
                    x: 50,
                    y: 50
                },
                positionMode: "absolute",
                themeColor: "primary",
                icon: "share",
                size: "medium",
                items: [{
                    label: "Download"
                    icon: "download",
                    click: function () { console.log("download action"); }
                }, {
                    label: "Print",
                    icon: "print",
                    click: function () { console.log("print action"); },
                }, {
                    label: "Email",
                    icon: "email",
                    click: function () { console.log("email action"); }
                }]
            });
        });
    </script>
```

## Functionality and Features

* [Alignment]({% slug alignment_floatingactionbutton_widget %})
* [Appearance]({% slug appearance_floatingactionbutton_widget %})
* [Templates]({% slug templates_floatingactionbutton_widget %})
* [Accessibility]({% slug accessibility_kendoui_floatingactionbutton_widget %})

## See Also

* [Overview of the FloatingActionButton](https://demos.telerik.com/kendo-ui/floatingactionbutton/index)
* [JavaScript API Reference of the FloatingActionButton](/api/javascript/ui/floatingactionbutton)
