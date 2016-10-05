---
title: Add the Shopping Cart
page_title: Add the Shopping Cart | Music Store Web App Tutorial
description: "Learn how to add the Shopping Cart feature to the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: implementshoppingcart_muscistorewebapp_aspnetmvc
position: 7
---

# Add the Shopping Cart

The shopping cart for the Kendo UI Music Store is located in `Scripts\App\cart.js`. All of its functionalities are encapsulated in a single object, created by calling the `Cart()` constructor.

## Configuration

### Store Cart Data

The data for the items in the cart is held in the HTML5 Local Storage of the browser. No data is sent back to the server when items are added or removed from the cart.

Anywhere in the Music Store that the cart needs to be accessed, the `cart.getCart()` method is called. This returns a Kendo UI DataSource object that contains the cart items. It also listens for the `change` event on the DataSource and recalculates the total price for each item on change. Once the totals are updated, the cart data is also updated in the local storage.

### Use Shared Cart DataSource

By providing a DataSource to bind against for cart data, all parts of the application are provided with a way to be notified of cart data updates. For example, since the cart menu widget and cart checkout view are bound to the same dataSource, if you navigate to the **Checkout** page and remove an item from the cart, the cart menu widget immediately updates. No extra JavaScript has to be written to accomplish this. The widget is notified of the DataSource change and knows to update.

### Track the Total Price

The example below demonstrates when the `getCart()` function creates a DataSource to represent the cart data and adds an aggregate for the totals.

###### Example

    this.getCart = function () {
        if (!cartData) {
            cartData = new kendo.data.DataSource({
                data: _getCartJson(),
                change: function (data) {
                    for (var i = 0; i < data.items.length; i++) {
                        var item = data.items[i];
                        item.set("Total", item.Quantity * item.Album.Price);
                    }
                    _setCartJson();
                },
                aggregate: [{ field: "Total", aggregate: "sum" }]
            });
        }
        return cartData;
    };

<!--_-->
When an item changes, the `change` event is triggered, which calls a function that loops over all the items and sets the `Total` property on the item to the Price * Quantity.

There is also an `aggregate` defined on the DataSource that sums up the values of the `Total` properties.

The example below demonstrates how to define a convenience function on the cart that retrieves the value of the aggregate.

###### Example

    this.getTotalPrice = function () {
        // Return the aggregate of album totals.
        // When there are no albums in the cart, the '.Total' aggregate does not exist.
        var aggregates = that.getCart().aggregates();
        return aggregates.Total ? aggregates.Total.sum : 0;
    }

When the set of items in the DataSource is empty, the aggregate is not created, so you need to check for its existence before reading its value. The array of all the aggregates is retrieved by calling the `.aggregates()` function. The aggregate is then accessed by its field name, and finally its aggregate name. If the `Total` aggregate does not exist, its value is defaulted to `0` since the cart is empty.

This provides a convenient way of retrieving the total price for all items in the cart from anywhere in the Music Store by calling the `store.cart.getTotal()` function.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
