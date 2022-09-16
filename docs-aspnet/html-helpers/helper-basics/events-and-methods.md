---
title: Methods and Events
page_title: Methods and Events
description: "Get started with Telerik UI for {{ site.framework }}, obtain a reference to initialized helper instances, and call their methods and events."
slug: methodevents_core
previous_url: /getting-started/helper-basics/events-and-methods 
position: 3
---

# Methods and Events

The client objects of the Telerik UI for {{ site.framework }} helpers provide methods and events that you can use to query or modify their state at runtime.

## Using Methods

To use the methods of the helpers, you have to obtain a reference to the specific helper instance through any of the following approaches:

* [Using the jQuery `data` method](#the-jquery-data-method)
* [Using the `getKendo<WidgetName>` method](#the-getkendo-method)
* [Using the standard JavaScript method syntax](#the-javascript-method-syntax)

### The jQuery data Method

To get a reference to a helper instance, use the [jQuery `data`](http://api.jquery.com/data/) method and pass the plugin name as a string (the Kendo UI widgets wrapped by Telerik UI for {{ site.framework }} are jQuery plugins).

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }

    <kendo-autocomplete name="animals" bind-to="animals_data">
    </kendo-autocomplete>
```
{% endif %}
```script
    $(document).ready(function () {
        // Retrieve the helper instance.
        var autoCompleteWidget = $("#animals").data("kendoAutoComplete");
        console.log(autoCompleteWidget);
    });
```

### The getKendo Method

To get a reference to a helper instance, you may also use the `getKendo<WidgetName>` method.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data">
    </kendo-autocomplete>
```
{% endif %}
```script
    $(document).ready(function () {
        // Retrieve the helper instance.
        var autoCompleteWidget = $("#animals").getKendoAutoComplete();
        console.log(autoCompleteWidget);
    });
```

### The JavaScript Method Syntax

After the helper instance is available, you can call its methods by using the standard JavaScript method syntax. The complete list and examples of the widget methods and method parameters is available in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo) section. If the code which will return a helper instance returns `undefined`, then the helper is not yet initialized. Such a problem may occur, for example, if an instance is referenced from code that was executed earlier than the `document.ready` handler.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data">
    </kendo-autocomplete>
```
{% endif %}
```script
    $(document).ready(function () {
        // Retrieve the helper instance when it is available.
        var autoCompleteWidget = $("#animals").data("kendoAutoComplete");
        // Focus the AutoComplete.
        autoCompleteWidget.focus();
    });
```

## Handling Widget Events

Depending on its specific features, each component exposes different events. For example, the AutoComplete helper triggers `Change`, `Close`, `DataBound`, and so on. You can pass event handlers either [during the helper initialization](#binding-events-during-initialization) or [after the helper initialization](#binding-events-after-initialization). When you work with the events of the Telerik UI for {{ site.framework }} helpers, you can also [use event handler arguments](#using-event-handler-arguments), [prevent events](#preventing-events), and [unbind from events](#unbinding-from-events).

### Binding Events during Initialization

Event handlers which are attached during the initialization of the helper will be executed every time the event is fired.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data" on-change="onChange">
    </kendo-autocomplete>
```
{% endif %}
```script
    function onChange(e) {
        console.log("change event handler");
    }
```

### Binding Events after Initialization

All helpers provide the `bind` and the `one` method. Both methods attach event handlers to already existing helper instances but the event handlers that are attached with `one` will be executed only once.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
              "Ant",
              "Antilope",
              "Badger"
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data">
    </kendo-autocomplete>
```
{% endif %}
```script
    $(document).ready(function () {

        var autoCompleteWidget = $("#animals").data("kendoAutoComplete");

        // Attach an event handler that will be executed each time the event is fired.
        autoCompleteWidget.bind("change", function(e) {
            console.log("change event handler");
        });

        // Attach an event handler that will be executed only the first time the event is fired.
        autoCompleteWidget.one("open", function(e) {
            console.log("open event handler");
        });
    });
```

### Using Event Handler Arguments

Each helper passes a single argument to the event handler&mdash;the so-called "event object". Usually, it has one or more fields which contain specific information for the event. All event objects have a `sender` field which provides a reference to the helper instance that triggered the event. Passing additional custom event arguments to the handler is not supported. The full list and examples of the widget events and the fields in the event objects is available in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo) section.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data" on-change="onChange">
    </kendo-autocomplete>
```
{% endif %}
```script
    function onChange(e) {
        var autoCompleteWidget = e.sender;
    }
```


### Preventing Events

Certain helper events can be prevented by calling the `preventDefault` method of the event object. The effect of the event prevention is specific for each event and is documented in the [API reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo).

```HtmlHelper
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
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data" on-open="onOpen">
    </kendo-autocomplete>
```
{% endif %}
```script
    function onOpen(e) {
        e.preventDefault();
    }
```

### Unbinding from Events

To unbind from a specific event, keep a reference to the event handler function and invoke the `unbind` method with it. Note that calling the `unbind` method without any argument unbinds all event handlers from the event.

```HtmlHelper
    <button id="unbindButton">Unbind event</button>

    @(Html.Kendo().AutoComplete()
        .Name("animals")
        .BindTo(new string[] {
            "Ant",
            "Antilope",
            "Badger"
        })
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var animals_data = new List<string>() { "Ant", "Antilope", "Badger" };
    }
    
    <kendo-autocomplete name="animals" bind-to="animals_data">
    </kendo-autocomplete>
```
{% endif %}
```script
    $(document).ready(function () {

        var handler = function (e) { console.log(e); };

        var autoCompleteWidget = $("#animals").data("kendoAutoComplete");

        autoCompleteWidget.bind("open", handler);

        $("#unbindButton").on("click", function () {
            autoCompleteWidget.unbind("open", handler);
        });
    });
```

## Known Limitations

Telerik UI for {{ site.framework }} does not fire an event when the corresponding API method is invoked. For example, the `Select` event of the [PanelBar helper]({% slug htmlhelpers_panelbar_aspnetcore %}) is not fired if you call the [`select` method through the API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar/methods/select).

## See Also

{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [Starting a new Telerik UI project from a template]({% slug gettingstarted_aspnetmvc %})
* [Manually adding the Telerik controls to an existing application]({% slug manualsetup_aspnetmvc%})
{% endif %}