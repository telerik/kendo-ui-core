---
title: Validation
page_title: Validation
description: "Learn how to set cell validation for the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_spreadsheet_validation_aspnetcore
position: 9
---

# Validation

The validation funcitonality of the Telerik UI Spreadsheet HtmlHelper for {{ site.framework }} is achieved by applying data validation.

The supported data validation settings include:
 * [Date validation](#date-validation)
 * [List validation](#list-validation)
 * [Text validation](#text-validation) 
 * [Number validation](#number-validation)
 * [Custom validation](#custom-validation)

## Date Validation

To configure date validation for a cell, set the Validation.DataType() configuration to `date`. Set the additional configuration options per your requirement. This allows the user to enter a date in a cell by clicking a calendar icon and selecting the date from a calendar rather than typing it. The following example demonstrates how to set up date validation by using the built-in calendar:

```
@(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add()
                               .Format("MMMM d, yyyy")
                               .Validation(validation => validation
                                   .DataType("date")
                                   .ShowButton(true)
                                   .ComparerType("between")
                                   .From("DATEVALUE(\"1/1/1900\")")
                                   .To("DATEVALUE(\"1/1/2100\")")
                                   .AllowNulls(true)
                                   .Type("reject")
                                   .TitleTemplate("Selected Date validation error")
                                   .MessageTemplate("Selected Date should be between year 1900 and 2100.")
                                );
                    });
                });
        })
)
```

## List Validation

To configure list validation for a cell, set the Validation.DataType() configuration to `list`. This way, you enable the user to select an option from a list of predefined options. The following example demonstrates how to set up list validation:

```
@(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add()
                               .Format("MMMM d, yyyy")
                               .Validation(validation => validation
                                   .DataType("list")
                                   .ShowButton(true)
                                   .ComparerType("list")
                                   .From("\"Option 1,Option 2,Option 3\"")
                                   .AllowNulls(true)
                                   .Type("reject")
                                );
                    });
                });
        })
)
```

## Text Validation

To configure text validation for a cell, set the Validation.DataType() configuration to `text`. This way, you can ensure that specific text is entered in a cell. The following example demonstrates how to set-up text validation:

```
@(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add()
                            .Validation(validation => validation
                                .DataType("text")
                                .ShowButton(true)
                                .ComparerType("equalTo")
                                .From("\"YES\"")
                                .AllowNulls(false)
                                .Type("reject")
                                .MessageTemplate("Enter YES (capital letters)")
                                );
                    });
                });
        })
)
```

> When setting the text to compare to, always add the text in quotes and escape the internal quotes, for example, `.From("\"YES\"")`.

## Number Validation

To configure number validation for a cell, set the Validation.DataType() configuration to `number`. This way, you can ensure that a numeric value is entered in a cell and it matches the provided requirements. The following example demonstrates how to set-up number validation for a number in a specified range:

```
@(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add()
                            .Validation(validation => validation
                                .DataType("number")
                                .ShowButton(true)
                                .ComparerType("between")
                                .From("1")
                                .To("10")
                                .AllowNulls(false)
                                .Type("reject")
                                .MessageTemplate("Only Numbers between 1 and 10 are allowed"));
                    });
                });
        })
)
```

## Custom Validation

To configure validation for a cell based on a formula, set the Validation.DataType() configuration to `custom`. This way, you can provide the formula based on which validation will be performed. The following example demonstrates how to set up custom validation for a cell:

```
@(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Sheets(sheets =>
        {
            sheets.Add()
                .Rows(rows =>
                {
                    rows.Add().Cells(cells =>
                    {
                        cells.Add()
                            .Validation(validation => validation
                                .DataType("custom")
                                .From("AND(LEN(A3)>3, LEN(A3)<200)")
                                .AllowNulls(true)
                                .Type("reject")
                                .TitleTemplate("Full Name validation error")
                                .MessageTemplate("The full name should be longer than 3 letters and shorter than 200."));
                    });
                });
        })
)
```

## See also
* [Validation of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/validation)
* [Server-Side API](/api/spreadsheet)
