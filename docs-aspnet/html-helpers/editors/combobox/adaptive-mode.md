---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI ComboBox component for {{ site.framework }}."
slug: htmlhelpers_combobox_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} ComboBox supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "ComboBox");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="combobox"
                    adaptive-mode="AdaptiveMode.Auto"
                    datatextfield="ProductName"
                    datavaluefield="ProductID">
        <datasource>
            <transport>
                <read url="@Url.Action("Products_Read", "ComboBox")" />
            </transport>
        </datasource>
    </kendo-combobox>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/combobox)