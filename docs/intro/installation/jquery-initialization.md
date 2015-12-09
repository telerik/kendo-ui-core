---
title: Initialize Widgets Using jQuery Plug-Ins
page_title: Initialize Widgets Using jQuery Plug-Ins | Kendo UI Installation
previous_url: /widgets, /howto/add-widgets, /basics/jquery-initialization, /intro/jquery-initialization
description: "Use jQuery plug-in sytax to add Kendo UI widgets and frameworks to your mobile website or web application."
slug: initialize_widgets_using_jquery_plugins_installation
position: 6
---

# Initialize Widgets Using jQuery Plug-Ins

All Kendo UI widgets are registered as [jQuery plug-ins](http://learn.jquery.com/plugins/), which allows them to be instantiated on a jQuery object instance.
The jQuery plug-in method is formed by the widget name in Pascal case, prefixed with `kendo` as in `kendoGrid` and `kendoListView`.
The methods for mobile widgets are prefixed with `Mobile` to avoid collisions with their desktop counterparts as in `kendoMobileTabStrip`, `kendoMobileButton` and `kendoMobileListView`.

Some Kendo UI widgets have specific requirements about the element types they should be instantiated on. For more details and working examples, check the source code in the [respective widget demo](http://demos.telerik.com/kendo-ui/) and [API reference](/api/javascript/kendo).

While it is theoretically possible to initialize several different Kendo UI widgets from the same DOM element, this is not recommended and may lead to undesired side effects.

> **Important**  
> It is strongly recommended to initialize Kendo UI widgets from HTML elements, which are part of the DOM tree.
Creating widgets from [document fragments](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) may cause undesired side effects or Javascript errors.

## Widget Initialization

### Instantiate the AutoComplete

The example below demonstrates how to instantiate Kendo UI AutoComplete.

###### Example

```
	<p>Animal: <input id="animal" /></p>

	<script>
        $(function() {
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });
        });
    </script>
```

> **Important**  
> If the jQuery object includes more than one DOM element, a separate widget will be instantiated for each.

### Instantiate Multiple Buttons

The example below demonstrates how to instantiate multiple buttons with a single jQuery selector.

###### Example

```
    <button>Foo</button> | <button>Bar</button>
    <script>
      $(function() {
        $("button").kendoButton();
      });
    </script>
```

> **Important**  
> The jQuery convention of returning the selected DOM element from most methods applies to the widget initialization methods. This allows jQuery methods to be chained.

### Chain jQuery Method Calls 

The example below demonstrates the chain jQuery method calls after the widget instantiation plug-in method.

###### Example

```
    <button>Foo</button> | <button>Bar</button>

    <script>
      $(function() {
        $("button").kendoButton().css("color", "red");
      });
    </script>
```

### Initialization within `iframes`

It is theoretically possible to initialize a Kendo UI widget, which is inside an `iframe`, from the context of the parent page. This may work in specific scenarios, but is not officially supported. For example, widgets that render popups may not be able to display them.

## Configuration

You can configure a Kendo UI widget by passing a configuration object (key/value pairs) as an argument to the jQuery plugin method. Each widget supported configuration options and events are listed in the respective widget [API reference](/api/javascript/kendo). The configuration object may also contain event handlers that will be bound to the corresponding widget events.

### Instantiate the Grid

The example below sets the [height](/api/javascript/ui/grid#configuration-height), [columns](/api/javascript/ui/grid#configuration-columns) and [dataSource](/api/javascript/ui/grid#configuration-dataSource) configuration options of the Grid widget.

###### Example

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

## Duplicate Initialization

When using a Kendo UI server-side wrapper (as the server-side wrappers are automatically initialized) or when a widget is being created in an event handler executed multiple times, it is possible to initialize a widget on the same DOM element more than once. In such a scenario, do not try to recreate a widget instance when the goal is to get the instance object.     

A common mistake is to recreate a widget instance when the goal is only to get the instance object. Duplicate initialization is not supported and results in unexpected side effects.

### Incorrect Duplicate Initialization

###### Example

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

### Check for Existing Instances

In order to check whether a widget instance already exists for a certain DOM element, use the
[standard way to obtain the widget instance](/intro/installation/events-and-methods#obtain-a-reference-to-a-kendo-ui-widget-instance-using-jquery). If the returned value is `undefined`, then the widget instance does not exist.

###### Example

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

## See Also

Other articles on getting started with Kendo UI:

* [Getting Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})