---
title: Overview
page_title: Documentation for Kendo UI ListView HtmlHelper server-side wrapper
description: Learn how to configure Kendo UI ListView for server binding and handle events.
---

# ListView

The ListView HtmlHelper extension is a server-side wrapper for the [Kendo UI ListView](/api/web/listview) widget.

## Getting Started

Here is how to configure the Kendo ListView for server binding to the Northwind Products table using Linq to SQL:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the Products table as the model:

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
3.  Make your view strongly typed:
    - WebForms

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
               Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    - Razor

            @model IEnumerable<MvcApplication1.Models.Product>
4.  Add the ListView wrapper:
	- ListView Template

		    <script type="text/x-kendo-tmpl" id="template">
    			<div class="product">
			        <img src="@Url.Content("~/content/web/foods/")${ProductID}.jpg" alt="${ProductName} image" />
			        <h3>${ProductName}</h3>
			        <dl>
			            <dt>Price:</dt>
			            <dd>${kendo.toString(UnitPrice, "c")}</dd>
			        </dl>
		    	</div>
			</script>
    - WebForms

            <%: Html.Kendo().ListView(Model) //The listview will be initially bound to the Model which is the Products table
                    .Name("productListView") //The name of the listview is mandatory. It specifies the "id" attribute of the widget.
					.TagName("div") //The tag name of the listview is mandatory. It specifies the element which wraps all listview items.
                    .ClientTemplateId("template") // This template will be used for rendering the listview items.
					.DataSource(dataSource => {
      				  	dataSource.Read(read => read.Action("Products_Read", "ListView"));
				    }) // DataSource configuration. It will be used on paging.
                    .Pageable() //Enable paging
            %>
    - Razor

            @(Html.Kendo().ListView(Model) //The listview will be initially bound to the Model which is the Products table
                    .Name("productListView") //The name of the listview is mandatory. It specifies the "id" attribute of the widget.
					.TagName("div") //The tag name of the listview is mandatory. It specifies the element which wraps all listview items.
                    .ClientTemplateId("template") // This template will be used for rendering the listview items.
					.DataSource(dataSource => {
      				  	dataSource.Read(read => read.Action("Products_Read", "ListView"));
				    }) // DataSource configuration. It will be used on paging.
                    .Pageable() //Enable paging
            )

## Accessing an Existing ListView

You can reference an existing ListView instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/listview#methods) to control its behavior.

### Accessing an existing ListView instance

    //Put this after your Kendo ListView for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the grid is used to get its client-side instance
        var listView = $("#productGrid").data("kendoListView");
    });
    </script>


## Handling Kendo UI ListView events

You can subscribe to all [events](/api/web/listview#events) exposed by Kendo UI ListView:


### WebForms - subscribe by handler name

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
        //Handle the dataBound event
    }

    function productListView_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

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
        //Handle the dataBound event
    }

    function productListView_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by template delegate

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
	                    //Handle the dataBound event inline
	                }
	              </text>)
	              .Change(@<text>
	                function() {
	                    //Handle the change event inline
	                }
	                </text>)
	          )
    )
