---
title: Configure Server Grouping and Sorting in MultiSelect 
description: An example on how to configure the Kendo UI MVC MultiSelect server grouping and sorting.
type: how-to
page_title: Enable Server Grouping and Sorting | UI for ASP.NET MVC MultiSelect
slug: mutliselect-server-grouping-and-sorting
tags: kendo, kendoui, MVC, multiselect, grouping, sorting
ticketid: 1161764
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect for ASP.NET MVC</td>
 </tr>
</table>


## Description

How can I enable the server-side grouping and sorting for Kendo MultiSelect in ASP.NET MVC projects?

## Solution   

1. The sorting and grouping should be enabled. There should be indicated by which field have to be sorted and grouped. Schema.data needs to be defined. 

    ````C#
    @(Html.Kendo().MultiSelect()
		.Name("multiselect")
		.DataTextField("Name")
		.DataValueField("Name")  
		.DataSource(source => source
			.Custom()
			.Type("aspnetmvc-ajax")
			.ServerGrouping(true)
			.ServerSorting(true)
			.Sort(s => s.Add("Name"))
			.Group(g => g.Add("TypeP", typeof(string)))
			.Transport(transport => transport
			.Read(read =>
			{
				read.Action("GetProducts", "Home");
			}))
			.Schema(s => s
				.Data("Data")
				.Model( m => m.Id("Id"))
			)
		)
		.Placeholder("Select product...")
	)
    ````

1. In the controller action you need to handle DataSourceRequest

    ````C#
    	public JsonResult GetProducts([DataSourceRequest]DataSourceRequest request)
        {
            var productss = ProductsAll().ToDataSourceResult(request);
            return Json(productss);
        }
    ````

## See Also

* [Kendo UI Editor JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Telerik DocumentProcessing Library](https://docs.telerik.com/devtools/document-processing/introduction)
