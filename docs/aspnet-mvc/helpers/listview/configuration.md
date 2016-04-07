---
title: Configuration
page_title: Configuration | Kendo UI ListView HtmlHelper
description: "Configure the TagName of a Kendo UI ListView for ASP.NET MVC and set the Client Template ID of the script element."
slug: configuration_listviewhelper_aspnetmvc
position: 2
---

# Configuration

## Tag Name

The `TagName` of Kendo UI ListView for ASP.NET MVC is used to create an element to contain all ListView items once the ListView is bound.

## ClientTemplateId

The `ClientTemplateId` is mandatory for the ListView widget. It contains the `id` of the `script` element which accommodates the item template.

###### Example

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

## Common DataSource Settings

The `DataSource` of the Kendo UI ListView for ASP.NET MVC contains configuration used by the [Kendo UI DataSource](/api/framework/datasource) object.

Kendo UI ListView for ASP.NET MVC supports [Ajax]({% slug ajaxbinding_listviewhelper_aspnetmvc %}) type of data source.

### Create

Specify the action method which will create the new model.

###### Example

	    .DataSource(dataSource => dataSource
	        .Create(create => create.Action(/### action ###/ "Create", /### controller ###/ "Home"))
	    )

### Destroy

Specify the action method which will destroy the existing models.

###### Example

	    .DataSource(dataSource => dataSource
	        .Destroy(destroy =>  destroy.Destroy(/### action ###/ "Destroy", /### controller ###/ "Home"))
	    )

### Events

Handle the [events](/api/javascript/data/datasource#events) of the Kendo UI DataSource object.

###### Example

	    .DataSource(dataSource => dataSource
	        .Events(events => events
	            //Subscribe to the "change" event. The name of the JavaScript function which will be invoked is "changeHandler".
	            .Change("changeHandler")
	            //Subscribe to the "error" event. The name of the JavaScript function which will be invoked is "errorHandler".
	            .Error("errorHandler")
	            //Subscribe to the "requestStart" event. The name of the JavaScript function which will be invoked is "requestStartHandler".
	            .RequestStart("requestStartHandler")
	        )
	    )

### Filter

Set the initial filter.

###### Example

	    .DataSource(dataSource => dataSource
	        .Filter(filters =>
	        {
	            //Show products whose ProductName property contains "C".
	            filters.Add(p => p.ProductName).Contains("C");
	            //And UnitsInStock is greater than 10.
	            filters.Add(p => p.UnitsInStock).IsGreaterThan(10);
	        })
	    )

### Model

Configure the model of the data source.

###### Example

	    .DataSource(dataSource => dataSource
	        .Model(model =>
	        {
	            //The unique identifier (primary key) of the model is the ProductID property.
	            model.Id(p => p.ProductID);

	            //Declare a model field and optionally specify its default value (used when a new model instance is created).
	            model.Field(p => p.ProductName).DefaultValue("N/A");

	            //Declare a model field and make it readonly.
	            model.Field(p => p.UnitPrice).Editable(false);
	        })
	    )

### PageSize

Set the page size used during paging. The default page size is `10`.

###### Example

	    .DataSource(dataSource => dataSource
	        .PageSize(20)
	    )

### Read

Specify the action method which will read the existing models and return them as JSON.

###### Example

	    .DataSource(dataSource => dataSource
	        .Read(read =>  read.Read(/### action ###/ "Read", /### controller ###/ "Home"))
	    )

### Sort

Set the initial sort.

###### Example

	    .DataSource(dataSource => dataSource
	        .Sort(sort =>
	        {
	            //Sort by UnitsInStock in descending order.
	            sort.Add(p => p.UnitsInStock).Descending();
	            //Then by ProductName in ascending order.
	            sort.Add(p => p.ProductName);
	        })
	    )

### Update

Specify the action method which will update the existing models.

###### Example

	    .DataSource(dataSource => dataSource
	        .Update(update =>  update.Update(/### action ###/ "Update", /### controller ###/ "Home"))
	    )

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ListView:

* [Overview of the ListView HtmlHelper]({% slug overview_listviewhelper_aspnetmvc %})
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
