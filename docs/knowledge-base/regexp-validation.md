---
title: Create Custom RegExp-Based Validation in the Spreadsheet
page_title: Create Custom RegExp-Based Validation in the Spreadsheet
description: "Learn how to create RegExp-based validation rules in a Kendo UI Spreadsheet for jQuery."
slug: howto_regexp_based_validation
previous_url: /controls/data-management/spreadsheet/how-to/regexp-validation
tags: kendo, jquery, spreadsheet, create, custom, regexp, based, validation, rules
component: spreadsheet
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I use RegExp-based rules with the validation of the Kendo UI for jQuery Spreadsheet?

## Solution

The [validation types](/api/javascript/spreadsheet/range/methods/validation) of the Spreadsheet do not directly support RegExp-based rules.

To work around this issue, use a `custom` validation type that allows you to pass any formula. The validation will pass when the formula returns a non-false value. Though the built-in functions do not include a RegExp-matching function, a custom function is easy to create. For more information, refer to the article on [defining custom functions]({% slug custom_functions_spreadsheet_widget %}).

```dojo
<script>
 // Define a REGEXP_MATCH function that returns true if a string
 // matches a given pattern (regexp).
 kendo.spreadsheet.defineFunction("REGEXP_MATCH", function(str, pattern, flags){
     var rx;
     try {
         rx = flags ? new RegExp(pattern, flags) : new RegExp(pattern);
     } catch(ex) {
         // could not compile regexp, return some error code
         return new kendo.spreadsheet.CalcError("REGEXP");
     }
     return rx.test(str);
 }).args([
     [ "str", "string" ],
     [ "pattern", "string" ],
     [ "flags", [ "or", "string", "null" ] ]
 ]);
</script>

<div id="spreadsheet"></div>

<script>
 var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
     columnWidth: 100
 }).getKendoSpreadsheet();

 var sheet = spreadsheet.activeSheet();

 sheet.range("A1").value("IP Address in B1:");

 // Using custom validation, you can pass any formula and the cell
 // validates if the formula returns a non-false value (see the `from` field).
 sheet.range("B1").validation({
     comparerType: "custom",
     dataType: "custom",
     from: 'REGEXP_MATCH(B1, "^[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}$")'
 });

 // Note the difficulty of properly quoting a regexp in a string.
 // An alternative would be to write the regexp in a
 // variable and encode it with JSON.stringify, i.e.:
 //
 // var rx = "^[0-9]{1,3}\\.[0-9]{1,3}\\." etc
 //
 //     and then pass it like this
 //
 // from: '=REGEXP_MATCH(B1, ' + JSON.stringify(rx) + ')'

</script>
```

## See Also

* [Basic Usage of the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/index)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
