---
title:  Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI ListView for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_listview_razorpage_aspnetcore
components: ["listview"]
position: 5
---

# ListView in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI ListView for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_databinding_overview_listview %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To configure the CRUD operations of the ListView `DataSource` within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` configuration. The URL in each of these options must refer to the method name in the `PageModel`

    ```HtmlHelper
        @page
        @model IndexModel

        @(Html.Kendo().ListView<OrderViewModel>()
            .Name("listview")
            .Pageable()
            .Editable()
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(ds => ds
                .Ajax()
                .Model(model => model.Id(p => p.OrderID))
                .PageSize(18)
                .Create(create => create.Url(Url.Page("Index", "Create")).Data("forgeryToken"))
                .Read(read => read.Url(Url.Page("Index", "Read")).Data("forgeryToken"))
                .Update(update => update.Url(Url.Page("Index", "Update")).Data("forgeryToken"))
                .Destroy(destroy => destroy.Url(Url.Page("Index", "Destroy")).Data("forgeryToken"))
            )
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        <kendo-listview name="listview" tag-name="div" template-id="template" edit-template-id="editTemplate">
            <datasource type="DataSourceTagHelperType.Ajax" page-size="18">
                <schema>
                    <model id="OrderID"/>
                </schema>
                <transport>
                    <create url="@Url.Page("Index", "Create")" data="forgeryToken" />
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken" />
                    <update url="@Url.Page("Index", "Update")" data="forgeryToken" />
                    <destroy url="@Url.Page("Index", "Destroy")" data="forgeryToken"/>
                </transport>
            </datasource>
            <pageable enabled="true"/>
        </kendo-listview>

        <script type="text/x-kendo-template" id="editTemplate">
            <div class="order-view k-widget">
                <dl>
                    <dt>Freight</dt>
                    <dd>
                        <input id="Freight" type="text" data-bind="value:Freight" data-role="numerictextbox" data-type="number" name="Freight" required="required" min="1" validationMessage="required" />
                        <span data-for="Freight" class="k-invalid-msg"></span>
                    </dd>
                    <dt>Ship City</dt>
                    <dd>
                        <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
                            <input id="ShipCity" type="text" class="k-input-inner" data-bind="value:ShipCity" name="ShipCity" required="required" validationMessage="required" />
                        </span>
                        <span data-for="ShipCity" class="k-invalid-msg"></span>
                    </dd>
                    <dt>Ship Name</dt>
                    <dd>
                        <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
                            <input id="ShipName" type="text" class="k-input-inner" data-bind="value:ShipName" name="ShipName" required="required" validationMessage="required" />
                        </span>
                        <span data-for="ShipName" class="k-invalid-msg"></span>
                    </dd>
                </dl>
                <div class="edit-buttons">
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-update-button" href="\\#">#= kendo.ui.icon({ icon: 'check' }) #</a>
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-cancel-button" href="\\#">#= kendo.ui.icon({ icon: 'cancel' }) #</a>
                </div>
            </div>
        </script>
    ```
    ```JS Template
        <script type="text/x-kendo-tmpl" id="template">
            <div class="order-view k-widget">
                <dl>
                    <dt>Freight</dt>
                    <dd>#:Freight#</dd>
                    <dt>Ship City</dt>
                    <dd>#:ShipCity#</dd>
                    <dt>Ship Name</dt>
                    <dd>#:ShipName#</dd>
                </dl>
                <div class="edit-buttons">
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-edit-button" href="\\#">#= kendo.ui.icon({ icon: 'pencil' }) #</a>
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">#= kendo.ui.icon({ icon: 'x' }) #</a>
                </div>
            </div>
        </script>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the CRUD requests.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for each data operation.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public static IList<OrderViewModel> orders;

        public void OnGet()
        {
            if (orders == null)
            {
                // Populate the "orders" collection with data.
                orders = new List<OrderViewModel>();
                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    OrderID = i,
                    Freight = i * 10,
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }));
            }       
        }       

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(orders.ToDataSourceResult(request));
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            order.OrderID = orders.Count + 1;
            orders.Add(order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
        {
            orders.Remove(orders.FirstOrDefault(x => x.OrderID == order.OrderID));

            return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    }
    ```

For the complete project, refer to the [ListView in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ListView/ListViewCrudOperations.cshtml).

## Binding to a PageModel Property

To bind the ListView to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that holds the data collection that must be loaded in the ListView.

    ```C#
        public class ListViewPageModel : PageModel
        {
            [BindProperty]
            public IList<OrderViewModel> orders { get; set; }

            public void OnGet()
            {
                orders = new List<OrderViewModel>();
                // Populate the collection with data.
                Enumerable.Range(1, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                {
                    OrderID = i + 1,
                    Freight = i * 10,
                    ShipName = "ShipName " + i,
                    ShipCity = "ShipCity " + i
                }));
            }
        }
    ```

1. Declare the `PageModel` at the top of the page.

    ```
        @model ListViewPageModel
    ```

1. Bind the ListView to the collection property and disable the server data operations (`ServerOperations(false)`).

    ```HtmlHelper
        @page
        @model ListViewPageModel

        @(Html.Kendo().ListView<OrderViewModel>(Model.orders)
            .Name("listview")
            .Pageable()
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(ds => ds
                .Ajax()
                .PageSize(18)
                .ServerOperation(false)
            )
        )
    ```
    ```TagHelper
        @page
        @model ListViewPageModel

        <kendo-listview name="listview" tag-name="div" template-id="template" bind-to="@Model.orders">
            <pageable enabled="true"/>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="18" server-operation="false" />
        </kendo-listview>
    ```
    ```JS Template
        <script type="text/x-kendo-tmpl" id="template">
            <div class="order-view k-widget">
                <dl>
                    <dt>Freight</dt>
                    <dd>#:Freight#</dd>
                    <dt>Ship City</dt>
                    <dd>#:ShipCity#</dd>
                    <dt>Ship Name</dt>
                    <dd>#:ShipName#</dd>
                </dl>
                <div class="edit-buttons">
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-edit-button" href="\\#">#= kendo.ui.icon({ icon: 'pencil' }) #</a>
                    <a role="button" class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md k-delete-button" href="\\#">#= kendo.ui.icon({ icon: 'x' }) #</a>
                </div>
            </div>
        </script>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [Server-Side HtmlHelper API of the ListView](/api/listview)
* [Server-Side TagHelper API of the ListView](/api/taghelpers/listview)
* [Knowledge Base Section](/knowledge-base)