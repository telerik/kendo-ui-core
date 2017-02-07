---
title: Change DataSource Dynamically
page_title: Change DataSource Dynamically | Kendo UI AutoComplete
description: "Learn how to dynamically change the DataSource based on user selections that are made through radio buttons in a Kendo UI AutoComplete widget."
previous_url: /controls/editors/autocomplete/how-to/change-datasource-dynamically
slug: howto_change_datasource_dynamically_autocomplete
---

# Change DataSource Dynamically

The following example demonstrates how to dynamically change the `DataSource` based on user selections that are made through radio buttons in a Kendo UI AutoComplete widget.

###### Example

```html
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

           //create AutoComplete UI component
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

Other articles on the Kendo UI AutoComplete:

* [AutoComplete JavaScript API Reference](/api/javascript/ui/autocomplete)
* [How to Highlight Matched Values]({% slug howto_highlight_matched_values_autocomplete %})
* [How to Restrict Other Users]({% slug howto_restrict_user_input_autocomplete %})

For more runnable examples on the Kendo UI AutoComplete, browse its [**How To** documentation folder]({% slug howto_use_custom_angularjs_templates_autocomplete %}).
