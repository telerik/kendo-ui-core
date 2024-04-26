---
title: Toolbar Template
page_title: jQuery TreeList Documentation - Toolbar Template
description: "Get started with the jQuery TreeList by Kendo UI and learn how to render different Toolbar content by using Kendo UI Templates."
slug: toolbar_templates_kendoui_treelist_component
position: 4
---

# Toolbar Templates

The Kendo UI TreeList provides full control over the rendering of its Toolbar content by using the [`Kendo UI Templates`](/framework/templates/overview). The [`toolbar.template`](/api/javascript/ui/treelist/configuration/toolbar.template) configuration enables you to specify your own layout instead of using the built-in buttons.

## Setting a Toolbar Template as a Function

The [`template`](/api/javascript/ui/treelist/configuration/toolbar.template) toolbar configuration enables you to pass a function and build an HTML chunk.

The following example demonstrates how to set the template as a function that is returned by [`kendo.template`](/api/javascript/kendo/methods/template).

```dojo
    <div id="treelist"></div>
    <script id="template" type="text/x-kendo-template">
    	<button id="custom-button">Custom command</button>
    </script>
    <script>

      $("#treelist").kendoTreeList({
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

      $("#custom-button").kendoButton({
        click: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Toolbar command is clicked!");
        }
      });
    </script>
```

## Setting a Toolbar Template as a String

The [`template`](/api/javascript/ui/treelist/configuration/toolbar.template) toolbar configuration enables you to create HTML chunks by passing directly a string.

The following example demonstrates how to set the template as a string.

```dojo
    <div id="treelist"></div>

    <script>
      $("#treelist").kendoTreeList({
        toolbar: [
          { template: "<button id='custom-button'>Custom command</button>" }
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

      $("#custom-button").kendoButton({
        click: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Toolbar command is clicked!");
        }
      });
    </script>
```

## KB Articles

* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Using Toolbar Templates in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/toolbar-template)
* [Introduction on Templates]({% slug overview_kendoui_templatescomponent %})
* [JavaScript API Reference of the TreeList](/api/javascript/ui/treelist)
