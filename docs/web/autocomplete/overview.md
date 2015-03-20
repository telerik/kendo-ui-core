---
title: Overview
page_title: Documentation for AutoComplete UI widget in Kendo UI framework
description: How to provide AutoComplete Suggestions, guide to AutoComplete UI widget.
---

# AutoComplete Overview

The AutoComplete provides suggestions depending on the typed
text. It also allows multiple value entries. The suggestions shown by
the widget can come from a local array or from a remote data service.


## Getting Started

### Initialize the AutoComplete using a jQuery selector
    
    <input id="autoComplete" />
    
    $(document).ready(function() {
     $("#autoComplete").kendoAutoComplete(["Item1", "Item2"]);
    });

> Widget copies any styles and CSS classes from the input element to the wrapper element.

    <input id="autoComplete" class="myClass" />

    results to:

    <span class="k-widget k-autocomplete k-header k-state-default myClass">
        <input id="autoComplete" class="myClass" />
    </span>


## AutoComplete Suggestions

There are two primary ways to provide the AutoComplete
suggestions:

1.  From a local array
2.  From a remote data service

Locally defined values are best for small, fixed sets of suggestions.
Remote suggestions should be used for larger data sets. When used
with the DataSource component,
filtering large remote data services can be pushed to the server as
well, maximizing client-side performance.


## Local Data Array

To configure and provide AutoComplete suggestions locally, you
can either pass an array directly to its constructor or you can set
the dataSource property to a local array.

### Directly initialize local array in constructor
    
    <input id="autoComplete" />
    
    <script>
        $("#autoComplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
    </script>

### Using dataSource property to bind to local array
    
    <input id="autoComplete" />
    <script>
        var data = ["Item1", "Item2", "Item3"];
        $("#autoComplete").kendoAutoComplete({
            dataSource: data
        });
    </script>

## Remote Data

The easiest way to bind an AutoComplete to a remote data service is to use the
DataSource component; an
abstraction for local and remote data. DataSource can be used to serve data from a variety of data services,
such as
[XML](http://en.wikipedia.org/wiki/XML),
[JSON](http://en.wikipedia.org/wiki/JSON), and
[JSONP](http://en.wikipedia.org/wiki/JSONP).

### Using the Kendo UI DataSource component to bind to remote data using OData

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

### Using the Kendo UI DataSource to bind to a JSONP service

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

## Customizing Templates

The AutoComplete widget uses Kendo UI templates to enable control over how item and pop-up header is rendered. For detailed description of the capabilities and syntax of the Kendo UI templates, please refer to the
[documentation](/framework/templates/overview).

### Item template customization

The AutoComplete uses Kendo UI templates to control how *drop-down items* are rendered.

#### Example - define an item template

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

### Header template customization

The AutoComplete gives the ability to render a pop-up header.

#### Example - define a header template
    
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

## Customize the width of the drop-down list

jQuery width() method can be used for changing the widget dimension.

### Example
    <input id="autoComplete" />
    
    <script>  
        $("#autoComplete").kendoAutoComplete();
        var autoComplete = $("#autocomplete").data("kendoAutoComplete");
        // set width of the drop-down list
        autoComplete.list.width(400);
    </script>
