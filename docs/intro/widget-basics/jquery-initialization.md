---
title: Initializing as jQuery Plugins
page_title: Initializing as jQuery Plugins | Working with Widgets | Kendo UI for jQuery
previous_url: /widgets, /howto/add-widgets, /basics/jquery-initialization, /intro/jquery-initialization
description: "Get started with Kendo UI for jQuery and use the jQuery plugin syntax to add the widgets and framework components to your mobile website or web application."
slug: initialize_widgets_using_jquery_plugins_installation
position: 2
---

# Initializing as jQuery Plugins

All Kendo UI widgets are registered as [jQuery plugins](http://learn.jquery.com/plugins/) which allows them to be instantiated on a jQuery object instance.

The jQuery plugin method is formed by the widget name in Pascal Case that is prefixed with `kendo` as in `kendoGrid` and `kendoListView`. To avoid collisions with their desktop counterparts, the methods for the hybrid UI widgets are prefixed with `Mobile` as in `kendoMobileTabStrip`, `kendoMobileButton`, and `kendoMobileListView`.

Some Kendo UI widgets have specific requirements about the element types on which they are instantiated. For more details and working examples, refer to the source code in the [respective widget demo](https://demos.telerik.com/kendo-ui/) and [API reference](/api/javascript/kendo).

> * Avoid initializing several different Kendo UI widgets from the same DOM element because duplicate initialization might lead to undesired side effects.
> * It is strongly recommended to initialize the Kendo UI widgets from HTML elements which are part of the DOM tree. Creating widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) might cause undesired side effects or lead to JavaScript errors.

## Getting Started

The following example demonstrates how to use a regular approach to instantiate a Kendo UI AutoComplete. A similar to the demonstrated approach is used for all other widgets with the widget name spelled in Pascal Case. The widget initialization method follows the jQuery plugin paradigm and returns the jQuery object of the same DOM element used for the widget creation. It does not return the widget instance, and the instance has to be obtained through the [jQuery `data()` method]({% slug widget_methodsand_events_kendoui_installation %}#jquery-data-method).

> If the jQuery object includes more than one DOM element, a separate widget is instantiated for each one.

```dojo

	<p>Animal: <input id="animal" /></p>

	<script>
        $(function() {
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });
        });
    </script>
```

### Multiple Widgets with Single Selectors

The following example demonstrates how to instantiate multiple Buttons with a single jQuery selector. The jQuery convention for returning the selected DOM element from most methods applies to the widget initialization methods. This allows for chaining jQuery methods.

```
    <button>Foo</button> | <button>Bar</button>
    <script>
      $(function() {
        $("button").kendoButton();
      });
    </script>
```

### Chaining jQuery Method Calls

The following example demonstrates the chain jQuery method calls after the widget instantiation plugin method.

```
    <button>Foo</button> | <button>Bar</button>

    <script>
      $(function() {
        $("button").kendoButton().css("color", "red");
      });
    </script>
```

### Widgets within Iframes

It is theoretically possible to initialize a Kendo UI widget which is inside an `iframe` from the context of the parent page or vice-versa. Such cross-frame widget creation might work in specific scenarios, but is not officially supported or recommended. For example, widgets that render popups might not be able to display them. To work around this issue, initialize widgets in another document context by calling a JavaScript function, which belongs to the same context where the widgets will be located.

## Duplicate Initialization

When you initialize a widget, the goal is to get the instance object. However, recreating a widget instance turns out to be a common issue. When using a Kendo UI server-side wrapper (as the server-side wrappers are automatically initialized) or when a widget is being created in an event handler that is executed multiple times, it is possible to initialize a widget on the same DOM element more than once.

The following example demonstrates an incorrect duplicate initialization.

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

To check whether a widget instance already exists for a certain DOM element, use the [standard way to obtain the widget instance]({% slug widget_methodsand_events_kendoui_installation %}#jquery-data-method). If the returned value is `undefined`, then the widget instance does not exist.

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

## Widget Configuration

To configure a Kendo UI widget, pass a configuration object (key/value pairs) as an argument to the jQuery plugin method. The supported configuration options and events for each widget are listed in the [API reference](/api/javascript/kendo) of the respective widget. The configuration object might also contain event handlers that will be bound to the corresponding widget events.

The following example demonstrates how to set the [`height`](/api/javascript/ui/grid/configuration/height), [`columns`](/api/javascript/ui/grid/configuration/columns) and [`dataSource`](/api/javascript/ui/grid/configuration/datasource) configuration options of the Grid widget.

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

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
