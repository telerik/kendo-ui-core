---
title: Overview
page_title: Overview | Kendo UI AutoComplete Widget
description: "Learn how to initialize the Kendo UI AutoComplete widget, provide AutoComplete suggestions and customize AutoComplete templates."
slug: overview_kendoui_autocomplete_widget
position: 1
---

# AutoComplete Overview

[Kendo UI AutoComplete widget](http://demos.telerik.com/kendo-ui/autocomplete/index) provides suggestions depending on the typed text. It also allows multiple value entries. The suggestions shown by the widget can come from a local array or from a remote data service.

## Getting Started

### Initialize the AutoComplete 

You can initialize the AutoComplete widget by using a jQuery selector:
    
    <input id="autoComplete" />
    
    $(document).ready(function() {
     $("#autoComplete").kendoAutoComplete(["Item1", "Item2"]);
    });

> **Important**  
> The widget will copy any styles and CSS classes from the input element to the wrapper element.

    <input id="autoComplete" class="myClass" />

    results to:

    <span class="k-widget k-autocomplete k-header k-state-default myClass">
        <input id="autoComplete" class="myClass" />
    </span>


## AutoComplete Suggestions

There are two primary ways to provide AutoComplete suggestions:

1.  From a local data array
2.  From a remote data service

Locally defined values are best for small, fixed sets of suggestions. Remote suggestions must be used for larger data sets. When used with the `DataSource` component, filtering large remote data services can be pushed to the server as well, maximizing client-side performance.

### Local Data Array

To configure and provide AutoComplete suggestions locally, you can either pass an array directly to its constructor or you can set the `dataSource` property to a local array.

#### Initialize Local Data Array

You can directly initialize a local data array in `constructor`:
    
    <input id="autoComplete" />
    
    <script>
        $("#autoComplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
    </script>

#### Bind to Local Data Array

You can bind to a local data array by using the `dataSource` property:
    
    <input id="autoComplete" />
    <script>
        var data = ["Item1", "Item2", "Item3"];
        $("#autoComplete").kendoAutoComplete({
            dataSource: data
        });
    </script>

### Remote Data

The easiest way to bind an AutoComplete to a remote data service is to use the `DataSource` component - an abstraction for local and remote data. `DataSource` can be used to serve data from a variety of data services, such as [XML](http://en.wikipedia.org/wiki/XML), [JSON](http://en.wikipedia.org/wiki/JSON), and [JSONP](http://en.wikipedia.org/wiki/JSONP).

#### Bind to Remote Data 

You can bind to remote data by using OData by means of the `DataSource` component:

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

#### Bind to JSONP Service

You can bind to a JSONP service by using Kendo UI `DataSource`:

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

## Customize Templates

The AutoComplete widget uses Kendo UI templates to enable control over how an item and pop-up header is rendered. For detailed description of the capabilities and syntax of the templates, please refer to the [documentation](/framework/templates/overview).

### Item Templates

The AutoComplete widget uses Kendo UI templates to control the way drop-down items are rendered.

###### Example - define an item template

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

###### Example - define a header template
    
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

## Customize the Drop-Down List

You can customize the width of a drop-down list and change its dimensions by using the jQuery width() method.

###### Example

    <input id="autoComplete" />
    
    <script>  
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // set width of the drop-down list
        autoComplete.list.width(400);
    </script>
    
## See Also

Other articles on Kendo UI AutoComplete:

* [Grouping]({% slug grouping_kendoui_autocomplete_widget %})
* [Virtualization]({% slug virtualization_kendoui_autocomplete_widget %})
* [Use Custom Templates with AngularJS]({% slug howto_use_custom_angularjs_templates_autocomplete %}) 
* [Show `No results found`]({% slug howto_add_customized_templates_autocomplete %})
* [Change `DataSource` Dynamically]({% slug howto_change_datasource_dynamically_autocomplete %})
* [Highlight Matched Values]({% slug howto_highlight_matched_values_autocomplete %})
* [Restrict Other Users]({% slug howto_restrict_user_input_autocomplete %})