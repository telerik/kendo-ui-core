---
title: Remote Binding
page_title: Remote Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to remote data."
slug: htmlhelpers_listbox_remote_aspnetcore
position: 4
---

# Remote Binding

The Telerik UI ListBox for {{ site.framework }} enables you to bind it to remote data by using a [`DataSource`]({% slug htmlhelpers_datasource_aspnetcore %}) configuration object. The component will receive the data from the remote endpoint by making an `AJAX` request.

1. Create an action that returns the data as a `JSON` result.


    ```Controller

        public class ListBoxController : Controller
        {
            public IActionResult GetCustomers()
            {
                var customers = Enumerable.Empty<CustomerViewModel>();

                using (var northwind = GetContext())
                {
                    customers = northwind.Customers.Select(customer => new CustomerViewModel
                    {
                        CustomerID = customer.CustomerID,
                        ContactName = customer.ContactName,
                    }).ToList();
                }
                return Json(customers);
            }
        }
    ```
    ```Model
        public class CustomerViewModel
        {
            public string CustomerID { get; set; }
            public string ContactName { get; set; }
        }
    ```

1. Define the ListBox to the View and configure its DataSource to use remote data.


    ```HtmlHelper
        @(Html.Kendo().ListBox()
            .Name("contacts")
            .DataTextField("ContactName")
            .DataValueField("CustomerID")
            .DataSource(source => source
                .Read(read => read.Action("GetCustomers", "ListBox")) // Specify the Read Action method.
            )
            .ConnectWith("selected")
            .Toolbar(toolbar =>
            {
                toolbar.Position(ListBoxToolbarPosition.Right);
                toolbar.Tools(tools => tools
                    .MoveUp()
                    .MoveDown()
                    .TransferTo()
                    .TransferFrom()
                    .TransferAllTo()
                    .TransferAllFrom()
                    .Remove());
            })
            .BindTo(new List<CustomerViewModel>())
        )

        @(Html.Kendo().ListBox()
            .Name("selected")
            .DataTextField("ContactName")
            .DataValueField("CustomerID")
            .ConnectWith("contacts")
            .BindTo(new List<CustomerViewModel>())
        )
    ```
    {% if site.core %}
    ```TagHelper

            @{
                var customers = new List<CustomerViewModel>();
                var tools = new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove" };
            }

            <kendo-listbox name="contacts"
                datatextfield="ContactName"
                datavaluefield="CustomerID"
                connect-with="selected"
                bind-to="customers">
                <datasource>
                    <transport>
                        <read url="@Url.Action("GetCustomers", "ListBox")"/>
                    </transport>
                </datasource>
                <toolbar position="ListBoxToolbarPosition.Right" tools="tools"/>
            </kendo-listbox>

            <kendo-listbox name="selected"
                datatextfield="ContactName"
                datavaluefield="CustomerID"
                connect-with="contacts"
                bind-to="customers">
            </kendo-listbox>
    ```
    {% endif %}



By default, the ListBox will bind to the data during its initialization. To disable this behavior, set the [`AutoBind`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/listboxbuilder#autobindsystemboolean) option of the component to `false`.

The example below demonstrates how to load the data in the ListBox when a button is clicked.

```HtmlHelper

    @(Html.Kendo().Button()
        .Name("loadDataBtn")
        .Content("Load the ListBox data")
        .HtmlAttributes(new { type = "button" })
        .Events(ev => ev.Click("onClick"))
    )
    <br/>
    @(Html.Kendo().ListBox()
        .Name("contacts")
        .AutoBind(false)
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox")) // Specify the Read Action method.
        )
        .BindTo(new List<CustomerViewModel>())
    )

```
{% if site.core %}
```TagHelper

        @{
            var customers = new List<CustomerViewModel>();
        }

        <kendo-button name="loadDataBtn" on-click="onClick">
            Load the ListBox data
        </kendo-button>
        <br/>
        <kendo-listbox name="contacts" 
            auto-bind="false"
            datatextfield="ContactName"
            datavaluefield="CustomerID"
            bind-to="customers">
            <datasource>
                <transport>
                    <read url="@Url.Action("GetCustomers", "ListBox")"/>
                </transport>
            </datasource>
        </kendo-listbox>
```
{% endif %}
```Scripts
    <script>
        function onClick() {
            //Call the read() method of the dataSource to trigger the Read request.
            $("#contacts").data("kendoListBox").dataSource.read();
        }
    </script>
```

## See Also

* [Remote Data Binding of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/templates)
* [Server-Side API](/api/listbox)
