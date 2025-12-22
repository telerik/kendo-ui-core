---
title: Displaying (BLANK) for Blank Items in Kendo UI for jQuery MultiSelect
description: Learn how to show "(BLANK)" for blank items when selected in Kendo UI for jQuery MultiSelect while retaining the empty string as the data source.
type: how-to
page_title: Show (BLANK) for Blank Items in Kendo UI for jQuery MultiSelect
meta_title: Show (BLANK) for Blank Items in Kendo UI for jQuery MultiSelect
slug: displaying-blank-items-as-blank-in-kendo-ui-for-jquery-multiselect
tags: multiselect, kendo-ui-for-jquery, tagtemplate, itemtemplate
res_type: kb
ticketid: 1705583
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery MultiSelect </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.4.1111 </td>
</tr>
</tbody>
</table>

## Description

I want to display "(BLANK)" for blank items in the [Kendo UI for jQuery MultiSelect](https://www.telerik.com/kendo-jquery-ui/documentation/controls/multiselect/overview) when selected. The data source must remain as an empty string (`""`), but the UI should show "(BLANK)" for blank items.

This knowledge base article also answers the following questions:
- How to customize selected blank items in Kendo UI for jQuery MultiSelect?
- How to display "(BLANK)" in Kendo UI for jQuery MultiSelect?
- How to use [`tagTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/tagtemplate) to change display text for selected blank items?

## Solution

To achieve this, use the [`tagTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/tagtemplate) configuration in the MultiSelect. The `tagTemplate` controls how selected items are displayed as chips. Additionally, use the `itemTemplate` configuration to optionally show "(BLANK)" in the dropdown list.

1. Initialize the MultiSelect with your data source.
2. Use the `tagTemplate` to check if the `dataTextField` value is empty and display "(BLANK)".
3. Optionally, use [`itemTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/itemtemplate) to display "(BLANK)" in the dropdown list.

Example code:

```dojo
<span class="k-d-inline-block">Favourite sport</span>
        <select id="multiselect"></select>
        <span class="hint k-font-size-sm k-font-italic k-mt-1.5">Add your favourite sport, if it is not in the list.</span>

<script>
    $(document).ready(function() {
        // create MultiSelect from input HTML element
		var dataSource = new kendo.data.DataSource({
		  data: [
		   	{ Id: 1, sportName: "Basketball"},
			{ Id: 2, sportName: "Golf"},
			{ Id: 3, sportName: "Baseball"},
			{ Id: 4, sportName: "Table Tennis"},
			{ Id: 5, sportName: "Volleyball"},
			{ Id: 6, sportName: "Football"},
			{ Id: 7, sportName: "Boxing"},
			{ Id: 8, sportName: "Badminton"},
			{ Id: 9, sportName: "Cycling"},
			{ Id: 10, sportName: "Gymnastics"},
			{ Id: 11, sportName: "Swimming"},
			{ Id: 12, sportName: "Wrestling"},
			{ Id: 13, sportName: "Snooker"},
			{ Id: 14, sportName: "Skiing"},
			{ Id: 15, sportName: "Handball"},
            { Id: 15, sportName: ""}
		  ],
		  sort: { field: "sportName", dir: "asc" }
		});

        $("#multiselect").kendoMultiSelect({
            dataTextField: "sportName",
            dataValueField: "Id",
            dataSource: dataSource,
            filter: "contains",
			placeholder: "Please select your favourite sport...",
			downArrow: true,
          	tagTemplate: function(data) {
        		// If sportName is empty, display (BLANK)
        		return data.sportName === "" ? "(BLANK)" : data.sportName;
    		},
    		itemTemplate: function(data) {
        		// Optional: show (BLANK) in dropdown as well
        		return data.sportName === "" ? "(BLANK)" : data.sportName;
    		}
        });
    });
</script>
```

### Explanation
- `tagTemplate`: Customizes how selected items appear as chips. For blank items (`data.sportName === ""`), it displays "(BLANK)".
- `itemTemplate`: Optionally ensures "(BLANK)" appears in the dropdown list for blank items.

The selected item's value remains as an empty string (`""`).

## See Also

- [MultiSelect API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect)
- [MultiSelect tagTemplate Configuration](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/configuration/tagtemplate)
