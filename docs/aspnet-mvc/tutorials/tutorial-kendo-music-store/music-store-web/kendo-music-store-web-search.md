---
title: Create the Search Box
page_title: Create the Search Box | Music Store Web App Tutorial
description: "Learn how to create the Albums Search box in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createsearchbox_muscistorewebapp_aspnetmvc
position: 6
---

# Create the Search Box

**Figure 1. A snapshot of Kendo UI Music Store Search box functionality**

![kendo-search-overview](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-search-overview.png)

The Music Store application provides a text box for searching the store by an album title. To implement this functionality, use a [Kendo UI AutoComplete widget](http://demos.telerik.com/kendo-ui/web/autocomplete/index.html). This aims at having the AutoComplete box query the server for albums that match the entered user text and having the filtering performed server-side by applying a [remote DataSource](http://demos.telerik.com/kendo-ui/web/datasource/remote-data.html). The results are then listed together with the album art, title, and artist name, and are clickable, so that users are able to get details about the album.

## Configuration

### Add the Input Box

Start with a normal `<input>` element.

###### Example

    <input id="main-search"/>

Here an ID is assigned to the element so that you can easily target it with jQuery. Next, turn the `input` element into an AutoComplete widget by using JavaScript.

###### Example

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

These are the parts of this JavaScript and what they are doing:

* The `filter: 'contains'`&mdash;This part specifies that the AutoComplete results contain the entered text, anywhere. The default setting is `starts with`.
* The `minLength: 3`&mdash;Indicates that the AutoComplete dropdown is not displayed until the user enters at least three characters.
* The `dataTextField: 'Title'`&mdash;Shows the name of the field in the data that is searched to find AutoComplete results. In this example, the AutoComplete results for albums whose titles contain the text entered by the user are shown.
* The `placeholder: 'Search music...'`&mdash;This is the text that is displayed in the text box as a placeholder until the user clicks the input box.
* The `dataSource: {}`&mdash;This configures the source for the AutoComplete data. The example specified the URL of the Albums service as the source. There is a lot going on in this data source, but most of it is enabling server-side filtering by using OData.

### Customize the Dropdown Items

Each AutoComplete item in the dropdown will be a `<li>` element. Within that element, a template is used to render the result. If not specified, Kendo UI puts the text of the field specified by the `dataTextField` property into the `<li>`. You are able to use templates to make the results looking much nicer. In this case, include the album cover art, title, and artist name.

###### Example

    template: kendo.template($("#search-result-template").html())

The template property may be set to a string&mdash;for example `template: "foo"`&mdash;and each result would render `<li>foo</li>`. To make more intricate templates, you can use `#...#` to put in JavaScript and calculated the values.

The example below demonstrates a better template.

###### Example

    template: "<img src='#:data.AlbumArtUrl#' /><span>#:data.Title#</span><span>#:data.Artist.Name#</span>"

Here, the template is using the special `data` value. This variable is set to the JavaScript object that the template is being generated for. Looking at this template, you can conclude that the returned JSON from the server included the search results in the format.

###### Example

    {
        AlbumArtUrl: "...",
        Artist: {
            Name: "..."
        }
    }

However, even with this improved template, the example is including some HTML elements in an inline string in JavaScript. This is not always a good maintainable approach, as it can be difficult to track down generated HTML in JavaScript. Instead, you can use the `kendo.template()` method to render HTML from a template that was included back in the HTML body.

Including a template in the body of your HTML is done by placing the tag demonstrated in the example below inside the `<body>` of your document.

###### Example

    <script type="text/x-kendo-template" id="some-template-name">...</script>

The `type` is always `"text/x-kendo-template"`, and the `id` is the unique name of your template. The HTML for your template then goes inside the `<script>` tags.

The example below demonstrates the template for the auto-complete search box.

###### Example

    <script id="search-result-template" type="text/x-kendo-template">
        <div class="album-wide" data-album-id="#:data.AlbumId#">
            <img src="#:data.AlbumArtUrl#" />
            <div>
                <span>#:data.Title#</span>
                <span>#:data.Artist.Name#</span>
            </div>
        </div>
    </script>

Here, the example uses the `#:...#` notation to indicate fields that need to be pulled from the JavaScript object that is being bound to the template. You can also use the `#= #` notation. The `<span>#=data.Title#</span>` can work as well.

You can also take advantage of the ASP.NET MVC ability to render partial pages here, and including out templates as partial pages.

In the `_Layout.cshtml` file, this template is included with the line, demonstrated in the example below.

###### Example

    @Html.Partial("_SearchResultTemplatePartial")

<!--_-->
If you are not using ASP.NET MVC, you can write some additional code to load templates from external files.

For more information on remote template loading, refer to the [article on external template loading]({% slug externalteplateloading_templatescomponent %}).

Now that the template is included in the body of the page, the application code is using a jQuery selector to fetch this `<script>` element by its `id` and get the contents. It then calls `kendo.template()` to process the template.

###### Example

    kendo.template($("#search-result-template").html())

### Get Data and Filter on Server Side

Ideally, the server is expected to perform the filtering for the search AutoComplete box. Kendo UI supports both client and server-side filtering, but in a real music store, you would not want to return every album title in the store to the client.

The example below demonstrates a quick breakdown of the code to do this.

###### Example

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

The `schema.data` and `schema.total` functions overcome a JSON formatting difference between Kendo UI and the WCF Data Services OData.

For more information on each field set on the DataSource, refer to the [DataSource documentation]({% slug basicusage_kendoui_datasourcecomponent %}).

### Handle Search Results Selections

When a search result is clicked, the details for the selected album should be displayed. Do this by specifying a function to handle the `selected` event on the auto-complete box.

###### Example

        // This function will be called when the user selects an item from the auto-complete result list.
        select: function (e) {
            // ... code omitted ...
        }

The first thing to do in this case is override some of the default behavior for the AutoComplete box. Normally, when you select something from a standard auto-complete box, the selected text is moved up into the box. This is a behavior that is not desired here. Instead, the entered user text should be cleared, resetting back to the **Search music...** placeholder text. To achieve this, call `preventDefault()` on the event to suppress the normal handling, and the `e.sender.value("")` to clear the text.

###### Example

    select: function (e) {
        e.preventDefault(); // Stop the selected item text from moving up to the AutoComplete.
        e.sender.value(""); // Clear the user entered search term.

The `e.sender` is the jQuery object representing the `<input>` element. The `.value()` method is also standard jQuery and sets the value of the `<input>` element to an empty string. This triggers Kendo UI to put the placeholder message back in place.

Next, display the album details to the user. To do this, you need to get the album ID. Note that a `data-album-id` attribute was added to each search result on the template.

###### Example

    <script id="search-result-template" type="text/x-kendo-template">
        <div class="album-wide" data-album-id="#:data.AlbumId#">

In the event object `e`, `e.item` is the `<li>` element. Then, use a jQuery selector to get the `<div>` element within the `<li>`, and jQuery's `.data()` method to get the value of the `data-album-id` attribute.

###### Example

    select: function (e) {
        // ... code omitted ...
        var albumId = e.item.children("div").data("album-id");

Once you have the album ID, you can show your album details by calling `store.viewAlbumDetails(albumId);`. This is discussed in more detail in the other chapters of this tutorial.

## See Also

Other articles on the Kendo UI Music Store Web Application sample project:

* [Overview of the Kendo UI Music Store Sample Project]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Set Up the Kendo UI Music Store Web App]({% slug projectsetup_muscistorewebapp_aspnetmvc %})
* [Create the Main Menu]({% slug createthemainmenu_muscistorewebapp_aspnetmvc %})
* [Create the Home Page]({% slug createthehomepage_muscistorewebapp_aspnetmvc %})
* [Create the Genre Page]({% slug createthegenrepage_muscistorewebapp_aspnetmvc %})
* [Display Album Details]({% slug displayalbumdetails_muscistorewebapp_aspnetmvc %})
* [Add the Shopping Cart]({% slug implementshoppingcart_muscistorewebapp_aspnetmvc %})
* [Customize the Shopping Cart]({% slug customizeshoppingcart_muscistorewebapp_aspnetmvc %})
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Grid]({% slug createstoremanaggrid_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
