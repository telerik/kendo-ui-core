---
title: Render Embedded Tables in DropDownLists
description: An example on how to display a table in a Kendo UI DropDownList.
type: how-to
page_title: Display Tables | Kendo UI DropDownList
slug: dropdownlist-with-embedded-table
tags: dropdownlist, table
ticketid: 1137036
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I display a table inside a DropDownList?

## Solution

Use a template for each row of the table and utilize the `headerTemplate` to customize the header of the embedded Grid.

```dojo
	<input id="dropdownlist" />

	<script id="template" type="text/x-kendo-template">
		<table>
			<tr class="combo-tr">
				<td class="combo-td">${band}</td>
				<td class="combo-td">${song}</td>
			<td class="combo-td">${album}</td>
			</tr>
		</table>  
	</script>


	<script>    
			var data = [
				{ id: 1, band: "Iron Maiden", song: "Wasted Years", album: "Ed Hunter" },
				{ id: 2, band: "Metallica", song: "Enter Eandman", album: "Metallica" },
				{ id: 3, band: "Mr. Big", song: "Seven Impossible Days", album: "Japandemonium" },
				{ id: 4, band: "Unknown Band", song: "Some Song", album: "The Album" }
			];

			$("#dropdownlist").kendoDropDownList({
				optionLabel: "Please select a band...",
				dataSource: data,
				dataTextField: "band",
				dataValueField: "id",
				autoWidth: true,
				headerTemplate: `<table>
									<tr class="combo-tr">
										<td class="combo-hd-td">Band</td>
										<td class="combo-hd-td">Song</td>
										<td class="combo-hd-td">Album</td>
									</tr>
								</table>`,
				template: kendo.template($("#template").html())
			});

	</script>

	<style>	 
		.combo-td{
			width:150px;
		}

		.combo-hd-td{
			width:150px;
			font-weight: bold;
		}
	</style>
```
