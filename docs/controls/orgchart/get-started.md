---
title: Getting Started
page_title: jQuery OrgChart Documentation - Getting Started with the OrgChart
description: "Get started with the jQuery OrgChart by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_orgchart_component
position: 1
---

# Getting Started with the OrgChart 

This guide demonstrates how to get up and running with the Kendo UI for jQuery OrgChart .

After the completion of this guide, you will achieve the following end result:

```dojo
   <div id="orgchart"></div>

    <script>
      $(document).ready(function() {
         var data = [
            { id: 1, name: "Gevin Bell", title: "CEO"},
            { id: 2, name: "Clevey Thrustfield", title: "COO", parentId: 1},
            { id: 3, name: "Carol Baker", title: "CFO", parentId: 1 },
            { id: 4, name: "Kendra Howell", title: "CMO", parentId: 7},
            { id: 5, name: "Sean Rusell", title: "Financial Manager", parentId: 3},
            { id: 6, name: "Steven North", title: "Accountant", parentId: 5 },
            { id: 7, name: "Michelle Hudson", title: "Operations Manager", parentId: 2},
            { id: 8, name: "Andrew Berry", title: "Accountant", parentId: 5 }            
        ];
       
        $("#orgchart").kendoOrgChart({
            dataSource: data,
          	cardsColors: ["lime", "violet", "red", "yellow"]
        });
      });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component. 

```html
    <div id="orgchart"></div>
```

## 2. Initialize the OrgChart

In this step, you will initialize the OrgChart from the `<div>` element.

```dojo
    <div id="orgchart"></div>

    <script>
    $(document).ready(function() {
        $("#orgchart").kendoOrgChart();
    </script>
```

## 3. Specify the Data Source

Here, you will specify a [`dataSource`](/api/javascript/ui/orgchart/configuration/datasource) instance.

```dojo
    <div id="orgchart"></div>

    <script>
        $(document).ready(function() {
          var data = [
            { id: 1, name: "Gevin Bell", title: "CEO"},
            { id: 2, name: "Clevey Thrustfield", title: "COO", parentId: 1},
            { id: 3, name: "Carol Baker", title: "CFO", parentId: 1 },
            { id: 4, name: "Kendra Howell", title: "CMO", parentId: 7},
            { id: 5, name: "Sean Rusell", title: "Financial Manager", parentId: 3},
            { id: 6, name: "Steven North", title: "Accountant", parentId: 5 },
            { id: 7, name: "Michelle Hudson", title: "Operations Manager", parentId: 2},
            { id: 8, name: "Andrew Berry", title: "Accountant", parentId: 5 }            
          ];
       
          $("#orgchart").kendoOrgChart({
              dataSource: data
          });
        });
    </script>
```

## 4. Configure the Colors of the Cards

The OrgChart allows you to specify colors for the displayed cards. In this step, you will configure the list with the colors.

```dojo
    <div id="orgchart"></div>

    <script>
      $(document).ready(function() {
         var data = [
            { id: 1, name: "Gevin Bell", title: "CEO"},
            { id: 2, name: "Clevey Thrustfield", title: "COO", parentId: 1},
            { id: 3, name: "Carol Baker", title: "CFO", parentId: 1 },
            { id: 4, name: "Kendra Howell", title: "CMO", parentId: 7},
            { id: 5, name: "Sean Rusell", title: "Financial Manager", parentId: 3},
            { id: 6, name: "Steven North", title: "Accountant", parentId: 5 },
            { id: 7, name: "Michelle Hudson", title: "Operations Manager", parentId: 2},
            { id: 8, name: "Andrew Berry", title: "Accountant", parentId: 5 }            
        ];
       
        $("#orgchart").kendoOrgChart({
            dataSource: data,
          	cardsColors: ["lime", "violet", "red", "yellow"]
        });
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the OrgChart](https://demos.telerik.com/kendo-ui/orgchart/index)

## See Also 

* [JavaScript API Reference of the OrgChart](/api/javascript/ui/orgchart)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
