---
title: Editing
page_title: Editing of Kendo jQuery ListView for ASP.NET MVC
description: Find which steps to follow in order to configure Kendo UI ListView for ASP.NET MVC for editing.
---

# Editing

## Getting started

To configure Kendo ListView for ASP.NET MVC for editing follow these steps:

1.	Define item template for listview:

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

	**Note:** Click events for elements with class name **k-edit-button** and **k-delete-button** will be automatically handled and treated by Kendo ListView as **edit** and **delete** actions.

2.	Define `EditorTemplate` for the model:

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

	**Note:** Click events for elements with class name **k-update-button** and **k-cancel-button** will be automatically handled and treated by Kendo ListView as **save** and **cancel** actions. The editor template should be wrapped in a HTML container, same as the item template.

3.	Enable listview editing:

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
		    .Editable() // <-- Enable editing
		)

4.  Specify the action methods which will handle the Create, Update and Destroy operations:

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
			.Editable()
		    .DataSource(dataSource => dataSource
		        // Configure CRUD -->
		        .Create(create => create.Action("Editing_Create", "ListView"))
		        .Read(read => read.Action("Editing_Read", "ListView"))
		        .Update(update => update.Action("Editing_Update", "ListView"))
		        .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
				// <-- Configure CRUD
		    )
		)

5.  Specify the property of the model which is the unique identifier (primary key):

		@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
		    .Name("listView")
		    .TagName("div")
		    .ClientTemplateId("list-view-template")
			.Editable()
		    .DataSource(dataSource => dataSource
				// Specify that the ProductID property is the unique identifier of the model
		        .Model(model => model.Id("ProductID"))
		        .Create(create => create.Action("Editing_Create", "ListView"))
		        .Read(read => read.Action("Editing_Read", "ListView"))
		        .Update(update => update.Action("Editing_Update", "ListView"))
		        .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
		    )
		)

6.  Implement the `Read` action method:

        public ActionResult Editing_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(ProductRepository.All().ToDataSourceResult(request));
        }

7.  Implement the `Create` action method:

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Create([DataSourceRequest] DataSourceRequest request, Product product)
        {
            if (product != null && ModelState.IsValid)
            {
                ProductRepository.Insert(product);
            }

            //Return any validation errors if any
            return Json(new [] { product }.ToDataSourceResult(request, ModelState));
        }

8.  Implement the `Update` action method:

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

            //Return any validation errors if any
            return Json(ModelState.ToDataSourceResult());
        }

9.  Implement the `Destroy` action method:

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Editing_Destroy([DataSourceRequest] DataSourceRequest request, Product product)
        {
            if (product != null)
            {
                ProductRepository.Delete(product);
            }

            //Return any validation errors if any
            return Json(ModelState.ToDataSourceResult());
        }

