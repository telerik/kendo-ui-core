---
title: Overview
page_title: Kendo UI for jQuery OrgChart Documentation - OrgChart Overview
description: "Get started with the Kendo UI for jQuery OrgChart and learn about its features and how to initialize the widget."
slug: overview_kendoui_orgchart_widget
position: 1
---

# {{ site.product }} OrgChart Overview

The Kendo UI OrgChart allows you to view and interact with an organizational structures. It gives the possibility to easily visualize hierarchies and is very useful in scenarios like what teams employees are part of and who they report to. 

It provides a tree-like structure where the user can edit the individual items, change the items parent, or group the nodes in the tree.

* [OrgChart demos](https://demos.telerik.com/kendo-ui/orgchart/index) 

## Initializing the OrgChart

The following example demonstrates how to initialize the OrgChart from an existing `<div>` element. 

```dojo    
    <div id="orgchart"></div>

    <script>
        var data = [
            { id: 1, name: "Gevin Bell", title: "CEO"},
            { id: 2, name: "Clevey Thrustfield", title: "COO", parentId: 1},
            { id: 3, name: "Carol Baker", title: "CFO", , parentId: 1 },
            { id: 4, name: "Kendra Howell", title: "CMO", , parentId: 1},
            { id: 5, name: "Sean Rusell", title: "Financial Manager", parentId: 3},
            { id: 6, name: "Steven North", title: "Senior Manager", , parentId: 3 },
            { id: 7, name: "Michelle Hudson", title: "Operations Manager", parentId: 2},
            { id: 8, name: "Andrew Berry", title: "Accountant", parentId: 5 }            
        ];
       
        $("#orgchart").kendoOrgChart({
            dataSource: data
        });
    </script>
```

## Functionality and Features

* [Data Binding]({% slug databinding_kendoui_orgchart_widget %})
* [Editing]({% slug editing_kendoui_orgchart_widget %})
* [Grouping]({% slug grouping_kendoui_orgchart_widget %})
* [Templates]({% slug templates_kendoui_orgchart_widget %})
* [Accessibility]({% slug accessibility_kendoui_orgchart_widget %})

## Referencing Existing Instances

To get a reference to an existing OrgChart instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [OrgChart API](/api/javascript/ui/orgchart) to control its behavior.

        var orgchart = $("#orgchart").data("kendoOrgChart");

## See Also

* [Basic Usage of the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/index)
* [Kendo UI OrgChart Data binding]({% slug databinding_kendoui_orgchart_widget %})
* [Kendo UI OrgChart Grouping]({% slug grouping_kendoui_orgchart_widget %})
* [JavaScript API Reference of the OrgChart](/api/javascript/ui/orgchart)
