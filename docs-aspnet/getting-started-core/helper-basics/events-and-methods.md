---
title: Methods and Events
page_title: Methods and Events
description: "Get started with Telerik UI for ASP.NET Core, obtain a reference to initialized helper instances, and call their methods and events."
slug: methodevents_core
position: 3
permalink: /getting-started/helper-basics/events-and-methods
---

# Methods and Events

The client objects of all Telerik UI for ASP.NET Core helpers provide methods and events that you can use to query or modify their state at runtime.

## Using Methods

To use the methods of the helpers, you have to obtain a reference to the specific helper instance through any of the following approaches:

* [Using the jQuery `data` method](#the-jquery-data-method)
* [Using the `getKendo<WidgetName>` method](#the-getkendo-method)
* [Using the standard JavaScript method syntax](#the-javascript-method-syntax)

### The jQuery data Method

To get a reference to a helper instance, use the [jQuery `data`](http://api.jquery.com/data/) method and pass the plugin name as a string (the Kendo UI widgets wrapped by Telerik UI for ASP.NET Core are jQuery plugins).

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )

    <script>
        $(document).ready(function () {

          // Retrieve the helper instance.
          var autoComplete = $("#animals").data("kendoAutoComplete");

          console.log(autoComplete);
        });
    </script>
```

### The getKendo Method

To get a reference to a helper instance, you may also use the `getKendo<WidgetName>` method.

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )

    <script>
        $(document).ready(function () {

          // Retrieve the helper instance.
          var autoComplete = $("#animals").getKendoAutoComplete();

          console.log(autoComplete);
        });
    </script>
```

### The JavaScript Method Syntax

After the helper instance is available, you can call its methods by using the standard JavaScript method syntax. The complete list and examples of the widget methods and method parameters is available in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo) section. If the code which will return a helper instance returns `undefined`, then the helper is not yet initialized. Such a problem may occur, for example, if an instance is referenced from code that was executed earlier than the `document.ready` handler.

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )

    <script>
        $(document).ready(function () {

          // Retrieve the helper instance when it is available.
          var autoComplete = $("#animals").data("kendoAutoComplete");

          // Focus the AutoComplete.
          autoComplete.focus();
        });
    </script>
```

## Handling Widget Events

Depending on its specific features, each widget exposes different events. For example, the AutoComplete helper triggers `Change`, `Close`, `DataBound`, and so on. You can pass event handlers either [during the helper initialization](#binding-events-during-initialization) or [after the helper initialization](#binding-events-after-initialization). When you work with the events of the Telerik UI for ASP.NET Core helpers, you can also [use event handler arguments](#using-event-handler-arguments), [prevent events](#preventing-events), and [unbind from events](#unbinding-from-events).

### Binding Events during Initialization

Event handlers which are attached during the initialization of the helper will be executed every time the event is fired. To execute the handler only once, attach it after the helper initialization with the `one` method.

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
        .Events(e =>
        {
            e.Change("onChange");
        })
    )

    <script>
        function onChange(e) {
          console.log("change event handler");
        }
    </script>
```

### Binding Events after Initialization

All helpers provide the `bind` and the `one` method. Both methods attach event handlers to already existing helper instances but the event handlers that are attached with `one` will be executed only once.

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )

    <script>
        $(document).ready(function () {

          var autoComplete = $("#animals").data("kendoAutoComplete");

          // Attach an event handler that will be executed each time the event is fired.
          autoComplete.bind("change", function(e) {
                console.log("change event handler");
          });

          // Attach an event handler that will be executed only the first time the event is fired.
          autoComplete.one("open", function(e) {
                console.log("open event handler");
          });
        });
    </script>
```

### Using Event Handler Arguments

Each helper passes a single argument to the event handler&mdash;the so-called "event object". Usually, it has one or more fields which contain specific information for the event. All event objects have a `sender` field which provides a reference to the helper instance that triggered the event. Passing additional custom event arguments to the handler is not supported. The full list and examples of the widget events and the fields in the event objects is available in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo) section.

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
        .Events(e =>
        {
            e.Change("onChange");
        })
    )

    <script>
        function onChange(e) {
          var autoComplete = e.sender;
        }
    </script>
```

### Preventing Events

Certain helper events can be prevented by calling the `preventDefault` method of the event object. The effect of the event prevention is specific for each event and is documented in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo).

```
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
        .Events(e =>
        {
            e.Open("onOpen");
        })
    )

    <script>
        function onOpen(e) {
          e.preventDefault();
        }
    </script>
```

### Unbinding from Events

To unbind from a specific event, keep a reference to the event handler function and invoke the `unbind` method with it. Note that calling the `unbind` method without any argument unbinds all event handlers from the event.

```
    <button id="unbindButton">Unbind event</button>

    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
            "Ant",
            "Antilope",
            "Badger"
        })
    )

    <script>
        $(document).ready(function () {

            var handler = function (e) { console.log(e); };

            var autoComplete = $("#animals").data("kendoAutoComplete");

            autoComplete.bind("open", handler);

            $("#unbindButton").on("click", function () {
                autoComplete.unbind("open", handler);
            });
        });
    </script>
```

## Known Limitations

Telerik UI for ASP.NET Core does not fire an event when the corresponding API method is invoked. For example, the `Select` event of the PanelBar helper is not fired if you call the `select` method through the API.

## See Also

* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
