---
title: Localization
page_title: ListBox Localization
description: "Get started with the Telerik UI ListBox component for {{ site.framework }} and learn about the localization options it supports."
components: ["listbox"]
previous_url: /helpers/editors/listbox/globalization/localization
slug: htmlhelpers_listbox_localization_aspnetcore
position: 2
---

# Localization

You can customize the `Messages()` for each toolbar command button of the ListBox.

These messages serve as tooltip text when the user hovers over the buttons.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .Messages(m=>m.Tools(tools=>
            {
                tools.MoveUp("Promote");
                tools.MoveDown("Demote");
                tools.Remove("Remove Employee");
                tools.TransferTo("Transfer To");
                tools.TransferAllTo("Transfer All To");
                tools.TransferFrom("Transfer From");
                tools.TransferAllFrom("Transfer All From");
            })
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .Selectable(ListBoxSelectable.Single)
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
        var selected = new string[] { "selected" };
        var customers = new List<CustomerViewModel>();
        var tools = new string[] { "transferTo", "remove" };
    }
    <kendo-listbox name="optional"
                datatextfield="ContactName"
                datavaluefield="CustomerID"
                template-id="customer-item-id"
                drop-sources="selected"
                connect-with="selected"
                selectable="ListBoxSelectable.Single"
                bind-to="customers">
        <datasource>
            <transport>
                <read url="@Url.Action("GetCustomers", "ListBox")"/>
            </transport>
        </datasource>
        <messages>
            <tools move-up="Promote"
                move-down="Demote"
                remove="Remove Employee"
                transfer-to="Transfer To"
                transfer-all-to="Transfer All To"
                transfer-from="Transfer From"
                transfer-all-from="Transfer All From"/>
        </messages>
        <draggable enabled="true" placeholder="customPlaceholder" />
        <toolbar position="ListBoxToolbarPosition.Right"
                tools="tools"/>
    </kendo-listbox>
```
{% endif %}
```JS Template
    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url('../content/web/Customers/#:data.CustomerID#.jpg')"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>
```

## See Also

* [RTL Support by the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/right-to-left-support)
* [Server-Side API](/api/listbox)
