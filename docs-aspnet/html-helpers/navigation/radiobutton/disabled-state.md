---
title: Disabled RadioButton
page_title: Disabled RadioButton
description: "Enable or disable the Telerik UI RadioButton for {{ site.framework }}."
previous_url: /helpers/navigation/radiobutton/disabled-state
slug: disabledstate_radiobutton_aspnetcore
position: 4
---

# Disabled RadioButton

The business logic of an application often requires a certain radio button to be temporarily enabled or disabled.

The RadioButton can be configured to be initially disabled through its `.Enable()` setting. The widget can also be enabled or disabled at any time by using jQuery.

The following example demonstrates how to use the `.Enable()` configuration option.

```HtmlHelper
    @(Html.Kendo().RadioButton()
        .Name("disabledRadioButton")
        .Enable(false)
        .Label("Disabled radio button")
        .Checked(false))
```
{% if site.core %}
```TagHelper
    <kendo-radiobutton name="disabledRadioButton" label="Disabled radio button" enabled="false" checked="false">
    </kendo-radiobutton>
```
{% endif %}

## See Also

* [RadioButton Server-Side API](/api/radiobutton)
* [RadioButtonBuilder Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/radiobuttonbuilder)
