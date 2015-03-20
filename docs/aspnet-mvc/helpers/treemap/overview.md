---
title: Overview
page_title: User Guide for TreeMap HtmlHelper extension for Kendo UI TreeMap widget
description: Instructions and examples for TreeMap HtmlHelper extension for Kendo UI TreeMap for ASP.NET MVC.
---

# TreeMap

The TreeMap HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeMap](/api/dataviz/treemap) widget.

## Getting Started

Here is how to configure a simple Kendo TreeMap:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }

3.  Add a simple treemap:
    - WebForms

            <%= Html.Kendo().TreeMap()
                    .Name("treeMap")
                    .DataSource(dataSource => dataSource
                        .Read(read => read
                            .Action("_PopulationUSA", "TreeMap")
                        )
                        .Model(m => m.Children("Items"))
                    )
                    .ValueField("Value")
                    .TextField("Name")
            %>

    - Razor

            $(Html.Kendo().TreeMap()
                  .Name("treeMap")
                  .DataSource(dataSource => dataSource
                      .Read(read => read
                          .Action("_PopulationUSA", "TreeMap")
                      )
                      .Model(m => m.Children("Items"))
                  )
                  .ValueField("Value")
                  .TextField("Name")
            )

## Accessing an Existing TreeMap

You can reference an existing TreeMap instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/treemap#methods) to control its behavior.

### Accessing an existing TreeMap instance

    // Put this after your Kendo TreeMap for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the treemap is used to get its client-side instance
        var treemap = $("#treemap").data("kendoTreeMap");
    });
    </script>

## Handling Kendo UI TreeMap events

You can subscribe to all [events](/api/dataviz/treemap#events) exposed by Kendo UI TreeMap:

### WebForms - subscribe by handler name

    <%= Html.Kendo().TreeMap()
            .Name("treemap")
            .Events(events => events
                .ItemCreated("onItemCreated")
                .DataBound("onDataBound")
            )
    %>

    <script>
    function onItemCreated() {
        // Handle the itemCreated event
    }

    function onDataBound() {
        // Handle the dataBound event
    }
    </script>


### Razor - subscribe by handler name

    $(Html.Kendo().TreeMap()
          .Name("treemap")
          .Events(events => events
              .ItemCreated("onItemCreated")
              .DataBound("onDataBound")
          )
    )

    <script>
    function onItemCreated() {
        // Handle the itemCreated event
    }

    function onDataBound() {
        // Handle the dataBound event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().TreeMap()
          .Name("treemap")
          .Events(e => e
              .ItemCreated(@<text>
                function() {
                    // Handle the itemCreated event
                }
              </text>)
              .DataBound(@<text>
                function() {
                    // Handle the dataBound event
                }
                </text>)
          )
    )
