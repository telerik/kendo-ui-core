---
title: How to add a click handler to an icon in the ListBox template
description: How do I add a small icon to the listbox items that would launch a window?
type: how-to
page_title: How to add a click handler to an item in a draggable ListBox
slug: listbox-add-click-handler-to-item-template
position:
tags: listbox, click, icon, template, function, click not working, draggable
ticketid: 1401928
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product Version</td>
	    	<td>2019.1.220</td>
	    </tr>
	    <tr>
	    	<td>Product</td>
	    	<td>jQuery Kendo UI ListBox and wrappers</td>
	    </tr>
    </tbody>
</table>

## Description

I would like to add a small icon to the template of the Kendo UI ListBox that is clickable.  No matter what I try the function is not executed.

## Solution

The Kendo UI ListBox prevents the `mousedown` event as it needs it for dragging and selection. To be able to attach a handler that responds to an external mouse event, you can wrap the list box in another div and check for the target element during  `mousedown` or `click`.

```tab-jQuery
 	<div id="listbox-container">
      <select id="listBox"></select>
    </div>

		<script>
	 	// the item template has an icon with class see-more
	  $("#listbox-container").on("click", ".see-more", function(e){
        var dataItem = listbox.dataItem($(e.target).closest(".k-item"));
        kendo.alert("Children: " + kendo.stringify(dataItem.children));
      });
    </script>
```
```tab-Razor
    <div id="lb">
  		@(Html.Kendo().ListBox()
          .Name("listBoxAvailableRoles")
          .TemplateId("customer-item-template")
		)
	</div>
	<script id="customer-item-template" type="text/x-kendo-template">
	  <span class="k-icon k-i-edit edit"></span>
	  <span class="k-state-default"><p>#: data.Name #</p></span>
	</script>
	<script>
	  $("#lb").on("mousedown", ".edit", function (e) {
	      kendo.alert("test");
	  });
	</script>
```

###### Example

```dojo
	<script type="text/kendo-x-tmpl" id="template">
    	<span class="k-icon k-i-eye see-more"></span>
  		<span class="k-state-default"><div>#: data.name #</div></span>
	</script>
 	<div id="listbox-container">
    	<select id="listBox"></select>
 	</div>
 	<script>
		var listbox =  $("#listBox").kendoListBox({
		  draggable:true,
		  dataSource: {
		    data: [
		      { name: "Jane Doe", children: [{name: "Mary"}] },
		      { name: "John Doe", children: [{name: "Tom"}, {name: "George"}]  }
		    ]
		  },
		  template: kendo.template($("#template").html())
		}).data("kendoListBox");

		$("#listbox-container").on("click", ".see-more", function(e){
		  var dataItem = listbox.dataItem($(e.target).closest(".k-item"));
		  kendo.alert("Children: " + kendo.stringify(dataItem.children));
		});

	</script>
	<style>
	  .see-more {
	  	color: #515967;
	  	background-color: #f3f3f4;
	  	padding:4px;
	  	border-radius:5px;
	  	border: 1px solid #515967;
	  }
	</style>
```
