---
title: Localization
position: 4
---

# Grid Localization

Localization is the process of adapting software to meet the requirements of local markets and different languages. Kendo widgets allows the developer to change the text messages that are displayed to the end user.

Kendo Grid provides a way to localize the user interface using the configuration options.

## Localization of the toolbar controls:

    toolbar: [
		//name - name of the available commands, text - text to be set on the button
		{ name: "create", text: "Custom Create" },
		{ name: "save", text: "Custom Save" },
		{ name: "cancel", text: "Custom Cancel" }
	]

More info can be found in the [toolbar](/api/web/grid#toolbar-array) section of the Grid API reference.

## Localization of the column commands:

    columns: [
        { field: "FirstName", title: "First Name" },
        { field: "LastName", title: "Last Name" },
        { command: [
                {
                    name: "edit",
                    text: { // sets the text of the "Edit", "Update" and "Cancel" buttons
                        edit: "CustomEdit",
                        update: "CustomUpdate",
                        cancel: "CustomCancel"
                    }
                }, 
                { name: "destroy", text: "CustomDelete" } // sets the text of the "Delete" button
            ],
            title: "&nbsp;"
        }
    ]

More info can be found in the [columns.command](/api/web/grid#columnscommand-stringarray) section of the Grid API reference.
    
## Localization of the filter menu

	filterable: {
		messages: {
			info: "Custom header text:", // sets the text on top of the filter menu
			filter: "CustomFilter", // sets the text for the "Filter" button
			clear: "CustomClear", // sets the text for the "Clear" button
			
			// when filtering boolean numbers
			isTrue: "custom is true", // sets the text for "isTrue" radio button
			isFalse: "custom is false", // sets the text for "isFalse" radio button
			
			//changes the text of the "And" and "Or" of the filter menu
			and: "CustomAnd",
			or: "CustomOr"
		},
		operators: {
			//filter menu for "string" type columns
			string: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				startswith: "Custom Starts with",
				contains: "Custom Contains",
				endswith: "Custom Ends with"
			},
			//filter menu for "number" type columns
			number: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				gte: "Custom Is greater than or equal to",
				gt: "Custom Is greater than",
				lte: "Custom Is less than or equal to",
				lt: "Custom Is less than"
			},
			//filter menu for "date" type columns
			date: {
				eq: "Custom Equal to",
				neq: "Custom Not equal to",
				gte: "Custom Is after or equal to",
				gt: "Custom Is after",
				lte: "Custom Is before or equal to",
				lt: "Custom Is before"
			},
            //filter menu for foreign key values
            enums: {
                eq: "custom Is Equal to",
                neq: "custom Is Not equal to"
            }
		}
	}

More info can be found in the [filterable](/api/web/grid#filterablemessages-object) section of the Grid API reference.

## Localization of the grouping header

    groupable: {
        messages: {
            empty: "Custom message text"
        }
    }

More info can be found in the [groupable.messages](/api/web/grid#groupablemessages-object) section of the Grid API reference.

## Localization of the column menu

    columnMenu: {
        messages: {
            sortAscending: "Sort Ascending",
            sortDescending: "Sort Descending",
            filter: "Filter",
            columns: "Columns"
        }
    }

More info can be found in the [columnMenu.messages](/api/web/grid#columnmenumessages-object) section of the Grid API reference.

## Localization of the pager

    pageable: {
        messages: {
            display: "{0} - {1} of {2} items", //{0} is the index of the first record on the page, {1} - index of the last record on the page, {2} is the total amount of records
            empty: "No items to display",
            page: "Page",
            of: "of {0}", //{0} is total amount of pages
            itemsPerPage: "items per page",
            first: "Go to the first page",
            previous: "Go to the previous page",
            next: "Go to the next page",
            last: "Go to the last page",
            refresh: "Refresh"
        }
    }

More info can be found in the [messages](/api/web/pager#messages-object) section of the Pager API reference.
