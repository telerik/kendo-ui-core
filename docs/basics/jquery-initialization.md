---
title: Initialize a Kendo UI Widget as a jQuery Plugin
page_title: Add Kendo UI jQuery Widgets to an Application using jQuery Plugin
previous_url: /widgets, /howto/add-widgets
description: Learn how to add Kendo UI widgets to your mobile website or web application.
position: 1
---

# Initialize a Kendo UI Widget Using the jQuery Plugin Syntax

All Kendo UI widgets are registered as [jQuery plugins](http://learn.jquery.com/plugins/), which allows them to be instantiated on a jQuery object
instance. The jQuery plugin method is formed by the widget name in Pascal case, prefixed with `kendo` (`kendoGrid`, `kendoListView`).  The mobile
widgets' methods are prefixed with `Mobile` to avoid collisions with their desktop counterparts (i.e. `kendoMobileTabStrip`, `kendoMobileButton`,
`kendoMobileListView`).

Some Kendo UI widgets have specific requirements about the element types they should be instantiated on. For more details and working examples,
check the source code in the [respective widget demo](http://demos.telerik.com/kendo-ui/) and [API reference](/api/introduction).

## Instantiate a Kendo UI Autocomplete Widget

        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });
            });
        </script>

If the jQuery object includes **more than one** DOM element, **a separate widget** will be instantiated for each.

## Instantiate Multiple Kendo UI Buttons With a Single jQuery Selector

    <button>Foo</button> | <button>Bar</button>
    <script>
      $(function() {
        $("button").kendoButton();
      });
    </script>


> The jQuery convention of **returning the selected DOM element** from most methods applies to the widget initialization methods. This allows jQuery
> methods to be chained.

### Chain jQuery Method Calls After the Widget Instantiation Plugin Method

    <button>Foo</button> | <button>Bar</button>

    <script>
      $(function() {
        $("button").kendoButton().css("color", "red");
      });
    </script>

## Configure Kendo UI Widgets

You can configure a Kendo UI widget by passing a configuration object (key/value pairs) as an argument to the jQuery plugin method. Each widget supported
configuration options and events are listed in the respective widget [API reference](/api/introduction). The configuration object may also contain
event handlers that will be bound to the corresponding widget events.

### Instantiate and Configure a Kendo UI Grid

    <div id="grid"></div>

    <script>
    $("#grid").kendoGrid({
      height: 200,
      columns:[
          {
              field: "FirstName",
              title: "First Name"
          },
          {
              field: "LastName",
              title: "Last Name"
          }
      ],
      dataSource: {
          data: [
              {
                  FirstName: "John",
                  LastName: "Doe"
              },
              {
                  FirstName: "Jane",
                  LastName: "Doe"
              }
          ]
      }
    });
    </script>

This example sets the [height](/api/web/grid#height-numberstring), [columns](/api/web/grid#columns-array) and [dataSource](/api/web/grid#datasource-kendodatadatasource--object) configuration options of the Grid widget.

## Duplicate Kendo UI Widget Initialization

Please be careful **not** to initialize a widget on the same DOM element **more than once**.
That often happens when using Kendo UI server wrappers (they are initialized automatically), or scenarios in which a widget is created in an event handler executed multiple times.
A common mistake is to recreate a widget instance when the goal is to get the instance object. **Duplicate initialization is not supported** and results in unexpected side effects.

### Example - Incorrect Duplicate Initialization

    <input id="autocomplete" />
    <script>
        // initialization code here...
        $("#autocomplete").kendoAutoComplete(["Apples", "Oranges", "Grapes"]);

        // ...
        // correct - instance reference is obtained:
        var autocomplete = $("#autocomplete").data("kendoAutoComplete");

        // INCORRECT - instance reference is obtained while creating a duplicate instance:
        var duplicate = $("#autocomplete").kendoAutoComplete().data("kendoAutoComplete");
    </script>
