---
title: Templates
page_title: jQuery OrgChart Documentation - Templates
description: "Get started with the jQuery OrgChart by Kendo UI and implement its node and groupHeader templates."
slug: templates_kendoui_orgchart_widget
position: 4
---

# Templates

The OrgChart uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way nodes are rendered.

For more information on the capabilities and syntax of the templates, refer to this [documentation article]({% slug overview_kendoui_templatescomponent %}). For a runnable example, refer to the [demo on customizing the templates in the OrgChart](https://demos.telerik.com/kendo-ui/orgchart/templates).

## Template

You can define a [`template`](/api/javascript/ui/orgchart/configuration/template) to customize the node appearance.

```dojo
    <div id="orgchart"></div>

    <script>     
        $("#orgchart").kendoOrgChart({
            template:  "<div>Name: <strong> #: name # </strong> - Position: <strong> #: title # </strong></div>",   
			dataSource: [
				{ id: 1, name: "Jane", title: "Manager"},
				{ id: 2, name: "John", title: "Lead", parentId: 1 },
				{ id: 3, name: "Jill", title: "Worker", parentId: 2 },
				{ id: 4, name: "James", title: "Worker", parentId: 2 },
			]
        });
    </script>
```

## Group Header Template

The `groupHeaderTemplate` manages the way the labels in a grouped OrgChart are displayed.

```dojo
     <div id="orgchart"></div>

    <script>     
        $("#orgchart").kendoOrgChart({            
            groupField: "title",  
			groupHeaderTemplate: "<i> #: field #</i>:<strong>#: value # </strong>",			
			dataSource: [
				{ id: 1, name: "Jane", title: "Manager"},
				{ id: 2, name: "John", title: "Lead", parentId: 1 },
				{ id: 3, name: "Jill", title: "Worker", parentId: 2 },
				{ id: 4, name: "James", title: "Worker", parentId: 2 },
			]
        });
    </script>
```

## See Also

* [Using Templates in the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/templates)
* [JavaScript API Reference of the OrgChart](/api/javascript/ui/orgchart)
