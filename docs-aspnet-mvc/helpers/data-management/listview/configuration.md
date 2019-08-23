---
title: Advanced Configuration
page_title: Advanced Configuration | Telerik UI ListView HtmlHelper for ASP.NET MVC
description: "Configure the TagName, Client Template ID of the script element, and the common DataSource settings of the Telerik UI ListView HtmlHelper for ASP.NET MVC."
slug: configuration_listviewhelper_aspnetmvc
position: 2
---

# Advanced Configuration

The Telerik UI for ASP.NET MVC ListView enables you to use the configuration options that are exposed by its fluent API.

## Getting Started

* The `TagName` of Kendo UI ListView for ASP.NET MVC is used to create an element to contain all ListView items once the ListView is bound.
* The `ClientTemplateId` is mandatory for the ListView. It contains the `id` of the `script` element which accommodates the item template.

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

The `DataSource` of the Telerik UI ListView for ASP.NET MVC contains configuration that is used by the [Kendo UI for jQuery DataSource](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource) object. The ListView HtmlHelper for ASP.NET MVC supports the [Ajax]({% slug ajaxbinding_listviewhelper_aspnetmvc %}) type of data source.

* The `Create` method sets the action method which will create the new model.

        .DataSource(dataSource => dataSource
            .Create(create => create.Action(/### action ###/ "Create", /### controller ###/ "Home"))
        )

* The `Destroy` method sets the action method which will destroy the existing models.

        .DataSource(dataSource => dataSource
            .Destroy(destroy =>  destroy.Destroy(/### action ###/ "Destroy", /### controller ###/ "Home"))
        )

* The `Events` method specifies the event handlers for the data source [events](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#events).

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

* The `Filter` method sets the initial filter.

        .DataSource(dataSource => dataSource
            .Filter(filters =>
            {
                //Show products whose ProductName property contains "C".
                filters.Add(p => p.ProductName).Contains("C");
                //And UnitsInStock is greater than 10.
                filters.Add(p => p.UnitsInStock).IsGreaterThan(10);
            })
        )

* The `Model` method configures the model of the data source.

        .DataSource(dataSource => dataSource
            .Model(model =>
            {
                // The unique identifier (primary key) of the model is the ProductID property.
                model.Id(p => p.ProductID);

                //Declare a model field and optionally specify its default value (used when a new model instance is created).
                model.Field(p => p.ProductName).DefaultValue("N/A");

                //Declare a model field and make it readonly.
                model.Field(p => p.UnitPrice).Editable(false);
            })
        )

* The `PageSize` sets the page size that is used during paging and defaults to `10`.

        .DataSource(dataSource => dataSource
            .PageSize(20)
        )

* The `Read` method sets the action method which will read the existing models and return them as JSON.

        .DataSource(dataSource => dataSource
            .Read(read =>  read.Read(/### action ###/ "Read", /### controller ###/ "Home"))
        )

* The `Sort` method sets the initial sort.

        .DataSource(dataSource => dataSource
            .Sort(sort =>
            {
                //Sort by UnitsInStock in descending order.
                sort.Add(p => p.UnitsInStock).Descending();
                // Then by ProductName in ascending order.
                sort.Add(p => p.ProductName);
            })
        )

* The `Update` method sets the action method which will update the existing models.

        .DataSource(dataSource => dataSource
            .Update(update =>  update.Update(/### action ###/ "Update", /### controller ###/ "Home"))
        )

## See Also

* [Binding to Remote Data by the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/remote-data-binding)
* [Customizing the Data Source of the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/custom-datasource)
* [Server-Side API](/api/listview)
