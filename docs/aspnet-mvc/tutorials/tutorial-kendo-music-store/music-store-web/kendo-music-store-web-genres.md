---
title: Create the Genre Page
page_title: Create the Genre Page | Music Store Web App Tutorial
description: "Learn how to create the Genre page in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createthegenrepage_muscistorewebapp_aspnetmvc
position: 4
---

# Create the Genre Page

The **Genre** listing is going to display all albums according to a selected genre. The albums will be limited to a number of twenty per page, and display paging navigation both at top and bottom.

## Display Items in the ListView

**Figure 1. A snapshot of the Kendo UI Music Store genre lists**

![kendo-genre-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-genre-screenshot.png)

### Create the HTML

This view is contained in `Views/Store/Browse.cshtml`.

Start with a [Kendo UI ListView widget](http://demos.telerik.com/kendo-ui/web/listview/index.html) that is to become the container for the albums.

###### Example

    <div data-role="listview" data-bind="source: albums" data-template="album-template"></div>

The `data-role="listview"` attribute tells Kendo UI that this element will be turned into a ListView widget.
The `data-bind="source: albums"` tells the widget which property on the view model contains the data to list.
The `data-template="album-template"` indicates the name of the template to use for each Album.

Note that we are reusing the same Album template from the [Main Page](kendo-music-store-home-lists) list views
by using the same ASP.NET MVC partial on both pages. This is a great way to keep the Albums looking and
behaving consistently between the two views.

###### Example

    @Html.Partial("_AlbumListTemplatePartial")

<!--_-->
Next, add the paging support for the ListView. This is done by using the Pager widget. It is a separate widget from the ListView, which enables you to put the pager
controls anywhere on the page. In this case, you are going to include two pagers, one above and one below the ListView.

###### Example

    <div data-role="pager" data-bind="source: albums"></div>
    <div data-role="listview" data-bind="source: albums" data-template="album-template"></div>
    <div data-role="pager" data-bind="source: albums"></div>

Both pagers have the attribute `data-bind="source: albums"` which is the same as the data source for the ListView. This means that all there of these widgets&mdash;both pagers and the ListView&mdash;are all looking at the same Kendo UI DataSource. This is how the controls stay in sync with each other. The widgets do not communicate with each other to indicate when the page changes. Instead, the DataSource uses the MVVM notification system to tell the controls that the page changed.

### Build the ViewModel

This code is contained in `Scripts/App/store-browse.js`.

###### Example

    var viewModel = kendo.observable({

	    // Load the albums for this genre from the server
        albums: new kendo.data.DataSource({
            ...
        }),

		// This will hold our Genre object, once loaded.
        genre: null,

		// Handler for when an album is clicked.
        viewAlbumDetails: function (e) {
            store.viewAlbumDetails(e.data.AlbumId);
        }
    });

The `viewModel` contains three major pieces. The `albums` property is a Kendo UI DataSource that will read the albums from the server. In the code, there is a lot of configuration information passed to the DataSource constructor that sets up the server-side filtering and paging by using OData.

The `viewAlbumDetails` property contains a function that will be bound to the click on each album.  This is used to show the album details window.

The `genre` property is a placeholder to hold the `genre` object that you are going to load from the server.

### Load the Selected Genre

When a genre is selected from the main menu, the `Store/Browse` view is navigated to, and the selected `GenreId` is passed on the query string with the parameter `?Genre=n` where `n` is the number of the genre. This `GenreId` is retrieved by using a JavaScript function located in the `store.js` file, and then used to
load the record for this `GenreId` from the server. This is done through a standard jQuery AJAX call, instead of using a Kendo UI DataSource.

###### Example

    // Load the Genre data from the server.
    $.ajax({
        url: store.config.genresUrl + "/" + genreId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            viewModel.set("genre", data);
        }
    });

On a successful response from the server, the `genre` property is set on the `viewModel`. This will cause the view to update and show the name of the genre. Note that this happens asynchronously. The page initially displays an empty `<h3>` tag and when the JavaScript is run, the element is bound to the `viewModel.genre` property. If the jQuery AJAX request has not finished, this will still be `null`. Once the AJAX request finishes, it calls the `.set()` method on the `viewModel` to set the genre. This in turn notifies the `<h3>` tag that the genre property has changed, and it updates to get the loaded genre name.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Create the Search Box]({% slug createsearchbox_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
