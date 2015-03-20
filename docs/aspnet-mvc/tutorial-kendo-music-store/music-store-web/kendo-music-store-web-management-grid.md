---
title: Create the Store Management Grid
position: 10
---

# Create the Store Management Grid - Kendo UI Music Store

![kendo-manage-grid-screenshot](/aspnet-mvc/tutorial-kendo-music-store/music-store-web/images/kendo-manage-grid-screenshot.png)

When logged in to the Music Store as an administrator an additional button titled "Manage Store" is made available in the upper right corner.
This opens the management grid which can be used to add, remove and delete albums from the store.
This page uses the [Kendo UI Grid](http://demos.telerik.com/kendo-ui/web/grid/index.html) widget.

This code is located in **Scripts/App/storemanager-index.js**.

> You can log in to the Music Store as an administrator by using the username "Owner" and the password "p@ssword123".

## Define the Data Source.

Let's first look at the data source for the grid. It has a large definition compared to the other DataSources we have used so far.
This is largely because it is the only one to do full CRUD operations, and because we need to define the entire data model.

### Basic Data Source Settings.

The basic settings for the DataSource are:

            dataSource: {
                pageSize: 50,
                serverPaging: true,
            }

**pageSize** simple sets the size of each page of data for the grid. In this sample, it is set to 50 records per page.
The **serverPaging: true** property indicates that we will do server-side paging.
We recommend doing paging on the server, not the client, when the server supports it to minimize the amount of data that needs to be returned to the client.

### Data Source Transport.

Next we need to define the **transport** for the DataSource.
Up until now we have only read data from the server using the **read** transport.
For the Create Update and Delete operations, we define:

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

Each of these sets the **url** and **type** for the action.
In the case of **destroy** and **update** we need to include the AlbumId in the URL itself, not as a parameter.
To do this we defined a function instead of a string to act as the URL.
Kendo UI automatically calls this function and passes in the data item that is being deleted.
This allowed us to get the AlbumID and append it to the base URL:

                        url: function (data) {
                            return store.config.albumsUrl + "(" + data.AlbumId + ")";
                        }

### Data Source Schema.

Unlike the other DataSources in the Music Store that only read data, when we are going to create new records
it is best to include the **schema.model** property.
The model defines the data layout of the record so when the Kendo UI DataSource is asked to create a new record it knows the
fields and data types, as well as some basic validation information.
This data is used by the Grid widget to define what editors each column will have when the "Create" button is clicked.

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

You may notice that this **schema.model** data basically matches the server side model in **Models\Album.cs**.

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

One of the important aspects of defining the model is setting default values using the **defaultValue** property.
For this sample, if we started with a GenreId and ArtistId of 0 then those values are not valid choices since no
genre or artist exists with those IDs. Instead, we default to a value of 1.

## Set up the Grid.

Now that the DataSource is defined, we can define the grid.
A single HTML element is used as the placeholder for the grid:

    <div id="albumsGrid"></div>

Then the element is turned in to a Grid widget when the page is loaded with JavaScript:

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

The **sortable**, **groupable** and **filterable** properties indicate that sorting, grouping and filtering will all be enabled.

The **pageable** property indicates that the grid will support paging. The page size was defined on the DataSource and set to 50 items per page.

**editable** defines the grid editing style. In this sample we are using "inline" which lets one entire row be shifted into edit mode, then saved or cancelled.
Other edit modes (incell/inline/popup) can be seen in the [Kendo UI Grid Demos](http://demos.telerik.com/kendo-ui/web/grid/editing.html).

The **toolbar** property contains an array of commands to place along the top of the grid. In this sample we display a "create" button that can be used to add a new record.

**dataSource** is set to the data source that we defined above.

**columns** is an array of columns to be displayed which we will look at in more detail.

### Define the Grid Columns.

The **columns: []** property of the grid configuration takes an array of objects, each of which defines a column of data.
The album edit grid contains these columns:

            columns: [
                { title: "Album Art", field: "AlbumArtUrl", template: '<img src="#= AlbumArtUrl #" />', width: "110px", editor: albumArtEditor, filterable: false, sortable: false, groupable: false },
                { title: "Genre", field: "GenreId", values: genres },
                { title: "Artist", field: "ArtistId", values: artists, editor: artistEditor },
                { field: "Title", groupable: false },
                { field: "Price", format:"{0:c}" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "160px" }
            ]

Most of the properties defined for each column are optional. The ones used here are:

**title** sets the text to show at the top of the column in the header. If not set, the field name is used.

**field** indicates the name of the property on the data object that is used for this column.

**template** defines a custom template for the data displayed in the column.
We use a custom template for the Album Art column to add an image tag and show the art.

**editor** defines a function to be used as a custom editor, displayed when the cell enters edit mode.
This is discussed in more details below.

**filterable**, **sortable** and **groupable** overrides the properties set on the grid.
This can be used to mark individual columns as fitlerable, sortable and groupable.

**format** defines a custom formatter to be used to display the cell data. In this case we use "{0:c}" to format the Price column as currency.
The format takes the same values as the [kendo.format() function](http:///api/framework/kendo#format).

**values** sets a collection of key-value pair objects that are used as a foreign key to look up cell values.
This is discussed in more detail below.

## Use a Custom Editor for the Artist Selection.

When an album grid row is edited, we use a custom editor for selecting an Artist.
Instead of the normal DropDown widget we use an AutoComplete widget.
This allows the user to start to enter an artist name and find the matching artists.

To set a custom editor for a cell we start by defining a function that is called to create the editor.

            var artistEditor = function (container, options) {
                $('<input data-text-field="text" data-value-field="value" data-bind="value:' + options.field + '" />')
                    .appendTo(container)
                    .kendoComboBox({
                        autoBind: false,
                        dataSource: artists
                    });
            };

When the editor function is called, the **container** parameter is the cell element that will hold the editor.
We create our editor element and use jQuery **.append(container)** to add it to the container.

The **options** parameter passed in to the editor function is the data that the cell is bound to.
For the auto complete example we bind its value to options.field which sets the auto complete box's
current value to the artist set on the album, and if the artist is changed the selected artist is copied to the album.

## Use the Foreign Key feature to show Genre and Artist Names.

The Album objects returned from the server contain the GenreId and the ArtistId, not the genre and artist names.
It would look very strange to just display these IDs in the grid, since no one will know what "Genre 1" or "Artist 27" is.
Instead, we want to load all genre and artist names into a list of objects that can be used to map these IDs to their display names.

In the Kendo UI Grid, this is called a [Foreign Key column](http://demos.telerik.com/kendo-ui/web/grid/foreignkeycolumn.html).

In the Music Store, we use the jQuery **$.Deferred()** functionality to asynchronously load the lists of Genres and Albums from the server.
Once they are retrieved they are mapped to lists of objects that follow the format:

    {
        value:
        text:
    }

where **value** is the ID of the item, and **text** is its display name.
These lists need to be loaded before populating the grid, but the DataSource.read() method used to read the data is asynchronous.
This is why deferreds were used to load the data asynchronously and continue loading the grid when both genres and artists was finished loading.
Once these lists are loaded, we use the **column.values** property to set it as the foreign key lookup for a column.
For example the Genre column is defined as:

            columns: [
                ...
                { title: "Genre", field: "GenreId", values: genres },
                ...
            ]

When the grid needs to display the data for a cell in the Genre column, it will get the value using the **field**.
In this case lets assume we have an Album that contains **GenreId: 5**.
It then takes that value and looks in the foreign key data **genres** and finds the item that has **value: 5**.
It then takes the **text** value from that foreign key data and uses that for display instead of the GenreId.

Using a Foreign Key column also changes the default editor behavior for the cell.
Without it, the grid would put up a Numeric TextBox editor for the GenreId since it is numeric data.
With the foreign key column, it instead uses a Dropdown box to select from the choices defined in the genres list.

## Album Art Upload (with the Kendo UI Upload widget)

We use another custom editor for the album art column.
This one is a little more complicated than the artist name because we need to support the ability to upload new album art.
To facilitate this we used the [Kendo UI Upload](http://demos.telerik.com/kendo-ui/web/upload/index.html) widget.

A custom editor is defined for the column by specifying **editor: albumArtEditor** and the editor function:

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

If the album being edited already has an AlbumArtUrl set then an &lt;img&gt; tag is appended to display the current album art.

Then a &lt;input&gt; element is appended and defined as a Kendo UI Upload widget.
When this button is clicked the user will be presented with a file selection dialog where they can choose the art to upload.
Because the **async.autoUpload** is set to **true** the image will be uploaded as soon as it is selected.
On the server, after the file is uploaded a response is sent to the client that contains the url to the newly saved image.
The upload widget in the editor uses the **success** event to read the returned URL from the server and display the image.
