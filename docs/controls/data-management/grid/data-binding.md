---
title: Remote Data Binding
page_title: Remote Data Binding | Kendo UI Grid
description: "Learn how to use the Kendo UI Grid widget in your web application and bind it to a remote data source."
previous_url: /howto/bind-the-grid-to-remote-data
slug: remote_data_binding_grid
position: 3
---

# Remote Data Binding

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) features a rapid templating engine and a built-in DataSource, which allow you to set up the widget very quickly and use it in your project.

## The Procedure

To bind the Grid to remote data, provide the data source configuration. For the sake of demonstrating the approach, the examples in this article use the popular Flickr public feed.

### Supply the Remote Endpoint

Kendo UI provides a powerful [data binding framework](http://demos.telerik.com/kendo-ui/datasource/index) that can be used inline with the Grid. To do that, define the `dataSource` of the widget and supply the remote endpoint.

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

**Explanation of the previous example**

* The `dataSource` creates a new Kendo UI DataSource and assigns it as the data source for the Grid.
* The `transport` defines the way you will communicate with the remote data source.
* The `url` points the location of the data you want to bind the widget to.
* The `data` lists additional url parameters that need to be sent to the remote point.
* The `dataType` indicates the format of the response in which the data source is expected to be&mdash;JSONP in the example. JSONP is a way of returning JSON from a cross-browser request without getting blocked. It basically wraps the JSON response in a callback to intentionally mislead the browser. It is not recommended to do so unless you fully trust your data.
* The `schema` indicates to the Grid what the schema of the response is.
* The `data` functions as the JSON element to repeat on&mdash;Kendo UI looks for this element to bind each row in the Grid to an item in this element. The server returns data as an `items` array so the repeating item is `"items"`.
* The `model` describes the structure of the data. Using it, you can specify the data type of each field in the data for proper handling, as well as explicitly state which is the unique id field when needed.

### Add the Data

The previous example renders a Grid with auto-generated columns&mdash;a column for each field in the data items. To display only the needed fields in the Grid widget, provide a `columns` list and specify which element of the `items` array in the server response has to be shown in each particular column.

The following example demonstrates how to specify the `field` attribute in the column array in such a way that the Grid displays the required data from the response. The columns also have a `title` property, which is used to provide more user-friendly header titles for the columns.

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

### Handle Visualization

Instead of showing an image in Image column, the Grid renders the string output of a JavaScript object. Also, the date does not appear in a user-friendly format.

The following example demonstrates how to indicate to the Grid the way you want the widget to display the Image column by using an inline `template` for the image. The date is properly formatted using the column `format` option.

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

### Set the Row Template

You may want to display more complex templates for the columns in the Grid&mdash;for example, multiple field values in a single column&mdash;while the content of the other columns may need to be iterated to generate the template output. In such scenarios, you can use `rowTemplate` to describe the structure of the entire row inside a single template.

The following example demonstrates how to fully customize the Grid by applying additional styles to it. Note that the number of `td` elements in the template matches the number of columns in the Grid definition.

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

> **Important**  
>
> The `html` code in the last example displays special script blocks which contain the templating syntax for the [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}). The JavaScript that is used is also mixed with the `html` content and the syntax of the templates is similar to the syntax that is applied in the creation of a PHP, Razor, or other server-side templating engine.

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality of the Grid]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages in the Grid]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering of the Grid]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export of the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export of the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Printing of the Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [How-To Examples]({% slug howto_bindto_telerik_backend_services_grid %})
* [Knowledge Base Section](/knowledge-base)
