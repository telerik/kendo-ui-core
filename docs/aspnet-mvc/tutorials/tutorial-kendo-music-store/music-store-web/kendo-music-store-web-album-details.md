---
title: Display Album Details
page_title: Display Album Details | Music Store Web App Tutorial
description: "Learn how to display the album details in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: displayalbumdetails_muscistorewebapp_aspnetmvc
position: 5
---

# Display Album Details

When an album is clicked from any page, the album details are shown in a popup window. It enables users to change the quantity, to order and add the album to the shopping cart. More than one album details window can be opened at once, and they can be dragged around the screen.

**Figure 1. A snapshot of the Kendo UI Music Store Album Details window**

![kendo-album-details-window](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-album-details-window.png)

## Configuration

### Call the Common Function

The album details can be opened from three places in the Kendo UI Music Store project. These are:

* The Main page.
* The Genre list.
* The Search AutoComplete dropdown.

All three call the `store.viewAlbumDetails()` common function and pass the ID of the album to display.

The `store` is an object held in the global scope that contains a variety of common operations that apply to the entire Music Store. The `store.js` file is included in the `_Layout.cshtml` page, so it is available in all the views.

### Load the Album Data

The `viewAlbumDetails()` function makes a jQuery AJAX call to load the album from the WCF Data Service.

###### Example

        viewAlbumDetails = function (albumId) {
            $.ajax({
                url: config.albumsUrl + "(" + albumId + ")",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    _openWindow("#album-details-template", _getAlbumDetailsViewModel(data));
                }
            });
        }

<!--_-->
### Create the View Model

Upon completing the AJAX request, the `store._createAlbumDetailsViewModel()` function is called. This method takes the album record returned from the server, and returns an object that is used as the view model for the details window.

###### Example

        _createAlbumDetailsViewModel = function (data) {
            return kendo.observable({
                quantity: 1,
                data: data,
                total: function() {
                    return this.get("data.Price") * this.get("quantity");
                },
                updateQty: function(e) {
                    this.set("quantity", e.sender.value());
                },
                addToCart: function(e) {
                    cart.addToCart(this.data, this.quantity);
                    var window = $(e.target).parents(".k-window-content").data("kendoWindow");
                    if (window) {
                        window.close();
                    }
                }
            });
        }

<!--_-->
The View Model for the details popup window contains:

* The `quantity` field represents the number of albums to add to the cart, and is defaulted to `1`.
* The `data` field contains the album object that was returned from the server.
* The `total` is a calculated field, and returns the album price multiplied by the selected quantity. It uses the `.get()` method on the Kendo UI `observable` to retrieve the price and quantity. If either of these values changes, the bound view is notified that the `total()` function needs to be re-executed to get an updated value. If you simply use `"return data.Price * this.quantity;"`, then the view will not be updated when the quantity is changed.
* The `addToCart` field is a handler for the **Add to Cart** button on the **Details** window. This also performs the action of automatically closing the window.

### Display the Window

The `store._openWindow()` function is called with the created view model object, and performs the action of creating the Kendo UI Window widget.

Users need to be able to open more than one window at a time. Normally, you would have a `<div>` element for the window and create a Kendo UI Window widget by selecting it with a jQuery selector and calling `.kendoWindow()` on it. However, this would only work for creating a single window. Instead, add a new `<div>` element for each window that is opened. Also, when the window is closed, remove the `<div>`.

###### Example

      _openWindow = function (template, viewModel) {
          // Create a placeholder element.
          var window = $(document.createElement('div'));

          // Apply template to the placeholder element, and bind the viewmodel.
          var templateHtml = $(template).html();
          window.html(kendo.template(templateHtml)(viewModel));
          kendo.bind(window, viewModel);

          // Add window placeholder to the body.
          $('body').append(window);

          // Turn placeholder into a Window widget.
          window.kendoWindow({
              width: config.albumDetailsWindowWidth,
              title: viewModel.data.Title,
              resizable: false,
              close: function () {
                  // When the window is closed, remove the element from the document.
                  window.parents(".k-window").remove();
              }
          });

          // Center and show the Window.
          window.data("kendoWindow").center();
          window.data("kendoWindow").open();
      }

<!--_-->
This function starts by creating the new `<div>` element. Then, a Kendo UI template is used to put the contents of the window into the `<div>` element. The `template` parameter passed to this method is the element `id` for the template that will be used as the window contents.

###### Example

    var templateHtml = $(template).html();

The code from above reads the contents of the template into the `templateHtml` variable.

###### Example

    window.html(kendo.template(templateHtml)(viewModel));

The `kendo.template(templateHtml)` function processes the HTML from the template, and returns another function that can be used to apply the view model to the template. The subsequent `(viewModel)` passes the `viewModel` into the function that will apply it to the template. This performs the replacements on the template.

###### Example

    <span>#: data.Title #</span>

The code above will result in the code from the example below.

###### Example

    <span>Rock</span>

Here, the `viewModel.Data.Name` property is `"Rock"`. The final `window.html()` function call takes the result of the processed template, and sets it as the contents of the window element.

At this point the window element can be appended to the end of the page.

###### Example

    $('body').append(window);

Now the element and its contents are part of the DOM, but they are still plain HTML.

The example below demonstrates how to turn the element into a Kendo UI Window widget.

###### Example

    // Turn placeholder into a Window widget.
    window.kendoWindow({
        width: config.albumDetailsWindowWidth,
        title: viewModel.data.Title,
        resizable: false,
        close: function () {
            // When the window is closed, remove the element from the document.
            window.parents(".k-window").remove();
        }
    });

The `close` event is being used to detect when the window closes, either by adding an album to the cart or by the user's clicking the **X** button. Then, it finds the originally added element and removes it from the DOM.

Finally, the window is positioned and shown. In this example, call `window.center()` to place the window in the middle of the screen. You can also calculate an actual `X` and `Y` coordinate to position the window at.

###### Example

    // Center and show the Window.
    window.data("kendoWindow").center();
    window.data("kendoWindow").open();

### Handle Changes in Quantity

One of the features of the album details window is that it enables users to change the quantity through implementing a [Kendo UI NumericTextBox widget](http://demos.telerik.com/kendo-ui/web/numerictextbox/index.html). It uses an MVVM bound input box as the base element for the number box.

###### Example

    <input type="number" value="1" min="1" max="100" data-role="numerictextbox" data-decimals="0" data-format="n0" data-bind="value: quantity, events: { spin: updateQty }" />

The example specifies a `min` and `max` value, the number of decimal places, and a general formatting string. The `spin` event is fired when the user clicks either the `Up` or `Down` arrow, which then calls the `updateQty()` function on the view model and sets the value of the quantity property on the view model.

###### Example

                updateQty: function(e) {
                    this.set("quantity", e.sender.value());
                }

Since the `total` function previously used the `.get("quantity")` MVVM method, view elements that are bound to `total` are notified that they need to update. This displays the `total` to users to update.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
