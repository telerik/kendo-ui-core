---
title: Create the Album Search Box
position: 6
---

# Album Search - Kendo UI Music Store

![kendo-search-overview](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-search-overview.png)

The Music Store application provides an text box for searching the store by album title.
To implement this, a [Kendo UI AutoComplete Widget](http://demos.telerik.com/kendo-ui/web/autocomplete/index.html) was used.
The desire was to have the AutoComplete box query the server for albums that match the user's entered text and have
the filtering performed server-side, using a [remote DataSource](http://demos.telerik.com/kendo-ui/web/datasource/remote-data.html).
The results would then be listed with the album art, title, and artist name, and be clickable to get details about the album.

## Add the input box

We start with a normal **&lt;input&gt;** element:

    <input id="main-search"/>

Here we have assigned an ID to the element so that we can easily target it with jQuery.
Next we turn the input element into an AutoComplete widget with JavaScript:

    $("#main-search").kendoAutoComplete({
        filter: 'contains',
        minLength: 3,
        dataTextField: "Title",
        placeholder: "Search music...",
        height: 300,
        template: kendo.template($("#search-result-template").html()),

        dataSource: {
            type: "odata",
            serverFiltering: true,
            serverPaging: true,
            pageSize: store.config.searchMaxResults,
            transport: {
                read: store.config.albumsWithArtistsUrl
            },
            schema: {
                data: function (data) {
                    return data.value;
                },
                total: function (data) {
                    return data["odata.count"];
                }
            }
        },

        select: function (e) {
            e.preventDefault(); // Stop the selected item text from moving up to the AutoComplete.
            e.sender.value(""); // clear the user entered search term.
            var albumId = e.item.children("div").data("album-id");
            store.viewAlbumDetails(albumId);
        }
    });

Let's look closer at what each part of this JavaScript is doing:

**filter: 'contains'** - Specifies that AutoComplete results just need to contain the entered text, anywhere. The default is 'starts with'.

**minLength: 3** - Indicates that the AutoComplete dropdown will not display until the user has entered at least 3 characters.

**dataTextField: 'Title'** - The name of the field in the data that is searched to find AutoComplete results. In this example, we are showing AutoComplete results for albums whose titles contain the text entered by the user.

**placeholder: 'Search music...'** - This is the text that is displayed in the text box as a placeholder until the user clicks into the input box.

**dataSource: {}** - Here we configure the source for our AutoComplete data. We have specified the URL of our Albums service as the source. There is a lot going on in this data source, but most of it is enabling server-side filtering using OData.

## Customize the Dropdown Items

Each AutoComplete item in the dropdown will be a &lt;li&gt; element. Within that element, a template is used to render the result.
If not specified, Kendo UI will put the text of the field specified by the **dataTextField** property into the &lt;li&gt;.
We can use templates to make much nicer looking results. In this case, we are including the album cover art, title, and artist name.

    template: kendo.template($("#search-result-template").html())

The template property *could* be set to a string, for example **template: "foo"**, and each result would render &lt;li&gt;foo&lt;/li&gt;.
To make more intricate templates, you can use '#...#' to put in JavaScript and calculated values.

For example, a better template than "foo" would be:

    template: "<img src='#:data.AlbumArtUrl#' /><span>#:data.Title#</span><span>#:data.Artist.Name#</span>"

Here, the template is using the special value **data**.
This variable is set to the JavaScript object that this template is being generated for.
Looking at this template, we can infer that our returned JSON from the server had included search results in the format:

    {
        AlbumArtUrl: "...",
        Artist: {
            Name: "..."
        }
    }

However, even with this improved template, we are including some HTML elements in an inline string in JavaScript.
This isn't always a good maintainable approach, as it can be difficult to track down generated HTML in JavaScript.
Instead, we can use the **kendo.template()** method to render HTML from a template that was included back in the HTML body.

Including a template in the body of your HTML is done by placing the tag:

    <script type="text/x-kendo-template" id="some-template-name">...</script>

inside the &lt;body&gt; of your document. The **type** is always **"text/x-kendo-template"**, and the **id** is the unique name of your template.
The HTML for your template then goes inside the &lt;script&gt; tags. For our auto-complete search box, out template is:

    <script id="search-result-template" type="text/x-kendo-template">
        <div class="album-wide" data-album-id="#:data.AlbumId#">
            <img src="#:data.AlbumArtUrl#" />
            <div>
                <span>#:data.Title#</span>
                <span>#:data.Artist.Name#</span>
            </div>
        </div>
    </script>

You can see here that we are using the **#:...#** notation to indicate fields that need to be pulled from the JS object that is being bound to the template.
We also could have used the **#= #** notation; **&lt;span&gt;#=data.Title#&lt;/span&gt;** would have worked as well.

We are also taking advantage of ASP.NET MVC's ability to render partial pages here, and including out templates as partial pages.
In the **_Layout.cshtml** file, this template is included with the line:

    @Html.Partial("_SearchResultTemplatePartial")

If we were not using ASP.NET MVC, we could have written some additional code to load templates from external files.
For more information on remote template loading, see [How To: Load Templates from External Files](http://docs.telerik.com/kendo-ui/howto/load-templates-external-files).

Now that the template is included in the body of the page, the application code is using a jQuery selector to fetch this &lt;script&gt; element by its id and get the contents.
It then calls **kendo.template()** to process the template.

    kendo.template($("#search-result-template").html())

## Get data from the server, and server-side filtering.

Ideally, we want the server to perform the filtering for our search AutoComplete box.
Kendo UI supports both client and server side filtering, but in a real music store, we would not
want to return every album title in the store to the client. A quick breakdown of the code
to do this is:

        dataSource: {

            // We will use OData format requests.
            type: "odata",

            // Let paging and filtering happen on the server, not on the client.
            serverFiltering: true,
            serverPaging: true,

            // Set the number of records for the server to return.
            // This will be our max number of search results,
            // since we will just show the 1st "page".
            pageSize: store.config.searchMaxResults,


            transport: {
                // Set the URL to read data from
                read: store.config.albumsWithArtistsUrl
            },

            // This fixes some compatibility issues between Kendo UI and WCF Data Service OData
            schema: {
                data: function (data) {
                    return data.value;
                },
                total: function (data) {
                    return data["odata.count"];
                }
            }
        }

The **schema.data** and **schema.total** functions overcome a JSON formatting difference between Kendo UI and WCF Data Services OData.
For more information on each field set on the DataSource, also see the [DataSource documentation](http:///api/framework/datasource).

## Handling the selection of a search result

When a search result is clicked, we want to show the details for the selected album.
We do this by specifying a function to handle the **selected** event on the auto-complete box.

        // This function will be called when the user selects an item from the auto-complete result list.
        select: function (e) {
            // ... code omitted ...
        }

The first thing we will do in this case is override some of the default behavior for the AutoComplete box.
Normally, when you select something from a standard auto-complete box, the selected text is moved up into the box.
We don't need that behavior. Instead, we want to clear the user's entered text, resetting back to the "Search music..." placeholder text.
To do this, we call **preventDefault()** on the event to suppress the normal handling and **e.sender.value("")** to clear the text:

        select: function (e) {
            e.preventDefault(); // Stop the selected item text from moving up to the AutoComplete.
            e.sender.value(""); // Clear the user entered search term.

**e.sender** is the jQuery object representing the &lt;input&gt; element.
The **.value()** method is also standard jQuery, and sets the value of the &lt;input&gt; element to an empty string. This triggers Kendo UI to put the placeholder message back in place.

Next we want to display the album details to the user. To do this, we need to get the album ID.
This process was somewhat complicated. You may have noticed we added a **data-album-id** attribute to each search result on our template:

    <script id="search-result-template" type="text/x-kendo-template">
        <div class="album-wide" data-album-id="#:data.AlbumId#">

In the event object **e**, **e.item** is the &lt;li&gt; element.
Then we can use a jQuery selector to get the &lt;div&gt; element within the &lt;li&gt;, and jQuery's **.data()** method to get the value of the **data-album-id** attribute:

        select: function (e) {
            // ... code omitted ...
            var albumId = e.item.children("div").data("album-id");

Once we have the album ID, we can show our album details by calling **store.viewAlbumDetails(albumId);**, which
will be discussed in more detail later in this tutorial.
