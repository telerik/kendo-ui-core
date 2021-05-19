---
title: Index
page_title: jQuery ButtonGroup Documentation | Index
description: "Get started with the jQuery ButtonGroup by Kendo UI and configure its initially selected index."
slug: index_kendoui_buttongroup
position: 4
---

# Index

You can configure the initially selected index of the Kendo UI ButtonGroup by using its [`index`](/api/javascript/ui/buttongroup/configuration/index) property.

You can also select an index through the [`select`](/api/javascript/ui/buttongroup/methods/select) method with a Integer argument.

The following example demonstrates how to select a button by its index.

	<ul id="buttongroup">
		<li>Option 1</li>
		<li>Option 2</li>
		<li>Option 3</li>
	</ul>

	<script>

	$(function(){
		var buttongroup = $("#buttongroup").kendoButtonGroup({
			index: 0
		}).data("kendoButtonGroup");
		// ...
		// Select a button at index 1.
		buttongroup.select(1);
	});

	</script>

## See Also

* [Basic Usage of the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/index)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
