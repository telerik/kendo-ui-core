---
title: Editing
page_title: Editing | Telerik UI ListView HtmlHelper for ASP.NET MVC
description: "Configure the Telerik UI ListView for ASP.NET MVC for editing."
slug: eiditing_listviewhelper_aspnetmvc
position: 4
---

# Editing

The Telerik UI ListView for ASP.NET Core enables you to edit its records.

To implement the editing functionality of the ListView:

1. [Define the item template](#defining-the-item-template)
1. [Define the editor template](#defining-the-editor-template)
1. [Enable the editing functionality](#enabling-the-editing-functionality)
1. [Specify the action methods](#specifying-the-action-methods)
1. [Determine the `Model` property](#determining-the-model-property)
1. [Implement the action methods](#implementing-the-action-methods)

## Defining the Item Template

The following example demonstrates how to define the item template for the Telerik UI ListView.

> `click` events for elements with the `k-edit-button` and `k-delete-button` class names will be automatically handled and treated by the Telerik UI ListView as `edit` and `delete` actions.

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

## Defining the Editor Template

The following example demonstrates how to define the `EditorTemplate` for the model:

1. Declare the editor template in a file that uses the name of the edited model&mdash;for example, `ProductViewModel.cshtml`.
1. Place this file in the `~Views\Shared\EditorTemplates` directory of your project.

> `click` events for elements with the `k-update-button` and `k-cancel-button` class names will be automatically handled and treated by the Telerik UI ListView as `save` and `cancel` actions. Similar to the item template, you have to wrap the editor template in an HTML container.

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

## Enabling the Editing Functionality

The following example demonstrates how to enable the ListView editing.

    @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("list-view-template")
        .Editable() //<-- Enable editing.
    )

## Specifying the Action Methods

The following example demonstrates how to specify the action methods which will handle the `Create`, `Update`, and `Destroy` operations.

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

## Determining the Model Property

The following example demonstrates how to specify the property of the model which is the unique identifier (primary key).

    @(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
        .Name("listView")
        .TagName("div")
        .ClientTemplateId("list-view-template")
        .Editable()
        .DataSource(dataSource => dataSource
            // Specify that the ProductID property is the unique identifier of the model.
            .Model(model => model.Id("ProductID"))
            .Create(create => create.Action("Editing_Create", "ListView"))
            .Read(read => read.Action("Editing_Read", "ListView"))
            .Update(update => update.Action("Editing_Update", "ListView"))
            .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
        )
    )

## Implementing the Action Methods

The following example demonstrates how to implement the `read` action method.

    public ActionResult Editing_Read([DataSourceRequest] DataSourceRequest request)
    {
        return Json(ProductRepository.All().ToDataSourceResult(request));
    }

The following example demonstrates how to implement the `create` action method.

    [AcceptVerbs(HttpVerbs.Post)]
    public ActionResult Editing_Create([DataSourceRequest] DataSourceRequest request, Product product)
    {
        if (product != null && ModelState.IsValid)
        {
            ProductRepository.Insert(product);
        }

        // Return any validation errors, if any.
        return Json(new [] { product }.ToDataSourceResult(request, ModelState));
    }

The following example demonstrates how to implement the `update` action method.

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

        // Return any validation errors, if any.
        return Json(ModelState.ToDataSourceResult());
    }

The following example demonstrates how to implement the `destroy` action method.

    [AcceptVerbs(HttpVerbs.Post)]
    public ActionResult Editing_Destroy([DataSourceRequest] DataSourceRequest request, Product product)
    {
        if (product != null)
        {
            ProductRepository.Delete(product);
        }

        // Return any validation errors, if any.
        return Json(ModelState.ToDataSourceResult());
    }

## See Also

* [Editing by the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/editing)
* [Server-Side API](/api/listview)
