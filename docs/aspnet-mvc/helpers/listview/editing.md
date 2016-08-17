---
title: Editing
page_title: Editing | Kendo UI ListView HtmlHelper
description: "Configure the Kendo UI ListView for ASP.NET MVC for editing."
slug: eiditing_listviewhelper_aspnetmvc
position: 4
---

# Editing

## Configuration

Below are the steps for you to follow when configuring the Kendo UI ListView for ASP.NET MVC for editing.

### Define the Item Template

The example below demonstrates how to define the item template for the Kendo UI ListView.

###### Example

		<!-- The following markup contains the `Add new record` button -->
		<div class="k-toolbar k-grid-toolbar">
		    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
		</div>

		<!-- ListView item template -->
		<script id="list-view-template" type="text/x-kendo-template">
		    <div class="product-view">
		            <dl>
		                <dt>Product Name</dt>
		                <dd>${ProductName}</dd>
		                <dt>Unit Price</dt>
		                <dd>${kendo.toString(UnitPrice, "c")}</dd>
		                <dt>Units In Stock</dt>
		                <dd>${UnitsInStock}</dd>
		                <dt>Discontinued</dt>
		                <dd>${Discontinued}</dd>
		            </dl>
		            <div class="edit-buttons">
		                <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span>Edit</a>
		                <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span>Delete</a>
		            </div>
		        </div>
		</script>

> **Important**
>
> Click events for elements with `k-edit-button` and `k-delete-button` class names will be automatically handled and treated by the Kendo UI ListView as `edit` and `delete` actions.

### Set the Editor Template

The example below demonstrates how to define the `EditorTemplate` for the model.

		@model Kendo.Mvc.Examples.Models.ProductViewModel
		<div class="product-view">
		    <dl>
		        <dt>Product Name</dt>
		        <dd>
		            @(Html.EditorFor(p=>p.ProductName))
					<!-- ProductName validation message placeholder -->
		            <span data-for="ProductName" class="k-invalid-msg"></span>
		        </dd>
		        <dt>Unit Price</dt>
		        <dd>
		            @(Html.EditorFor(p=>p.UnitPrice))
					<!-- UnitPrice validation message placeholder -->
		            <span data-for="UnitPrice" class="k-invalid-msg"></span>
		        </dd>
		        <dt>Units In Stock</dt>
		        <dd>
		            @(Html.EditorFor(p=>p.UnitsInStock))
					<!-- UnitsInStock validation message placeholder -->
		            <span data-for="UnitsInStock" class="k-invalid-msg"></span>
		        </dd>
		        <dt>Discontinued</dt>
		        <dd>@(Html.EditorFor(p=>p.Discontinued))</dd>
		    </dl>
		    <div class="edit-buttons">
		        <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span>Save</a>
		        <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span>Cancel</a>
		    </div>
		</div>

> **Important**
>
> Click events for elements with `k-update-button` and `k-cancel-button` class names will be automatically handled and treated by the Kendo UI ListView as `save` and `cancel` actions. The editor template should be wrapped in an HTML container, same as the item template.

###	Enable Editing

The example below demonstrates how to enable the ListView editing.

###### Example

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
		    .Editable() //<-- Enable editing.
		)

### Specify the Action Methods

The example below demonstrates how to specify the action methods which will handle the `Create`, `Update` and `Destroy` operations.

###### Example

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
			.Editable()
		    .DataSource(dataSource => dataSource
		        //Configure CRUD. -->
		        .Create(create => create.Action("Editing_Create", "ListView"))
		        .Read(read => read.Action("Editing_Read", "ListView"))
		        .Update(update => update.Action("Editing_Update", "ListView"))
		        .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
				//<-- Configure CRUD.
		    )
		)

### Determine the Model Property

The example below demonstrates how to specify the property of the model which is the unique identifier (primary key).

###### Example

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
			.Editable()
		    .DataSource(dataSource => dataSource
				//Specify that the ProductID property is the unique identifier of the model.
		        .Model(model => model.Id("ProductID"))
		        .Create(create => create.Action("Editing_Create", "ListView"))
		        .Read(read => read.Action("Editing_Read", "ListView"))
		        .Update(update => update.Action("Editing_Update", "ListView"))
		        .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
		    )
		)

### Implement the Action Methods

The example below demonstrates how to implement the `read` action method.

###### Example

        public ActionResult Editing_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(ProductRepository.All().ToDataSourceResult(request));
        }

The example below demonstrates how to implement the `create` action method.

###### Example

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Create([DataSourceRequest] DataSourceRequest request, Product product)
        {
            if (product != null && ModelState.IsValid)
            {
                ProductRepository.Insert(product);
            }

            //Return any validation errors, if any.
            return Json(new [] { product }.ToDataSourceResult(request, ModelState));
        }

The example below demonstrates how to implement the `update` action method.

###### Example

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Update([DataSourceRequest] DataSourceRequest request, Product product)
        {
            if (product != null && ModelState.IsValid)
            {
                var target = ProductRepository.One(p => p.ProductID == product.ProductID);
                if (target != null)
                {
                    target.ProductName = product.ProductName;
                    target.UnitPrice = product.UnitPrice;
                    target.UnitsInStock = product.UnitsInStock;
                    target.LastSupply = product.LastSupply;
                    target.Discontinued = product.Discontinued;
                    ProductRepository.Update(target);
                }
            }

            //Return any validation errors, if any.
            return Json(ModelState.ToDataSourceResult());
        }

The example below demonstrates how to implement the `destroy` action method.

###### Example

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Destroy([DataSourceRequest] DataSourceRequest request, Product product)
        {
            if (product != null)
            {
                ProductRepository.Delete(product);
            }

            //Return any validation errors, if any.
            return Json(ModelState.ToDataSourceResult());
        }

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the ListView:

* [Overview of the ListView HtmlHelper]({% slug overview_listviewhelper_aspnetmvc %})
* [Configuration of the ListView HtmlHelper]({% slug configuration_listviewhelper_aspnetmvc %})
* [Ajax Binding of the ListView HtmlHelper]({% slug ajaxbinding_listviewhelper_aspnetmvc %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
