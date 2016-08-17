---
title: Create the Checkout Page
page_title: Create the Checkout Page | Music Store Web App Tutorial
description: "Learn how to create the Checkout page in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createcheckoutpage_muscistorewebapp_aspnetmvc
position: 9
---

# Create the Checkout Page

**Figure 1. A screenshot of the Kendo UI Music Store Checkout page**

![kendo-checkout-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-checkout-screenshot.png)

Users navigate to the Checkout page when they hover over the Shopping Cart Menu and click the **Checkout** button. This provides them with a chance to review the items in their cart. Users can change quantities or remove items from the cart and review the subtotal.

## Configuration

### Create the Grid

The examples use an MVVM-bound [Kendo UI Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html) widget to render the shopping cart contents on the Checkout page. This is done by defining a `<div>` element and specifying `data-role="grid"`.

###### Example

    <div id="cart-grid"
        data-role="grid"
        data-bind="source: cartItems"
        data-row-template="rowTemplate"
        data-scrollable="false"
        data-columns="[
            'Item',
            { title: 'Price', width: '100px' },
            { title: 'Quantity', width: '100px' },
            { title: 'Remove', width: '100px' },
            { title: 'Total', width: '100px' }
        ]"></div>

The `data-bind="source: cartItems"` attribute indicates that the grid will be bound to the view model's `cartItems` property.

The `data-scrollable="false"` attribute tells the grid to display its entire contents and not create a smaller scroll box if the height gets too large.

The `data-columns` attribute contains a JSON formatted array. Each item in the array represents a column.

The `data-row-template="rowTemplate"` attribute specifies a custom row template to use for each item. The example uses a row template because it aims at customizing the layout of each row to show the album art and always show the editor for the quantity. The template is then defined as demonstrated in the example below.

###### Example

    <script id="rowTemplate" type="text/x-kendo-tmpl">
        <tr>
            <td class="album-wide">
                <img data-bind="attr: {src: Album.AlbumArtUrl }" />
                <div>
                    <span data-bind="text: Album.Title"></span>
                    <span data-bind="text: Album.Artist.Name"></span>
                </div>
            </td>
            <td data-bind="textFormatted: Album.Price" data-format="c"></td>
            <td>
                <input type="number" value="1" min="1" max="100" data-role="numerictextbox" data-decimals="0" data-format="n0" data-bind="value: Quantity, events: { spin: updateQty }" /></div>
            </td>
            <td>
                <span class="k-button" data-bind="click: remove">Remove</span>
            </td>
            <td data-bind="textFormatted: Total" data-format="c"></td>
        </tr>
    </script>

Finally, on page load the page is bound to the view model.

###### Example

    (function ($, kendo, store) {
        var cartDataSource = store.cart.getCart();

        var viewModel = kendo.observable({
            cartItems: cartDataSource,
            updateQty: function (e) {
                e.data.set("Quantity", e.sender.value());
            },
            remove: function (e) {
                this.cartItems.remove(e.data);
            },
            total: 0
        });

        kendo.bind($("#body"), viewModel);
    })(jQuery, kendo, store);

### Remove Items from the Cart

When a **Remove** button is clicked, the `remove()` function on the view model is called. The data record that is bound to that grid row is located in `e.data` and is used to remove it from the data source.

###### Example

        remove: function (e) {
            this.cartItems.remove(e.data);
        },

### Recalculate the Total

In the HTML at the bottom of the Checkout page, an element to display the subtotal and bind it to the `total` property on the view model is included.

###### Example

    <td data-bind="textFormatted: Total" data-format="c"></td>

This is using a custom binder named `textFormatted` to format the number as a currency. This custom binder is located in the `Scripts\App\kendo-custom-bindings.js` file.

When the Checkout page is loaded, include a `calcTotal()` function and bind it to the `change` event on the data source.

###### Example

    var cartDataSource = store.cart.getCart();

    var viewModel = kendo.observable({
        // ... rest of view model omitted ...
        total: 0
    });

    var calcTotal = function (e) {
        viewModel.set("total", store.cart.getTotalPrice());
    };

    cartDataSource.bind("change", calcTotal);

For any item in the cart, if the quantity is changed or removed, the `calcTotal()` function is called. This then calls `viewModel.set("total", store.cart.getTotalPrice());` which updates the `total` property on the view model to the sum of all the items. The MVVM framework then updates the element's text to show the total amount.

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
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
