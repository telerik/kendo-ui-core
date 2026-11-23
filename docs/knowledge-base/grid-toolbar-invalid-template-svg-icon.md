---
title: Fixing the Invalid Template Error When Adding an Icon to the Grid Toolbar
page_title: Invalid Template Error When Adding an SVG Icon to the Toolbar Template - jQuery Data Grid
description: "Learn how to resolve the Invalid template error that occurs when you add an SVG icon to a custom toolbar template of the Kendo UI for jQuery Grid."
type: troubleshooting
slug: grid-toolbar-invalid-template-svg-icon
tags: grid, toolbar, template, invalid template, svg, icon, kendo.ui.icon, hash, escape, script
res_type: kb
components: ["grid"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
		<tr>
			<td>Version</td>
			<td>2026.4.1111</td>
		</tr>
	</tbody>
</table>

## Description

I use a custom toolbar template in the Grid. To show an SVG icon in a toolbar button, I added a `<script>` element to the template that calls `kendo.ui.icon` with a jQuery ID selector. After this change, the Grid does not render and the browser console shows an error.

## Error Message

`Uncaught Error: Invalid template:'...'`

## Cause

When you compile the toolbar template with [`kendo.template`](/api/kendo/methods/template) or set the [`toolbar`](/api/ui/grid/configuration/toolbar) option as a string, Kendo UI treats the `#` character as the start or the end of a template expression. The `#` in an ID selector, such as `$('#exportButton')`, is not a template expression, so the template cannot be compiled.

The following template causes the error:

```html
<script id="toolbarTemplate" type="text/x-kendo-template">
    <button type="button" id="exportButton"><span class="export-icon"></span> Export</button>
    <script>kendo.ui.icon($('#exportButton .export-icon'), 'file-excel');</script>
</script>
```

This template also nests a `</script>` closing tag inside an external script template. The browser ends the outer `<script>` element at the first closing tag, so the template content is cut off even if the hash character is escaped.

## Solution

Render the icon markup directly in the template instead of initializing it with a script:

1. Remove the `<script>` element from the toolbar template.
1. Output the icon HTML with the `#= #` expression and the [`kendo.ui.icon`]({% slug svgicons_kendoui_desktopwidgets %}#rendering-svg-icons) method.
1. Attach event handlers to the toolbar elements after the Grid is initialized.

```dojo
<div id="grid"></div>
<script id="toolbarTemplate" type="text/x-kendo-template">
    <button type="button" id="exportButton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
        #= kendo.ui.icon({ icon: "file-excel", iconClass: "k-button-icon" }) #
        <span class="k-button-text">Export</span>
    </button>
</script>
<script>
$("#grid").kendoGrid({
  toolbar: [
    { template: kendo.template($("#toolbarTemplate").html()) }
  ],
  columns: [
    { field: "name" },
    { field: "age" }
  ],
  dataSource: [
      { name: "Jane Doe", age: 30 },
      { name: "John Doe", age: 33 }
  ]
});

$("#exportButton").on("click", function () {
/* The result can be observed in the DevTools(F12) console of the browser. */
  console.log("Export is clicked!");
});
</script>
```

If the template must contain a literal `#` character, escape it. The escape sequence differs for external script templates and for templates that are defined as JavaScript strings. For more information, refer to the article on [using hash literals in templates]({% slug essentials_templates %}#using-hash-literals).

## See Also

* [Toolbar Templates in the Grid]({% slug toolbar_templates_kendoui_grid_component %})
* [Kendo UI Templates Essentials]({% slug essentials_templates %})
* [SVG Icons in Kendo UI for jQuery]({% slug svgicons_kendoui_desktopwidgets %})
* [JavaScript API Reference of the Grid](/api/ui/grid)
