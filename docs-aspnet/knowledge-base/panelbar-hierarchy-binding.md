---
title: Use Hierarchy Binding with PanelBar
description: Learn how to bind the {{ site.product }} PanelBar to hierarchical data.
type: how-to
page-title: Use Hierarchy Binding with PanelBar
previous-url: /helpers/navigation/panelbar/how-to/use-hierarchy-binding, /html-helpers/navigation/panelbar/how-to/use-hierarchy-binding
slug: panelbar-hierarchy-binding
tags: panelbar, hierarchy, binding
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} PanelBar</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description
How can I display hierarchical data in the PanelBar component?

## Solution

1. Create a `List` collection of type [`PanelBarItemModel`](/api/kendo.mvc.ui/panelbaritemmodell) and access it in the view.
1.  Use the [`BindTo()`](/api/kendo.mvc.ui.fluent/panelbarbuilder#bindtosystemcollectionsienumerablesystemaction) method of the PanelBar to bind the component to the collection.

```HtmlHelper
@using Kendo.Mvc.UI.Fluent;
@model List<Kendo.Mvc.UI.PanelBarItemModel>
@(Html.Kendo().PanelBar()
      .Name("panelbar")
            .BindTo((List<PanelBarItemModel>)Model, (NavigationBindingFactory<PanelBarItem> mappings) =>
            {
                mappings.For<PanelBarItemModel>(binding => binding.ItemDataBound((item, category) =>
                    {
                        item.Text = category.Text;
                    })
                    .Children(category => category.Items));
            })
)
```
{% if site.core %}
```TagHelper
<kendo-panelbar name="panelbar">
    <items>
        @{
            foreach (var category in (List<PanelBarItemModel>)Model)
            {
                <panelbar-item text="@category.Text">
                    <items>
                        @{
                            foreach(var item in category.Items)
                            {
                                <panelbar-item text="@item.Text"></panelbar-item>
                            }
                        }
                    </items>
                </panelbar-item>
            }}
    </items>
</kendo-panelbar>
``` 
{% endif %}
```Controller
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            IEnumerable<PanelBarItemModel> Items = new List<PanelBarItemModel>
                {
                    new PanelBarItemModel
                    {
                        Text = "Furniture",
                        Items = new List<PanelBarItemModel>
                        {
                            new PanelBarItemModel()
                            {
                                Text = "Tables & Chairs"
                            },
                            new PanelBarItemModel
                            {
                                 Text = "Sofas"
                            },
                            new PanelBarItemModel
                            {
                                 Text = "Occasional Furniture"
                            }
                        }
                    },
                    new PanelBarItemModel
                    {
                        Text = "Decor",
                        Items = new List<PanelBarItemModel>
                        {
                            new PanelBarItemModel()
                            {
                                Text = "Bed Linen"
                            },
                            new PanelBarItemModel
                            {
                                 Text = "Curtains & Blinds"
                            },
                            new PanelBarItemModel
                            {
                                 Text = "Carpets"
                            }
                        }
                    }
                };
            return View(Items);
        }
    }
```

To see the complete example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/PanelBarHierarchyBinding) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master) that demonstrates a PanelBar component bound to hierarchical data. {% if site.core %}You can use this as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} PanelBar Resources

* [{{ site.framework }} PanelBar Documentation]({%slug htmlhelpers_panelbar_aspnetcore%})

* [{{ site.framework }} PanelBar Demos](https://demos.telerik.com/{{ site.platform }}/panelbar)

{% if site.core %}
* [{{ site.framework }} PanelBar Product Page](https://www.telerik.com/aspnet-core-ui/panelbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} PanelBar Product Page](https://www.telerik.com/aspnet-mvc/panelbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the PanelBar for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side API Reference of the PanelBar for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/panelbar)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)