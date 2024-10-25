---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI AutoComplete component for {{ site.framework }}."
slug: htmlhelpers_autocomplete_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} AutoComplete supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
     @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Filter("contains")
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "AutoComplete");
            })
            .ServerFiltering(true);
        })
    )

```
{% if site.core %}
```TagHelper
    <kendo-autocomplete name="products" 
                        filter="FilterType.Contains"
                        datatextfield="ProductName"
                        adaptive-mode="AdaptiveMode.Auto"
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "AutoComplete")" />
            </transport>
        </datasource>
    </kendo-autocomplete>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/autocomplete)