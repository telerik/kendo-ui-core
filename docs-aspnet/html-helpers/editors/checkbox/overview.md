---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI CheckBox HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_checkbox_aspnetcore_overview
position: 1
---

# CheckBox HtmlHelper Overview

The Telerik UI CheckBox HtmlHelper for {{ site.framework }} is based on the convential HTML checkbox element. It allows you to add more customizable checkboxes to your application.

## Initializing the CheckBox

The following example demonstrates how to define the CheckBox by using the CheckBox HtmlHelper.

```Razor
    @(Html.Kendo().CheckBox()
        .Name("eq1")    
        .Checked(true)
        .Label("My Telerik Checkbox")
    )
```

## Two-way Binding

To use the Telerik UI Checkbox as an editor for a field in your C# Model declare it with the CheckboxFor HtmlHelper:

```Razor
    @(Html.Kendo().CheckBoxFor(m=>m.BooleanFieldName)
        .Label("Editable Checkbox"))
    )
```

## See Also

* [Basic Usage of the CheckBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/checkbox/index)
* [Server-Side API](/api/checkbox)
