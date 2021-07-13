---
title: Disabled Button
page_title: Disabled Button
description: "Enable or disable the Telerik UI Button HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/button/disabled
slug: disabled_buttonhelper_aspnetmvc
position: 2
---

# Disabled Button

The business logic of an application often requires a certain button to be temporarily disabled or enabled.

You can initially configure the Button as disabled either through its `.Enable()` setting. The Button can also be disabled or enabled at any time with JavaScript by using its [`enable()` method](/api/Kendo.Mvc.UI.Fluent/ButtonBuilder#enablesystemboolean) with a Boolean argument. 

The following example demonstrates how to enable and disable the Button.

```Razor

        @(Html.Kendo().Button()
            .Name("disabledButton")
            .Enable(false)
            .Content("Disabled button"))
```

## Referencing Existing Instances

To reference an existing Button instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Button client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/button).

## See Also

* [Basic Usage of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button)
* [Using the API of the Button HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/button/api)
* [ButtonBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ButtonBuilder)
* [Button Server-Side API](/api/button)
