---
title: Methods and Events
page_title: Methods and Events | Working with Widgets | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery, obtain a reference to initialized widget instances and call their methods and events."
previous_url: /basics/events-and-methods, /intro/events-and-methods, /intro/installation/events-and-methods
slug: widget_methodsand_events_kendoui_installation
position: 5
---

# Methods and Events

All Kendo UI widgets provide methods and events that you can use to query or modify their state at runtime.

## Getting the Widget Instance

To use the methods of the widgets, you have to obtain a reference to the specific widget instance by using any of the following approaches:

* [Using the jQuery `data` method](#the-jquery-data-method)
* [Using the `getKendo<WidgetName>` method](#the-getkendo-method)

### The jQuery data Method

The Kendo UI widgets are jQuery plugins. A common way to get a reference to a widget instance is to use the [jQuery `data`](https://api.jquery.com/data/) method and pass the plugin name as a string.

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {
          // create a new widget instance
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

          // retrieve the widget instance
          var autoComplete = $("#animal").data("kendoAutoComplete");

          console.log(autoComplete);
        });
    </script>
```

### The getKendo Method

To get a reference to a widget instance, you may also use the `getKendo<WidgetName>` method. Note that the jQuery convention of returning the selected DOM element applies to widget initialization plugin methods too. This means that the plugin method, for example `kendoAutoComplete()`, does not return the widget instance, but the jQuery selector on which the method was used.

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {
          // create a new widget instance
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

          // retrieve the widget instance
          var autoComplete = $("#animal").getKendoAutoComplete();

          console.log(autoComplete);
        });
    </script>
```

## Using Methods

After the widget instance is available, you can call its methods by using the standard JavaScript method syntax. The complete list and examples of the widget methods and method parameters is available in the [API reference](/api/javascript/kendo) section. If the code which will return a widget instance returns `undefined`, then the widget is not yet initialized. Such a problem may occur, for example, if a widget is created in a `document.ready` handler but the widget instance is referenced from code that was executed earlier.

```
        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

              var autoComplete = $("#animal").data("kendoAutoComplete");

              // focus the widget
              autoComplete.focus();
            });
        </script>
```

## Handling Widget Events

Depending on its specific features, each widget exposes different events. For example, the AutoComplete widget triggers `change`, `close`, `dataBound`, and so on. You can pass event handlers either [during the widget initialization](#binding-events-during-initialization) or [after the widget initialization](#binding-events-after-initialization). When you work with the events of the Kendo UI widgets, you can also [use event handler arguments](#using-event-handler-arguments), [prevent events](#preventing-events), and [unbind from events](#unbinding-from-events).

### Binding Events during Initialization

Event handlers which are attached during the initialization of the widget will be executed every time the event is fired. To execute the handler only once, attach it after the widget initialization with the `one` method.

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {

          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ],
              change: function(e) {
                console.log("change event handler");
              }
          });

        });
    </script>
```

### Binding Events after Initialization

All Kendo UI widgets provide the `bind` and the `one` method. Both methods attach event handlers to already existing widget instances but the event handlers that are attached with `one` will be executed only once.

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {

          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ]
          });

          // ...

          var autocomplete = $("#animal").data("kendoAutoComplete");

          // Attach an event handler that will be executed each time the event is fired.
          autocomplete.bind("change", function(e) {
                console.log("change event handler");
          });

          // Attach an event handler that will be executed only the first time the event is fired.
          autocomplete.one("open", function(e) {
                console.log("open event handler");
          });

        });
    </script>
```

### Using Event Handler Arguments

Each Kendo UI widget passes a single argument to the event handler&mdash;the so-called "event object". Usually, it has one or more fields which contain specific information for the event. All event objects have a `sender` field which provides a reference to the widget instance that triggered the event. Passing additional custom event arguments to the handler is not supported. The full list and examples of the widget events and the fields in the event objects is available in the [API reference](/api/javascript/kendo) section.

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {

          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ],
              open: function(e) {
                var autocomplete = e.sender;
              }
          });

        });
    </script>
```

### Preventing Events

Certain widget events can be prevented by calling the `preventDefault` method of the event object. The effect of the event prevention is specific for each event and is documented in the [API reference](/api/javascript/kendo).

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {
          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ]
          });

          var autoComplete = $("#animal").data("kendoAutoComplete");

          // prevent the autocomplete from opening the suggestions list
          autoComplete.bind('open', function(e) {
            e.preventDefault();
          });
        });
    </script>
```

### Unbinding from Events

To unbind from a specific event, keep a reference to the event handler function and invoke the `unbind` method with it. Note that calling the `unbind` method without any argument unbinds all event handlers from the event.

```
    <p>Animal: <input id="animal" /></p>

    <button id="unbindButton">Unbind event</button>

    <script>
        $(function() {
          var handler = function(e) { console.log(e); };
          $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

          var autoComplete = $("#animal").data("kendoAutoComplete");

          autoComplete.bind("open", handler);

          $("#unbindButton").on("click", function() {
              autoComplete.unbind("open", handler);
          });
        });
    </script>
```

## Known Limitations

Kendo UI does not fire an event when the corresponding method is invoked. For example, the `select` event of the Kendo UI PanelBar widget is not fired if you call the `select` method through the API.

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
