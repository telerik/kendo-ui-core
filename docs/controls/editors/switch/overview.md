---
title: Overview
page_title: Overview | Kendo UI Switch
description: "Display two exclusive choices with the Kendo UI Switch widget."
slug: overview_kendoui_switch_widget
position: 1
---

# Switch Overview

The [Kendo UI Switch widget](http://demos.telerik.com/kendo-ui/switch) is used to display two exclusive choices.

When initialized, it shows the currently selected value. The Switch can be created from an `input` element of type `checkbox`.

## Getting Started

### Create the Switch

To create the Switch, use an HTML `<input>` element.

###### Example

    <input id="switch" />

### Initialize the Switch

To initialize the Switch, use a jQuery selector.

###### Example

    $(document).ready(function() {
        $("#switch").kendoSwitch();
    });

## Features

### Checking and Unchecking

The checked state of the Switch depends on the [`checked` configuration option](/api/switch#checked) or the `checked` attribute of the widget element.

The example below demonstrates how to initialize the Kendo UI Switch from a checked `input`.

###### Example

    <input type="checkbox" id="switch" checked="checked" />

    <script>
        var switchInstance = $("#switch").kendoSwitch();
    </script>

The example below demonstrates how to initialize a checked Kendo UI Switch using jQuery plugin syntax.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
                checked: true
            });
    </script>

## Customization

### Label Messages

The example below demonstrates how to customize the checked/unchecked messages of a Kendo UI Switch.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
            messages: {
                checked: "YES",
                unchecked: "NO"
            }});
    </script>

### Enabled state

The example below demonstrates how to disable a Kendo UI Switch.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
                enabled: false
            });
    </script>

### Readonly state

The example below demonstrates how to show a Kendo UI Switch in readonly state.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoSwitch({
                readonly: true
            });
    </script>

## Reference

### Existing Instances

To reference an existing Switch instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the API to control its behavior.


## Keyboard Navigation

The user can focus the Switch through tabbing. The widget supports the following keyboard shortcut:

| SHORTCUT						          | DESCRIPTION				                                 |
|:---                           |:---                                                |
|`Space`                        | Toggles the checked state                          |

## See Also

Other articles on the Kendo UI Switch:

* [Overview of the ASP.NET MVC HtmlHelper Extension for the Switch Widget](/aspnet-mvc/helpers/switch/overview)
* [Overview of the Switch JSP Tag]({% slug overview_switch_uiforjsp %})
* [Overview of the Switch PHP Class](/php/widgets/switch/overview)
* [Switch JavaScript API Reference](/api/javascript/ui/switch)

