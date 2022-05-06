---
title: Overview
page_title: Data Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to local or remote data."
previous_url: /helpers/editors/listbox/data-binding
slug: htmlhelpers_listbox_databinding_aspnetcore
position: 1
---

# Data Binding Overview

By default, the Telerik UI ListBox for {{ site.framework }} automatically binds to data.

Immediately after the ListBox loads, the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) sends a query and the data is loaded to the helper. To disable this behavior, set the `AutoBind` option of the ListBox to `false`.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .AutoBind(false) // Prevent data binding during the initialization of the widget
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .TransferTo()
                .Remove());
        })
        .BindTo(new List<CustomerViewModel>())
    )
```
{% if site.core %}
```TagHelper
    @{ 
        var dropSources = new string[] { "selected" };
        var customers = new List<CustomerViewModel>();
        var tools = new string[] { "transferTo", "remove" };
    }

    <kendo-listbox name="optional"
                datatextfield="ContactName"
                datavaluefield="CustomerID"
                template-id="customer-item-template"
                drop-sources="dropSources"
                connect-with="selected"
                auto-bind="false"
                bind-to="customers">
        <datasource>
            <transport>
                <read url="@Url.Action("GetCustomers", "ListBox")"/>
            </transport>
        </datasource>
        <draggable enabled="true" placeholder="customPlaceholder" />
        <toolbar position="ListBoxToolbarPosition.Right" 
                tools="tools"/>
    </kendo-listbox>
```
{% endif %}
```Template
    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url('../content/web/Customers/#:data.CustomerID#.jpg')"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>
```

For more information about binding the ListBox to data, refer to the articles on:
* [Local data binding]({% slug htmlhelpers_listbox_local_aspnetcore %})
* [Remote data binding]({% slug htmlhelpers_listbox_remote_aspnetcore %})

## See Also

* [Basic Usage of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
{% if site.core %}
* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
{% endif %}
* [Server-Side API](/api/listbox)
