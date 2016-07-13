---
title: Overview
page_title: Overview | Kendo UI AutoComplete
description: "Learn how to initialize the Kendo UI AutoComplete widget, provide AutoComplete suggestions and customize AutoComplete templates."
slug: overview_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Overview

The [Kendo UI AutoComplete widget](http://demos.telerik.com/kendo-ui/autocomplete/index) provides suggestions depending on the typed text. It also allows multiple value entries. The suggestions shown by the widget can come from a local array or from a remote data service.

## Getting Started

### Initialize the AutoComplete

Initialize the AutoComplete widget by using a jQuery selector.

###### Example

    <input id="autoComplete" />

    $(document).ready(function() {
     $("#autoComplete").kendoAutoComplete(["Item1", "Item2"]);
    });

> **Important**
>
> The widget copies any styles and CSS classes from the input element to the wrapper element.

###### Example

    <input id="autoComplete" class="myClass" />

    results to:

    <span class="k-widget k-autocomplete k-header k-state-default myClass">
        <input id="autoComplete" class="myClass" />
    </span>

## Configuration

### Suggestions

There are two primary ways to provide AutoComplete suggestions:

1.  From a local data array
2.  From a remote data service

Locally defined values are best for small, fixed sets of suggestions. Remote suggestions must be used for larger data sets. When used with the `DataSource` component, the filtering of large remote data services can be pushed to the server as well, which maximizes the client-side performance.

**Bind to a local data array**

To configure and provide the AutoComplete suggestions locally, either pass an array directly to its constructor, or set the `dataSource` property to a local array.

To directly initialize a local data array in `constructor`, follow the example below.

###### Example

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
    </script>

To bind the widget to a local data array by using the `dataSource` property, follow the example below.

###### Example

    <input id="autoComplete" />
    <script>
        var data = ["Item1", "Item2", "Item3"];
        $("#autoComplete").kendoAutoComplete({
            dataSource: data
        });
    </script>

**Bind to a remote data service**

To bind an AutoComplete to a remote data service, use the [DataSource component]({% slug overview_kendoui_datasourcecomponent %})&mdash;an abstraction for local and remote data.

The DataSource can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

To bind the widget to a remote data service by using OData through the DataSource component, follow the example below.

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

To bind the widget to a JSONP service by using the Kendo UI DataSource, follow the example below.

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

### Change of Drop-Down List Width

To customize the width of a drop-down list and change its dimensions by using the jQuery `width()` method, follow the example below.

###### Example

    <input id="autoComplete" />

    <script>
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // set width of the drop-down list
        autoComplete.list.width(400);
    </script>

### Access of Drop-Down List Element

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

### Input Removal

The AutoComplete enables you to remove the values from the input area of the widget through the `clearButton` configuration option. By default, it is enabled and set to `true`. As a result, a **x** button appears in the input area on hover. When clicked, it resets the value of the widget and triggers the `change` event.

## Templates

The AutoComplete widget uses Kendo UI templates to enable control over the way an item and a pop-up header is rendered. For more information on the capabilities and syntax of the templates, refer to the [documentation]({% slug overview_kendoui_templatescomponent %}).

### Item Templates

The AutoComplete widget uses Kendo UI templates to control the way drop-down items are rendered.

The example below demonstrates how to define an item template.

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

The AutoComplete widget provides the rendering of a pop-up header.

The example below demonstrates how to define a header template.

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

The AutoComplete allows you to render a pop-up footer. The footer is re-rendered on every DataSource change. The context of the template is the widget itself.

The example below demonstrates how to define a footer template.

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

The example below demonstrates how to define a `noDataTemplate` template.

> **Important**
>
> When the `noDataTemplate` option is defined, the widget will always open the popup element.

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
