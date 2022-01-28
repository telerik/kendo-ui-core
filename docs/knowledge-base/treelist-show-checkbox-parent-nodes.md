---
title: Show Checkbox in Root Nodes of the TreeList
description: Display the checkbox only in the root nodes of the Kendo UI TreeList
type: how-to
page_title: Checkbox in Parent Nodes | Kendo UI TreeList
slug: treelist-show-checkbox-parent-nodes
position: 
tags: checkbox, treelist, rootnode, root, parent, parentnode
ticketid: 1445675
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>TreeList for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>

## Description
How can I show the checkbox in the checkbox column of the Kendo UI TreeList for the root nodes only?

## Solution
1. Set the [visibility](https://www.w3schools.com/cssref/pr_class_visibility.asp) of all the checkboxes to *hidden* in the [columns.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/configuration/columns.template) property as seen below:

	```javascript
	  columns: [{ 
	    template: "<input style='visibility: hidden;' type='checkbox' data-bind='checked: checked' />"
	  }]
	```
1. Use the [dataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/events/databound) event to run the following JavaScript function:

	```javascript
	  dataBound: function(e) {
	    var view = this.dataSource.view();
	    this.items().each(function(index, row) {
	      if(!view[index].parentId)
		row.childNodes[0].childNodes[0].style.visibility = 'visible';
	      else
		row.childNodes[0].childNodes[0].style.visibility = 'hidden';
	      kendo.bind(row, view[index]);
	    })
	  }
	```

#### Example

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
        headerTemplate: "<input type='checkbox' onclick='toggleAll(event)' />",
        template: "<input type='checkbox' style='visibility: hidden;' data-bind='checked: checked' />",
        width: 32
      },
      { field: "Position", expandable: true },
      { field: "Name" },
      { field: "Phone" }
    ],
    dataBound: function() {
      var view = this.dataSource.view();
      this.items().each(function(index, row) {
        if(!view[index].parentId)
          row.childNodes[0].childNodes[0].style.visibility = 'visible';
        else
          row.childNodes[0].childNodes[0].style.visibility = 'hidden';
        kendo.bind(row, view[index]);
      })
    }
  });
</script>

```

## See Also
- [Show Checkbox Column](https://docs.telerik.com/kendo-ui/controls/data-management/treelist/how-to/show-a-checkbox-column)
- [CSS visibility](https://www.w3schools.com/cssref/pr_class_visibility.asp)
- [columns.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/configuration/columns.template)
- [dataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/events/databound)
