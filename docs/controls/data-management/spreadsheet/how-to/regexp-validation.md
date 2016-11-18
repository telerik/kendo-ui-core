---
title: RegExp-based validation
page_title: RegExp-based validation
description: "Learn how to create RegExp-based validation rules in Kendo UI Spreadsheet."
slug: howto_regexp_based_validation
---

# Create RegExp-based validation rules

Kendo UI Spreadsheet [validation types](/api/javascript/spreadsheet/range#methods-validation) do not directly support RegExp-s.  There is, however, a `custom` validation type, which allows you to pass any formula, and validation will pass when the formula returns a non-false value.

On the other hand, the built-in functions do not include a RegExp matching function, but it's quite easy to define [custom functions](/controls/data-management/spreadsheet/custom-functions).

The example below demonstrates how to do this.

##### Example

```html
<script>
 // define a REGEXP_MATCH function that returns true if a string
 // matches a given pattern (regexp).
 kendo.spreadsheet.defineFunction("REGEXP_MATCH", function(str, pattern, s){
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

 // using custom validation, we can pass any formula and the cell
 // validates if the formula returns a non-false value (see the `from` field)
 sheet.range("B1").validation({
     comparerType: "custom",
     dataType: "custom",
     from: 'REGEXP_MATCH(B1, "^[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}$")'
 });

 // note the difficulty of properly quoting a regexp in a string
 // in a string.  An alternative would be to write the regexp in a
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

Other articles on the Kendo UI Spreadsheet:

* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [Defining custom functions](/controls/data-management/spreadsheet/custom-functions)
