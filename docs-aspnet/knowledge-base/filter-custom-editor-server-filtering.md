---
title: Implementing AutoComplete with Server Filtering in the Filter Component
description: How can I create a custom editor of the Telerik UI for {{ site.framework }} Filter component that filters the data server-side?
type: how-to
page_title: Implementing AutoComplete with Server Filtering in the Filter Component
slug: filter-custom-editor-server-filtering
tags: filter, custom, editor, server, filtering, autocomplete
ticketid: 1629421
res_type: kb
component: filter
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Filter</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description

How can I define the [AutoComplete]({% slug htmlhelpers_autocomplete_aspnetcore %}) component with server filtering as a custom editor of a specified {{ site.product }} Filter field?

## Solution

1. Define a field within the [`Fields()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/filterbuilder#fieldssystemaction) configuration and use the `EditorTemplateHandler()` option to specify the JavaScript function that will return the AutoComplete editor.

    ```HtmlHelper
        @(Html.Kendo().Filter<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("filter")
            .ApplyButton(true)
            .DataSource("dataSource1")
            .Fields(f =>
            {
                f.Add(p=>p.ProductName).Label("Product Name").EditorTemplateHandler("productNameAutoCompleteEditor");
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-filter name="filter" apply-button="true" datasource-id="dataSource1">
            <fields>
                <filter-field name="ProductName" type="string" label="Product Name" editor-template-handler="productNameAutoCompleteEditor">
                </filter-field>
            </fields>
        </kendo-filter>
    ```
    {% endif %}

1. Initialize the AutoComplete editor within the <b>productNameAutoCompleteEditor</b> handler.
1. Handle the [`filtering`](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete/events/filtering) event of the AutoComplete, extract the search entry value from the event data, and store it into a global variable <b>searchParameter</b>.
1. Use the [`data`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/transport.read#transportreaddata) option of the DataSource to pass the global variable as an additional parameter through the `Read` request of the AutoComplete. This way, you will ensure that the correct search entry will be sent to the server when the Filter component has multiple fields that use the same AutoComplete editor.

    ```Scripts
        function productNameAutoCompleteEditor(container, options) {
            var searchParameter = "";
            $('<input data-bind="value: value" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoAutoComplete({
                minLength: 3,
                placeholder: "Please type at least 3 characters.",
                filter: "contains",
                filtering: function(e) {
                    searchParameter = e.filter.value; // Get the search entry from the event data.
                },
                dataTextField: "ProductName",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: '@Url.Action("GetItems","Home")',
                            data: function () {
                                return {
                                    search: searchParameter
                                };
                            }
                        }
                    }
                }
            });
        }
    ```
    ```Controller
        public JsonResult GetItems(string search)
        {
            using (var northwind = GetContext())
            {
                var products = northwind.Products.Select(product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName
                });

                if (!string.IsNullOrEmpty(search))
                {
                    products = products.Where(p => p.ProductName.Contains(search)).ToList();
                }

                return Json(products);
            }
        }
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Filter HtmlHelper](https://netcorerepl.telerik.com/QHbFdEOi59tNg7zw17)
* [Sample code with the Filter TagHelper](https://netcorerepl.telerik.com/GdPbRaYN03bHO9X752)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on adding AutoComplete editor with server filtering in the Filter](https://netcorerepl.telerik.com/QHbFdEOi59tNg7zw17).
{% endif %}


## More {{ site.framework }} Filter Resources

* [{{ site.framework }} Filter Documentation]({%slug htmlhelpers_filter_aspnetcore_overview%})

* [{{ site.framework }} Filter Demos](https://demos.telerik.com/{{ site.platform }}/filter)

{% if site.core %}
* [{{ site.framework }} Filter Product Page](https://www.telerik.com/aspnet-core-ui/filter)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Filter Product Page](https://www.telerik.com/aspnet-mvc/filter)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Filter for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter)
* [Server-Side API Reference of the Filter for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/filter)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Filter for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/filter)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
