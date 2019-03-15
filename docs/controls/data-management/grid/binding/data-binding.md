---
title: Remote Data
page_title: jQuery Grid Documentation | Remote Data | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI featuring a built-in DataSource which allows you to bind the Grid to remote data."
previous_url: /howto/bind-the-grid-to-remote-data
slug: remote_data_binding_grid
position: 3
---

# Remote Data

The Kendo UI Grid provides a templating engine and a built-in DataSource which allow you to quickly set up and implement the data-binding functionality.

## Getting Started

To bind the Grid to remote data, specify the `dataSource` option. You can either create the data source outside the widget, or pass it in it. If multiple widgets are bound to the same data set, you have to create the data source as an object that you can refer to in different widgets. If the Grid is the only item that is bound to the data, create it inline.

###### Example

    $("#grid").kendoGrid({
         dataSource: {
             transport: {
                 read: "/Home/People.json"
             },
             schema: {
                 data: "data"
             }
         }
    });

## Configuring the Data Source

To configure the data source of the Grid:

1. [Supply the remote endpoint](#supplying-the-remote-endpoint)
1. [Adding the data](#adding-the-data)
1. [Handling visualization](#handling-visualization)
1. [Setting the row template](#setting-the-row-template)

### Supplying the Remote Endpoint

Kendo UI provides a [data-binding framework](http://demos.telerik.com/kendo-ui/datasource/index) that can be used inline with the Grid by defining the `dataSource` of the widget and supplying the remote endpoint.

The following example demonstrates how to implement the suggested approach. In the example:

* The `dataSource` creates a new Kendo UI DataSource and assigns it as the data source for the Grid.
* The `transport` defines the way you will communicate with the remote data source.
* The `url` points to the location of the data to which you want to bind the widget.
* The `data` lists additional URL parameters that need to be sent to the remote endpoint.
* The `dataType` indicates the format of the response in which the data source is expected to be (JSONP in the example). JSONP is a way of returning JSON from a cross-browser request without getting blocked. It wraps the JSON response in a callback to intentionally mislead the browser&mdash;however, it is not recommended to do so unless you are fully aware of the containing data.
* The `schema` indicates to the Grid what the schema of the response is.
* The `data` functions as the JSON element that will be repeated&mdash;based on this element, Kendo UI binds each row in the Grid to an item in this element. The server returns data as an `items` array so the repeating item is `"items"`.
* The `model` describes the structure of the data. By using it, you can specify the data type of each field in the data for proper handling as well as, when needed, explicitly state which is the unique id field.

###### Example

```dojo
    <div id="grid">
    </div>

    <script>
      $(function() {
        $("#grid").kendoGrid({
          dataSource: {   
            transport: {   
              read: {
                url: "https://api.flickr.com/services/feeds/photos_public.gne",
                data: {
                  tags: "nature",
                  format: "json"
                },
                dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                jsonp: "jsoncallback",
              }
            },
            schema: {
              data: "items",
              model: {
                fields: {
                  published: {type: "date"}
                }
              }
            }
          },
          height: 500,
          scrollable: true,
          selectable: true
        });
      });
    </script>   
```

### Adding the Data

The previous example renders a Grid with auto-generated columns with a column for each field in the data items. To display only the needed fields in the Grid, provide a `columns` list and specify which element of the `items` array in the server response has to be shown in each particular column.

The following example demonstrates how to specify the `field` attribute in the column array so that the Grid displays the required data from the response. The columns also have a `title` property which provides more user-friendly header titles for the columns.

###### Example

```dojo

    <div id="grid">
    </div>

    <script>
      $(function() {
        $("#grid").kendoGrid({
          dataSource: {   
            transport: {   
              read: {
                url: "https://api.flickr.com/services/feeds/photos_public.gne",
                data: {
                  tags: "nature",
                  format: "json"
                },
                dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                jsonp: "jsoncallback",
              }
            },
            schema: {
              data: "items",
              model: {
                fields: {
                  published: {type: "date"}
                }
              }
            }
          },
          columns: [
            {field: "title", title: "Title"},
            {field: "published", title: "Published On"},
            {field: "media", title: "Image"}
          ],
          height: 500,
          scrollable: true,
          selectable: true
        });
      });
    </script>

```

### Handling Visualization

Instead of showing an image in the **Image** column, the Grid renders the string output of a JavaScript object and, also, the date does not appear in a user-friendly format.

The following example demonstrates how to indicate to the Grid the way you want the widget to display the **Image** column by using an inline `template` for the image. The date is properly formatted by using the `format` option of the column.

###### Example

```dojo

    <div id="grid">
    </div>

    <script>
      $(function() {
        $("#grid").kendoGrid({
          dataSource: {   
            transport: {   
              read: {
                url: "https://api.flickr.com/services/feeds/photos_public.gne",
                data: {
                  tags: "nature",
                  format: "json"
                },
                dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                jsonp: "jsoncallback",
              }
            },
            schema: {
              data: "items",
              model: {
                fields: {
                  published: {type: "date"}
                }
              }
            }
          },
          columns: [
            {field: "title", title: "Title"},
            {field: "published", title: "Published On", format: "{0: MMM dd yyyy HH:mm}"},
            {field: "media", title: "Image", template: "<img height='100' src='#:data.media.m#' title='#: data.title#'/>"}
          ],
          height: 500,
          scrollable: true,
          selectable: true
        });
      });
    </script>
```

### Setting the Row Template

You can display more complex templates for the columns in the Grid (for example, multiple field values in a single column) while the content of the other columns is iterated to generate the template output. In such scenarios, use `rowTemplate` to describe the structure of the entire row inside a single template.

The following example demonstrates how to fully customize the Grid by applying additional styles to it. The number of the `td` elements in the template matches the number of columns in the Grid definition.

> The `html` code in the following example displays special script blocks which contain the templating syntax for the [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}). The JavaScript that is used is also mixed with the HTML content and the syntax of the templates is similar to the syntax that is applied in the creation of a PHP, Razor, or other server-side templating engine.

###### Example

```dojo

    <div id="grid">
    </div>
    <script id="detailsTemplate" type="text/x-kendo-template">
        <tr class="row">
            <td>
              <div><span class="strong">Title: </span># if ( title ) { #
                  #= title #
                  # } #
      </div>
              <div><span class="strong">Username: </span>
                #= author #
      </div>
              <div><span class="strong">Published: </span>
                #= kendo.toString(new Date(published), "MMM dd yyyy HH:mm") #
      </div><div><span class="strong">Link: </span>
                <a href='#= link #' target='_blank'>Open</a>
      </div>
      </td>
            <td>
              <div>
                # $.each(tags.split(' '), function(index, data) { #
                <span class="tag">
                  #= data #
                  </span>
      </div>
                # }); #
      </div>
      </td>
            <td>
              <div class="image">
                  <img src="#= media.m #" alt="#= author #" />
      </div>
      </td>
      </tr>
    </script>
    <script>
      $(function() {
        $("#grid").kendoGrid({
          dataSource: {   
            transport: {   
              read: {
                url: "https://api.flickr.com/services/feeds/photos_public.gne",
                data: {
                  tags: "nature",
                  format: "json"
                },
                dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                jsonp: "jsoncallback",
              }
            },
            schema: {
              data: "items",
              model: {
                fields: {
                  published: {type: "date"}
                }
              }
            }
          },
          columns: [
            {title: "Info"},
            {title: "Tags"},
            {title: "Image"}
          ],
          rowTemplate: kendo.template($("#detailsTemplate").html()),
          height: 500,
          scrollable: true
        });
      });
    </script>
    <style>
      .row {
        margin-bottom: 20px;
        border-bottom: thin solid black;
      }

      .image {
        text-align: center;
      }

      .tag {
        font-style: italic;
      }

      .tag:hover {
        background-color: lightblue;
      }

      .strong {
        font-weight: bold;
      }
    </style>
```

## See Also

* [Remote Data Binding of the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/remote-data-binding)
* [Binding the Grid to Kinvey Backend Services (Demo)](https://demos.telerik.com/kendo-ui/grid/kinvey)
* [Binding the Grid to GraphQL Services (Demo)](https://demos.telerik.com/kendo-ui/grid/graphql)
* [Binding the Grid to SignalR (Demo)](https://demos.telerik.com/kendo-ui/grid/signalr)
* [Binding the Grid to Web Socket (Demo)](https://demos.telerik.com/kendo-ui/grid/web-socket)
* [Binding the Grid over MVVM (Demo)](https://demos.telerik.com/kendo-ui/grid/mvvm)
* [Working with the Grid Offline (Demo)](https://demos.telerik.com/kendo-ui/grid/offline)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
