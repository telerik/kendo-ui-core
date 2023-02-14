---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI PanelBar component for {{ site.framework }}."
previous_url: /helpers/navigation/panelbar/binding/model-binding
slug: htmlhelpers_panelbar_serverbinding_aspnetcore
position: 2
---

# Server Binding

Local data is the data that is available on the client when the PanelBar is initialized.

You can bind the PanelBar locally on the server by passing the appropriate collection to the component's `BindTo()` method.

1. Pass the data to the view through `ViewData`.

    ```HtmlHelper
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
    ```TagHelper
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
        <kendo-panelbar name="panelbar" bind-to="ViewBag.panelbarData">
        </kendo-panelbar>
    ```
    {% endif %}

## See Also

* [Ajax Data Binding by the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/remote-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
* [Server-Side API](/api/panelbar)
