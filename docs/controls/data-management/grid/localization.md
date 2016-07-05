---
title: Localization
page_title: Localization | Kendo UI Grid
description: "Learn how to localize the content of the Kendo UI Grid widget."
slug: localization_kendoui_grid_widget
position: 7
---

# Grid Localization

Localization is the process of adapting software to meet the requirements of local markets and different languages. Kendo widgets allow you to change the text messages that are displayed to the end user.

The Grid widget provides a way to localize the user interface by using configuration options.

## Toolbar

###### Example

    toolbar: [
		//name - name of the available commands, text - text to be set on the button
		{ name: "create", text: "Custom Create" },
		{ name: "save", text: "Custom Save" },
		{ name: "cancel", text: "Custom Cancel" }
	]

Find more info in the [`toolbar`](/api/javascript/ui/grid#configuration-toolbar) section of the Grid API reference.

## Columns

### Menu

###### Example

    columnMenu: {
        messages: {
            sortAscending: "Sort Ascending",
            sortDescending: "Sort Descending",
            filter: "Filter",
            columns: "Columns"
        }
    }

Find more information in the [`columnMenu.messages`](/api/javascript/ui/grid#configuration-columnMenu.messages) section of the Grid JavaScript API reference.

### Commands

###### Example

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

Find more information in the [`columns.command`](/api/javascript/ui/grid#configuration-columns.command) section of the Grid JavaScript API reference.

## Filter

###### Example

	filterable: {
		messages: {
			info: "Custom header text:", // sets the text on top of the Filter menu
			filter: "CustomFilter", // sets the text for the "Filter" button
			clear: "CustomClear", // sets the text for the "Clear" button

			// when filtering boolean numbers
			isTrue: "custom is true", // sets the text for "isTrue" radio button
			isFalse: "custom is false", // sets the text for "isFalse" radio button

			//changes the text of the "And" and "Or" of the Filter menu
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

Find more information in the [`filterable`](/api/javascript/ui/grid#configuration-filterable.messages) section of the Grid JavaScript API reference.

## Grouping Header

###### Example

    groupable: {
        messages: {
            empty: "Custom message text"
        }
    }

Find more information in the [`groupable.messages`](/api/javascript/ui/grid#configuration-columnMenu.messages) section of the Grid JavaScript API reference.

## Pager

###### Example

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

Find more information in the [`messages`](/api/javascript/ui/pager#messages-object) section of the Pager JavaScript API reference.

## See Also

Other articles on the Kendo UI Grid:

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Walkthrough of the Grid]({% slug walkthrough_kendoui_grid_widget %})
* [Editing Functionality]({% slug editing_kendoui_grid_widget %})
* [Appearance of the Grid]({% slug appearance_kendoui_grid_widget %})
* [Remote Data Binding]({% slug remote_data_binding_grid %})
* [Adaptive Rendering]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Export the Grid to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export the Grid in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug exporting_pdf_kendoui_grid_widget %})

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
