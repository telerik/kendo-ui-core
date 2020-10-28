---
title: Expand Modes
page_title: jQuery PanelBar Documentation | Expand Modes
description: "Get started with the jQuery PanelBar by Kendo UI and use its ingle or multiple expand mode."
slug: expandmode_kendoui_panelbar
position: 3
---

# Expand Modes

The PanelBar supports a single and a multiple expand mode.

If `ExpandMode` is set to `Single`, the user can expand only a single root item or a single child item of a specific parent item. Expanding another root item or another child of the parent of the currently expanded item will collapse the currently expanded item. This approach is also the only way to collapse an expanded item in the single expand mode.

If `ExpandMode` is set to `Multiple`, the user can expand multiple root items or children of the same parent item at a time. Expanding an item does not collapse the currently expanded items. Expanded items can be collapsed by clicking on them.

	<div id="panelbar"></div>
	<script>
		var items = [
			{ ProductName: "Root1", items: [
				{ ProductName: "Level2 1", items: [
					{ ProductName: "Level3 1" },
					{ ProductName: "Level3 2" }
				]},
				{ ProductName: "Level2 2", items: [
					{ ProductName: "Level3 1" },
					{ ProductName: "Level3 2" }
				]}
			]},
			{ ProductName: "Root2", items: [
				{ ProductName: "Level2 1" }
			]}
		];

		$("#panelbar").kendoPanelBar({
			dataTextField: "ProductName",
			dataSource: items,
			expandMode: "single"
		});
	</script>

## See Also

* [Basic Usage of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/index)
* [Using the API of the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/api)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
