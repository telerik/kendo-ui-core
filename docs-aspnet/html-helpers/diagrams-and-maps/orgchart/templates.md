---
title: Templates
page_title: Templates
description: "Use templates and customize the rendering of the nodes of the Telerik UI OrgChart component for {{ site.framework }}."
slug: htmlhelpers_orgchart_templates_aspnetcore
position: 3
---

# Templates

The OrgChart provides full control over the rendering of the nodes and group headers by using Kendo UI templates.

The OrgChart supports node and group header templates.

## Node Template

The node template controls the rendering of the OrgChart nodes.

The following example demonstrates how to define a node template and how to evaluate it against the data item.

```HtmlHelper
    .Template("<div class='custom'>" +
                "<div><img src=' #: Avatar #'/></div>" +
                "<span>Name: <strong> #: Name # </strong></span>" +
                "<div><i> Position: #: Title # </i></div>" +
                "</div>")
```

## Group Header Template

The group header controls the rendering of the group headers in the OrgChart.

The following example demonstrates how to define a group header. The group field and its value are available in the template.

```HtmlHelper
    .GroupHeaderTemplate("<i> #: field #</i>:<strong>#: value # </strong>")
```

## See Also

* [Customizing Templates in the OrgChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/templates)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)
