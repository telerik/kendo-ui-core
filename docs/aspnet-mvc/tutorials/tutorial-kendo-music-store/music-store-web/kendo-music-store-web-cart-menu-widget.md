---
title: Customize the Shopping Cart
page_title: Customize the Shopping Cart | Music Store Web App Tutorial
description: "Learn how to create a custom Shopping Cart Menu widget in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: customizeshoppingcart_muscistorewebapp_aspnetmvc
position: 8
---

# Customize the Shopping Cart

It is inevitable that at some point in a project you will need to implement a feature that does not seem to fit in a standard Kendo UI widget.

## Getting Started

In the Music Store sample project, the shopping cart embedded in a menu item is an example of such a feature.

**Figure 1. A screen mockup of the embedded shopping cart**

![kendo-cart-menu-mockup](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-cart-menu-mockup.png)

Though at first the implementation of the embedded shopping cart seemed to be tough, the figure below demonstrates it implemented in the project.

**Figure 2. The embedded shopping cart implemented in the Kendo UI Music Store web app project**

![kendo-cart-menu-mockup](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-cart-menu-screenshot.png)

Instead of trying to use the standard Kendo UI Menu widget and getting the `Total` and `Checkout` as the last items, the project opts for building a custom Kendo UI widget. This Cart Menu widget is actually more of a composite widget because it is one widget composed of others&mdash;a Menu and a ListView.

### Cart Menu Widget Functionality

The features that the Cart Menu widget is intended to support are listed below:

* Work like a dropdown menu of cart items.
* Indicate number of items in the cart on the main menu element.
* Each album in the cart has a **Remove** button.
* Show the total price of the album in a dropdown.
* The widget is bound to a DataSource.
* The main button flashes in orange for a moment when an item is added to the cart (when the DataSource is changed).
* Provide a button to proceed to the **Checkout** screen.

### Boilerplate Custom Widget

For more information on creating a custom widget, refer to Burke Holland's blog posts on [creating custom Kendo UI plugins](http://blogs.telerik.com/kendoui/posts/12-04-03/creating_custom_kendo_ui_plugins) and on [creating a DataSource-aware Kendo UI widget](http://blogs.telerik.com/kendoui/posts/12-04-10/creating_a_datasource_aware_kendo_ui_widget).

The JavaScript code for the Cart Menu widget is in the file `Scripts/App/kendo-cart-menu-widget.js`.

First, extend the base `widget` class in the `kendo.ui` namespace.

###### Example

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

Start by calling `kendo.ui.Widget.extend()` and passing in an object with the properties and functions that the widget is intended to contain. This Kendo UI method builds a new Kendo UI Plugin object with the correct prototype that also contains the properties and functions we defined. This created widget object is then passed to `kendo.ui.plugin()` to register it in Kendo UI collection of plugins.

## Configuration

### Use the Widget in HTML

Having the widget now registered with Kendo UI, create an HTML element that is to become the Cart Menu. Base the Cart Menu on a `<ul>` element since it is expected to behave much like a regular Kendo UI Menu widget.

###### Example

    <ul id="cart-menu"></ul>

In the JavaScript for the page, initialize the widget like any other.

###### Example

    $("#cart-menu").kendoCartMenu();

Note that the function name initializing the widget is `kendo` plus the widget name that is specified in `options.name` when the widget is defined.

### Bind to DataSource

To display the cart items and the total, use a DataSource that represents the shopping cart. To do this, pass the DataSource as an option when the JavaScript call is made to initialize the widget. To be consistent with the other Kendo UI widgets, the parameter is named `dataSource`.

###### Example

    $("#cart-menu").kendoCartMenu({
        dataSource: store.cart.getCart()
    });

Within the boilerplate code for the widget, an `options` object is defined.

###### Example

        // options that are available to the user when initializing the widget
        options: {
            name: "CartMenu",
            autoBind: true,
            template: ""
        }

In addition, the initialization JavaScript call is passing in the object.

###### Example

        {
            dataSource: store.cart.getCart()
        }

When the call to `.kendoCartMenu()` is made, the passed-in options object is passed to the `init` function. So, when `init: function (element, options)` is called on the widget, the `options` parameter contains the passed-in object.

###### Example

        {
            dataSource: store.cart.getCart()
        }

The example below demonstrates the calling of the `init` function.

###### Example

    kendo.ui.Widget.fn.init.call(that, element, options);

Then, Kendo UI takes the options parameter and uses it to extend the widget's defined options.

The example below demonstrates what the `this.options` will be when that method call returns.

###### Example

        {
            name: "CartMenu",
            autoBind: true,
            template: "",
            dataSource: store.cart.getCart()
        }

The example below demonstrates what to call in the `init` function.

###### Example

            // initialize or create dataSource
            that._dataSource(that);

<!--_-->
This function is defined in the widget.

###### Example

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

<!--_-->
This starts by making a call to `kendo.data.DataSource.create()` and passes in the options. This Kendo UI function looks at the options object and return the dataSource, if it contains one. If the options object does not contain a `dataSource` then a new empty `DataSource` is created and returned.

Next, bind the `\_refresh()` function to the `change` event on the `dataSource`. This means that anytime the shopping cart data source changes, the `\_refresh()` method will be called.

Finally, check to see if the `autoBind` option is set. If so, perform a `fetch()` against the datasource. Implementing an option named `autoBind` is not required but is a common practice for any widget that is binding to a data source.

At this point, a reference to the passed-in data source is saved as `that.dataSource` and the `\_refresh()` function is called whenever that data source changes.

### Create the Composite Widgets

Now, you are ready to implement the widget's functionality. The `init` function is called when the widget is created, and should perform any work needed to create the widget, including manipulating any DOM element. For this widget, turn the targeted element into a normal Kendo UI Menu that contains a drop-down item. This is done in the `init` function.

###### Example

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

<!--_-->
This gets the targeted `<ul>` element using `$(element)` and saves a reference to it in `that.\_menu` so you can use it in later functions. It then appends the rest of the contents for the menu to the element with `that.\_menu.append(subMenu)`.

###### Example

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

The appended HTML follows the normal layout of a Kendo UI Menu drop down panel. Inside that panel, include the other elements you need to hold your displayed data. This element will be displayed as the menu item, and will be set to the number of items in the cart.

###### Example

    <span class='cm-count'></span>

This list element will become a Kendo UI ListView widget that lists each item in the cart.

###### Example

    <ul></ul>

The span with the `cm-amount` class will show the total price for the items in the cart.

###### Example

    <span class='cm-total'>Total: <span class='cm-amount'></span></span>

This anchor tag is the **Checkout** button that will proceed to the **Checkout** page of the store.

###### Example

    <a href='/ShoppingCart/' class='k-button'>Checkout</a>

After manipulating the DOM elements, make standard Kendo UI method calls to initialize these elements as Kendo UI widgets.

###### Example

            that._menu.kendoMenu();
            that._listView.kendoListView({
                dataSource: that.dataSource,
                template: that.template
            });

<!--_-->
Note that the ListView is bound to the same DataSource that was originally passed to the Cart Menu widget.

### Update the Display

Update the displayed items to the user whenever the DataSource changes within the `\_refresh()` function. This function is bound to the `change` event data source.

###### Example

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

<!--_-->
Here, jQuery is used to update the text of our total price element, display the total number of items in the cart, and call `\_animate\_bg()` to cause the top level menu element to flash in orange for a moment.

### Remove Albums from the Cart

Each cart item displayed in the cart is displayed in a Kendo UI ListView widget and is bound to the DataSource of the cart. They are rendered using the template.

###### Example

    <li><span>#=Album.Title#</span><span class="k-icon k-i-close k-delete-button"></span></li>

The second `<span>` element represents the **Remove** button, and has the following `css` classes:

* The `k-icon` and `k-i-close` indicate that this element will be a Kendo UI icon and that the **Close** icon is to be displayed in this element. For more information on Kendo UI icons, refer to the [demo on styling and icons](http://demos.telerik.com/kendo-ui/web/styling/icons.html).
* The `k-delete-button` indicates that this is a **Delete** button. Within a ListView widget, elements of this special class automatically become a button that deletes the item from the bound DataSource.

Note that no click event handler is defined for this element in the widget. The removal from the DataSource is wired up automatically by the ListView widget.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
