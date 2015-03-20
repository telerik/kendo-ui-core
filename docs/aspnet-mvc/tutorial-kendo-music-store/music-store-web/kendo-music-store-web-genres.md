---
title: Create the Genre Page
position: 4
---

# Create the Genre Page - Kendo UI Music Store

The Genre listing will display all the albums in a selected genre.
The albums will be limited to 20 per page, and display paging navigation at both the top and bottom.

## Displaying items in a ListView (with MVVM, templates, and binding to a remote data source)

![kendo-genre-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-genre-screenshot.png)

### Create the HTML

This view is contained in **Views/Store/Browse.cshtml**.

We start with a [Kendo UI ListView](http://demos.telerik.com/kendo-ui/web/listview/index.html) widget that will
become the container for the Albums.

    <div data-role="listview" data-bind="source: albums" data-template="album-template"></div>

The **data-role="listview"** attribute tells Kendo UI that this element will be turned into a ListView widget.
The **data-bind="source: albums"** tells the widget which property on the view model contains the data to list.
The **data-template="album-template"** indicates the name of the template to use for each Album.

Note that we are reusing the same Album template from the [Main Page](kendo-music-store-home-lists) list views
by using the same ASP.NET MVC partial on both pages. This is a great way to keep the Albums looking and
behaving consistently between the two views.

    @Html.Partial("_AlbumListTemplatePartial")

Next we will add paging support for the ListView. This is done by using the **Pager** widget.
The Pager widget is a separate widget from the ListView, which provides us the flexibility to put the pager
controls anywhere on the page. In this case, we are actually going to include two pagers, one above and one
below the ListView:

    <div data-role="pager" data-bind="source: albums"></div>
    <div data-role="listview" data-bind="source: albums" data-template="album-template"></div>
    <div data-role="pager" data-bind="source: albums"></div>

Both pagers have the attribute **data-bind="source: albums"** which is the same as the data source for the ListView.
This means that all 3 of these widgets (both pagers and the list view) are all looking at the same Kendo UI DataSource.
This is how the controls stay in sync with each other. The widgets do not communicate with each other to indicate when
the page changes. Instead, the DataSource uses the MVVM notification system to tell the controls that the page changed.

### Create the ViewModel

This code is contained in **Scripts/App/store-browse.js**.

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

Our viewModel contains 3 major pieces. The **albums** property is a Kendo UI DataSource that will read the Albums from the server.
In the code, there is a lot of configuration information passed to the DataSource constructor that sets up
server-side filtering and paging using OData.

The **viewAlbumDetails** property contains a function that will be bound to the click on each Album.
This is used to show the album details window.

The **genre** property is a placeholder to hold the Genre object that we are going to load from the server.

### Load the Selected Genre

When a Genre is selected from the main menu, the Store/Browse view is navigated to, and the selected GenreId
is passed on the query string with the parameter **?Genre=n** where 'n' is the number of the genre.
This GenreId is retrieved using a JavaScript function located in the "store.js" file, and then used to
load the record for this GenreId from the server.
This is done with a standard jQuery AJAX call, instead of using a Kendo UI DataSource:

    // Load the Genre data from the server.
    $.ajax({
        url: store.config.genresUrl + "/" + genreId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            viewModel.set("genre", data);
        }
    });

On successful response from the server, the **genre** property is set on the viewModel.
This will cause the view to update and show the genre's name.
Note that actually happens asynchronously. The page initially displays an empty &lt;h3&gt; tag
and when the JavaScript is run the element is bound to the viewModel.genre property.
If the jQuery AJAX request has not finished, this will still be null. Once the AJAX request finishes
it calls the **.set()** method on the viewModel to set the genre.
This in turn notifies the &lt;h3&gt; tag that the genre property has changed, and it updates to get the loaded genre's name.
