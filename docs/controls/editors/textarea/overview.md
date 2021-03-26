---
title: Overview
page_title: jQuery TextArea Documentation | TextArea Overview
description: "Get started with the jQuery TextArea by Kendo UI and learn how to create and initialize the widget."
slug: overview_kendoui_textarea_widget
position: 1
---

# TextArea Overview

The TextArea converts a `<textarea>` element into a styled textarea.

* [Demo page for the TextArea](https://demos.telerik.com/kendo-ui/textarea/index) 

## Basic Usage

The TextArea provides a set of [default API configuration options](/api/javascript/ui/textarea) that can be set during its initialization such as value, placeholder, and so on.

The following example demonstrates how to create a TextArea and set some of its configuration options.

```dojo
<textarea id="description" style="width: 100%;"></textarea>

<script>
    $(document).ready(function(){
        $("#description").kendoTextArea({
            value: "A library of 70+ UI widgets, an abundance of data-visualization gadgets, client-side data source, and a built-in MVVM (Model-View-ViewModel) library",
            placeholder: "Description...",
            rows:5
        });
    });
</script>
```

## Initializing the TextArea

During initialization, the TextArea wraps the `<textarea>` element with a `<span>` tag.

The following example demonstrates how to initialize the TextArea.

```dojo
<textarea id="description" style="width: 100%;"></textarea>

<script>
    $(document).ready(function(){
        $("#description").kendoTextArea();
    });
</script>
```

## Events

The TextArea supports the [`change`](/api/javascript/ui/textarea/events/change) event. The `change` fires each time a new value is set by the user.

> **Important:** The [`change`](/api/javascript/ui/textarea/events/change) event is not fired when the value of the widget is changed from JavaScript code.

To handle the TextArea events, you can specify the JavaScript function which will handle the event during the initialization of the widget or use the `bind` method of the widget after its initialization.

The following example demonstrates how to subscribe to the `change` event during initialization.

```dojo
    <textarea id="description" style="width: 100%;"></textarea>
    <script>
        $("#description").kendoTextArea({
            change: function(e) {
                var value = this.value();
                console.log(value);
            }
        });
    </script>
```

Here is a [demo on using some of the TextArea events](https://demos.telerik.com/kendo-ui/textarea/events).

## Referencing Existing Instances

To reference to an existing TextArea instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textarea) to control its behavior.

The following example demonstrates how to access an existing TextArea instance.

```
<script>
    var tb = $("#description").data("kendoTextArea");
</script>
```

## Functionality and Features

* [Labels]({% slug labels_textarea %})

## See Also

* [Basic Usage of the TextArea (Demo)](https://demos.telerik.com/kendo-ui/textarea/index)
* [Using the Basic Events of the TextArea (Demo)](https://demos.telerik.com/kendo-ui/textarea/events)
* [Binding the TextArea over MVVM (Demo)](https://demos.telerik.com/kendo-ui/textarea/mvvm)
* [Using the TextArea with AngularJS Directives (Demo)](https://demos.telerik.com/kendo-ui/textarea/angular)
* [Applying the TextArea API (Demo)](https://demos.telerik.com/kendo-ui/textarea/api)
* [JavaScript API Reference of the TextArea](/api/javascript/ui/textarea)
