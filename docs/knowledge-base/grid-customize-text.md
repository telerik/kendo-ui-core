---
title: Customizing Grid Text Across the Whole Component
description: Learn how customize Grid text in all tree editing modes - incell, inline, and popup.
type: how-to
page_title: Customizing Grid Text Across the Whole Component - Kendo UI Grid for jQuery
slug: grid-customize-text
tags: grid, customize, text, kendo
res_type: kb
components: ["grid"]
---
## Environment
| Product | Version |
|-----------|----------------|
| Grid for Progress® Kendo UI®  | 2024.1.319  |

## Description

The Grid allows you to customize its command, toolbar and editing buttons text. It also allows customization of the delete confirmation popup text and the filter menu text.

## Solution

The following example demonstrates how to customize the Grid text.

```dojo
  <h1>Incell editing mode</h1>
    <div id="grid"></div>
    <h1>Inline editing mode</h1>
    <div id="grid-inline-edit"></div>
    <h1>Popup editing mode</h1>
    <div id="grid-popup-edit"></div>

    <script>
      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            data: createRandomData(80),
            schema: {
              model: {
                fields: {
                  Id: { type: "number" },
                  FirstName: { type: "string" },
                  LastName: { type: "string" },
                  City: { type: "string" },
                  Title: { type: "string" },
                  IsCustomer: { type: "boolean" },
                  BirthDate: { type: "date" },
                  Age: { type: "number" }
                }
              }
            },
            pageSize: 10
          },
          height: 400,
          scrollable: true,
          sortable: true,
          pageable: true,
          groupable: {
            messages: {
              empty: "Custom message text"
            }
          },
          editable: {
            mode: "incell",
            update: true,
            destroy: true,
            confirmation: "Are you sure you want to remove this item?" //text for the confirmation message
          },
          columns: [
            {
              field: "Id",
              title: "ID",
              width: "60px"
            },
            {
              field: "FirstName",
              title: "First Name"
            },
            {
              field: "LastName",
              title: "Last Name"
            },
            {
              field: "City"
            },
            {
              field: "Title"
            },
            {
              field: "IsCustomer",
              title: "Customer",
              width: "100px"
            },
            {
              field: "BirthDate",
              title: "Birth Date",
              template: '#= kendo.toString(BirthDate,"MM/dd/yyyy") #'
            },
            {
              field: "Age",
              width: "60px"
            },
            // adding command in the columns, name - the command name, text - text to be set on the button
            {
              command: { name: "destroy", text: "Custom Delete" },
              title: "&nbsp;",
              width: "160px"
            }
          ],
          toolbar: [
            //name - name of the available commands, text - text to be set on the button
            { name: "create", text: "Custom Create" },
            { name: "save", text: "Custom Save" },
            { name: "cancel", text: "Custom Cancel" }
          ],
          // filter menu settings
          filterable: {
            name: "FilterMenu",
            extra: true, // turns on/off the second filter option
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
              }
            }
          }
        });

        $("#grid-inline-edit").kendoGrid({
          dataSource: {
            data: createRandomData(30),
            schema: {
              model: {
                fields: {
                  Id: { type: "number" },
                  FirstName: { type: "string" },
                  LastName: { type: "string" },
                  City: { type: "string" },
                  BirthDate: { type: "date" }
                }
              }
            },
            pageSize: 10
          },
          pageable: true,
          height: 400,
          toolbar: ["create"],
          columns: [
            { field: "Id", width: "60px" },
            { field: "FirstName", title: "First Name" },
            { field: "LastName", title: "Last Name" },
            { field: "City" },
            { field: "BirthDate", template: '#= kendo.toString(BirthDate,"MM/dd/yyyy") #' },
            { command: [
              {
                name: "edit",
                text: { // sets the text of the "Edit", "Update" and "Cancel" buttons
                  edit: "CustomEdit",
                  update: "CustomUpdate",
                  cancel: "CustomCancel"
                }
              }, 
              { name: "destroy", text: "Destroy" } // sets the text of the "Delete" button
            ],
             // sets the title and the width of the commands column
             title: "&nbsp;", 
             width: "300px"
            }
          ],
          editable: "inline"
        });

        $("#grid-popup-edit").kendoGrid({
          dataSource: {
            data: createRandomData(30),
            schema: {
              model: {
                fields: {
                  Id: { type: "number" },
                  FirstName: { type: "string" },
                  LastName: { type: "string" },
                  City: { type: "string" },
                  BirthDate: { type: "date" }
                }
              }
            },
            pageSize: 10
          },
          pageable: true,
          height: 400,
          toolbar: ["create"],
          columns: [
            { field: "Id", width: "60px" },
            { field: "FirstName", title: "First Name" },
            { field: "LastName", title: "Last Name" },
            { field: "City" },
            { field: "BirthDate", template: '#= kendo.toString(BirthDate,"MM/dd/yyyy") #' },
            { command: [
              {
                name: "edit",
                text: { // sets the text of the "Edit", "Update" and "Cancel" buttons
                  edit: "CustomEdit",
                  update: "CustomUpdate",
                  cancel: "CustomCancel"
                }
              }, 
              { name: "destroy", text: "Destroy" } // sets the text of the "Delete" button
            ],
             // sets the title and the width of the commands column
             title: "&nbsp;", 
             width: "300px"
            }
          ],
          editable: "popup"
        });	
      });

      var firstNames = ["Nancy", "Andrew", "Janet", "Margaret", "Steven", "Michael", "Robert", "Laura", "Anne", "Nige"],
          lastNames = ["Davolio", "Fuller", "Leverling", "Peacock", "Buchanan", "Suyama", "King", "Callahan", "Dodsworth", "White"],
          cities = ["Seattle", "Tacoma", "Kirkland", "Redmond", "London", "Philadelphia", "New York", "Seattle", "London", "Boston"],
          titles = ["Accountant", "Vice President, Sales", "Sales Representative", "Technical Support", "Sales Manager", "Web Designer",
                    "Software Developer", "Inside Sales Coordinator", "Chief Techical Officer", "Chief Execute Officer"],
          birthDates = [new Date("1948/12/08"), new Date("1952/02/19"), new Date("1963/08/30"), new Date("1937/09/19"), new Date("1955/03/04"), new Date("1963/07/02"), new Date("1960/05/29"), new Date("1958/01/09"), new Date("1966/01/27"), new Date("1966/03/27")];

      function createRandomData(count) {
        var data = [],
            now = new Date();
        for (var i = 0; i < count; i++) {
          var firstName = firstNames[Math.floor(Math.random() * firstNames.length)],
              lastName = lastNames[Math.floor(Math.random() * lastNames.length)],
              city = cities[Math.floor(Math.random() * cities.length)],
              title = titles[Math.floor(Math.random() * titles.length)],
              birthDate = birthDates[Math.floor(Math.random() * birthDates.length)],
              age = now.getFullYear() - birthDate.getFullYear(),
              isCustomer = ((i%3) == 0) ? true : false;

          data.push({
            Id: i + 1,
            FirstName: firstName,
            LastName: lastName,
            City: city,
            Title: title,
            BirthDate: birthDate,
            Age: age,
            IsCustomer: isCustomer
          });
        }
        return data;
      }
    </script>
```

## See Also

* [Grid API Reference](/api/javascript/ui/grid)
* [Grid Batch Editing (Demo)](https://demos.telerik.com/kendo-ui/grid/editing)
* [Grid Inline Editing (Demo)](https://demos.telerik.com/kendo-ui/grid/editing-inline)
* [Grid Popup Editing (Demo)](https://demos.telerik.com/kendo-ui/grid/editing-popup)
