---
title: Adaptive Mode
page_title: Adaptive Mode
description: "Learn how to configure adaptive mode of the the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_adaptive_mode_aspnetcore
position: 5
---

# Adaptive Mode

The Telerik UI for {{ site.framework }} DropDownTree supports an adaptive mode that provides a mobile-friendly rendering of its popup. Which will accommodate its content based on the current screen size.

To set the adaptive mode, use the `AdaptiveMode()` option.

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .DataTextField("Name")
        .DataValueField("id")
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Read_DropDownTreeData", "Home")
            )
        )
    )
```
{% if site.core %}
```TagHelper
  <kendo-dropdowntree name="dropdowntree" 
                      datatextfield="Name" 
                      datavaluefield="id" 
                      adaptive-mode="AdaptiveMode.Auto">
    <hierarchical-datasource>
        <schema>
            <hierarchical-model id="id"></hierarchical-model>
        </schema>
        <transport>
            <read url="@Url.Action("Remote_DropDownTreeData", "Home")" />
        </transport>
    </hierarchical-datasource>
  </kendo-dropdowntree>
```
{% endif %}

## See Also

* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/dropdowntree)