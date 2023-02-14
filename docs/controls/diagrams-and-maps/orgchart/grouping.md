---
title: Grouping
page_title: jQuery OrgChart Documentation - Grouping
description: "Get started with the jQuery OrgChart by Kendo UI and learn how to configure its grouping functionality."
slug: grouping_kendoui_orgchart_widget
position: 5
---

# Grouping

The grouping functionality allows you to display the nodes in the OrgChart grouped by a pecified field. Grouping will be possible only for items that have the same parent item, or have no parent item (root-level items).

## Getting Started

To enable grouping, use the remote `groupField` configuration to specify the field by which the nodes will be grouped. 

```dojo

<div id="orgchart"></div>    

<script>
    var data = [
        { id: 1, name: "Gevin Bell", position: "CEO"},
        { id: 2, name: "Clevey Thrustfield", position: "CEO"},
        { id: 3, name: "Carol Baker", position: "CMO", parentId: 1},
        { id: 4, name: "Kendra Howell", position: "CMO", parentId: 1},
        { id: 5, name: "Sean Rusell", position: "Financial Manager", parentId: 2 },
        { id: 6, name: "Andrew Berry", position: "Team Lead", parentId: 3 },
        { id: 7, name: "Jake Miller", position: "Junior Accountant", parentId: 3 },
        { id: 8, name: "Austin Piper", position: "Accountant", parentId: 5 },
        { id: 9, name: "Dilyana Newman", position: "Accountant", parentId: 5 },
        { id: 10, name: "Eva Andrews", position: "Operations Manager", parentId: 4 }
    ];
    $("#orgchart").kendoOrgChart({            
        groupField: "position",
        dataSource: data            
    });
</script>
```

## Customizing the Group Header Template

To customize the label that is rendered for each group, use the [`groupHeaderTemplate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart/configuration/groupHeaderTemplate) configuration. 

The following example demonstrates how to define a custom `groupHeaderTemplate`.

```dojo
<div id="orgchart"></div>    

<script>
    var data = [
        { id: 1, name: "Gevin Bell", position: "CEO"},
        { id: 2, name: "Clevey Thrustfield", position: "CEO"},
        { id: 3, name: "Carol Baker", position: "CMO", parentId: 1},
        { id: 4, name: "Kendra Howell", position: "CMO", parentId: 1},
        { id: 5, name: "Sean Rusell", position: "Financial Manager", parentId: 2 },
        { id: 6, name: "Andrew Berry", position: "Team Lead", parentId: 3 },
        { id: 7, name: "Jake Miller", position: "Junior Accountant", parentId: 3 },
        { id: 8, name: "Austin Piper", position: "Accountant", parentId: 5 },
        { id: 9, name: "Dilyana Newman", position: "Accountant", parentId: 5 },
        { id: 10, name: "Eva Andrews", position: "Operations Manager", parentId: 4 }
    ];
    $("#orgchart").kendoOrgChart({            
        groupField: "position",
		groupHeaderTemplate: "<i> #: field #</i>: <strong>#: value # </strong>",
        dataSource: data            
    });
</script>
```

## See Also

* [Grouping in the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/grouping)
* [Group by Parent in the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/grouping-by-parent)
* [JavaScript API Reference of the OrgChart](/api/javascript/ui/orgchart)
