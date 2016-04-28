---
title: Overview
page_title: Overview | Kendo UI ListView HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI ListView widget for ASP.NET MVC."
slug: overview_listviewhelper_aspnetmvc
position: 1
---

# ListView HtmlHelper Overview

The ListView HtmlHelper extension is a server-side wrapper for the [Kendo UI ListView](https://demos.telerik.com/kendo-ui/listview/index) widget.

## Getting Started

### Setup

Below are listed the steps for you to follow when configuring the Kendo UI ListView.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **Products** table as the model.

###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

    		public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
    			  NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

**Step 3** Make your view strongly typed.

###### Example

```tab-ASPX

        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
           Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
```
```tab-Razor

        @model IEnumerable<MvcApplication1.Models.Product>
```

**Step 4** Add the ListView wrapper.

###### Example

```tab-Template

		    <script type="text/x-kendo-tmpl" id="template">
    			<div class="product">
			        <img src="@Url.Content("~/content/web/foods/")#=ProductID#.jpg" alt="#=ProductName# image" />
			        <h3>#=ProductName#</h3>
			        <dl>
			            <dt>Price:</dt>
			            <dd>#=kendo.toString(UnitPrice, "c")#</dd>
			        </dl>
		    	</div>
			  </script>
```
```tab-ASPX

        <%: Html.Kendo().ListView(Model) //The ListView will be initially bound to the Model which is the Products table.
                  .Name("productListView") //The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
				.TagName("div") //The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
                  .ClientTemplateId("template") //This template will be used for rendering the ListView items.
				.DataSource(dataSource => {
    				  	dataSource.Read(read => read.Action("Products_Read", "ListView"));
			  }) //DataSource configuration. It will be used on paging.
                  .Pageable() //Enable paging.
        %>
```
```tab-Razor

        @(Html.Kendo().ListView(Model) //The ListView will be initially bound to the Model which is the Products table.
                  .Name("productListView") //The name of the ListView is mandatory. It specifies the "id" attribute of the widget.
				.TagName("div") //The tag name of the ListView is mandatory. It specifies the element which wraps all ListView items.
                  .ClientTemplateId("template") //This template will be used for rendering the ListView items.
				.DataSource(dataSource => {
    				  	dataSource.Read(read => read.Action("Products_Read", "ListView"));
			  }) //DataSource configuration. It will be used on paging.
                  .Pageable() //Enable paging.
        )
```

## Event Handling

You can subscribe to all ListView [events](/api/javascript/ui/listview#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().ListView<ProductViewModel>()
        		.Name("listView")
    		    .TagName("div")
    		    .ClientTemplateId("template")
    		    .DataSource(dataSource => {
    		        dataSource.Read(read => read.Action("Products_Read", "ListView"));
    		    })
                .Events(e => e
                    .DataBound("productListView_dataBound")
                    .Change("productListView_change")
                )
        %>
        <script>
        function productListView_dataBound() {
            //Handle the dataBound event.
        }

        function productListView_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().ListView<ProductViewModel>()
        		.Name("listView")
    		    .TagName("div")
    		    .ClientTemplateId("template")
    		    .DataSource(dataSource => {
    		        dataSource.Read(read => read.Action("Products_Read", "ListView"));
    		    })
                .Events(e => e
                    .DataBound("productListView_dataBound")
                    .Change("productListView_change")
                )
        )
        <script>
        function productListView_dataBound() {
            //Handle the dataBound event.
        }

        function productListView_change() {
            //Handle the change event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().ListView<ProductViewModel>()
        		.Name("listView")
    		    .TagName("div")
    		    .ClientTemplateId("template")
    		    .DataSource(dataSource => {
    		        dataSource.Read(read => read.Action("Products_Read", "ListView"));
    	    	})
              	.Events(e => e
    	              .DataBound(@<text>
    	                function() {
    	                    //Handle the dataBound event inline.
    	                }
    	              </text>)
    	              .Change(@<text>
    	                function() {
    	                    //Handle the change event inline.
    	                }
    	                </text>)
    	          )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI ListView instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [ListView API](/api/javascript/ui/listview#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ListView for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ListView is used to get its client-side instance.
            var listView = $("#productGrid").data("kendoListView");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ListView:

* [ASP.NET MVC API Reference: ListViewBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ListViewBuilder)
* [Overview of the ListView HtmlHelper]({% slug overview_listviewhelper_aspnetmvc %})
* [Configuration of the ListView HtmlHelper]({% slug configuration_listviewhelper_aspnetmvc %})
* [Ajax Binding of the ListView HtmlHelper]({% slug ajaxbinding_listviewhelper_aspnetmvc %})
* [Editing of the ListView HtmlHelper]({% slug eiditing_listviewhelper_aspnetmvc %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
