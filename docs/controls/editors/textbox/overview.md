---
title: Overview
page_title: jQuery TextBox Documentation | TextBox Overview
description: "Get started with the jQuery TextBox by Kendo UI and learn how to create and initialize the widget."
slug: overview_kendoui_textbox_widget
position: 1
---

# TextBox Overview

The TextBox converts an `<input>` element into a styled textbox.

* [Demo page for the TextBox](https://demos.telerik.com/kendo-ui/textbox/index) 

## Basic Usage

The TextBox provides a set of [default API configuration options](/api/javascript/ui/textbox) that can be set during its initialization such as value, placeholder, and so on.

The following example demonstrates how to create a TextBox and set some of its configuration options.

```dojo
<input id="textbox">

<script>
    $(document).ready(function(){
        $("#textbox").kendoTextBox({
            value: "John Doe",
            placeholder: "Name..."
        });
    });
</script>
```

## Initializing the TextBox

Upon its initialization, the TextBox wraps the `<input>` element with a `<span>` tag.

The following example demonstrates how to initialize the TextBox.

```dojo
<input id="textbox">

<script>
    $(document).ready(function(){
        $("#textbox").kendoTextBox();
    });
</script>
```

## Events

The TextBox supports the `change` event. The `change` fires each time a new value is set by the user.

> **Important:** The `change` event is not fired when the value of the widget is changed from JavaScript code.

To handle the TextBox events, you can specify the JavaScript function which will handle the event during the initialization of the widget or use the `bind` method of the widget after its initialization.

The following example demonstrates how to subscribe to the `change` event during initialization.

```dojo
    <input id="textbox" />
    <script>
        $("#textbox").kendoTextBox({
            change: function(e) {
                var value = this.value();
                console.log(value);
            }
        });
    </script>
```

For a complete example on the basic TextBox events, refer to the [demo on using the events of the TextBox](https://demos.telerik.com/kendo-ui/textbox/events).

## Referencing Existing Instances

To reference to an existing TextBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textbox) to control its behavior.

The following example demonstrates how to access an existing TextBox instance.

```
<script>
    var tb = $("#textbox").data("kendoTextBox");
</script>
```

## See Also

* [Basic Usage of the TextBox (Demo)](https://demos.telerik.com/kendo-ui/textbox/index)
* [Using the Basic Events of the TextBox (Demo)](https://demos.telerik.com/kendo-ui/textbox/events)
* [Binding the TextBox over MVVM (Demo)](https://demos.telerik.com/kendo-ui/textbox/mvvm)
* [Using the TextBox with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/textbox/angular)
* [Applying the TextBox API (Demo)](https://demos.telerik.com/kendo-ui/textbox/api)
* [JavaScript API Reference of the TextBox](/api/javascript/ui/textbox)
