---
title: Custom Shopping Cart Menu Widget
position: 8
---

# Custom Shopping Cart Menu Widget - Kendo UI Music Store

Inevitably at some point in a project you will come across a feature that you need to implement that doesn't seem
to fit a standard Kendo UI Widget. In the Music Store sample project, this is the case with the shopping cart
embedded in a menu item. The UI designer for the project drafted this screen mockup:

![kendo-cart-menu-mockup](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-cart-menu-mockup.png)

The first reaction was "That isn't any of the standard Kendo UI widgets... this is going to be hard!"
It turns out, it wasn't actually too difficult.

![kendo-cart-menu-mockup](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-cart-menu-screenshot.png)

Instead of trying to use the standard Kendo UI Menu widget and getting the "Total" and "Checkout" as the last item,
we took the approach of making a custom Kendo UI Widget. This "cart menu" widget is actually more of a
"composite widget" because it is one widget composed of others (a Menu and a ListView).

## Cart Menu Widget Functionality

These are the features that we want the Cart Menu widget to support:

* Works like a dropdown menu of cart items.
* Indicates number of items in cart on main menu element.
* Each album in cart has a "remove" button.
* Shows album total price in dropdown.
* Widget is bound to a DataSource.
* Main button flashes orange for a moment when an item is added to the cart (when the DataSource is changed).
* Provides a button to proceed to checkout screen.

## Boilerplate Custom Widget

> For more information on creating a custom widget, Burke Holland has a couple excellent blog posts on the Kendo UI blog:
> [Creating Custom Kendo UI Plugins](http://blogs.telerik.com/kendoui/posts/12-04-03/creating_custom_kendo_ui_plugins)
> and [Creating a DataSource Aware Kendo UI Widget](http://blogs.telerik.com/kendoui/posts/12-04-10/creating_a_datasource_aware_kendo_ui_widget)

The JavaScript code for the cart menu widget is in the file **Scripts/App/kendo-cart-menu-widget.js**.

First we need to extend the base Widget class in the kendo.ui namespace.

    (function($) {
        var CartMenu = kendo.ui.Widget.extend({
            // method called when a new widget is created
            init: function (element, options) {
                var that = this;
                kendo.ui.Widget.fn.init.call(that, element, options);
            }

            // options that are available to the user when initializing the widget
            options: {
                name: "CartMenu"
            }
        });

        // Register CartMenu as a Kendo Plugin.
        kendo.ui.plugin(CartMenu);
    })(jQuery);

We start by calling **kendo.ui.Widget.extend()** and passing in an object with the properties and functions that we want our widget to contain.
This Kendo UI method builds a new Kendo UI Plugin object with the correct prototype that also contains the properties and functions we defined.
This created widget object is then passed to **kendo.ui.plugin()** to register it in Kendo UI collection of plugins.

## Use the Widget in HTML.

With our widget now registered with Kendo UI, we can create an HTML element that will become the Cart Menu.
We are basing the Cart Menu on a &lt;ul&gt; element, since it will behave much like a regular Kendo UI Menu widget.

    <ul id="cart-menu"></ul>

In the JavaScript for the page, we initialize the widget just like any other:

    $("#cart-menu").kendoCartMenu();

Note that The function name to initialize the widget is "kendo" plus the widget name that was specified in **options.name** when the widget was defined.

## Bind to a DataSource.

We need to use a DataSource that represents the shopping cart to display the cart items and the total.
To do this, we will pass the DataSource as an option when the JavaScript call is made to initialize the widget.
To be consistent with the other Kendo UI widgets, this parameter is named **dataSource**.

    $("#cart-menu").kendoCartMenu({
        dataSource: store.cart.getCart()
    });

Within the boilerplate code for the widget we had defined an **options** object:

        // options that are available to the user when initializing the widget
        options: {
            name: "CartMenu",
            autoBind: true,
            template: ""
        }

In addition, the initialization JavaScript call is passing in the object:

        {
            dataSource: store.cart.getCart()
        }

When the call to **.kendoCartMenu()** is made, the passed in options object is passed to the init function.
So when **init: function (element, options)** is called on the widget,
the **options** parameter contains the passed in object:

        {
            dataSource: store.cart.getCart()
        }

When the init function calls:

    kendo.ui.Widget.fn.init.call(that, element, options);

Kendo UI takes the options parameter and uses it to extend the widget's defined options.
When that method call returns, **this.options** will be:

        {
            name: "CartMenu",
            autoBind: true,
            template: "",
            dataSource: store.cart.getCart()
        }

In the init function, we now call:

            // initialize or create dataSource
            that._dataSource(that);

This function is defined in the widget:

        _dataSource: function (that) {
            // returns the datasource OR creates one if using array or configuration
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            // bind to the change event to refresh the widget
            that.dataSource.bind("change", function () {
                that._refresh();
            });

            // trigger a read on the dataSource if one hasn't happened yet
            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        }

This starts by making a call to **kendo.data.DataSource.create()** and passes in the options.
This Kendo UI function will look at the options object and return the dataSource, if it contains one.
If the options object did not contain a dataSource then a new empty DataSource is created and returned.

Next we bind the **\_refresh()** function to the "change" event on the dataSource.
This means any time the shopping cart data source changes, the **\_refresh()** method will be called.

Finally, we check to see if the "autoBind" option is set. If it is, we perform a **fetch()** against the datasource.
Implementing an option named **autoBind** is not required but is common practice for any widget that is binding to a data source.

At this point, a reference to the passed in data source is saved as **that.dataSource** and the **\_refresh()** function
will be called whenever that data source changes.

## Create the Composite Widgets.

Now we are ready to implement the widget's functionality.
The **init** function is called when the widget is created, and should perform any work needed to create the widget including manipulating any DOM elements.
For this widget, we are going to turn the targeted element into a normal Kendo UI Menu that contains a drop down item.
We do this in the init function:

        // method called when a new widget is created
        init: function (element, options) {
            var that = this;
            kendo.ui.Widget.fn.init.call(that, element, options);

            // create default template
            // Note that the element with class="k-delete-button" will automatically be wired by Kendo to delete the corresponding item from the dataSource.
            that.template = kendo.template(that.options.template || '<li><span>#=Album.Title#</span><span class="k-icon k-i-close k-delete-button"></span></li>');

            // append menu elements
            that._menu = $(element);
            var subMenu = $("<li><span class='cm-count'></span><ul><li><div class='k-content'><ul></ul><div class='cm-checkout'><span class='cm-total'>Total: <span class='cm-amount'></span></span><a href='/ShoppingCart/' class='k-button'>Checkout</a></div></div></li></ul></li>");
            that._menu.append(subMenu);

            // initialize or create dataSource
            that._dataSource(that);

            // init composite widgets
            that._listView = that._menu.find(".k-content > ul");
            that._menu.kendoMenu();
            that._listView.kendoListView({
                dataSource: that.dataSource,
                template: that.template
            });
        }

This gets the targeted &lt;ul&gt; element using **$(element)** and saves a reference to it in **that.\_menu** so we can use it in later functions.
It then appends the rest of the contents for the menu to the element with **that.\_menu.append(subMenu)**.

    <li>
      <span class='cm-count'></span>
      <ul>
        <li>
          <div class='k-content'>
            <ul></ul>
            <div class='cm-checkout'>
              <span class='cm-total'>Total: <span class='cm-amount'></span></span>
              <a href='/ShoppingCart/' class='k-button'>Checkout</a>
            </div>
          </div>
        </li>
      </ul>
    </li>

The appended HTML follows the normal layout for a Kendo UI Menu drop down panel.
Inside that panel, we include the other elements we need to hold our displayed data:

This element will be displayed as the menu item, and will be set to the number of items in the cart.

    <span class='cm-count'></span>

This list element will become a Kendo UI ListView widget that lists each item in the cart:

    <ul></ul>

The span with class cm-amount will show the total price for the items in the cart.

    <span class='cm-total'>Total: <span class='cm-amount'></span></span>

This anchor tag is the Checkout button that will proceed to the store's checkout page:

    <a href='/ShoppingCart/' class='k-button'>Checkout</a>

After manipulating the DOM elements we make standard Kendo UI method calls to initialize these elements as Kendo UI widgets:

            that._menu.kendoMenu();
            that._listView.kendoListView({
                dataSource: that.dataSource,
                template: that.template
            });

Note that we are binding our ListView to the same DataSource that was originally passed to the Cart Menu widget.

## Update the Display

We update the displayed items to the user whenever the DataSource changes within the **\_refresh()** function.
This function is bound to the data source's "change" event.

        _refresh: function () {
            var albums = this.dataSource.view();

            // update total price
            var totalPrice = this.dataSource.aggregates().Total ? this.dataSource.aggregates().Total.sum : 0;
            var totalElement = $(this.element).find(".cm-amount");
            totalElement.text(kendo.toString(totalPrice, "c"));

            // set the menu item text to the number of cart items.
            $(this.element).find('.cm-count').text(albums.length);

            // flash the menu item if the cart has items.
            if (albums.length > 0) {
                //$(this.element).css('background-color', 'rgba(251, 176, 59, 1)');
                this._animate_bg($(this.element), 1, this._animate_bg);
            }
        }

Here we use jQuery to update the text of our total price element, display the total number of items in the cart,
and call **\_animate\_bg()** to cause the top level menu element to flash orange for a moment.

## Remove Albums from the Cart.

Each cart item displayed in the cart is displayed in a Kendo UI ListView widget and is bound to the cart's DataSource.
They are rendered using the template:

    <li><span>#=Album.Title#</span><span class="k-icon k-i-close k-delete-button"></span></li>

The second &lt;span&gt; element represents the remove button, and has the following css classes:

**k-icon** and **k-i-close** indicate that this element will be a Kendo UI Icon and that the close icon is to be displayed in this element. See: [Styling / Icons](http://demos.telerik.com/kendo-ui/web/styling/icons.html)

**k-delete-button** indicates that this is a delete button.
Within a ListView widget, elements of this special class *automatically* become a button that deletes the item from the bound DataSource.
Note that we do not define any click event handler for this element in the widget.
The removal from the DataSource is wired up automatically by the ListView widget.
