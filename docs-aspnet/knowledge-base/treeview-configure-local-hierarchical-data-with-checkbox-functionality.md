---
title: Configure Local Hierarchical Data with CheckBox Functionality
description: Bind data from the model to the Kendo UI TreeView with local hierarchical data and checkbox functionality.
type: how-to
page_title: Set Hierarchy in Model with Checkbox Properties
slug: treeview-configure-local-hierarchical-data-with-checkbox-functionality
position: 
tags: treeview, checkbox, model
ticketid: 1450295
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2020.1.114</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® TreeView for ASP.NET MVC</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to set the hierarchical configuration in the model to a Kendo UI TreeView locally with checkbox selection?

## Solution
The Kendo UI TreeView can be bound to a defined model from a controller and can be modified to specify if the item is checked or not.  For example, here is the same TreeView used in the [Binding to Local Data Live Demo](https://demos.telerik.com/aspnet-mvc/treeview/local-data-binding) with [checkbox functionality](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/treeview/checkboxes).  It is configured with [Local Data Binding](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/treeview/binding#local-data-binding) using the BindTo() method.

```View
@using NameSpace.Models
@using Kendo.Mvc.UI.Fluent


@(Html.Kendo().TreeView()
        .Name("treeview")
        .Checkboxes(checkboxes => checkboxes
            .Name("checkedFiles")
            .CheckChildren(true)
        )
        //Inline data is set with the BindTo method
        .BindTo((IEnumerable<CategoryItem>)ViewBag.inline, (NavigationBindingFactory<TreeViewItem> mappings) =>
        {
            mappings.For<CategoryItem>(binding => binding.ItemDataBound((item, category) =>
                {
                    item.Text = category.CategoryName;
                    item.Checked = category.Checked;  
                })
                .Children(category => category.SubCategories));
                
            mappings.For<SubCategoryItem>(binding => binding.ItemDataBound((item, subCategory) =>
            {
                item.Text = subCategory.SubCategoryName;
                item.Checked = subCategory.Checked;
            }));
        })
)
```
```Controller
        public ActionResult Index()
        {
            //Data is passed by the ViewBag
            ViewBag.inline = Local_Data_Binding_Get_Inline_Data();

            return View();
        }


        private IEnumerable<CategoryItem> Local_Data_Binding_Get_Inline_Data()
        {
            //Inline data which defines the model
            List<CategoryItem> inline = new List<CategoryItem>
                {
                    new CategoryItem
                    {
                        CategoryName = "Storage",
                        Checked = false,
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Wall Shelving",
                                Checked = true,
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor Shelving",
                                 Checked = true,
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Kids Storage",
                                 Checked = false,
                            }
                        }
                    },
                    new CategoryItem
                    {
                        CategoryName = "Lights",
                        Checked = false,
                        SubCategories = new List<SubCategoryItem>
                        {
                            new SubCategoryItem()
                            {
                                SubCategoryName = "Ceiling",
                                Checked = true,
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Table",
                                 Checked = false,
                            },
                            new SubCategoryItem
                            {
                                 SubCategoryName = "Floor",
                                 Checked = true,
                            }
                        }
                    }
                };

            return inline;
        }
```




## See Also
* [TreeView - Binding to Local Data Live Demo](https://demos.telerik.com/aspnet-mvc/treeview/local-data-binding)
* [TreeView Checkboxes](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/treeview/checkboxes)
* [TreeView Binding - Local Data Binding](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/treeview/binding#local-data-binding)
