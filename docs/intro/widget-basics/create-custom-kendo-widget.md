---
title: Creating Custom Components
page_title: Creating Custom Components - Working with Components 
previous_url: /howto/create-custom-kendo-widget, /framework/widgets/create-custom-kendo-widget
description: "Get started with Kendo UI for jQuery and create your own components by inheriting from the base Kendo UI widget class."
slug: createcustomkendouiwidgets_gettingstarted
position: 7
---

# Creating Custom Components

Kendo UI provides options for you to create your own components by inheriting from the base `widget` class.

## Getting Started

1. Extend the base Kendo UI `widget` class in the `kendo.ui` namespace.

    The following example demonstrates how to create variables to hold values which also helps with the minification. The entire process is wrapped in a self-executing anonymous function so as to protect the global namespace. jQuery is passed in as a reference to make sure `$` is jQuery. The component itself extends the base `widget` class so it is given the uppercase name of `MyWidget`&mdash;or whatever the name of your component is for that matter. This is generally considered a best practice when naming classes in JavaScript as opposed to regular objects.

        (function($) {
            // Shorten references to variables which is better for uglification. kendo = window.kendo,
                ui = kendo.ui,
                Widget = ui.Widget

            var MyWidget = Widget.extend({
            	// The initialization code goes here.
            });

        })(jQuery);

1. Provide an `init` method for your component. This method is called by the framework when the component is initialized. This `init` function takes two parameters. The first one is the element on which you are initializing the component. The second one is a set of options that you are going to specify shortly. These will be configuration values.

    	var MyWidget = Widget.extend({

    	    init: function(element, options) {

    	        // The base call to initialize the component.
    	        Widget.fn.init.call(this, element, options);

    	    }
    	});

1. If you are extending a component, the call to the base is what translates your component from declarative initialization or the standard imperative initialization, and merges all the base options and custom options. Declare those options right under the `init` statement. Anything that you declare in the `options` object will be available for the user to pass as either a configuration value or as a `data` attribute.

    	var MyWidget = Widget.extend({

    	    init: function(element, options) {

    	        // The base call to initialize the component.
    	        Widget.fn.init.call(this, element, options);
    	    },

    	    options: {
    	        // The name is what it will appear as the kendo namespace (that is, kendo.ui.MyWidget).
    	        // The jQuery plugin would be jQuery.fn.kendoMyWidget.
    	        name: "MyWidget",
    	        // Other options go here.
    	        ...
    	    }

    	});

1. Add the component to Kendo UI. The following example demonstrates the full boilerplate for creating your own Kendo UI component and making it available like all other Kendo UI components are.

    	(function($) {

    	    // Shorten the references to variables. This is better for uglification.
              var kendo = window.kendo,
    	        ui = kendo.ui,
    	        Widget = ui.Widget

    	    var MyWidget = Widget.extend({

    	        init: function(element, options) {

    	            // The base call to the component initialization.
    	            Widget.fn.init.call(this, element, options);

    	        },

    	        options: {
    	             // The name is what it will appear as the kendo namespace (that is, kendo.ui.MyWidget).
    	             // The jQuery plugin would be jQuery.fn.kendoMyWidget.
    	             name: "MyWidget",
    	            // Other options go here.
    	            ....
    	        }

    	    });

    	    ui.plugin(MyWidget);

    	})(jQuery);

1. To make this component DataSource- or MVVM-aware, implement some additional items. The following section discusses the process of creation a DataSource-aware component. The MVVM part is tackled later on in this article. The component that is demonstrated is a simple one that just repeats the data in the DataSource and also allows you to specify your own custom template. You can regard it as an extremely dumbed-down ListView which, for an easier handling, is named the Repeater.

    To make your component aware of a Data Source, use the created convenience method on the `DataSource` base object. The code snippet offers flexibility in the way you initialize the `DataSource` for your component. If you actually create a new `DataSource` either outside your component initialization or inline, `that.DataSource` is returned.

        that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

1. Create a new DataSource to bind the component. This step is not a must because you can set the DataSource to an array as demonstrated in the following example. If you pass this array, the `kendo.data.DataSource.create` method will create a new `DataSource` based on the data in this array and returns it to `that.dataSource`.

        $("#div").kendoRepeater({
            dataSource: ["Item 1", "Item 2", "Item 3"]
        });

1. Create a `DataSource` by specifying its configuration values inline as demonstrated in the following example. The example specifies a `DataSource` configuration but does not actually create a `DataSource` instance. The `kendo.data.DataSource.create(that.options.dataSource)` takes this configuration object and returns a new `DataSource` instance with the specified configuration.

        $("#div").kendoRepeater({
            dataSource: {
                transport: {
                    read: {
                        url: "http://mydomain/customers"
                    }
                }
            }
        });

## DataBinding Behavior of Specific Components

Certain components such as the MultiSelect, DropDownTree, Scheduler, Grid and Gantt require you to explicitly define a component-specific binder.

The following example showcases how to copy the MultiSelect binder to your own CustomMultiSelect component:

```javascript
kendo.data.binders.widget.custommultiselect = kendo.data.binders.widget.multiselect;
```

The binder definition always follows the same syntax - **kendo.data.binders.widget.[customwidgetname]** = **kendo.data.binders.widget.[widgetname]**

The code snippet must be added before the `Widget.extend` method is called:

```javascript
kendo.data.binders.widget.custommultiselect = kendo.data.binders.widget.multiselect;

ui = kendo.ui,
    Widget = ui.MultiSelect;

var MyWidget = Widget.extend({
	options: {
        name: "CustomMultiSelect"
    }
});
```

## New Components Rendering

R1 2022 introduced brand new rendering for some of our components. More information about this topic can be found in the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

In order to utilize the new styling options in your custom components, you must explicitly copy the CSS properties of the original component. 

To do so, add the following line of code before the `Widget.extend` method is called:

```javascript
// Where 'CustomMultiSelect' is the name of your own custom component and 'MultiSelect' is the name of the original Kendo UI component that you're extending.
kendo.cssProperties.propertyDictionary["CustomMultiSelect"] = kendo.cssProperties.propertyDictionary["MultiSelect"];
```

## Handling Events

1. Bind to your DataSource a `change` event and handle it. This is where you mutate your DOM based on the data read from the `DataSource`. Typically, this is done in a `refresh` method. Make it public, so that you or someone else is able to call it on the component at some point after initialization.

        // Bind to the change event to refresh the component.
        that.dataSource.bind("change", function() {
            that.refresh();
        });

  The way the component code now looks is demonstrated in the following example. Note that when you bind to the `change` event on the `DataSource`, you actually bind to the string value of `"change"`. As a best practice, assign these as constants at the top of the component, and then refer to the constant. The entire `DataSource` configuration is also moved into its own method. This is because `that` signifies the component since it is the calling object. You can reference all component properties off of the `that` object after assigning `that` to `this`.

        (function($) {

            var kendo = window.kendo,
                ui = kendo.ui,
                Widget = ui.Widget,
                CHANGE = "change";

            var Repeater = kendo.ui.Widget.extend({
                init: function(element, options) {
                    var that = this;
                    kendo.ui.Widget.fn.init.call(that, element, options);
                    // Initialize or create dataSource.
                    that._dataSource();
                },
                options: {
                    name: "Repeater"
                },
                _dataSource: function() {
                    var that = this;
                    // Returns the datasource OR creates one if using an array or a configuration.
                    that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

    				// Bind to the change event to refresh the component.
                    that.dataSource.bind(CHANGE, function() {
                        that.refresh();
                    });
                }
            });

            kendo.ui.plugin(Repeater);

        })(jQuery);
    <!--_-->

1. Fetch from the DataSource if necessary by checking for the `autoBind` configuration value of `that.options`. Then, call `that.dataSource.fetch()`. Note that `fetch` is different from `read` because it only populates the DataSource if the DataSource is not yet read from. If a `read` is previously called on `DataSource` before the component is initialized, you do not have to make the `DataSource` read again.

        _dataSource: function() {
            var that = this;

            // Returns the datasource OR creates one if using array or configuration.
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            // Bind to the change event to refresh the component.
            that.dataSource.bind(CHANGE, function() {
                that.refresh();
            });

            // Trigger read on the dataSource if one has not happened yet.
            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        }
    <!--_-->

1. Add the `autoBind` configuration to the `options` object on the component and give it a default value of `true`. All data-bound widgets in Kendo UI do `autoBind` by default.

        options: {
            name: "Repeater",
            autoBind: true
        }

## Rendering Components with Templates

1. The HTML that is output by components is rendered over the Kendo UI templates. They allow you to pre-compile HTML and inject data or expressions, which are evaluated, into the HTML and a DOM fragment is returned as an HTML string. Nearly all components in Kendo UI allow you to specify some kind of a template in addition to the default template that a component uses. To do this, first add the template to the `options` object and set its value to an empty string. Contrary to other configuration settings, do not set its default value here.

        options: {
            name: "Repeater",
            autoBind: true,
            template: ""
        }

1. Set the default value by adding a line directly under the call to the base component initialization. This pre-compiles the template passed in by the user, or uses a default template. In the case of this Repeater, write out `strong` tags wrapped in paragraphs, and then reference the `data` object, which will be a string if you pass an array of strings. If you pass objects to the template, the default template renders `[object Object]`.

       that.template = kendo.template(that.options.template || "<p><strong>#= data #</strong></p>")

## Implementing refresh Functions

1. Since you bound to the `change` method, you need to implement the `refresh` public function that will be called when `DataSource` changes or when it is called directly. Inside the `refresh` method is where you are going to mutate the DOM.

  First, call `that.dataSource.view()`, which gives you the data from the `DataSource`. Next, use  `kendoRender` and pass in a template along with the DataSource data&mdash;a.k.a. `view`. This is how Kendo UI components mutate the DOM. The `render` method applies the data to the DataSource and returns the HTML string.

        refresh: function() {
            var that = this,
                view = that.dataSource.view(),
                html = kendo.render(that.template, view);
        }

1. Set the HTML of `that.element`&mdash;the element on which you are initializing your component. If you are handling initialization on an `input` and you want to translate or wrap that `input` within a container, add that logic here before setting its HTML. The `that.element` is a jQuery wrapped element, so you can simply call the `html` method directly off of it. The final `refresh` method looks like the one demonstrated in the following example.

        refresh: function() {
            var that = this,
                view = that.dataSource.view(),
                html = kendo.render(that.template, view);

            that.element.html(html);
        }

1. Having added the final touches from the previous step, now you have a fully data-bound component. The following example demonstrates the complete code for the Repeater component.

        (function() {
            var kendo = window.kendo,
                ui = kendo.ui,
                Widget = ui.Widget,

            CHANGE = "change";

            var Repeater = Widget.extend({
                init: function(element, options) {
                    var that = this;

                    kendo.ui.Widget.fn.init.call(that, element, options);
                    that.template = kendo.template(that.options.template || "<p><strong>#= data #</strong></p>");

                    that._dataSource();
                },
                options: {
                    name: "Repeater",
                    autoBind: true,
                    template: ""
                },
                refresh: function() {
                    var that = this,
                        view = that.dataSource.view(),
                        html = kendo.render(that.template, view);

                    that.element.html(html);
                },
                _dataSource: function() {
                    var that = this;
                    // Returns the datasource OR creates one if using array or configuration object.
                    that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

                    // Bind to the change event to refresh the component.
                    that.dataSource.bind(CHANGE, function() {
                        that.refresh();
                    });

                    if (that.options.autoBind) {
                        that.dataSource.fetch();
                    }
                }
            });

            ui.plugin(Repeater);

        })(jQuery);

    <!--_-->

    The following example uses two components that are initialized. The first one takes a simple array as a `DataSource`. The second uses a remote endpoint, a template, and declarative initialization.

    ```dojo
       <div id="repeater"></div>

        <div id="container">
          <div data-role="repeater" data-source="dataSource" data-template="template"></div>
        </div>

        <script type="text/x-kendo-template" id="template">
        <div style="float: left; color: salmon; margin-right: 10px"><h1>#= data.ProductName #</h1></div>
        </script>

        <script>
          (function() {
            var kendo = window.kendo,
                ui = kendo.ui,
                Widget = ui.Widget,

                CHANGE = "change";

            var Repeater = Widget.extend({
              init: function(element, options) {
                var that = this;

                kendo.ui.Widget.fn.init.call(that, element, options);
                that.template = kendo.template(that.options.template || "<p><strong>#= data #</strong></p>");

                that._dataSource();
              },
              options: {
                name: "Repeater",
                autoBind: true,
                template: ""
              },
              refresh: function() {
                var that = this,
                    view = that.dataSource.view(),
                    html = kendo.render(that.template, view);

                that.element.html(html);
              },
              _dataSource: function() {
                var that = this;
                // Returns the datasource OR creates one if using array or configuration object.
                that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

                // Bind to the change event to refresh the component.
                that.dataSource.bind(CHANGE, function() {
                  that.refresh();
                });

                if (that.options.autoBind) {
                  that.dataSource.fetch();
                }
              }
            });

            ui.plugin(Repeater);

          })(jQuery);

          var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
          });

          kendo.bind($("#container"));

          $("#repeater").kendoRepeater({
            dataSource: [ "item1", "item2", "item3" ]
          });
        </script>

    ```

## Using MVVM

1. To make this component MVVM-aware, you need to define some events. Specifically, expose the `dataBinding` event and the `dataBound` event.

  The `dataBinding` event is what you are going to call before you mutate the DOM with your component. This enables MVVM to traverse the fragment that you are about to mutate, and unbind anything that is currently bound. The second event is the `dataBound` event, which allows MVVM to go back through the fragment, and re-bind what is necessary. These events are exposed through the `events` object on the component. These events are strings, so define them as constants in the head of the component as part of the pattern Kendo UI uses when developing Kendo UI components.

  By exposing these as events for MVVM to listen to, you have loose coupling between your component and the MVVM core engine. This means that if you do not expose these events, MVVM will not be aware of the lifecycle of the component. This is a very good architecture as it ensures that your component will not break other MVVM bindings of which it is not aware.

    	var DATABINDING = "dataBinding",
    	    DATABOUND = "dataBound",
    	    CHANGE = "change"

    	var Repeater = kendo.ui.Widget.extend({

    	    init: function(element, options) {
    	        ...
    	    },
    	    options{
    	        ...
    	    },

    	    // The events are used by other components or developers - API for other purposes.
    	    // These events support MVVM bound items in the template for loose coupling with MVVM.
    	    events: [
    	        // Call before mutating DOM.
    	        // MVVM will traverse DOM, unbind any bound elements or components.
    	        DATABINDING,
    	        // Call after mutating DOM.
    	        // Traverses DOM and binds ALL THE THINGS.
    	        DATABOUND
    	    ]
    	});

1. MVVM expects you to expose the DOM fragments from your component, which represents each row or each repeated `data` element. You must return the outermost element for MVVM to work with. While it varies, this is typically just `this.element.children`. Since each rendered template item is a DOM fragment attached to the bound element, this is all you need. Expose it for MVVM by making it available off of the items object.

    	var DATABINDING = "dataBinding",
    	    DATABOUND = "dataBound",
    	    CHANGE = "change"

    	var Repeater = kendo.ui.Widget.extend({

    	    init: function(element, options) {
    	        ...
    	    },
    	    options{
    	        ...
    	    },

    	    // The events are used by other components or developers - API for other purposes.
    	    // These events support MVVM bound items in the template. for loose coupling with MVVM.
    	    events: [
    	        // Call before mutating DOM.
    	        // MVVM will traverse DOM, unbind any bound elements or components.
    	        DATABINDING,
    	        // Call after mutating DOM.
    	        // Traverses DOM and binds ALL THE THINGS.
    	        DATABOUND
    	    ],

    	    // MVVM expects an array of DOM elements that represent each item of the datasource.
    	    // Has to be the children of the outermost element.
    	    items: function() {
    	        return this.element.children();
    	    }
    	});

1. Since it is possible to change the `DataSource` by using MVVM, you need to implement the `setDataSource` function. MVVM calls this when the `DataSource` is set inside a `ViewModel`. Set your internal `DataSource` reference equal to the one passed in by MVVM and then rebuild the `DataSource` by using the already defined `dataSource()` function.

    	// For supporting changing the datasource over MVVM.
    	setDataSource: function(dataSource) {
    	    // Set the internal datasource equal to the one passed in by MVVM.
    	    this.options.dataSource = dataSource;
    	    // Rebuild the datasource if necessary or just reassign.
    	    this._dataSource();
    	}

    <!--_-->

1. You need to make some small tweaks to your method which assigns or builds the DataSource. The `_dataSource` method that you call in `init` does three things:

    * Assigns the `DataSource`, or builds on from an array or configuration object.
    * Reads from the `DataSource`, if `autoBind` is enabled, and the DataSource is not yet read from.
    * Binds the `change` event on the `DataSource` to an internal `refresh` method that you handle manually.

    Since you have already bound the change event on the `DataSource` possibly once, make sure you unbind it if necessary. If this is not done, the component retains a list of all bindings and executes the `refresh` function numerous times. Also, MVVM will be listening to the internal `_refreshHandler` function which is not yet defined. You need to point the internal `_refreshHandler` to your publicly exposed `refresh` method. First though, check and see if a connection exists between the public `refresh`, which is bound to the `change` event on the `DataSource`, and the internal `_refreshHandler`. If a connection exists, remove just the binding to the `change` event. If a connection does not exist between your internal `_refreshHandler` and the public `refresh` function, you need to create it. This is done by the `$.proxy` jQuery method, which calls the public `refresh` with the correct context, which is the component itself. Finally, rebind to the `change` event of the `DataSource`.

    The following example implements the [`proxy`](https://api.jquery.com/jQuery.proxy/) jQuery function. `proxy` informs that when the `_refreshHandler` is called, it should execute the public `refresh` component function; inside that `refresh` function, this will be a reference to the component itself, and not something else, such as a window. Due to the fact that the value of the `this` keyword is always changing in JavaScript, this approach is a good way to ensure that the scope is correct when the `refresh` function executes.

    	_dataSource: function() {

    	    var that = this;

    	    // If the DataSource is defined and the _refreshHandler is wired up,
          // unbind because you need to rebuild the DataSource.
    	    if ( that.dataSource && that._refreshHandler ) {
    	        that.dataSource.unbind(CHANGE, that._refreshHandler);
    	    }
    	    else {
    	        that._refreshHandler = $.proxy(that.refresh, that);
    	    }

    	    // Returns the datasource OR creates one if using array or configuration object.
    	    that.dataSource = kendo.data.DataSource.create(that.options.dataSource);
    	    // Bind to the change event to refresh the component.
    	    that.dataSource.bind( CHANGE, that._refreshHandler );

    	    if (that.options.autoBind) {
    	        that.dataSource.fetch();
    	    }
    	}

    <!--_-->


1. Trigger the `dataBinding` and `dataBound` events in the public `refresh`. Note that `dataBinding` happens before you mutate the DOM and `dataBound` happens directly after that.

    	refresh: function() {
    	    var that = this,
    	        view = that.dataSource.view(),
    	        html = kendo.render(that.template, view);

    	    // Trigger the dataBinding event.
    	    that.trigger(DATABINDING);

    	    // Mutate the DOM (that is, build the component UI).
    	    that.element.html(html);

    	    // Trigger the dataBound event.
    	    that.trigger(DATABOUND);
    	}

  Now, you have a fully enabled MVVM in your component. Define the component as demonstrated in the following example.

        <div data-role="repeater" data-bind="source: dataSource"></div>
        <script>
            var viewModel = kendo.observable({
                dataSource:  new kendo.data.DataSource({
                    transport: {
                        read: "Customers/Orders",
                        dataType: "json"
                    }
                })
            });
            kendo.bind(document.body.children, viewModel);
        </script>

  Notice that the component is now bound to the `dataSource` variable inside of the `ViewModel` through `data-bind`. This means that if you add an item to the `DataSource` client-side, your component will reflect the change immediately without you having to re-render anything.

  In the following complete example, note that when you add an item to the `DataSource`, it is immediately reflected in the Repeater component.

      ```dojo
              <label for="newItem">Enter A New Item</label>
              <input id="newItem" data-bind="value: newItem" class="k-input" />
              <button class="k-button" data-bind="click: add">Add Item</button>

              <div data-role="repeater" data-bind="source: items" data-template="template"></div>

              <script type="text/x-kendo-template" id="template">
                  <div style="color: salmon; margin-right: 10px'"><h1>#= data #</h1></div>
              </script>

      <script>
      var viewModel = kendo.observable({
          items: ["item1", "item2", "item3"],
          newItem: null,
          add: function(e) {
              if (this.get("newItem")) {
                  this.get("items").push(this.get("newItem"));
              }
          }
      });

      kendo.bind(document.body, viewModel);
      </script>

      ```

## Working with Value-Bound Components

In order for a component to support [`value` binding](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value), you need to:

* Add a `value` method to the component, which sets the current `widget` value and returns the current value if no arguments are passed.
* [Trigger](https://docs.telerik.com/kendo-ui/api/javascript/ui/widget/methods/trigger) the component `change` event when the `widget` value is changed.

The following examples demonstrate how to create a simple input v that selects the value on focus.

1. Create the component and implement the functionality that you are looking for.

          (function ($) {
              var kendo = window.kendo;

              var SelectedTextBox = kendo.ui.Widget.extend({
                init: function (element, options) {
                  kendo.ui.Widget.fn.init.call(this, element, options);

                  this.element.on("focus", this._focus);
                },

                options: {
                  name: "SelectedTextBox"
                },

                _focus: function () {
                  this.select();
                },

                destroy: function () {
                  this.element.off("focus", this._focus);
                }
              });

              kendo.ui.plugin(SelectedTextBox);
          })(jQuery);

  <!--_-->
1. Add a `value` method.

          var SelectedTextBox = kendo.ui.Widget.extend({
            ...
            value: function (value) {
              if (value !== undefined) {
                this.element.val(value);
              } else {
                 return this.element.val();
              }
            }
          });

1. Trigger the `change` event.

          var SelectedTextBox = kendo.ui.Widget.extend({
            init: function (element, options) {
              ...
              this._changeHandler = $.proxy(this._change, this);
              this.element.on("change", this._changeHandler);
            },

            ...

            _change: function () {
              this.trigger("change");
            },

            destroy: function () {
              this.element.off("change", this._changeHandler);
              this.element.off("focus", this._focus);
            }
          });

  <!--_-->

The following example combines the snippets and exhibits the full code.

```dojo
    <script>
      (function ($) {
        var kendo = window.kendo;

        var SelectedTextBox = kendo.ui.Widget.extend({
          init: function (element, options) {
            kendo.ui.Widget.fn.init.call(this, element, options);

            this._changeHandler = $.proxy(this._change, this);
            this.element.on("change", this._changeHandler);
            this.element.on("focus", this._focus);
          },

          options: {
            name: "SelectedTextBox"
          },

          _change: function () {
            this._value = this.element.val();
            this.trigger("change");
          },

          _focus: function () {
            this.select();
          },

          value: function (value) {
            if (value !== undefined) {
              this.element.val(value);
            } else {
              return this.element.val();
            }
          },

          destroy: function () {
            this.element.off("change", this._changeHandler);
            this.element.off("focus", this._focus);
          }
        });

        kendo.ui.plugin(SelectedTextBox);
      })(jQuery);
    </script>

    <input type="text" data-role="selectedtextbox" data-bind="value:foo" />

    <script>
      var viewModel = kendo.observable({
        foo: "bar"
      });

      kendo.bind(document.body, viewModel);
    </script>

```

## Note on Technical Support

Custom components that inherit from Kendo UI components are not subject to technical support service, unless the question or issue can be discussed in the context of the originating component that is provided in the Kendo UI installer.

## See Also

* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
