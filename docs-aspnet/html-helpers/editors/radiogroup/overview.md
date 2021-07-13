---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI RadioGroup HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_radiogroup_aspnetcore_overview
position: 1
---

# RadioGroup HtmlHelper Overview

The Telerik UI RadioGroup HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI RadioGroup widget.

The RadioGroup allows to check and uncheck radio buttons, set the position of the labels, attributes and custom css classes.

* [Demo page for the RadioGroup](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)

## Initializing the RadioGroup

The following example demonstrates how to define the RadioGroup by using the RadioGroup HtmlHelper.

```Razor
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the RadioGroup HtmlHelper.

```Razor
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

## Functionality and Features

* [Binding]({% slug htmlhelpers_radiogroup_binding_aspnetcore %})
* [Label]({% slug htmlhelpers_radiogroup_aspnetcore_label %})
* [Layout]({% slug htmlhelpers_radiogroup_aspnetcore_layout %})

## See Also

* [Basic Usage of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/index)
* [Using the API of the RadioGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiogroup/api)
* [Server-Side API](/api/radiogroup)
