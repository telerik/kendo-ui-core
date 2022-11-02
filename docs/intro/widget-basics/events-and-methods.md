---
title: Methods, Events, and References 
page_title: Methods, Events, and References - Working with Components 
description: "Get started with Kendo UI for jQuery, obtain a reference to initialized component instances and call their methods and events."
previous_url: /basics/events-and-methods, /intro/events-and-methods, /intro/installation/events-and-methods
slug: widget_methodsand_events_kendoui_installation
position: 5
---

# Methods and Events

All Kendo UI components (widgets) provide methods and events that you can use to query or modify their state at runtime, and to reference existing component instances.

## Referencing Existing Component Instances

To obtain a reference to the specific component instance, either use the jQuery `data` method, or the `getKendo<WidgetName>` method.

* The Kendo UI components are jQuery plugins. A common way to get a reference to a component instance is to use the [jQuery `data`](https://api.jquery.com/data/) method with the jQuery object of the component element, and pass the plugin name as a string.

    ```
        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              // Create a new component instance.
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

              // Retrieve the component instance.
              var autoComplete = $("#animal").data("kendoAutoComplete");

              console.log(autoComplete);
            });
        </script>
    ```

* To get a reference to a component instance, you may also use the `getKendo<WidgetName>` method. Note that the jQuery convention of returning the selected DOM element applies to component initialization plugin methods too. This means that the plugin method, for example `kendoAutoComplete()`, does not return the component instance, but the jQuery object of the element.

    ```
        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              // Create a new component instance.
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

              // Retrieve the component instance.
              var autoComplete = $("#animal").getKendoAutoComplete();

              console.log(autoComplete);
            });
        </script>
    ```

* If the code which will return a component instance returns `undefined`, then the component might still not be initialized or the selector can be wrong or missing. A common example is when a component is created in a `document.ready` handler but the component instance is referenced from code that was executed earlier.

## Calling the Methods

After the component instance is available, you can call its methods by using the standard JavaScript method syntax. The complete list and examples of the component methods and method parameters is available in the [API reference](/api/javascript/kendo) section.

The following example demonstrates how to call the [`focus`](/api/javascript/ui/autocomplete/methods/focus) method of the AutoComplete.

```
        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });
              var autoComplete = $("#animal").data("kendoAutoComplete");

              // Focus the component by calling the focus() method.
              autoComplete.focus();
            });
        </script>
```

## About Kendo UI Events

By design and as a good practice, Kendo UI does not fire an event when the corresponding method is invoked. For example, the `select` event of the Kendo UI PanelBar component is not fired if you call the `select` method through the API.

You can bind events either [during component initialization](#binding-events-during-initialization) or [after component initialization](#binding-events-after-initialization).

When you work with the events of the Kendo UI components, you can also:

* [Use event handler arguments](#using-event-handler-arguments)
* [Prevent events](#preventing-events)
* [Unbind from events](#unbinding-from-events)

## Binding Events during Initialization

Event handlers which are attached during the initialization of the component will be executed every time the event is fired. To execute the handler only once, attach it [after the component initialization with the `one` method](#binding-events-after-initialization).

The following example demonstrates how to bind events during component initialization.

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

## Binding Events after Initialization

All Kendo UI components provide the `bind` and the `one` method. Both methods attach event handlers to already existing component instances but the event handlers that are attached with `one` will be executed only once.

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

## Using Event Handler Arguments

Each Kendo UI component passes a single argument to the event handler&mdash;the so-called "event object". Usually, it has one or more fields which contain specific information for the event. All event objects have a `sender` field which provides a reference to the component instance that triggered the event. Passing additional custom event arguments to the handler is not supported. The full list and examples of the component events and the fields in the event objects is available in the [API reference](/api/javascript/kendo) section.

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

## Preventing Events

Certain component events can be prevented by calling the `preventDefault` method of the event object. The effect of the event prevention is specific for each event and is documented in the [API reference](/api/javascript/kendo).

```
    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {
          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ]
          });

          var autoComplete = $("#animal").data("kendoAutoComplete");

          // Prevent the AutoComplete from opening the suggestions list.
          autoComplete.bind('open', function(e) {
            e.preventDefault();
          });
        });
    </script>
```

## Unbinding from Events

To unbind from a specific event, keep a reference to the event handler function and invoke the `unbind` method with it. Note that calling the `unbind` method without any argument unbinds all handlers for all events.

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
              //unbind open event of the AutoComplete
              autoComplete.unbind("open", handler);
          });
        });
    </script>
```

## See Also

* [Creating Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
