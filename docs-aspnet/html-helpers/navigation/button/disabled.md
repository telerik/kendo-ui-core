---
title: Disabled Button
page_title: Disabled Button
description: "Enable or disable the Telerik UI Button component for {{ site.framework }}."
previous_url: /helpers/navigation/button/disabled
slug: disabled_buttonhelper_aspnetmvc
position: 2
---

# Disabled Button

The business logic of an application often requires a certain button to be temporarily disabled or enabled.

You can initially configure the Button as disabled through its [`.Enable()`](/api/kendo.mvc.ui.fluent/buttonbuilder#enablesystemboolean) setting. additionally, you can enable or disable the button at any time with javascript by using its [`enable()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/methods/enable) with a Boolean argument. 

The following example demonstrates how to enable and disable the Button through the `enable` attribute.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("disabledButton")
        .Enable(false)
        .Content("Disabled button"))
```
{% if site.core %}
```TagHelper
    <kendo-button name="disabledButton" enable="false">Disabled button</kendo-button>
```
{% endif %}

To disable the Button, you can also use the [`ViewData`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-5.0#viewdata-attribute) or [`ViewBag`](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/overview?view=aspnetcore-5.0#viewbag) attributes. The example below illustrates a disabled Button through the `ViewData` attribute.


```HtmlHelper
    @(Html.Kendo().Button()
        .Name("disabledButton")
        .Enable((bool)@ViewData["IsEnabled"])
        .Content("Disabled button"))
```
{% if site.core %}
```TagHelper
    <kendo-button name="disabledButton" enable='(bool)@ViewData["IsEnabled"]'>Disabled button</kendo-button>
```
{% endif %}
```Controller
    public IActionResult Index()
    {
        ViewData["IsEnabled"] = false;
        return View();
    }
```

At runtime, you can disable the Button at with JavaScript by using its [`enable()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/button/methods/enable) with a Boolean argument.

```HtmlHelper
@(Html.Kendo().Button()
        .Name("editButton")
        .Content("Edit")
```
```TagHelper
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
```

## Referencing Existing Instances

To reference an existing Button instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Button client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button).

## See Also

* [Basic Usage of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button)
* [Using the API of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [ButtonBuilder Server-Side API](/api/kendo.mvc.ui.fluent/buttonbuilder)
* [Button Server-Side API](/api/button)
