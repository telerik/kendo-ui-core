---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI MultiSelect component for {{ site.framework }}."
slug: htmlhelpers_multiselect_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} MultiSelect supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiSelect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home");
            })
            .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="multiSelect"
                       adaptive-mode="AdaptiveMode.Auto"
                       datatextfield="ProductName"
                       datavaluefield="ProductID">
       <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
           <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
           </transport>
       </datasource>
    </kendo-multiselect>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/multiselect)