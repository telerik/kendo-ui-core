---
title: Create A Custom Kendo UI Widget
previous_url: /howto/create-custom-kendo-widget
---

# Create Your Own Kendo UI Widget by Inheriting from the Base Widget Class

## The Basics

Step 1 is to extend the base Widget class in the `kendo.ui` namespace.  I also create some variables to hold values which helps with minification down the road.

### Extend The Base Widget

    (function($) {
        // shorten references to variables. this is better for uglification
        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget

        var MyWidget = Widget.extend({
        	// initialization code goes here
        });

    })(jQuery);

Notice a couple of things here.

1. The entire thing is wrapped in a self executing anonymous function so as to protect the global namespace.  jQuery is passed in as a reference to make sure $ is jQuery.

2. The widget itself extends the base Widget class so its given the Upper Case name `MyWidget` (or whatever your widget's name is).  This is generally considered best practice when naming classes in JavaScript as opposed to regular objects.

## Add An Initialization Method

You need to provide an `init` method for your widget.  This method will be called by the framework when the Widget is initialized.  This `init`
function takes 2 parameters.  The first one is the element on which you are initializing the widget.  The second is a set of options that you are
going to specify shortly.  These will be configuration values.

	var MyWidget = Widget.extend({

	    init: function(element, options) {

	        // base call to initialize widget
	        Widget.fn.init.call(this, element, options);

	    }
	});

The call to the base is what translates your widget in from [Declarative Initialization](/documentation/howto/declarative_initialization) or the standard [Imperative Initialization](/widgets) and merges all the base options (if you are extending a widget) and custom options.

Speaking of options, You are going to need to declare those right under the **init**.  Anything that you declare in the options object will be available for the user to pass as either a configuration value, or a data attribute.

### Add Options For The Widget

	var MyWidget = Widget.extend({

	    init: function(element, options) {

	        // base call to initialize widget
	        Widget.fn.init.call(this, element, options);
	    },

	    options: {
	        // the name is what it will appear as off the kendo namespace(i.e. kendo.ui.MyWidget).
	        // The jQuery plugin would be jQuery.fn.kendoMyWidget.
	        name: "MyWidget",
	        // other options go here
	        ...
	    }

	});

Last,but not least, you add the widget to Kendo UI.  Here is the full boilerplate for creating your own Kendo UI widget and making it available like all other Kendo UI widgets are.

### Custom Widget Boilerplate

	(function($) {

	    // shorten references to variables. this is better for uglification var kendo = window.kendo,
	        ui = kendo.ui,
	        Widget = ui.Widget

	    var MyWidget = Widget.extend({

	        init: function(element, options) {

	            // base call to widget initialization
	            Widget.fn.init.call(this, element, options);

	        },

	        options: {
	             // the name is what it will appear as off the kendo namespace(i.e. kendo.ui.MyWidget).
	             // The jQuery plugin would be jQuery.fn.kendoMyWidget.
	             name: "MyWidget",
	            // other options go here
	            ....
	        }

	    });

	    ui.plugin(MyWidget);

	})(jQuery);

## Using a DataSource

Now what if you wanted to make this Widget DataSource or MVVM aware? There are some additional items that you need to implement. Instead of looking at
all that here, I will go over how to create a DataSource aware widget, and I'll tackle the MVVM part next time by building on what I show you here. As
usual, I'll give you a finished widget. It's going to be a very simple widget that just repeats the data in the DataSource and also allows you to
specify your own custom template. You can think of this as an extremely dumbed down ListView. I'm going to call it the Repeater for this tutorial.

To make your widget aware of a DataSource, the first thing that we need to do is to use the create convenience method on the DataSource base object.

### Create Or Initialize DataSource

    that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

What this line does is offer you quite a bit of flexibility in the way that you initialize the DataSource for your widget. Should you actually create
a new DataSource either outside your widget initialization or inline, that DataSource will be returned. But you don't have to create a new DataSource
to bind a widget. You could simply set it's DataSource to an array. Something like this.

### DataSource As Array

    $("#div").kendoRepeater({
        dataSource: ["Item 1", "Item 2", "Item 3"]
    });

If you pass this simple array, the **kendo.data.DataSource.create** method will create a new DataSource for you based upon the data in this array and
return it to **that.dataSource**. But you can also create a DataSource just by specifying it's configuration values inline.

### DataSource As Configuration Object

    $("#div").kendoRepeater({
        dataSource: {
            transport: {
                read: {
                    url: "http://mydomain/customers"
                }
            }
        }
    });

Here I am specifying a DataSource configuration, but not actually creating an instance of one. The
**kendo.data.DataSource.create(that.options.dataSource)** will take this configuration object and return you a new DataSource instance with the
specified configuration.

Now you have provided the same flexibility that we do in our own widgets as far as the variety of ways that you can specify the **dataSource** for
this repeater.

## Handling Events

The next thing that you need to do is to bind to your DataSource **change** event and handle it. This is where you will mutate your DOM based on the
Data read from the DataSource. We typically do this in a **refresh** method. We usually make the **refresh** method public, because there is a high
probability that you or someone else may want to call that method on the widget at some point after initialization.

### Binding To The Change Event

    // bind to the change event to refresh the widget
    that.dataSource.bind("change", function() {
        that.refresh();
    });

The widget code now looks like this.

### Widget With Change Event

    (function($) {

        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            CHANGE = "change";

        var Repeater = kendo.ui.Widget.extend({
            init: function(element, options) {
                var that = this;
                kendo.ui.Widget.fn.init.call(that, element, options);
                // initialize or create dataSource
                that._dataSource();
            },
            options: {
                name: "Repeater"
            },
            _dataSource: function() {
                var that = this;
                // returns the datasource OR creates one if using array or configuration
                that.dataSource = kendo.data.DataSource.create(that.option.dataSource);

				// bind to the change event to refresh the widget
                that.dataSource.bind(CHANGE, function() {
                    that.refresh();
                });
            }
        });

        kendo.ui.plugin(Repeater);

    })(jQuery);


Notice that when you bind to the **change** event on the DataSource, you are really binding to the string value of "change". As a best practice, we
assign these as constants at the top of the widget and then refer to the constant. I also moved the entire DataSource configuration into it's own
method which I just execute. This is because **that** will be the widget since it is the calling object. I can reference all of the widget properties
off of the **that** object after assigning **that** to **this**.

We need to add one more thing to the **_dataSource** method, and this will be to fetch from the DataSource if it's necessary. We do that by checking
for the **autoBind** configuration value off of **that.options**. Then we call **that.dataSource.fetch()**. It's important to note that a **fetch** is
different from a **read** in that it will only populate the DataSource if the DataSource has not yet been read from. If a **read** has previously
been called on the DataSource before the widget was initialized, we will not be causing the DataSource to read again.

### Fetch On AutoBind


    _dataSource: function() {
        var that = this;

        // returns the datasource OR creates one if using array or configuration
        that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

        // bind to the change event to refresh the widget
        that.dataSource.bind(CHANGE, function() {
            that.refresh();
        });

        // trigger a read on the dataSource if one hasn't happened yet
        if (that.options.autoBind) {
            that.dataSource.fetch();
        }
    }

The **autoBind** configuration option doesn't exist yet, so lets add it to the **options** object on the widget and give it a default value of **true**. All DataBound widgets in Kendo UI do **autoBind** by default.

### Add AutoBind To Options

    options: {
        name: "Repeater",
        autoBind: true
    }

## Rendering The Widget With Templates

HTML output by widgets is rendered using Kendo UI Templates. Kendo UI Templates allow you to pre-compile HTML and inject data or expressions into the
HTML which are evaluated and a DOM fragment is returned as an HTML string.  Nearly all widgets in Kendo UI allow you to specify some kind of template
in addition to the default template that a widget uses.  To do this, we need to first add the template to the **options** object and set it's value to
an empty string. Contrary to other configuration settings, we won't set its default value here.

### Add Template To Options

    options: {
        name: "Repeater",
        autoBind: true,
        template: ""
    }

To set the default value, add a line directly under the call to the base widget initialization. This will pre-compile the template passed in by the
user, or use a default template. In the case of this simple repeater, I'm just going to write out **strong** tags wrapped in a paragraphs and then
reference the **data** object, which will be a string if we pass an array of strings. If I pass objects to the template, the default template will
render **[object Object]**.

### Setting The Template Default

    that.template = kendo.template(that.options.template || "<p><strong>#= data #</strong></p>")

## Implement A Refresh Function

Since we bound to the **change** method, we need to implement the **refresh** public function that will be called when the DataSource changes or when
it's called directly. Inside the **refresh** method is where I am going to mutate the DOM. The first thing to do is to call **that.dataSource.view()**
which gives us the data from the DataSource. Next, we use **kendoRender** and pass in a template along with the DataSource data (AKA **view**). This
is how Kendo UI widgets mutate the DOM. The **render** method applies the data to the DataSource and returns the html string.

### Public Refresh Function

    refresh: function() {
        var that = this,
            view = that.dataSource.view(),
            html = kendo.render(that.template, view);
    }

Lastly we simply set the HTML of **that.element**, which is the element on which we are initializing our widget. In the case that you are handling
initialization on an input and you want to translate or wrap that input with a container, you would need to add that logic here before setting it's
html. The **that.element** is a jQuery wrapped element, so we can simply call the **html** method directly off of it. The final refresh method looks
like so:

### Mutate DOM Element HTML

    refresh: function() {
        var that = this,
            view = that.dataSource.view(),
            html = kendo.render(that.template, view);

        that.element.html(html);
    }

And with that final touch, we officially have a fully data-bound widget. Here is the complete code for the **Repeater Widget**.

### Full Code For DataSource Aware Widget

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
                // returns the datasource OR creates one if using array or configuration object

                that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

                // bind to the change event to refresh the widget
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

Here is demonstration of it in action. There are two widgets initialized here. The first one takes uses a simple array as a DataSource. The second uses a remote endpoint, a template, and declarative initialization.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/burkeholland/N9DfB/embedded/result,js,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Make The Widget MVVM Aware

To make this widget MVVM aware, you need to define some events. Specifically, we need to expose the `dataBinding` event and the `dataBound` event. The
**dataBinding** event will be what we call before we mutate the DOM with our widget. This gives MVVM a chance to traverse the fragment that we are
about to mutate and unbind anything that is currently bound. The second event is the `dataBound` event, which allows MVVM to go back through the
fragment and re-bind what is necessary. These events are exposed via the events object on the widget. These events are strings, so we define them as
constants in the head of the widget as part of the pattern we use when developing all widgets.

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

	    // events are used by other widgets / developers - API for other purposes
	    // these events support MVVM bound items in the template. for loose coupling with MVVM.
	    events: [
	        // call before mutating DOM.
	        // mvvm will traverse DOM, unbind any bound elements or widgets
	        DATABINDING,
	        // call after mutating DOM
	        // traverses DOM and binds ALL THE THINGS
	        DATABOUND
	    ]
	});

By exposing these as events for MVVM to listen to, we have loose coupling between our widget and the MVVM core engine. This means that if we don’t
expose these events, MVVM simply won’t know about our widget’s lifecycle. This is a very good architecture as it ensures that your widget won’t break
other MVVM bindings that it should have no knowledge of.

### Items

MVVM will be expecting us to expose the DOM fragments from our widget which represent each row or each repeated data element. We should be returning
the outermost element for MVVM to work with. While it varies, this is typically just this.element.children. Since each template item rendered is a DOM
Fragment that is attached to the bound element, this is all we need. We can expose it for MVVM by making it available off of the items object.

### Example

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

	    // events are used by other widgets / developers - API for other purposes
	    // these events support MVVM bound items in the template. for loose coupling with MVVM.
	    events: [
	        // call before mutating DOM.
	        // mvvm will traverse DOM, unbind any bound elements or widgets
	        DATABINDING,
	        // call after mutating DOM
	        // traverses DOM and binds ALL THE THINGS
	        DATABOUND
	    ],

	    // mvvm expects an array of dom elements that represent each item of the datasource.
	    // should be the outermost element's children
	    items: function() {
	        return this.element.children();
	    }
	});

### Changing The DataSource

Since it is possible to change the DataSource with MVVM, we need to implement the **setDataSource** function. MVVM will call this when the DataSource
is set inside of a ViewModel. It’s a pretty simple implementation. We are simply going to set our internal DataSource reference equal to the one
passed in by MVVM, and then rebuild the DataSource using the already defined **_dataSource()** function.

### Example

	// for supporting changing the datasource via MVVM
	setDataSource: function(dataSource) {
	    // set the internal datasource equal to the one passed in by MVVM
	    this.options.dataSource = dataSource;
	    // rebuild the datasource if necessary, or just reassign
	    this._dataSource();
	}

### Tweak The _dataSource

We do need to make some small tweaks to our method which assigns or builds the DataSource. If you remember from the last post, the **_dataSource method** that we call in `init` does 3 things.

* Assign the DataSource, or build on from an array or configuration object.
* Read from the DataSource if autoBind is enabled and the DataSource has not yet been read from.
* Binds the change event on the DataSource to an internal **refresh** method that we handle manually.

Since we have already bound the change event on the DataSource possibly once, we need to make sure we unbind it if necessary. If this is not done, the
widget will retain a list of all the bindings and will execute the **refresh** function numerous times - which is not what we want. Also, MVVM will be
listening to the internal **_refreshHandler** function which we have not yet defined. We simply need to point that internal **_refreshHandler** to our
publicly exposed refresh method. First though, we need to check and see if there is an existing connection between the public **refresh** (which is
bound to the change event on the DataSource) and the internal **_refreshHandler**. If there is, we need to remove just the binding to the change
event. If there is no connection between our internal **_refreshHandler** and the public **refresh** function, we need to create it. This is done by
the **$.proxy** jQuery method which simply calls the public **refresh** with the correct context, which is the widget itself. Finally, we rebind to
the **change** event of the DataSource.

	_dataSource: function() {

	    var that = this;

	    // if the DataSource is defined and the _refreshHandler is wired up, unbind because
	    // we need to rebuild the DataSource
	    if ( that.dataSource && that._refreshHandler ) {
	        that.dataSource.unbind(CHANGE, that._refreshHandler);
	    }
	    else {
	        that._refreshHandler = $.proxy(that.refresh, that);
	    }

	    // returns the datasource OR creates one if using array or configuration object
	    that.dataSource = kendo.data.DataSource.create(that.options.dataSource);
	    // bind to the change event to refresh the widget
	    that.dataSource.bind( CHANGE, that._refreshHandler );

	    if (that.options.autoBind) {
	        that.dataSource.fetch();
	    }
	}

This can be a bit confusing if you haven’t used the [proxy](http://api.jquery.com/jQuery.proxy/) jQuery function before, but all it’s doing is saying
that when the **_refreshHandler** is called, it should execute the public refresh widget function and inside that refresh function, this will be a
reference to the widget itself, and not something else (like window for instance). Due to the fact that the the value of the keyword **this** is
always changing in JavaScript, this is just a good way to ensure that the scope is correct when the **refresh** function executes.

## Trigger Bound/Binding Events

Finally, we simply need to trigger the dataBinding and dataBound events.
We do this in the public refresh and remember, dataBinding happens before we mutate the DOM and dataBound happens directly after.

	refresh: function() {
	    var that = this,
	        view = that.dataSource.view(),
	        html = kendo.render(that.template, view);

	    // trigger the dataBinding event
	    that.trigger(DATABINDING);

	    // mutate the DOM (AKA build the widget UI)
	    that.element.html(html);

	    // trigger the dataBound event
	    that.trigger(DATABOUND);
	}

And with that, we have now fully enabled MVVM in our widget. This means we can now define the widget like so:

    <div data-role="repeater" data-bind="source: dataSource">
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

Notice that the widget is now bound to the **dataSource** variable inside of the ViewModel via **data-bind**. This means that if we add an item client
side to the DataSource, our widget will reflect the change immediately, without us having to re-render anything.

Here is the complete example.  Notice that when you add an item to the DataSource, it is immediately reflected in the Repeater widget.

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/burkeholland/5FYhx/embedded/result,js,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
