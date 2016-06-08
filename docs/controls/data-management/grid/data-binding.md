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

## Bind to Remote Data

To start with, we need a data source. Due to my work on [instasharp.org](http://instasharp.org/) recently, I have become quite familiar with the Instagram API. We can use their "Popular" feeds endpoint without having to go through an authorization process. We still need a client_id, but it is easy to sign up for one of those at [http://instagram.com/developer/register/#](http://instagram.com/developer/register/#).

### Supply Remote Endpoint

Kendo UI provides a very powerful [data binding framework](http://demos.telerik.com/kendo-ui/datasource/index) you can use right inline with your grid. To do that, define the data source of the grid and supply your remote endpoint.

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

For a better understanding of the example above, refer to the following explanations:

* `dataSource` - creates a new Kendo UI data source and assigns it as the data source for the Grid.
* `transport` - defines how you will communicate with your remote data source.
* `url` - points the location of the data you want to bind the widget to.
* `dataType` - tells the data source the format you expect the response to be in. In this case, it is JSONP. JSONP is a way of returning JSON from a cross-browser request without getting blocked. It is also a way to get malicious code injected into your page. It basically wraps the JSON response in a callback to intentionally mislead the browser. It is recommended not to do it unless you fully trust your data.
* `schema` - tells the Grid what the schema of your response is. Think of it as the "JSON element to repeat on". Kendo UI looks for this element to represent each row in the Grid. The server returns an array of `data` elements so your repeating item is just `"data"`.

### Add Data

When you run the example, you see a grid with no data in it. Therefore, you must provide the Grid with the data you want to be rendered in each column. Do this by specifying which element off the `data` tag in the server response you want to show in that particular column. The next example specifies the `field` attribute in the column array, so that the Grid displays the actual data from your response.

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

Now you have some data as well as some issues with its visualization. The Grid renders the URL of an image in its **Image** column and the other columns show arrays of objects. Now you need indicate to the Grid that the way you want it to display each of the columns. Do this by an inline template for the image, as demonstrated below.

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

### Set Column Template

The rest of the columns need some more specific templating since they are complex displays, not single fields. You can do that by moving the template outside of the Grid and then setting the template for the details to contain the name of the user that created the photo, the filter they used to create it, and the photo caption. In the last cell, use JavaScript in your templates to enumerate over the comments to display them in a list.

All markup is now removed from your JavaScript. Add some style, as demonstrated in the example below, so that you fully customize the Grid.

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
> When you check out the `html` code in the above example, you see the templating syntax for [Kendo UI templates](/framework/templates/overview). Templates represent HTML content inside of special script blocks. Note that JavaScript is also mixed right along with the `html` content. The syntax is familiar to the one used when doing PHP, Razor, or other server-side templating engine.

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Localization of Messages]({% slug localization_kendoui_grid_widget %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
