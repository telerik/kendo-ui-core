---
title: Remote Data Binding
page_title: Remote Data Binding | Kendo UI Grid
description: "Learn how to use the Kendo UI Grid widget in your web application and bind it to a remote data source."
previous_url: /howto/bind-the-grid-to-remote-data
slug: remote_data_binding_grid
position: 3
---

# Remote Data Binding

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) features a rapid templating engine and a built-in dataSource, which allow you to set up the widget very quickly and use it in your project.

## The Procedure

To bind the Grid to remote data, provide the data source. For the sake of demonstrating the approach, the examples in this article use the **Popular** feeds endpoint  of the Instagram API. To sign up for a `client_id`, use [this link](http://instagram.com/developer/register/#).

### Supply the Remote Endpoint

Kendo UI provides a powerful [data binding framework](http://demos.telerik.com/kendo-ui/datasource/index) that can be used inline with the Grid. To do that, define the data source of the widget and supply the remote endpoint.

###### Example

```html
    <table id="grid">
        <thead>
            <tr>
                <th>

                </th>
                <th>
                    Details
                </th>
                <th>
                    Comments
                </th>
        </thead>
        <tbody>
        <td colspan="3"></td>
        </tbody>
    </table>

    <script>

        $(function() {
            $("#grid").kendoGrid({
                dataSource: {   
                    transport: {   
                        read: {
                           url: "https://api.instagram.com/v1/media/popular?client_id=4e0171f9fcfc4015bb6300ed91fbf719&count=25",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                          data: "data"
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

* The `dataSource` creates a new Kendo UI data source and assigns it as the data source for the Grid.
* The `transport` defines the way you will communicate with the remote data source.
* The `url` points the location of the data you want to bind the widget to.
* The `dataType` indicates the format of the response in which the data source is expected to be&mdash;JSONP in the example. JSONP is a way of returning JSON from a cross-browser request without getting blocked. It is also a way to get malicious code injected into the page. It basically wraps the JSON response in a callback to intentionally mislead the browser. It is not recommended to do so unless you fully trust your data.
* The `schema` indicates to the Grid what the schema of the response is. It functions as the JSON element to repeat on&mdash;Kendo UI looks for this element to represent each row in the Grid. The server returns an array of `data` elements so the repeating item is `"data"`.

### Add the Data

The previous example renders a Grid without any data in it. To provide the widget with the data for each column, specify which element of the `data` tag in the server response has to be shown in each particular column.

The example below demonstrates how to specify the `field` attribute in the column array in such a way that the Grid displays the actual data from the response.

###### Example

```html

    <table id="grid">
        <thead>
            <tr>
                <th>

                </th>
                <th>
                    Details
                </th>
                <th>
                    Comments
                </th>
        </thead>
        <tbody>
        <td colspan="3"></td>
        </tbody>
    </table>

    <script>

        $(function() {
            $("#grid").kendoGrid({
                columns: [{ field: 'images.thumbnail.url' }, { field: 'user.username' }, { field: 'comments' }],
                dataSource: {
                    transport: {
                        read: {
                           url: "https://api.instagram.com/v1/media/popular?client_id=4e0171f9fcfc4015bb6300ed91fbf719&count=25",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                          data: "data"
                    }
                },
                height: 500,
                scrollable: true,
                selectable: true
            });
        });

    </script>

```

### Handle Visualization

The Grid renders the URL of an image in its **Image** column and the other columns show arrays of objects.

The example below demonstrates how to indicate to the Grid the way you want the widget to display each of the columns by using an inline template for the image.

###### Example

```html

    <table id="grid">
        <thead>
            <tr>
                <th>

                </th>
                <th>
                    Details
                </th>
                <th>
                    Comments
                </th>
        </thead>
        <tbody>
        <td colspan="3"></td>
        </tbody>
    </table>

    <script>

        $(function() {
            $("#grid").kendoGrid({
                columns: [{ template: '<img src="#= images.thumbnail.url #" />' },
                          { field: 'user.username' }, { field: 'comments' }],
                dataSource: {
                    transport: {
                        read: {
                           url: "https://api.instagram.com/v1/media/popular?client_id=4e0171f9fcfc4015bb6300ed91fbf719&count=25",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                          data: "data"
                    }
                },
                height: 500,
                scrollable: true,
                selectable: true
            });
        });

    </script>
```

### Set the Column Template

The rest of the columns need additional specific templating because they are complex displays and not single fields. To configure the columns, move the template outside the Grid and set the template for the details to contain the name of the user who created the photo, the filter they used to create it, and the photo caption. To enumerate the comments and display them in a list, use JavaScript in the template in the last cell. All markup is now removed from the JavaScript.

The example below demonstrates how to fully customize the Grid by applying additional styles to it.

###### Example

```html

    <table id="grid">
        <thead>
            <tr>
                <th>

                </th>
                <th>
                    Details
                </th>
                <th>
                    Comments
                </th>
        </thead>
        <tbody>
        <td colspan="3"></td>
        </tbody>
    </table>

    <script id="detailsTemplate" type="text/x-kendo-template">
        <tr class="row">
            <td>
              <div class="image">
                  <img src="#= images.thumbnail.url #" alt="#= user.username #" />
              </div>
            </td>
            <td>
              <div><span class="strong">Caption: </span># if ( caption ) { #
                  #= caption.text #
                  # } #
              </div>
              <div><span class="strong">Username: </span>
                #= user.username #
              </div>
              <div><span class="strong">Filter: </span>
                #= filter #
              </div>
            </td>
            <td>
              <div class="comments">
                # $.each(comments.data, function(data) { #
                <div class="comment">
                  <span class="strong">#= this.from.username #: </span>#= this.text #
                </div>
                # }); #
              </div>
            </td>
        </tr>
   </script>

   <script>
   $(function() {
            $("#grid").kendoGrid({
                rowTemplate: kendo.template($("#detailsTemplate").html()),
                dataSource: {
                    transport: {
                        read: {
                           url: "https://api.instagram.com/v1/media/popular?client_id=4e0171f9fcfc4015bb6300ed91fbf719&count=25",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                          data: "data"
                    }
                },
                height: 500,
                scrollable: true,
                selectable: true
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

        .comments {
            height: 100px;
          }

          .comment {
            margin-top: 3px;
            margin-bottom: 3px;
            width: 90%;
          }
          .strong {
            font-weight: bold;
          }
    </style>
```

> **Important**  
>
> The `html` code in the previous example displays special script blocks which contain the templating syntax for the [Kendo UI templates]({% slug overview_kendoui_templatescomponent %}). The JavaScript that is used is also mixed with the `html` content and the syntax of the templates is similar to the syntax that is applied in the creation of a PHP, Razor, or other server-side templating engine.

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

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
