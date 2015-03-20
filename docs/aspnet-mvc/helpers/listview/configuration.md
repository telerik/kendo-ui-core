---
title: Configuration
page_title: Configuration of Kendo jQuery ListView widget for ASP.NET MVC
description: How to configure the TagName of Kendo ListView for ASP.NET MVC and set Client Template ID of the script element.
---

## Tag name

The `TagName` of Kendo ListView for ASP.NET MVC used to create an element which will contain all listivew items once the listview is bound.

## Client template id

The `ClientTemplateId` is mandatory for the listview widget. It contains the `id` of the **script** element which has the item template.

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

The `DataSource` of the Kendo ListView for ASP.NET MVC contains configuration used by
the [Kendo DataSource](/api/framework/datasource) object.

Kendo ListView for ASP.NET MVC supports
[ajax](/aspnet-mvc/helpers/listview/binding) type of data source.


###   Create
Specify the action method which will create new model

    .DataSource(dataSource => dataSource
        .Create(create => create.Action(/### action ###/ "Create", /### controller ###/ "Home"))
    )

###   Destroy
Specify the action method which will destroy existing models.

    .DataSource(dataSource => dataSource
        .Destroy(destroy =>  destroy.Destroy(/### action ###/ "Destroy", /### controller ###/ "Home"))
    )

###   Events
Handle the [events](/api/framework/datasource#events) of the Kendo DataSource object.

    .DataSource(dataSource => dataSource
        .Events(events => events
            // Subscribe to the "change" event. The name of the JavaScript function which will be invoked is "changeHandler".
            .Change("changeHandler")
            // Subscribe to the "error" event. The name of the JavaScript function which will be invoked is "errorHandler".
            .Error("errorHandler")
            // Subscribe to the "requestStart" event. The name of the JavaScript function which will be invoked is "requestStartHandler".
            .RequestStart("requestStartHandler")
        )
    )

###   Filter
Set the initial filter.

    .DataSource(dataSource => dataSource
        .Filter(filters =>
        {
            // Show products whose ProductName property contains "C"
            filters.Add(p => p.ProductName).Contains("C");
            // and UnitsInStock is greater than 10
            filters.Add(p => p.UnitsInStock).IsGreaterThan(10);
        })
    )

###   Model
Configure the model of the data source.

    .DataSource(dataSource => dataSource
        .Model(model =>
        {
            //The unique identifier (primary key) of the model is the ProductID property
            model.Id(p => p.ProductID);

            // Declare a model field and optionally specify its default value (used when a new model instance is created)
            model.Field(p => p.ProductName).DefaultValue("N/A");

            // Declare a model field and make it readonly
            model.Field(p => p.UnitPrice).Editable(false);
        })
    )

###   PageSize
Set the page size used during paging. The default page size is 10.

    .DataSource(dataSource => dataSource
        .PageSize(20)
    )

###   Read
Specify the action method which will read existing models and return them as JSON:

    .DataSource(dataSource => dataSource
        .Read(read =>  read.Read(/### action ###/ "Read", /### controller ###/ "Home"))
    )

###   Sort
Set the initial sort.

    .DataSource(dataSource => dataSource
        .Sort(sort =>
        {
            // Sort by UnitsInStock in descending order
            sort.Add(p => p.UnitsInStock).Descending();
            // then by ProductName in ascending order
            sort.Add(p => p.ProductName);
        })
    )

###   Update
Specify the action method which will update existing models:

    .DataSource(dataSource => dataSource
        .Update(update =>  update.Update(/### action ###/ "Update", /### controller ###/ "Home"))
    )
