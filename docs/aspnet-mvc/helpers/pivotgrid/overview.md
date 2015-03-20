---
title: Overview
page_title: How to use the Kendo UI PivotGrid HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI PivotGrid widget
description: Learn how to bind Kendo UI PivotGrid for ASP.NET MVC, handle Kendo UI PivotGrid Events, access an existing pivotgrid with PivotGrid HtmlHelper extension documentation.
position: 1
---

# PivotGrid

The PivotGrid HtmlHelper extension is a server-side wrapper for the [Kendo UI PivotGrid](/api/web/pivotgrid) widget. It allows you to configure the Kendo UI PivotGrid
from server-side code, helps with data binding.

## Introduction

Kendo UI PivotGrid for ASP.NET MVC supports ajax data-binding to HTTP accessible OLAP cube.
More information about OLAP concepts can be found in the following links:

- [PivotGrid Fundamentals](/web/pivotgrid/fundamentals)
- [Setup an OLAP cube](/web/pivotgrid/olap-cube-setup) or use our OLAP service ([http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll))

It also supports server/ajax data-binding to a flat data. Widget will create a *cube* client-side allowing to categorize the flat data.
Refer to these demos for more information:

- [Local binding](http://demos.telerik.com/aspnet-mvc/pivotgrid/local-flat-data-binding)
- [Remote binding](http://demos.telerik.com/aspnet-mvc/pivotgrid/remote-flat-data-binding)

## Getting started
The following tutorial shows how to configure Kendo UI PivotGrid for ASP.NET MVC to do ajax binding to an **Adventure Works** cube hosted on [http://demos.telerik.com/olap/msmdpump.dll](http://demos.telerik.com/olap/msmdpump.dll)

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)). Name the application "KendoPivotGrid".
If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions follow the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.

1.  Add a Kendo UI PivotGrid to the Index view
    - Index.aspx (ASPX)

            <%: Html.Kendo().PivotGrid()
                    .Name("pivotgrid")
                    .DataSource(dataSource => dataSource.
                        Xmla()
                        .Columns(columns => {
                            columns.Add("[Date].[Calendar]").Expand(true);
                            columns.Add("[Geography].[City]");
                        })
                        .Rows(rows => rows.Add("[Product].[Product]"))
                        .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
                        .Transport(transport => transport
                            .Connection(connection => connection
                                .Catalog("Adventure Works DW 2008R2")
                                .Cube("Adventure Works"))
                            .Read(read => read
                                .Url("http://demos.telerik.com/olap/msmdpump.dll")
                                .DataType("text")
                                .ContentType("text/xml")
                                .Type(HttpVerbs.Post)
                            )
                        )
                    )
            %>
    - Index.cshtml (Razor)

            @(Html.Kendo().PivotGrid()
                  .Name("pivotgrid")
                  .DataSource(dataSource => dataSource.
                      Xmla()
                      .Columns(columns => {
                          columns.Add("[Date].[Calendar]").Expand(true);
                          columns.Add("[Geography].[City]");
                      })
                      .Rows(rows => rows.Add("[Product].[Product]"))
                      .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
                      .Transport(transport => transport
                          .Connection(connection => connection
                              .Catalog("Adventure Works DW 2008R2")
                              .Cube("Adventure Works"))
                          .Read(read => read
                              .Url("http://demos.telerik.com/olap/msmdpump.dll")
                              .DataType("text")
                              .ContentType("text/xml")
                              .Type(HttpVerbs.Post)
                          )
                      )
                  )
            )
1. Build and run the application
![Final result](/aspnet-mvc/helpers/pivotgrid/images/pivotgrid.png)
