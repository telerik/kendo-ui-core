---
title: Views
page_title: Views
description: "Review the available views in the FlatColorPicker."
slug: htmlhelpers_views_flatcolorpickerhelper_aspnetcore
position: 2
---

# FlatColorPicker Views

The FlatColorPicker is a component with a new and modern design. One of the available features is the [views](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker/configuration/views) configuration. It allows you to choose between a `gradient` and a `palette` view. You can also choose which the default view would be through the [view](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker/configuration/view) option.

```HtmlHelper
@(Html.Kendo().FlatColorPicker()
      .Name("tail")
      .Value("#000")
      .Events(ev => ev.Change("select"))
      .Preview(false)
      .View("palette")
      .Views(new string[] {"gradient", "palette"})
      .HtmlAttributes(new { @class = "picker" })
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

@{
    string[] views = new string[] { "gradient", "palette" };
}

<kendo-flatcolorpicker name="tail" value="#000" on-change="select" preview="false" class="picker"
 view="palette" views="views">
</kendo-flatcolorpicker>
```
{% endif %}

## See Also

* [Views of the FlatColorPicker (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/views)
* [JavaScript API Reference of the FlatColorPicker](/api/javascript/ui/flatcolorpicker)
