---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI CheckBox component for {{ site.framework }}."
slug: htmlhelpers_checkbox_aspnetcore_overview
position: 0
---

# {{ site.framework }} CheckBox Overview

{% if site.core %}
The Telerik UI CheckBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI CheckBox widget.
{% else %}
The Telerik UI CheckBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DataSource widget.
{% endif %}

The Telerik UI CheckBox for {{ site.framework }} is based on the conventional HTML checkbox element. It allows you to add more customizable checkboxes to your application.

## Initializing the CheckBox

The following example demonstrates how to define the CheckBox.

```HtmlHelper
    @(Html.Kendo().CheckBox()
        .Name("eq1")    
        .Checked(true)
        .Label("My Telerik Checkbox")
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkbox name="eq1"
                checked="true"
                label="My Telerik Checkbox">
    </kendo-checkbox>
```
{% endif %}

## Functionality and Features

* [Appearance]({% slug checkbox_appearance %})&mdash;The CheckBox enables you to customize its appearance based on your requirements.
* [Events]({% slug events_checkbox %})&mdash;The CheckBox allows you to handle its events and implement custom functionality.

>tip To learn more about the appearance, anatomy, and accessibility of the CheckBox, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/checkbox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Two-way Binding

To use the Telerik UI Checkbox as an editor for a field in your C# Model, declare by using the CheckboxFor helper:

```HtmlHelper
    @(Html.Kendo().CheckBoxFor(m=>m.BooleanFieldName)
        .Label("Editable Checkbox"))
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkbox name="BooleanFieldName"
                label="Editable Checkbox">
    </kendo-checkbox>
```
{% endif %}

## Next Steps

* [Getting Started with the CheckBox]({% slug aspnetcore_checkbox_getting_started %})
* [Basic Usage of the CheckBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/)

## See Also

* [Basic Usage of the CheckBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/index)
* [Server-Side API](/api/checkbox)
