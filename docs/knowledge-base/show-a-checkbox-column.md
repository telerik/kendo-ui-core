---
title: Show a Checkbox Column in the TreeList
page_title: Show a Checkbox Column in the TreeList
description: "Learn how to show a checkbox column bound to the item model in a Kendo UI TreeList widget."
slug: howto_showcheckboxcolumn_treelist
previous_url: /controls/data-management/treelist/how-to/show-a-checkbox-column
tags: kendo, jquery, treelist, show, a, checkbox, column
component: treelist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeList for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a checkbox column in the Kendo UI for jQuery TreeList?

## Solution

The following example demonstrates how to add and render a checkbox column bound to the item model in the TreeList.

```dojo
  <div id="treelist"></div>

  <script>
    var dataSource = new kendo.data.TreeListDataSource({
      data: [
        { id:  1, Name: "Daryl Sweeney", Position: "CEO", Phone: "(555) 924-9726", parentId: null },
        { id:  2, Name: "Guy Wooten", Position: "Chief Technical Officer", Phone: "(438) 738-4935", parentId: null, checked: true },
        { id:  3, Name: "Priscilla Frank", Position: "Chief Product Officer", Phone: "(217) 280-5300", parentId: 1 },
        { id:  4, Name: "Ursula Holmes", Position: "EVP, Product Strategy", Phone: "(370) 983-8796", parentId: 3 },
        { id: 11, Name: "Hyacinth Hood", Position: "Team Lead", Phone: "(889) 345-2438", parentId: 32 },
        { id: 24, Name: "Melvin Carrillo", Position: "Director, Developer Relations", Phone: "(344) 496-9555", parentId: 3 },
        { id: 29, Name: "Martha Chavez", Position: "Developer Advocate", Phone: "(140) 772-7509", parentId: 24 },
        { id: 30, Name: "Oren Fox", Position: "Developer Advocate", Phone: "(714) 284-2408", parentId: 24 },
        { id: 32, Name: "Buffy Weber", Position: "VP, Engineering", Phone: "(699) 838-6121", parentId: 2 },
        { id: 41, Name: "Amos Barr", Position: "Developer Advocate", Phone: "(996) 587-8405", parentId: 24 },
        { id: 42, Name: "Gage Daniels", Position: "Software Architect", Phone: "(107) 290-6260", parentId: 32 },
        { id: 43, Name: "Constance Vazquez", Position: "Director, Engineering", Phone: "(800) 301-1978", parentId: 32 },
        { id: 46, Name: "Darrel Solis", Position: "Team Lead", Phone: "(327) 977-0216", parentId: 43 },
        { id: 47, Name: "Brian Yang", Position: "Senior Software Developer", Phone: "(565) 146-5435", parentId: 46 },
        { id: 50, Name: "Lillian Bradshaw", Position: "Software Developer", Phone: "(323) 509-3479", parentId: 46 },
        { id: 60, Name: "Akeem Carr", Position: "Junior Software Developer", Phone: "(738) 136-2814", parentId: 11 },
        { id: 78, Name: "Rinah Simon", Position: "Software Developer", Phone: "(285) 912-5271", parentId: 11 }
      ]
    });

    function toggleAll(e) {
      var view = dataSource.view();
      var checked = e.target.checked;
      for (var i = 0; i < view.length; i++) {
        view[i].set("checked", checked);
      }
    }

    $("#treelist").kendoTreeList({
      dataSource: dataSource,
      height: 540,
      columns: [
        {
          headerTemplate: "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' onclick='toggleAll(event)' />",
          template: "<input type='checkbox' class='k-checkbox k-checkbox-md k-rounded-md' data-bind='checked: checked' />",
          width: 40
        },
        { field: "Position", expandable: true },
        { field: "Name" },
        { field: "Phone" }
      ],
      dataBound: function() {
        var view = this.dataSource.view();
        this.items().each(function(index, row) {
          kendo.bind(row, view[index]);
        });
      }
    });
  </script>
```

## See Also

* [Basic Usage of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [Using the API of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/api)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
