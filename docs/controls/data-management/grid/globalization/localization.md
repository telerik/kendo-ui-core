---
title: Localization
page_title: jQuery Grid Documentation | Grid Localization | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and translate its toolbar, menu, command, filter, header, and pager text messages for different culture locales."
slug: localization_kendoui_grid_widget
position: 3
---

# Localization

The Grid provides options for localizing its user interface by utilizing the available configuration options.

## Toolbar Messages

The following example demonstrates how to implement the translation of the toolbar messages in the Grid. For more information, refer to the [`toolbar`](/api/javascript/ui/grid/configuration/toolbar) API reference.

###### Example

    toolbar: [
		// name is the name of the available commands.
    // text is the text that will be set to the button.
		{ name: "create", text: "Custom Create" },
		{ name: "save", text: "Custom Save" },
		{ name: "cancel", text: "Custom Cancel" }
	]


## Menu Messages

The following example demonstrates how to implement the message translation of the column menu in the Grid. For more information, refer to the [`columnMenu.messages`](/api/javascript/ui/grid/configuration/columnmenu.messages) API reference.  

###### Example

    columnMenu: {
        messages: {
            sortAscending: "Sort Ascending",
            sortDescending: "Sort Descending",
            filter: "Filter",
            columns: "Columns"
        }
    }

## Command Messages

The following example demonstrates how to implement the translation of the column command messages in the Grid. For more information, refer to the [`columns.command`](/api/javascript/ui/grid/configuration/columns.command) API reference.  

###### Example

    columns: [
        { field: "FirstName", title: "First Name" },
        { field: "LastName", title: "Last Name" },
        { command: [
                {
                    name: "edit",
                    text: { // Sets the text of the "Edit", "Update" and "Cancel" buttons.
                        edit: "CustomEdit",
                        update: "CustomUpdate",
                        cancel: "CustomCancel"
                    }
                },
                { name: "destroy", text: "CustomDelete" } // Sets the text of the "Delete" button.
            ],
            title: "&nbsp;"
        }
    ]

## Filter Messages

The following example demonstrates how to implement the translations of the filter menu and operator messages in the Grid. For more information, refer to the [`filterable`](/api/javascript/ui/grid/configuration/filterable.messages) API reference.  

###### Example

	filterable: {
		messages: {
			info: "Custom header text:", // sets the text on top of the Filter menu
			filter: "CustomFilter", // sets the text for the "Filter" button
			clear: "CustomClear", // sets the text for the "Clear" button

			// When filtering Boolean numbers.
			isTrue: "custom is true", // Sets the text for "isTrue" radio button.
			isFalse: "custom is false", // Sets the text for "isFalse" radio button.

			// Changes the text of the "And" and "Or" of the Filter menu.
			and: "CustomAnd",
			or: "CustomOr"
		},
		operators: {
			// The filter menu for "string" type columns.
			string: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				startswith: "Custom Starts with",
				contains: "Custom Contains",
				endswith: "Custom Ends with"
			},
			// The filter menu for "number" type columns.
			number: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				gte: "Custom Is greater than or equal to",
				gt: "Custom Is greater than",
				lte: "Custom Is less than or equal to",
				lt: "Custom Is less than"
			},
			// The filter menu for "date" type columns.
			date: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				gte: "Custom Is after or equal to",
				gt: "Custom Is after",
				lte: "Custom Is before or equal to",
				lt: "Custom Is before"
			},
            // The filter menu for foreign key values.
            enums: {
                eq: "custom Is Equal to",
                neq: "custom Is Not equal to"
            }
		}
	}

## Grouping Header Messages

The following example demonstrates how to implement the translations of the group header messages in the Grid. For more information, refer to the [`groupable.messages`](/api/javascript/ui/grid/configuration/columnmenu.messages) API reference.

###### Example

    groupable: {
        messages: {
            empty: "Custom message text"
        }
    }

## Pager Messages

The following example demonstrates how to implement the translations of the pager messages in the Grid. For more information, refer to the [`messages`](/api/javascript/ui/pager#messages-object) API reference.

###### Example

    pageable: {
        messages: {
            display: "{0} - {1} of {2} items", // {0} is the index of the first record on the page, {1} - the index of the last record on the page, {2} is the total amount of records.
            empty: "No items to display",
            page: "Page",
	    allPages: "All",
            of: "of {0}", // {0} is total amount of pages.
            itemsPerPage: "items per page",
            first: "Go to the first page",
            previous: "Go to the previous page",
            next: "Go to the next page",
            last: "Go to the last page",
            refresh: "Refresh"
        }
    }

## See Also

* [Localization Support by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/localization)
* [RTL Support by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/right-to-left-support)
* [Localization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
