---
title: Call Widget Methods and Bind to Widget Events
page_title: Call widget methods and bind to widget events
description: Learn how to obtain a reference to an initialized Kendo UI widget instance and call its methods and events
position: 3
---

In addition to the initialization configuration options, each Kendo UI widget instance features **methods** and **events**,
which may be used to query or modify its state during run time. In order to use them, you should obtain a reference to the widget instance first.

## Obtain a Reference to a Kendo UI widget Instance Using jQuery

To get a reference to a widget instance, use the [jQuery data](http://api.jquery.com/data/) method and
pass the plugin name as a *string* (the Kendo UI widgets are jQuery plugins).

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

To get a reference to a widget instance, you may also use the `getKendo<WidgetName>` method.

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

> The jQuery convention of returning the selected DOM element(s) applies to widget initialization plugin methods too.
This means that the plugin method (e.g. `kendoAutoComplete()`) **does not return the widget instance**, but the jQuery selector that the method was used on.

Once the widget instance is available, you can call its methods using the standard JavaScript method syntax:

        <p>Animal: <input id="animal" /></p>

        <script>
            $(function() {
              $("#animal").kendoAutoComplete({ dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ] });

              var autoComplete = $("#animal").data("kendoAutoComplete");

              // focus the widget
              autoComplete.focus();
            });
        </script>

> A complete list and examples of the widget methods and method parameters is available in the [API reference](/api/introduction) section.

## Bind to Widget Events

Each widget exposes different events, depending on its features - for example, the `AutoComplete` widget triggers `change`, `close`, `dataBound`, etc.
You may pass event handlers when you instantiate the widget, or afterwards.

### Bind to Events during Widget Initialization

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

Event handlers, which are attached during widget initialization, will be executed every time the event is fired.
If you need the handler to be executed only once, then attach it after widget initialization with the `one` method.

### Bind to Events after Widget Initialization

There are two methods, which all Kendo UI widgets have - **`bind`** and **`one`**. Both of them are used to attach event handlers to already existing widget instances.
The only difference is that event handlers attached with `one` will be executed only once.

    <p>Animal: <input id="animal" /></p>

    <script>
        $(function() {
        
          $("#animal").kendoAutoComplete({
              dataSource: [ "Ant", "Antilope", "Badger", "Beaver", "Bird" ]
          });
          
          // ...
          
          var autocomplete = $("#animal").data("kendoAutoComplete");
          
          // attach an event handler that will be executed each time the event is fired
          autocomplete.bind("change", function(e) {
                console.log("change event handler");
          });
          
          // attach an event handler that will be executed only the first time the event is fired
          autocomplete.one("open", function(e) {
                console.log("open event handler");
          });
          
        });
    </script>

### Event Handler Argument

Each Kendo UI widget passes **one** argument to the event handler, the so called **event object**. Usually, it has one or more fields with information specific to
the event. **All event objects have the `sender` field**, which provides a reference to the widget instance that triggered the event.

Passing additional custom event arguments to the handler is not supported.

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

> A full list and examples of the widget events and the fields available in the event objects is available in the [API reference](/api/introduction) section.

### Prevent the Effect of Certain Events

Certain widget events may be prevented by calling the `preventDefault` method of the **event object**.
The effect of the event prevention is specific for each event and is documented in the [API reference](/api/introduction).

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

### Unbind from a Widget Event

To unbind from a given event, you should keep a reference to the event handler function and invoke the `unbind` method with it.

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

> Calling the `unbind` method without a second argument **unbinds all event handlers** from the event.
