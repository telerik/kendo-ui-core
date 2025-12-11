---
title: Toolbar Template
page_title: jQuery Grid Documentation - Toolbar Template
description: "Get started with the jQuery Grid by Kendo UI and learn how to render different Toolbar content by using Kendo UI Templates."
components: ["grid"]
slug: toolbar_templates_kendoui_grid_component
position: 4
---

# Toolbar Templates

The Kendo UI Grid provides full control over the rendering of its Toolbar content by using the [`Kendo UI Templates`](/framework/templates/overview). The [`toolbar.template`](/api/javascript/ui/grid/configuration/toolbar.template) configuration enables you to specify your own layout instead of using the built-in buttons.

## Setting a Toolbar Template as a Function

The [`template`](/api/javascript/ui/grid/configuration/toolbar.template) toolbar configuration enables you to build a [`Kendo UI Template`](/framework/templates/overview) by passing a function.

The following example demonstrates how to set the template as a function that is returned by [`kendo.template`](/api/javascript/kendo/methods/template).

```dojo
<div id="grid"></div>
<script id="template" type="text/x-kendo-template">
	<a  type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" href="\#" onclick="return toolbar_click()">Command</a>
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

The [`template`](/api/javascript/ui/grid/configuration/toolbar.template) toolbar configuration enables you to create HTML chunks by passing directly a `string`.

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
    { template: "<button id='custom-button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Custom command</button>" }
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

## KB Articles on Toolbar Templates

* [Place Edit or Update Buttons to Grid Toolbar]({% slug grid-edit-command-toolbar %})
* [Lock and Unlock Grid Columns by Using Toolbar instead of Column Menu]({% slug grid-lock-unlock-using-toolbar %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Using Toolbar Templates in the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/toolbar-template)
* [Introduction on Templates]({% slug overview_kendoui_templatescomponent %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
