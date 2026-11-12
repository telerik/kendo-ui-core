---
title: Keeping DateTime Field in UTC in Telerik Grid
description: Learn how to ensure a DateTime field in the Telerik Grid remains in UTC regardless of the timezone.
type: how-to
page_title: Maintain UTC DateTime Values in Telerik Grid
meta_title: Maintain UTC DateTime Values in Telerik Grid
slug: keep-datetime-field-utc-telerik-grid
tags: telerik-grid, datetime, utc, asp.net-mvc
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for ASP.NET MVC</td>
</tr>
</tbody>
</table>

## Description

I want to ensure that the DateTime field in the Telerik Grid always remains in UTC format, regardless of the user's timezone. The field should not convert to the user's local timezone during display or data operations.

This knowledge base article also answers the following questions:

- How to ensure DateTime values are stored in UTC in Telerik Grid?
- How to prevent timezone conversions in Telerik Grid DateTime fields?
- How to display UTC DateTime values in Telerik Grid?

## Solution

To keep a DateTime field as UTC in the Telerik Grid, follow these steps:

1. Set the `ClientTemplate` of the DateTime field to display the value in UTC format.
2. Use the Kendo UI `toString` method to define the desired UTC format.

Here is an example:

```csharp
.Columns(columns =>
{
    columns.Bound(c => c.DateField)
           .ClientTemplate("#= kendo.toString(kendo.parseDate(DateField, 'yyyy-MM-ddTHH:mm:ssZ'), 'yyyy-MM-dd HH:mm:ss') #");
});
```

### Explanation:

- `DateField`: Replace this with the actual field name in your model.
- `kendo.parseDate`: Parses the DateTime as UTC.
- `kendo.toString`: Formats the DateTime in the desired format.

If you are binding the data via AJAX, ensure the server-side returns the DateTime values in UTC.

## See Also

- [Kendo UI Grid Overview](https://docs.telerik.com/aspnet-mvc/html-helpers/data-management/grid/overview)
- [Kendo UI Grid Templates Documentation](https://www.telerik.com/aspnet-mvc/documentation/html-helpers/data-management/grid/templates/overview) 
- [kendo.toString API Reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-toString)
- [kendo.parseDate API Reference](https://docs.telerik.com/kendo-ui/api/javascript/kendo#methods-parseDate) 
