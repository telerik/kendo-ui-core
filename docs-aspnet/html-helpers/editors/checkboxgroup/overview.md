---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI CheckBoxGroup HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_checkboxgroup_aspnetcore_overview
position: 1
---

# CheckBoxGroup HtmlHelper Overview

The Telerik UI CheckBoxGroup HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI CheckBoxGroup widget.

The CheckBoxGroup allows to style and provide checkbox functionality to list elements, set the position of the labels, attributes and custom css classes.

* [Demo page for the CheckBoxGroup](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/index)

## Initializing the CheckBoxGroup

The following example demonstrates how to define the CheckBoxGroup by using the CheckBoxGroup HtmlHelper.

```Razor
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the CheckBoxGroup HtmlHelper.

```Razor
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("Spain").Value("1");
            i.Add().Label("Italy").Value("2");
            i.Add().Label("UK").Value("3");
        })
        .Value(new string[] { "1" })
    )
    <script>
    $(function() {
        // The Name() of the CheckBoxGroup is used to get its client-side instance.
        var checkboxgroup = $("#checkboxgroup").data("kendoCheckBoxGroup");
    });
    </script>
```

## Functionality and Features

* [Binding]({% slug htmlhelpers_checkboxgroup_binding_aspnetcore %})
* [Label]({% slug htmlhelpers_checkboxgroup_aspnetcore_label %})
* [Layout]({% slug htmlhelpers_checkboxgroup_aspnetcore_layout %})

## See Also

* [Basic Usage of the CheckBoxGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/index)
* [Using the API of the CheckBoxGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkboxgroup/api)
* [Server-Side API](/api/checkboxgroup)
