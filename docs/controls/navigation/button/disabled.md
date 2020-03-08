---
title: Disabled Button
page_title: jQuery Button Documentation | Disabled Button | Kendo UI
description: "Get started with the jQuery Button by Kendo UI and enable or disable the widget."
slug: disabled_button
position: 2
---

# Disabled Button

The business logic of an application often requires a certain button to be temporarily disabled or enabled.

You can initially configure the Button as disabled either through its `enable` property or by initializing it from an element which has a `disabled="disabled"` HTML attribute. The Button can also be disabled or enabled at any time with JavaScript by using its `enable()` method with a Boolean argument. For more information on the [`enable` property](/api/javascript/ui/button/configuration/enable) and the [`enable` method](/api/javascript/ui/button/methods/enable), refer to the [Button API](/api/javascript/ui/button).

The following example demonstrates how to enable and disable the Button.

		<button type="button" id="editButton">Edit</button>

		<script>
		$(function(){
			var editButton = $("#editButton").kendoButton({
				enable: false
			}).data("kendoButton");

			// ...

			// Enable the button.
			editButton.enable(true);
		});
		</script>

## See Also

* [Basic Usage of the Button (Demo)](https://demos.telerik.com/kendo-ui/button/index)
* [Applying the Button API (Demo)](https://demos.telerik.com/kendo-ui/button/api)
* [JavaScript API Reference of the Button](/api/javascript/ui/button)
