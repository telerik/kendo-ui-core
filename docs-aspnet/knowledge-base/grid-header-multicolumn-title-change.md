---
title: Change Title of Multi-Column Header
description: Replace the title of multi-column headers in a Kendo UI Grid
type: how-to
page_title: Set Multi-Column Header Programmatically
slug: grid-header-multicolumn-title-change
position: 
tags: grid, header, multicolumn, title, change, column
ticketid: 1433557
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for ASP.NET MVC and ASP.NET Core</td>
		</tr>
	</tbody>
</table>


## Description
How can I change the title of a multi-column header in a Kendo UI Grid programmatically?

## Solution
First, add a new class to the **Columns.Group.HeaderHtmlAttributes** property to act as a selector.

```razor
   @(Html.Kendo().Grid<GridChangeMultiColHeader.Models.MyModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Group(a => a.Title("One").HeaderHtmlAttributes(new { @class = "multiColumnOne"})  //class added
            .Columns(multiColumnOne =>
            {
                multiColumnOne.Bound(p => p.ID);
                multiColumnOne.Bound(p => p.Name);
            })
        );
        columns.Group(a => a.Title("Two").HeaderHtmlAttributes(new { @class = "multiColumnTwo"})  //class added
            .Columns(multiColumnTwo =>
            {
                multiColumnTwo.Bound(p => p.MyDate).Format("{0:MM/dd/yyyy}");
                multiColumnTwo.Bound(p => p.Address);
            })
        );
        ...
    })
```

Then, set the title using the [jQuery html method](https://api.jquery.com/html/) at the appropriate time such as during a button click event.

```javascript
   function onClick(e) {
      $("#grid thead").find(".multiColumnOne").html("New One");
      $("#grid thead").find(".multiColumnTwo").html("New Two");
   }
```

## See Also
* [html - jQuery API Documentation](https://api.jquery.com/html/)
