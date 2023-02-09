---
title: Change AutoComplete DataSource Dynamically
page_title: Change AutoComplete DataSource Dynamically
description: "Learn how to dynamically change the DataSource based on user selections that are made through radio buttons in a Kendo UI AutoComplete widget."
previous_url: /controls/editors/autocomplete/how-to/change-datasource-dynamically, /controls/editors/autocomplete/how-to/binding/change-datasource-dynamically
slug: howto_change_datasource_dynamically_autocomplete
tags: telerik, kendo, jquery, autocomplete, dynamically, change, datasource, on, user, selection, of, radio, buttons
component: autocomplete
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® AutoComplete for jQuery</td>
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

How can I dynamically change the DataSource of a Kendo UI AutoComplete based on user selections that are made through radio buttons?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
    <div class="demo-section k-content">
       <h4>Choose shipping countries:</h4>
       <button id="change">Change DataSource</button>
       <input id="countries" style="width: 100%;" />
       <div class="demo-hint">Start typing the name of an European country</div>
    </div>

    <script>
       $(document).ready(function () {
           var ds1 = new kendo.data.DataSource({
             data: [
                   "Albania",
                   "Andorra",
                   "Armenia",
                   "Austria",
                   "Azerbaijan",
                   "Belarus",
                   "Belgium",
                   "Bosnia & Herzegovina",
                   "Bulgaria",
                   "Croatia",
                   "Cyprus",
                   "Czech Republic",
                   "Denmark",
                   "Estonia",
                   "Finland",
                   "France",
                   "Georgia",
                   "Germany",
                   "Greece",
                   "Hungary"
               ]
           });

           var ds2 = new kendo.data.DataSource({
             data: [
                   "Iceland",
                   "Ireland",
                   "Italy",
                   "Kosovo",
                   "Latvia",
                   "Liechtenstein",
                   "Lithuania",
                   "Luxembourg",
                   "Macedonia",
                   "Malta",
                   "Moldova",
                   "Monaco",
                   "Montenegro",
                   "Netherlands",
                   "Norway",
                   "Poland",
                   "Portugal",
                   "Romania",
                   "Russia",
                   "San Marino",
                   "Serbia",
                   "Slovakia",
                   "Slovenia",
                   "Spain",
                   "Sweden",
                   "Switzerland",
                   "Turkey",
                   "Ukraine",
                   "United Kingdom",
                   "Vatican City"
               ]
           });

           // Create the UI of the AutoComplete.
           var countries = $("#countries").kendoAutoComplete({
               dataSource: ds1,
               filter: "startswith",
               placeholder: "Select country...",
               separator: ", "
           }).data("kendoAutoComplete");

           $("#change").click(function() {
             countries.setDataSource(ds2);
           });
       });
    </script>
  </div>
```

## See Also

* [Basic Usage of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/index)
* [Using the API of the AutoComplete (Demo)](https://demos.telerik.com/kendo-ui/autocomplete/api)
* [JavaScript API Reference of the AutoComplete](/api/javascript/ui/autocomplete)
