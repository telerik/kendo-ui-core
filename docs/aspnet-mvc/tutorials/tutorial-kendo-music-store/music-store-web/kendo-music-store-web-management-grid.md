---
title: Create the Management Grid
page_title: Create the Management Grid | Music Store Web App Tutorial
description: "Learn how to create the Store Management grid in the Kendo UI Music Store Web Application sample project by using Telerik UI for ASP.NET MVC."
slug: createstoremanaggrid_muscistorewebapp_aspnetmvc
position: 10
---

# Create the Management Grid

**Figure 1. A screenshot of the Kendo UI Music Store management grid**

![kendo-manage-grid-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-manage-grid-screenshot.png)

When logged in the Music Store as an administrator, an additional button titled **Manage Store** is available in the upper-right corner. This opens the management grid which can be used to add, remove, or delete albums from the store. This page uses the [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/web/grid/index.html).

This code is located in `Scripts/App/storemanager-index.js`.

> **Important**
>
> Log in the Music Store as an administrator by using the `Owner` username and the `p@ssword123` password.

## Data Source Definition

The data source for the grid has a large definition compared to the other DataSources used so far. This is largely because it is the only one to do full CRUD (Create, Read, Update, Delete) data operations, and because we need to define the entire data model.

### Apply Basic Data Source Settings

The basic settings for the DataSource are demonstrated in the example below.

###### Example

      dataSource: {
          pageSize: 50,
          serverPaging: true,
      }

The `pageSize` sets the size of each page of data for the grid. In this sample, it is set to fifty records per page.
The `serverPaging: true` property indicates that server-side paging is going to be made.
It is advisable to do paging on the server, not on the client side, when the server supports it, to minimize the amount of data that needs to be returned to the client.

### Set the Data Source Transport

Next, define the `transport` for the DataSource. So far, you only read data from the server using the `read` transport. For the Create Update and Delete operations, use the definition demonstrated in the example below.

###### Example

      dataSource: {
          // ... basic settings omitted ...

          transport: {
              type: "odata",
              read: {
                  url: store.config.albumsUrl,
                  type: "GET"
              },
              update: {
                  url: function (data) {
                      return store.config.albumsUrl + "(" + data.AlbumId + ")"
                  },
                  type: "PUT"
              },
              destroy: {
                  url: function (data) {
                      return store.config.albumsUrl + "(" + data.AlbumId + ")";
                  },
                  type: "DELETE"
              },
              create: {
                  url: store.config.albumsUrl,
                  type: "POST"
              }
          },
          schema: {
              data: store.config.wcfSchemaData,
              total: store.config.wcfSchemaTotal,
          }

Each of these sets the `url` and `type` for the action. In the case of `destroy` and `update`, include the `AlbumId` in the URL itself, not as a parameter. To do this define a function instead of a string to act as the URL. Kendo UI automatically calls this function and passes in the data item that is being deleted. This allowes you to get the `AlbumID` and append it to the base URL.

###### Example

          url: function (data) {
              return store.config.albumsUrl + "(" + data.AlbumId + ")";
          }

### Include the Data Source Schema

Unlike the other DataSources in the Music Store that only read data, when you are going to create new records, it is best to include the `schema.model` property. The model defines the data layout of the record, so when the Kendo UI DataSource is asked to create a new record, it knows the fields and data types, as well as some basic validation information. This data is used by the Grid widget to define what editors each column will have when the **Create** button is clicked.

###### Example

         schema: {
              data: store.config.wcfSchemaData,
              total: store.config.wcfSchemaTotal,
              model:{
                  id: "AlbumId",
                  fields: {
                      AlbumId: { type: "number", defaultValue: 0 },
                      GenreId: { type: "number", defaultValue: store.config.newAlbumDefaultGenre },
                      ArtistId: { type: "number", defaultValue: store.config.newAlbumDefaultArtist },
                      Title: {
                          validation: {
                              required: true
                          }
                      },
                      Price: {
                          type: "number",
                          defaultValue: store.config.newAlbumDefaultPrice,
                          validation: {
                              required: true,
                              min: 0.01,
                              max: 100.00
                          }
                      },
                      AlbumArtUrl: {
                          validation: {
                              required: true
                          }
                      }
                  }
              }
          }

Notice that this `schema.model` data basically matches the server side model in `Models\Album.cs`.

###### Example

         public class Album {
              [ScaffoldColumn(false)]
              public int AlbumId { get; set; }

              public int GenreId { get; set; }

              public int ArtistId { get; set; }

              [Required]
              [StringLength(160, MinimumLength = 2)]
              public string Title { get; set; }

              [Range(0.01, 100.00)]
              [DataType(DataType.Currency)]
              public decimal Price { get; set; }

              [DisplayName("Album Art URL")]
              [DataType(DataType.ImageUrl)]
              [StringLength(1024)]
              public string AlbumArtUrl { get; set; }

              public virtual Genre Genre { get; set; }
              public virtual Artist Artist { get; set; }
              public virtual List<OrderDetail> OrderDetails { get; set; }
          }

One of the important aspects of defining the model is setting default values by using the `defaultValue` property. In this sample, if you indicate a `GenreId` and an `ArtistId` of `0`, the values will be regarded as invalid because no genre or artist exists with such IDs. Instead, the default values is set to `1`.

## Grid Setup

Now that the DataSource is defined, you can define the grid. A single HTML element is used as the placeholder for the grid.

###### Example

        <div id="albumsGrid"></div>

The element is turned into a Grid widget when the page is loaded with JavaScript.

###### Example

        $("#albumsGrid").kendoGrid({
            sortable: true,
            groupable: true,
            filterable: true,
            pageable: true,
            editable: "inline",
            toolbar: ["create"],
            dataSource: gridDataSource,
            columns: []
        });

* The `sortable`, `groupable` and `filterable` properties indicate that sorting, grouping, and filtering will be enabled.
* The `pageable` property indicates that the grid will support paging. The page size is defined on the DataSource and set to fifty items per page.
* The `editable` property defines the grid editing style. This sample uses `inline` which lets one entire row be shifted into edit mode, then saved or cancelled. Other edit modes&mdash;`incell`, `inline`, or `popup`&mdash;can be seen in the [Kendo UI Grid demos](http://demos.telerik.com/kendo-ui/web/grid/editing.html).
* The `toolbar` property contains an array of commands to place along the top of the grid. This sample displays a **Create** button that can be used to add a new record.
* The `dataSource` property is set to the data source defined above.
* The `columns` property is an array of columns to be displayed. For more information, read through the section below.

### Define the Grid Columns

The `columns: []` property of the grid configuration takes an array of objects, each of which defines a column of data. The album edit grid contains these columns.

###### Example

            columns: [
                { title: "Album Art", field: "AlbumArtUrl", template: '<img src="#= AlbumArtUrl #" />', width: "110px", editor: albumArtEditor, filterable: false, sortable: false, groupable: false },
                { title: "Genre", field: "GenreId", values: genres },
                { title: "Artist", field: "ArtistId", values: artists, editor: artistEditor },
                { field: "Title", groupable: false },
                { field: "Price", format:"{0:c}" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }
            ]

Most of the properties defined for each column are optional. The ones used here are:

* The `title` property sets the text to show at the top of the column in the header. If not set, the field name is used.
* The `field` property indicates the name of the property on the data object that is used for this column.
* The `template` property defines a custom template for the data displayed in the column. The examples use a custom template for the **Album Art** column to add an image tag and show the art.
* The `editor` property defines a function to be used as a custom editor, displayed when the cell enters `edit` mode. This is discussed in details below.
* The `filterable`, `sortable`, and `groupable` properties override the properties set on the grid. This can be used to mark individual columns as filterable, sortable, and groupable.
* The `format` property defines a custom formatter to be used to display the cell data. This example uses `"{0:c}"` to format the **Price** column as currency. The format takes the same values as the [`kendo.format()` function](http:///api/framework/kendo#format).
* The `values` property sets a collection of key-value pair objects that are used as a foreign key to look up cell values. This is discussed in details below.

## Customization

### Use the Custom Editor

When an album grid row is edited, use a custom editor for selecting an Artist. Instead of the normal Kendo UI DropDown widget, use the Kendo UI AutoComplete widget. This allows users to start to enter an artist name and find the matching artists.

To set a custom editor for a cell, start by defining a function that is called to create the editor.

###### Example

            var artistEditor = function (container, options) {
                $('<input data-text-field="text" data-value-field="value" data-bind="value:' + options.field + '" />')
                    .appendTo(container)
                    .kendoComboBox({
                        autoBind: false,
                        dataSource: artists
                    });
            };

When the editor function is called, the `container` parameter is the cell element that will hold the editor. Create your editor element and use jQuery `.append(container)` to add it to the container.

The `options` parameter passed in to the editor function is the data that the cell is bound to. The AutoComplete example binds its value to `options.field`, which sets the current value of the auto complete box to the artist set on the album, and if the artist is changed the selected artist is copied to the album.

### Use Foreign Keys

The Album objects returned from the server contain the `GenreId` and the `ArtistId`, not the genre and artist names. It would look very strange to just display these IDs in the grid, since no one will know what `Genre 1` or `Artist 27` is. Instead, it is better to load all genre and artist names into a list of objects that can be used to map these IDs to their display names.

In the Kendo UI Grid, this is called a [Foreign Key column](http://demos.telerik.com/kendo-ui/web/grid/foreignkeycolumn.html).

The Music Store uses the jQuery `$.Deferred()` functionality to asynchronously load the lists of Genres and Albums from the server. Once they are retrieved, they are mapped to lists of objects that follow the format from the example below.

###### Example

    {
        value:
        text:
    }

In this example the `value` is the ID of the item, and `text` is its display name. These lists need to be loaded before populating the grid, but the `DataSource.read()` method used to read the data is asynchronous. That is why defers are used to load the data asynchronously and continue loading the grid when both genres and artists finish loading. Once these lists are loaded, use the `column.values` property to set it as the foreign key lookup for a column.

The example below demonstrates how to define the Genre column.

###### Example

            columns: [
                ...
                { title: "Genre", field: "GenreId", values: genres },
                ...
            ]

When the grid needs to display the data for a cell in the Genre column, it gets the value using the `field`. In this case, assume you have an Album that contains `GenreId: 5`. It then takes that value and looks in the foreign key data `genres` and finds the item that has a `value: 5`. It then takes the `text` value from that foreign key data and uses that for display instead of the `GenreId`.

Using a Foreign Key column also changes the default editor behavior for the cell. Without it, the grid would put up a NumericTextBox editor for the `GenreId` since it is numeric data. With the foreign key column, it uses a Dropdown box to select from the choices defined in the genres list instead.

### Upload Album Art

Use another custom editor for the album art column. This one is a little more complicated than the artist name because you need to support the ability to upload new album art. To facilitate this, user the [Kendo UI Upload widget](http://demos.telerik.com/kendo-ui/web/upload/index.html).

A custom editor is defined for the column by specifying `editor: albumArtEditor` and the editor function.

###### Example

            var albumArtEditor = function (container, options) {
                if (options.model.AlbumArtUrl) {
                    $('<img src="' + options.model.AlbumArtUrl + '" />').appendTo(container);
                }

                $('<input name="files" type="file" />').appendTo(container).kendoUpload({
                    multiple: false,
                    showFileList: false,
                    async: {
                        saveUrl: store.config.imagesUrl,
                        autoUpload: true
                    },
                    success: function (e) {
                        container.html('<img src="' + e.response + '" />');
                        options.model.set(options.field, e.response);
                    }
                });
            };

If the album being edited has already an `AlbumArtUrl` set, then an `<img>` tag is appended to display the current album art.

Then an `<input>` element is appended and defined as a Kendo UI Upload widget. When this button is clicked, the user is presented with a file selection dialog where they can choose the art to upload. Because the `async.autoUpload` is set to `true`, the image will be uploaded as soon as it is selected. On the server, after the file is uploaded, a response is sent to the client that contains the `url` to the newly saved image. The Upload widget in the editor uses the `success` event to read the returned URL from the server and display the image.

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
* [Create the Checkout Page]({% slug createcheckoutpage_muscistorewebapp_aspnetmvc %})
* [Create the Management Charts]({% slug createstoremanagcharts_muscistorewebapp_aspnetmvc %})
