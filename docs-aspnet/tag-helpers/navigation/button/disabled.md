---
title: Disabled Button
page_title: Disabled Button
description: "Enable or disable the Telerik UI Button TagHelper for {{ site.framework }}."
slug: taghelpers_button_disabled
position: 2
---

# Disabled Button

The business logic of an application often requires a certain button to be temporarily disabled or enabled.

By default, the Button is enabled, but you can disable it by any of the following methods:

* Set the `enable` attribute to "false".


```tagHelper

<kendo-button name="disabledButton" enable="false">Disabled button</kendo-button>

```
```cshtml

        @(Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button"))

````

* Use either [`ViewData`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-5.0#viewdata-attribute) or [`ViewBag`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-5.0#viewbag) attributes. The example below illustrates a disabled Button through the `ViewData` attribute.


```View

<kendo-button name="disabledButton" enable='(bool)@ViewData["IsEnabled"]'>Disabled button</kendo-button>

```
```Controller

        public IActionResult Index()
        {
            ViewData["IsEnabled"] = false;
            return View();
        }

````


* Disable the Button at runtime with JavaScript by using its [`enable()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/methods/enable) with a Boolean argument.


```tagHelper

<kendo-button name="editButton">Edit</kendo-button>

```
```JavaScript

<script>
    var isAdmin = false;
    var buttonWidget = $("#editButton").data("kendoButton"); // Use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option to get an instance of the Button TagHelper
    if(!isAdmin) {
        buttonWidget.enable(false); // disable the button
    } else {
        buttonWidget.enable(true);  // enable the button
    }
</script>

````

## See Also

* [Basic Usage of the Button TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/tag-helper)
* [Button Server-Side API](/api/button)
* [Button Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
