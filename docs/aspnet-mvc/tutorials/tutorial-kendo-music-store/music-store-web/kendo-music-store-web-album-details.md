---
title: Display Album Details
position: 5
---

# Display Album Details - Kendo UI Music Store

When an Album is clicked from any page, the album details are shown in a popup window.
This window gives the user the ability to change the quantity, order and add the album to the cart.
More than one album details window can be opened at once, and they can be dragged around the screen.

![kendo-album-details-window](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-album-details-window.png)

## Call a Common Function

The album details can be opened from 3 places in the Music Store: the Main page, the Genre list, and the Search AutoComplete dropdown.
All 3 of them call one common function: **store.viewAlbumDetails()** and pass the ID of the album to display.

The **store** is an object held in the global scope that contains a variety of common operations that apply to the entire Music Store.
The store.js file is included in the _Layout.cshtml page, and so is available in all the views.

## Load the Album Data

The **viewAlbumDetails()** function makes a jQuery AJAX call to load the Album from the WCF Data Service:

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

## Create View Model

Upon completion of the AJAX request, the **store._createAlbumDetailsViewModel()** function is called.
This method takes the Album record returned from the server, and returns an object that will be used as the view model for the details window.

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

The View Model for the details popup window contains:

**quantity** represents the number of albums to add to the cart, and is defaulted to 1.

**data** contains the Album object that was returned from the server.

**total** is a calculated field, and returns the album price multiplied by the selected quantity. It uses the **.get()** method
on the Kendo UI observable to retrieve the price and quantity; if either of those values changes, the bound view will be notified
that the **total()** function needs to be re-executed to get an updated value. If we had simply used "return data.Price * this.quantity;"
then the view would not be updated when the quantity is changed.

**addToCart** is a handler for the Add to Cart button on the details window. This also performs the action of automatically closing the window.

## Display the Window

The **store._openWindow()** function is called with the created view model object, and performs the action of creating the Kendo UI Window widget.

We want to be able to open more than 1 window at a time. Normally, we would have a &lt;div&gt; element for the window and create a Kendo UI Window widget by
selecting it with a jQuery selector and calling **.kendoWindow()** on it. However, this would only work for creating a single window.
Instead, we had to add a new &lt;div&gt; element for each window that was opened. Also, when the window is closed, we remove the &lt;div&gt;.

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

This function starts by creating our new &lt;div&gt; element.
We then use a Kendo UI template to put the contents of the window into the div element.
The **template** parameter passed to this method is the element id for the template that will be used as the window contents.

    var templateHtml = $(template).html();

Reads the contents of the template into the **templateHtml** variable.

    window.html(kendo.template(templateHtml)(viewModel));

The **kendo.template(templateHtml)** function processes the HTML from the template, and returns another function that can be used to
apply the view model to the template. The subsequent **(viewModel)** passes the viewModel into the function that will apply it to the template.
This performs the replacements on the template. For example:

    <span>#: data.Title #</span>

would result in:

    <span>Rock</span>

where the viewModel.Data.Name property is "Rock".
The final **window.html()** function call takes the result of the processed template, and sets it as the window element's contents.

At this point the window element can be appended to the end of the page:

    $('body').append(window);

Now the element and it's contents are part of the DOM, but they are still plain HTML.
Next we turn the element into a Kendo UI Window widget:

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

The **close** event is being used to detect when the window closes, either by adding an album to the cart or the user clicks the "X" button.
It then finds the originally added element and removes it from the DOM.

Finally, the window is positioned and shown. In this sample, we call **window.center()** to place the window in the middle of the screen.
We could have also calculated an actual X and Y coordinate to position the window at.

            // Center and show the Window.
            window.data("kendoWindow").center();
            window.data("kendoWindow").open();

## Handle the Quantity change

One of the features of the album details window is the ability to change the quantity with a
[Kendo UI Numeric Text Box](http://demos.telerik.com/kendo-ui/web/numerictextbox/index.html) widget.
This uses an MVVM bound input box as the base element for the number box:

    <input type="number" value="1" min="1" max="100" data-role="numerictextbox" data-decimals="0" data-format="n0" data-bind="value: quantity, events: { spin: updateQty }" />

We specify a **min** and **max** value, the number of decimal places, and a general formatting string.
The **spin** event is fired when the user clicks either the up or down arrow.
This then calls the **updateQty()** function on the view model, which simply sets the value of the quantity property on the view model.

                updateQty: function(e) {
                    this.set("quantity", e.sender.value());
                }

Since the **total** function previously used the MVVM method **.get("quantity")**, view elements that are bound to **total** are notified
that they need to update. This causes the total being displayed to the user to update.
