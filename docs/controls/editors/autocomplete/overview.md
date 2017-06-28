---
title: Overview
page_title: Overview | Kendo UI AutoComplete
description: "Learn how to initialize the Kendo UI AutoComplete widget, provide AutoComplete suggestions and customize AutoComplete templates."
slug: overview_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Overview

The [Kendo UI AutoComplete widget](http://demos.telerik.com/kendo-ui/autocomplete/index) provides suggestions depending on the typed text.

It also allows multiple value entries. The suggestions shown by the widget can come from a local array or from a remote data service.

## Getting Started

### Initialize the AutoComplete

To initialize the AutoComplete widget, use a jQuery selector.

###### Example

    <input id="autoComplete" />

    $(document).ready(function() {
     $("#autoComplete").kendoAutoComplete(["Item1", "Item2"]);
    });

> **Important**
>
> The widget copies any styles and CSS classes from the `input` element to the `wrapper` element.

###### Example

    <input id="autoComplete" class="myClass" />

    results to:

    <span class="k-widget k-autocomplete k-header k-state-default myClass">
        <input id="autoComplete" class="myClass" />
    </span>

## Configuration

### Manage Suggestions

To provide AutoComplete suggestions, you can use either of the 2 primary ways:

1.  Bind to a local data array.
2.  Bind to a remote data service.

Locally defined values are best for small, fixed sets of suggestions. Remote suggestions must be used for larger data sets. When used with the `DataSource` component, the filtering of large remote data services can be pushed to the server as well, which maximizes the client-side performance.

#### Bind to Local Data Arrays

To configure and provide the AutoComplete suggestions locally, either:

* Pass an array directly to its constructor, or
* Set the `dataSource` property to a local array.

To directly initialize a local data array in `constructor`, refer to the following example.

###### Example

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
    </script>

To bind the widget to a local data array by using the `dataSource` property, refer to the following example.

###### Example

    <input id="autoComplete" />
    <script>
        var data = ["Item1", "Item2", "Item3"];
        $("#autoComplete").kendoAutoComplete({
            dataSource: data
        });
    </script>

#### Bind to Remote Data Services

To initialize the AutoComplete by binding the widget to a remote data service, use the [Data Source component]({% slug overview_kendoui_datasourcecomponent %}). It is an abstraction for local and remote data. Remote data binding is appropriate for larger data sets, so that items are loaded on demand when displayed. You can use the DataSource for serving data from a variety of data services such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

To bind the widget to a remote data service by using oData through the Data Source component, refer to the following example.

###### Example

    $(document).ready(function(){
        $("#autoComplete").kendoAutoComplete({
            minLength: 3,
            dataTextField: "ContactName", // JSON property name to use
            dataSource: new kendo.data.DataSource({
                type: "odata", // specifies data protocol
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                }
            })
        });
    });

To bind the widget to a JSONP service by using the Data Source component, refer to the following example.

###### Example

    $(document).ready(function(){
     $("#autoComplete").kendoAutoComplete({
      minLength:6,
      dataTextField:"title",
      filter: "contains",
      dataSource: new kendo.data.DataSource({
       transport: {
        read: {
         url: "http://api.geonames.org/wikipediaSearchJSON",
         data: {
          q: function(){
           return $("#autoComplete").data("kendoAutoComplete").value();
          },
          maxRows: 10,
          username: "demo"
         }
        }
       },
       schema: {
        data:"geonames"
       }
      }),
      change: function(){
       this.dataSource.read();
      }
     })
    });

### Change the List Width

To customize the width of a drop-down list and change its dimensions, use the jQuery `width()` method.

###### Example

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // set width of the drop-down list
        autoComplete.list.width(400);
    </script>

### Adjust the Popup Width

You can let the popup element automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup shows the content on one line and does not wrap it up.

###### Example

    <input id="autocomplete" style="width: 100px;" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>


### Access *-list Elements

The drop-down list renders an ID attribute, generated from the ID of the widget and the `-list` suffix.

The ID can be used to style the element or to access a specific element inside the popup element.

> **Important**
>
> If the widget has no ID, the drop-down element will have no ID either.

###### Example

    <input id="autocomplete">
    <script>
      $(document).ready(function() {
        $("#autocomplete").kendoAutoComplete({
            dataSource: ["Item1", "Item2"]
        });

        //the DIV popup element that holds header, footer templates and the suggestion options.
        var popupElement = $("#autocomplete-list");

        console.log(popupElement);
      });
    </script>

### Remove Input Values

The AutoComplete enables you to remove the values from the input area of the widget through the `clearButton` configuration option. By default, the option is enabled and is set to `true`. As a result, a **x** button appears in the input area on hover. When clicked, it resets the value of the widget and triggers the `change` event.

## Templates

The AutoComplete uses [Kendo UI templates](/framework/templates/overview) to provide full control over the way an item and a pop-up header is rendered.

For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Item Templates

The item template manages the way the list items of an AutoComplete are rendered.  

The following example demonstrates how to define an item template.

###### Example

    <input id="autoComplete" />
    <!-- Template -->
    <script id="scriptTemplate" type="text/x-kendo-template">
        ContactName: #:data.ContactName#, CustomerID: #:data.CustomerID#
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                template: $("#scriptTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Header Templates

The header template manages the way the pop-up header of an AutoComplete is rendered.

The following example demonstrates how to define a header template.

###### Example

    <input id="autoComplete" />
    <!-- Template -->
    <script id="headerTemplate" type="text/x-kendo-template">
        <strong>Header</strong>
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                headerTemplate: $("#headerTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### Footer Templates

The footer template manages the way the pop-up footer of an AutoComplete is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

The following example demonstrates how to define a footer template.

###### Example

    <input id="autoComplete" />
    <!-- Template -->
    <script id="footerTemplate" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                footerTemplate: $("#footerTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

### No-Data Templates

The AutoComplete widget displays `noDataTemplate` in the popup when the data source is empty.

The following example demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget always opens the popup element.

###### Example

    <input id="autoComplete" />
    <!-- Template -->
    <script id="noDataTemplate" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- AutoComplete initialization -->
    <script>
        $(document).ready(function() {
            $("#autoComplete").kendoAutoComplete({
                noDataTemplate: $("#noDataTemplate").html(),
                dataTextField: "ContactName",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Customers"
                        }
                    }
                }
            });
        });
    </script>

## See Also

Other articles on the Kendo UI AutoComplete:

* [Grouping Functionality]({% slug grouping_kendoui_autocomplete_widget %})
* [Virtualization]({% slug virtualization_kendoui_autocomplete_widget %})
* [How to Use Custom AngularJS Template]({% slug howto_use_custom_angularjs_templates_autocomplete %})
* [How to Show a No Records Found Message]({% slug howto_add_customized_templates_autocomplete %})
* [Overview of the ASP.NET MVC HtmlHelper Extension for the AutoComplete Widget](/aspnet-mvc/helpers/autocomplete/overview)
* [Overview of the AutoComplete JSP Tag]({% slug overview_autocomplete_uiforjsp %})
* [Overview of the AutoComplete PHP Class](/php/widgets/autocomplete/overview)
* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)

Articles on the Kendo UI ComboBox:

* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Grouping Functionality]({% slug grouping_kendoui_combobox_widget %})
* [Virtualization]({% slug virtualization_kendoui_combobox_widget %})
* [Cascading ComboBoxes]({% slug cascading_kendoui_combobox_widget %})
* [Server Filtering]({% slug server_filtering_kendoui_combobox_widget %})
* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)

Articles on the Kendo UI MultiSelect:

* [Overview of the MultiSelect Widget]({% slug overview_kendoui_multiselect_widget %})
* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)

Articles on the Kendo UI DropDownList:

* [Overview of the DropDownList Widget]({% slug overview_kendoui_dropdownlist_widget %})
* [Cascading DropDownLists]({% slug cascading_kendoui_dropdownlist_widget %})
* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
