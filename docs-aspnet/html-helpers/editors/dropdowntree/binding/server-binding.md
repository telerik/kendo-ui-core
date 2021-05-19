---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI DropDownTree HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_serverbinding_aspnetcore
position: 4
---

# Server Binding

Local data is the data that is available on the client when the DropDownTree is initialized.

You can bind the DropDownTree locally on the server by passing the appropriate collection to the HTML helper `BindTo()` method.

1. Pass the data to the view through `ViewData`.

        public IActionResult Index()
        {
            ViewBag.dropdowntreeData = GetData();
            return View();
        }

        private IEnumerable<DropDownTreeItemModel> GetData()
        {
            List<DropDownTreeItemModel> data = new List<DropDownTreeItemModel>
                {
                    new DropDownTreeItemModel
                    {
                        Text = "Furniture",
                        Items = new List<DropDownTreeItemModel>
                        {
                            new DropDownTreeItemModel()
                            {
                                Text = "Tables & Chairs"
                            },
                            new DropDownTreeItemModel
                            {
                                    Text = "Sofas"
                            },
                            new DropDownTreeItemModel
                            {
                                    Text = "Occasional Furniture"
                            }
                        }
                    },
                    new DropDownTreeItemModel
                    {
                        Text = "Decor",
                        Items = new List<DropDownTreeItemModel>
                        {
                            new DropDownTreeItemModel()
                            {
                                Text = "Bed Linen"
                            },
                            new DropDownTreeItemModel
                            {
                                    Text = "Curtains & Blinds"
                            },
                            new DropDownTreeItemModel
                            {
                                    Text = "Carpets"
                            }
                        }
                    }
                };

            return data;
        }

1. Add the DropDownTree to the view and bind it to the data that is saved in the `ViewData`.

        @using Kendo.Mvc.UI.Fluent

        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .BindTo((IEnumerable<DropDownTreeItemModel>)ViewBag.dropdowntreeData)
        )

## See Also

* [Ajax Data Binding by the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/remote-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/dropdowntree)
