---
title: Methods and Events
page_title: Methods and Events | Kendo UI Getting Started
description: "Obtain a reference to an initialized Kendo UI widget instance and call its methods and events."
previous_url: /basics/events-and-methods, /intro/events-and-methods, /intro/installation/events-and-methods
slug: widget_methodsand_events_kendoui_installation
position: 3
---

# Methods and Events

In addition to the initialization configuration options, each Kendo UI widget instance features methods and events that may be used to query or modify its state during run time. In order to use them, you should obtain a reference to the widget instance first.

## Get Widget Reference

### jQuery Data Method

To get a reference to a widget instance, use the [jQuery data](http://api.jquery.com/data/) method and pass the plug-in name as a string (the Kendo UI widgets are jQuery plug-ins).

###### Example

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

### getKendo* Method

To get a reference to a widget instance, you may also use the `getKendo<WidgetName>` method. Note that the jQuery convention of returning the selected DOM element(s) applies to widget initialization plug-in methods too. This means that the plug-in method, for example `kendoAutoComplete()`, does not return the widget instance, but the jQuery selector that the method was used on.

###### Example

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

### JavaScript Method

Once the widget instance is available, you can call its methods using the standard JavaScript method syntax. The complete list and examples of the widget methods and method parameters is available in the [API reference](/api/javascript/kendo) section.

###### Example

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

If the code, which should return a widget instance, returns `undefined`, this means that the widget has not been initialized yet. Such a problem may occur, for example, if a widget is being created in a `document.ready` handler, but the widget instance is being referenced from code that was executed earlier.

## Events

Depending on the its specific features, each widget exposes different events. For example, the `AutoComplete` widget triggers `change`, `close`, `dataBound`, etc. You may pass event handlers when you instantiate the widget or afterwards.

### Event Binding During Initialization

Event handlers, which are attached during widget initialization, will be executed every time the event is fired. If you need the handler to be executed only once, then attach it after the widget initialization with the `one` method.

###### Example

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

### Event Binding After Initialization

There are two methods, which all Kendo UI widgets have, namely `bind` and `one`. Both of them are used to attach event handlers to already existing widget instances. The only difference is that event handlers attached with `one` will be executed only once.

###### Example

```
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
```

### Event Handler Argument

Each Kendo UI widget passes one argument to the event handler, which is the so called "event object". Usually, it has one or more fields containing information that is specific to the event. All event objects have a `sender` field, which provides a reference to the widget instance that triggered the event.

Passing additional custom event arguments to the handler is not supported.

The full list and examples of the widget events and the fields available in the event objects is available in the [API reference](/api/javascript/kendo) section.

###### Example

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

### Prevent Events

Certain widget events may be prevented by calling the `preventDefault` method of the event object. The effect of the event prevention is specific for each event and is documented in the [API reference](/api/javascript/kendo).

###### Example

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

### Unbind from Events

To unbind from a given event, you should keep a reference to the event handler function and invoke the `unbind` method with it. Note that calling the `unbind` method without a second argument unbinds all event handlers from the event.

###### Example

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

**Combine Methods and Events**

Kendo UI does not fire an event when the corresponding method is invoked. For example, the `select` event of the Kendo UI PanelBar widget is not fired if you call the `select` method through the API.

## See Also

Other articles on Kendo UI widget basics:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
