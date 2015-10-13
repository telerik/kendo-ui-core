---
title: Initialize a Widget Using jQuery Plug-in Syntax
page_title: Initialize a Widget Using jQuery Plug-in Syntax
previous_url: /widgets, /howto/add-widgets, /basics/jquery-initialization, /intro/jquery-initialization
description: "add Kendo widgets to your mobile website or web application"
position: 6
---

# Initialize a Widget Using jQuery Plug-in Syntax

All Kendo UI widgets are registered as [jQuery plug-ins](http://learn.jquery.com/plugins/), which allows them to be instantiated on a jQuery object instance.
The jQuery plug-in method is formed by the widget name in Pascal case, prefixed with `kendo` as in `kendoGrid` and `kendoListView`.
The methods for mobile widgets are prefixed with `Mobile` to avoid collisions with their desktop counterparts as in `kendoMobileTabStrip`, `kendoMobileButton` and `kendoMobileListView`.

Some Kendo UI widgets have specific requirements about the element types they should be instantiated on. For more details and working examples,
check the source code in the [respective widget demo](http://demos.telerik.com/kendo-ui/) and [API reference](/api/introduction).

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element, this is not recommended and may lead to undesired side effects.

> It is strongly recommended to initialize Kendo UI widgets from HTML elements, which are part of the DOM tree.
Creating widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) may cause undesired side effects or Javascript errors.

### Instantiate the Kendo UI AutoComplete Widget

**Example:**

```
	<p>Animal: <input id="animal" /></p>

	<script>
        $(function() {
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });
        });
    </script>
```

> Note that if the jQuery object includes more than one DOM element, a separate widget will be instantiated for each.

### Instantiate Multiple Kendo UI Buttons With a Single jQuery Selector

**Example:**

```
    <button>Foo</button> | <button>Bar</button>
    <script>
      $(function() {
        $("button").kendoButton();
      });
    </script>
```

> The jQuery convention of returning the selected DOM element from most methods applies to the widget initialization methods. This allows jQuery methods to be chained.

#### Chain jQuery Method Calls After the Widget Instantiation Plug-in Method

**Example:** 

```
    <button>Foo</button> | <button>Bar</button>

    <script>
      $(function() {
        $("button").kendoButton().css("color", "red");
      });
    </script>
```

### Configure Kendo UI Widgets

You can configure a Kendo UI widget by passing a configuration object (key/value pairs) as an argument to the jQuery plugin method. Each widget supported configuration options and events are listed in the respective widget [API reference](/api/introduction). The configuration object may also contain event handlers that will be bound to the corresponding widget events.

#### Instantiate and Configure the Kendo UI Grid

The example below sets the [height](/api/web/grid#height-numberstring), [columns](/api/web/grid#columns-array) and [dataSource](/api/web/grid#datasource-kendodatadatasource--object) configuration options of the Grid widget.

**Example:** 

```
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
```

### Duplicate Kendo UI Widget Initialization

When using a Kendo UI server-side wrapper (as the server-side wrappers are automatically initialized) or when a widget is being created in an event handler executed multiple times, it is possible to initialize a widget on the same DOM element more than once. In such a scenario, do not try to recreate a widget instance when the goal is to get the instance object.     

A common mistake is to recreate a widget instance when the goal is only to get the instance object. Duplicate initialization is not supported and results in unexpected side effects.

#### Incorrect Duplicate Initialization

**Example:**

```
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
```

#### Check If a Widget Instance Exists

In order to check whether a widget instance already exists for a certain DOM element, use the
[standard way to obtain the widget instance](/basics/events-and-methods#obtain-a-reference-to-a-kendo-ui-widget-instance-using-jquery). If the returned value is `undefined`, then the widget instance does not exist.

**Example:**

```
    <input id="autocomplete" />
    <script>
        // try to obtain the widget instance
        var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        
        // check the returned value
        if (typeof autocomplete === "undefined") {
            // widget instance does not exist
        }
        // simpler alternative syntax for the above
        if (!autocomplete) {
            // widget instance does not exist
        }
    </script>
```

### Initialization of widgets inside iframes

It is theoretically possible to initialize a Kendo UI widget, which is inside an iframe, from the context of the parent page.
This may work in specific scenarios, but is not officially supported. For example, widgets that render popups may not be able to display them.
