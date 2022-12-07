---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI RadioGroup HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_radiogroup_aspnetcore_overview
position: 1
---

# {{ site.framework }} RadioGroup Overview

{% if site.core %}
The Telerik UI RadioGroup TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI RadioGroup widget.
{% else %}
The Telerik UI RadioGroup HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI RadioGroup widget.
{% endif %}

The RadioGroup allows to check and uncheck radio buttons, set the position of the labels, attributes and custom css classes.

* [Demo page for the RadioGroup HtmlHelper](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)
{% if site.core %}
* [Demo page for the RadioGroup TagHelper](https://demos.telerik.com/aspnet-core/radiogroup/tag-helper)
{% endif %}

## Initializing the RadioGroup

The following example demonstrates how to define the RadioGroup.

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
    )
```
{% if site.core %}
```TagHelper
     <kendo-radiogroup name="radiogroup"
                       radio-name="radiogroup">
    </kendo-radiogroup>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the RadioGroup.

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
        .Items(i =>
        {
            i.Add().Label("Spain").Value("1");
            i.Add().Label("Italy").Value("2");
            i.Add().Label("UK").Value("3");
        })
        .Value("1")
    )
    <script>
    $(function() {
        // The Name() of the RadioGroup is used to get its client-side instance.
        var radiogroup = $("#radiogroup").data("kendoRadioGroup");
    });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-radiogroup name="radiogroup"
                      radio-name="radiogroup"
                      value="1">
        <kendo-radiogroup-items>
            <kendo-radiogroup-item label="Spain" value="1"></kendo-radiogroup-item>
            <kendo-radiogroup-item label="Italy" value="2"></kendo-radiogroup-item>
            <kendo-radiogroup-item label="UK" value="3"></kendo-radiogroup-item>
        </kendo-radiogroup-items>
    </kendo-radiogroup>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_radiogroup_binding_aspnetcore %})
* [Label]({% slug htmlhelpers_radiogroup_aspnetcore_label %})
* [Layout]({% slug htmlhelpers_radiogroup_aspnetcore_layout %})

## See Also

* [Basic Usage of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)
{% if site.core %}
* [Basic Usage of the RadioGroup TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/aspnet-core/radiogroup/tag-helper)
{% endif %}
* [Using the API of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/api)
* [Server-Side API](/api/radiogroup)
