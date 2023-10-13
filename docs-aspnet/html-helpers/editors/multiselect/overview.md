---
title: Overview
page_title: Overview
description: "The Telerik UI MultiSelect component for {{ site.framework }} enables users to select multiple items, supports local and remote data binding, and provides templates for easier customization."
previous_url: /helpers/html-helpers/multiselect, /helpers/editors/multiselect/overview
slug: htmlhelpers_multiselect_aspnetcore
position: 0
---

# {{ site.framework }} MultiSelect Overview

{% if site.core %}
The Telerik UI MultiSelect TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MultiSelect widget.
{% else %}
The Telerik UI MultiSelect HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MultiSelect widget.
{% endif %}

The MultiSelect displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

* [Demo page for the MultiSelect HtmlHelper](https://demos.telerik.com/{{ site.platform }}/multiselect/index)
{% if site.core %}
* [Demo page for the MultiSelect TagHelper](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
{% endif %}

## Initializing the MultiSelect

The following example demonstrates how to define the MultiSelect.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Value(new[] { 2, 7 })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home");
            })
            .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
     <kendo-multiselect name="multiselect"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        value='new[] {2, 7}'>
           <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
               <transport>
                    <read url="@Url.Action("Products_Read", "Home")" />
               </transport>
           </datasource>
    </kendo-multiselect>
```
{% endif %}
```Controller
    public class MultiSelectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read(string text)
        {
            var result = GetProducts();

            if (!string.IsNullOrEmpty(text))
            {
                result = result.Where(p => p.ProductName.Contains(text)).ToList();
            }

            return Json(result);
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return result;
        }
    }
```

## Basic Configuration

The following example demonstrates the basic configuration of the MultiSelect. To get a reference to an existing Telerik UI MultiSelect instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiSelect client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#methods) to control its behavior.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Placeholder("Select product...")
        .ItemTemplate("<span class=\"product-id-id\">#= ProductID #</span> #= ProductName #")
        .Value(new[] { 2, 7 })
        .Height(520)
        .TagMode(MultiSelectTagMode.Single)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home");
            })
            .ServerFiltering(true);
        })
        .Events(events => events
            .Change("onChange")
            .Select("onSelect")
            .Deselect("onDeselect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#multiselect").data("kendoMultiSelect");
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="multiselect"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       placeholder="Select product..."
                       item-template="<span class=product-id-id> #= ProductID #</span> #= ProductName #"
                       value='new[] {2, 7}'
                       height="520"
                       tag-mode="@MultiSelectTagMode.Single"
                       on-change="onChange"
                       on-select="onSelect"
                       on-deselect="OnDeselect"
                       on-open="onOpen"
                       on-close="onClose"
                       on-data-bound="onDataBound"
                       on-filtering="onFiltering">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("Products_Read", "Home")" />
            </transport>
        </datasource>
    </kendo-multiselect>

    <script type="text/javascript">
        $(function () {
            // The Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#multiselect").data("kendoMultiSelect");
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_multiselect_databinding_aspnetcore %})—The MultiSelect supports remote and local binding to data.
* [Grouping]({% slug htmlhelpers_multiselect_grouping_aspnetcore %})—The built-in grouping features allows you to arrange the items in separate sets. 
* [Virtualization]({% slug htmlhelpers_multiselect_virtualization_aspnetcore %})—To improve the performance when displaying a large number of records, take advantage of the MultiSelect virtualization.
* [Templates]({% slug htmlhelpers_multiselect_templates_aspnetcore %})—The templates allow you to customize the rendering of the items, tags, and pop-up header.
* [Accessibility]({% slug accessibility_aspnetcore_multiselect %})—The MultiSelect is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

>tip To learn more about the appearance, anatomy, and accessibility of the MultiSelect, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/multiselect/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

### MultiSelect Down Arrow

To enable the down arrow for toggling the popup container as in the Telerik UI DropDownList, set the DownArrow() option:

```HtmlHelper
     @(Html.Kendo().MultiSelect()
        .Name("movies")
        .DownArrow()
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "12 Angry Men", Value ="1"
            },
            new SelectListItem() {
            Text = "Il buono, il brutto, il cattivo.", Value ="2"
            },
            new SelectListItem() {
            Text = "Inception", Value ="3"
            }
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var multiSelect_data = new List<SelectListItem>()
        {
            new SelectListItem() {Text = "12 Angry Men", Value ="1"},
            new SelectListItem() {Text = "Il buono, il brutto, il cattivo", Value ="2"},
            new SelectListItem() {Text = "Inception", Value ="3"}
        };
    }

    <kendo-multiselect name="movies"
                       down-arrow="true"
                       bind-to="multiSelect_data">
    </kendo-multiselect>
```
{% endif %}

## Next Steps

* [Getting Started with the MultiSelect]({% slug aspnetcore_multiselect_getting_started %})
* [Basic Usage of the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/index)
{% if site.core %}
* [Basic Usage of the MultiSelect TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
{% endif %}

## See Also

* [Using the API of the MultiSelect for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/api)
* [Knowledge Base Section](/knowledge-base)
