---
title: Shopping Cart Implementation
position: 7
---

# Shopping Cart Implementation - Kendo UI Music Store

The shopping cart for the Kendo UI Music Store is in **Scripts\App\cart.js**.
All the functionality for the cart is encapsulated in a single object, created by calling the **Cart()** constructor.

## Store Cart Data

The data for the items in the cart is held in the browser's HTML5 Local Storage.
No data is sent back to the server when items are added or removed from the cart.

Anywhere in the Music Store that the cart needs to be accessed, the **cart.getCart()** method is called.
This returns a Kendo UI DataSource object that contains the cart items.
It also listens for the **change** event on the DataSource and on change will recalculate the total price for each item.
Once the totals are updated, the cart data is also updated in the local storage.

## Benefits of a Shared Cart DataSource

By providing a DataSource to bind against for cart data we give all parts of the application a way to be notified
of cart data updates.
For example, since the cart menu widget and cart checkout view are bound to the same datasource, if you navigate
to the checkout page and remove an item from the cart the cart menu widget will immediately update.
No extra JavaScript has to be written to accomplish this. The widget is notified of the DataSource change and knows to update.

## Tracking the Total Price

When the **getCart()** function creates a DataSource to represent the cart data and adds an aggregate for the totals.

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

When any item changes the **change** event is triggered, which calls a function that loops over all the items
and sets the "Total" property on the item to the Price * Quantity.

There is also an **aggregate** defined on the DataSource that sums the values of the Total properties.

A convenience function is defined on the cart that retrieves the value of the aggregate:


    this.getTotalPrice = function () {
        // Return the aggregate of album totals.
        // When there are no albums in the cart, the '.Total' aggregate does not exist.
        var aggregates = that.getCart().aggregates();
        return aggregates.Total ? aggregates.Total.sum : 0;
    }

When the set of items in the DataSource is empty, the aggregate will not be created,
so we need to check for its existence before reading its value.
The array of all the aggregates is retrieved by calling the **.aggregates()** function.
The aggregate is then accessed by its field name, and finally its aggregate name.
If the "Total" aggregate does not exist, we default to 0 since the cart is empty.

This gives us a convenient way of retrieving the total price for all items in the cart from anywhere in the Music Store
by calling the **store.cart.getTotal()** function.
