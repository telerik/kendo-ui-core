---
title: Toolbar Template
page_title: jQuery Grid Documentation - Toolbar Template
description: "Get started with the jQuery Grid by Kendo UI and learn how to render different Toolbar content by using Kendo UI Templates."
components: ["grid"]
slug: toolbar_templates_kendoui_grid_component
position: 4
---

# Toolbar Templates

The Kendo UI Grid provides full control over the rendering of its Toolbar content by using the [`Kendo UI Templates`](/framework/templates/overview). The [`toolbar.template`](/api/ui/grid/configuration/toolbar#toolbartemplate) configuration enables you to specify your own layout instead of using the built-in buttons.

## Setting a Toolbar Template as a Function

The [`template`](/api/ui/grid/configuration/toolbar#toolbartemplate) toolbar configuration enables you to build a [`Kendo UI Template`](/framework/templates/overview) by passing a function.

The following example demonstrates how to set the template as a function that is returned by [`kendo.template`](/api/kendo/methods/template).

```dojo
<div id="grid"></div>
<script id="template" type="text/x-kendo-template">
	<a  type="button" class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
</script>
<script>
function toolbar_click() {
/* The result can be observed in the DevTools(F12) console of the browser. */
  console.log("Toolbar command is clicked!");
  return false;
}
$("#grid").kendoGrid({
  toolbar: [
    { template: kendo.template($("#template").html()) }
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
</script>
```

## Setting a Toolbar Template as a String

The [`template`](/api/ui/grid/configuration/toolbar#toolbartemplate) toolbar configuration enables you to create HTML chunks by passing directly a `string`.

The following example demonstrates how to set the template as a string.

```dojo
<div id="grid"></div>

<script>
function toolbar_click() {
/* The result can be observed in the DevTools(F12) console of the browser. */
  console.log("Toolbar command is clicked!");
  return false;
}
$("#grid").kendoGrid({
  toolbar: [
    { template: "<button id='custom-button' class='k-button'>Custom command</button>" }
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
</script>
```

## Rendering Icons in a Toolbar Template

To display a Kendo UI icon in a custom toolbar element, call the [`kendo.ui.icon`]({% slug svgicons_kendoui_desktopwidgets %}#rendering-svg-icons) method in a template expression. The method returns the icon markup, which the template inserts into the toolbar element when rendered. The icon is rendered as an SVG or a font icon according to the global icon configuration.

The following example demonstrates how to render an icon in a toolbar button that is defined in a template.

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

> When you compile the toolbar template with `kendo.template` or set the `toolbar` option as a string, the `#` character marks a template expression. A literal `#`, such as the one in an ID selector or a URL, causes an `Invalid template` error unless you escape it. For more information, refer to the article on [using hash literals in templates]({% slug essentials_templates %}#using-hash-literals).

## KB Articles on Toolbar Templates

* [Place Edit or Update Buttons to Grid Toolbar]({% slug grid-edit-command-toolbar %})
* [Fixing the Invalid Template Error When Adding an Icon to the Grid Toolbar]({% slug grid-toolbar-invalid-template-svg-icon %})
* [Lock and Unlock Grid Columns by Using Toolbar instead of Column Menu]({% slug grid-lock-unlock-using-toolbar %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Using Toolbar Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
* [Introduction on Templates]({% slug overview_kendoui_templatescomponent %})
* [SVG Icons in Kendo UI for jQuery]({% slug svgicons_kendoui_desktopwidgets %})
* [JavaScript API Reference of the Grid](/api/ui/grid)
