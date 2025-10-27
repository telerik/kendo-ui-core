---
title:  Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }} PanelBar component to a local dataset."
previous_url: /helpers/navigation/panelbar/binding/model-binding
slug: htmlhelpers_panelbar_serverbinding_aspnetcore
position: 3
---

# Local Binding

Local data binding refers to binding the PanelBar component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, the complete dataset can be accessed on the client without additional server requests. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_panelbar_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and load the items on demand.

To configure the PanelBar for local data binding, follow the next steps:

1. Pass the data collection to the view through `ViewData`.

    ```C# HtmlHelper_Controller
    public ActionResult Index()
    {
        ViewBag.panelbarData = GetData();
        return View();
    }

    private IEnumerable<PanelBarItemModel> GetData()
    {
        List<PanelBarItemModel> data = new List<PanelBarItemModel>
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
        return data;
    }
     ```
    {% if site.core %}
    ```C# TagHelper_Controller
    using Kendo.Mvc.TagHelpers;
    
    public ActionResult Index()
    {
        ViewBag.panelbarData = GetData();
        return View();
    }

    private IEnumerable<PanelBarItemBase> GetData()
    {
        List<PanelBarItemBase> data = new List<PanelBarItemBase>
        {
            new PanelBarItemBase
            {
                Text = "Furniture",
                Items = new List<PanelBarItemBase>
                {
                    new PanelBarItemBase()
                    {
                        Text = "Tables & Chairs"
                    },
                    new PanelBarItemBase
                    {
                            Text = "Sofas"
                    },
                    new PanelBarItemBase
                    {
                            Text = "Occasional Furniture"
                    }
                }
            },
            new PanelBarItemBase
            {
                Text = "Decor",
                Items = new List<PanelBarItemBase>
                {
                    new PanelBarItemBase()
                    {
                        Text = "Bed Linen"
                    },
                    new PanelBarItemBase
                    {
                            Text = "Curtains & Blinds"
                    },
                    new PanelBarItemBase
                    {
                            Text = "Carpets"
                    }
                }
            }
        };
        return data;
    }
    ```
    {% endif %}

1. Add the PanelBar to the view and bind it to the data that is saved in the `ViewData`.

    ```HtmlHelper
    @using Kendo.Mvc.UI.Fluent

    @(Html.Kendo().PanelBar()
        .Name("panelbar")
        .BindTo((IEnumerable<PanelBarItemModel>)ViewBag.panelbarData)
    )
    ```
    {% if site.core %}
    ```TagHelper
    @addTagHelper *, Kendo.Mvc
    @using Kendo.Mvc.TagHelpers
    @using Kendo.Mvc.UI.Fluent

    <kendo-panelbar name="panelbar" bind-to="@(IEnumerable<PanelBarItemBase>)ViewBag.panelbarData">
    </kendo-panelbar>
    ```
    {% endif %}

## See Also

* [Local Data Binding by the PanelBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/local-data-binding)
* [Server-Side API of the PanelBar HtmlHelper](/api/panelbar)
{% if site.core %}
* [Server-Side API of the PanelBar TagHelper](/api/taghelpers/panelbar)
{% endif %}
