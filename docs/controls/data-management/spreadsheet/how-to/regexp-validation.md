---
title: Create Custom RegExp-Based Validation
page_title: Create Custom RegExp-Based Validation
description: "Learn how to create RegExp-based validation rules in a Kendo UI Spreadsheet."
slug: howto_regexp_based_validation
---

# Create Custom RegExp-Based Validation

The [validation types](/api/javascript/spreadsheet/range#methods-validation) of the Kendo UI Spreadsheet do not directly support RegExp-based rules.

To work around this issue, it is possible to use a `custom` validation type that allows you to pass any formula. The validation will pass when the formula returns a non-false value.

Though the built-in functions do not include a RegExp-matching function, a custom function is easy to be created. For more information, refer to the article on [defining custom functions]({% slug custom_functions_spreadsheet_widget %}).

###### Example

```html
<script>
 // Define a REGEXP_MATCH function that returns true if a string
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

Other articles on the Kendo UI Spreadsheet:

* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [Defining custom functions](/controls/data-management/spreadsheet/custom-functions)
