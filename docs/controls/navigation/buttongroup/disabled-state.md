---
title: Disabled ButtonGroup
page_title: jQuery ButtonGroup Documentation | Disabled ButtonGroup
description: "Get started with the jQuery ButtonGroup by Kendo UI and enable or disable the widget."
slug: disabled_kendoui_buttongroup
position: 2
---

# Disabled ButtonGroup

The ButtonGroup provides options for setting its enabled and disabled state.  

To configure the ButtonGroup as initially disabled, use its [`enable`](/api/javascript/ui/buttongroup/configuration/enable) property. The ButtonGroup can also be disabled or enabled with JavaScript by using its [`enable`](/api/javascript/ui/buttongroup/methods/enable) method with a Boolean argument.

The following example demonstrates how to enable and disable the ButtonGroup.

	<ul id="buttongroup">
		<li>Option 1</li>
		<li>Option 2</li>
		<li>Option 3</li>
	</ul>

	<script>

	$(function(){
		var buttongroup = $("#buttongroup").kendoButtonGroup({
			enable: false
		}).data("kendoButtonGroup");
		// ...
		// Enable the ButtonGroup.
		buttongroup.enable(true);
	});

	</script>

## See Also

* [Basic Usage of the ButtonGroup (Demo)](https://demos.telerik.com/kendo-ui/buttongroup/index)
* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
