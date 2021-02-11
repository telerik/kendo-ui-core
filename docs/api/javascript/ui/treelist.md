---
title: TreeList
page_title: Configuration, methods and events of Kendo UI TreeList
description: Code examples for TreeList UI widget configuration. Learn how to use methods and which events to set once the treelist UI widget is initialized and expanded.
res_type: api
component: treelist
---

# kendo.ui.TreeList

Represents the Kendo UI TreeList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### altRowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the alternating table rows. Be default the treelist renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The treelist uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.

#### Example - specify alternating row template as a function

    <div id="treelist"></div>
    <script id="template" type="text/x-kendo-template">
        <tr data-uid="#= data.model.uid #">
            <td colspan="2">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                    <span class="k-icon k-i-none"></span>
                #}#
                #if(data.hasChildren){#
                    <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                #}#

                <strong>#: data.model.lastName # </strong>
                <strong>#: data.model.position #</strong>
            </td>
        </tr>
    </script>
    <script id="altTemplate" type="text/x-kendo-template">
        <tr data-uid="#= data.model.uid #" class="k-alt">
            <td colspan="2">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                    <span class="k-icon k-i-none"></span>
                #}#
                #if(data.hasChildren){#
                    <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                #}#

                <strong>#: data.model.lastName # </strong>
                <strong>#: data.model.position #</strong>
            </td>
        </tr>
    </script>
    <script>
      $("#treelist").kendoTreeList({
        rowTemplate: kendo.template($("#template").html()),
        altRowTemplate: kendo.template($("#altTemplate").html()),
        columns: [
          { field: "lastName" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
            { id: 3, parentId: 2, lastName: "Jason", position: "Director, Engineering" }

          ]
        }
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false`, the TreeList will not bind to the specified DataSource during initialization. In this case, data binding will occur when the [`change`](/api/javascript/data/datasource/events/change) event of the DataSource fires. By default, the TreeList will bind to the DataSource that is specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same DataSource. Disabling automatic binding ensures that the shared DataSource makes a single request to the remote service.

#### Example - disabling automatic binding

    <div id="treelist"></div>
    <button id="btn">Bind TreeList</button>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "EmployeeID",
            parentId: "ReportsTo",
            fields: {
              ReportsTo: { field: "ReportsTo",  nullable: true },
              EmployeeID: { field: "EmployeeId", type: "number" },
              Extension: { field: "Extension", type: "number" }
            },
            expanded: true
          }
        }
      });
      var treelist = $("#treelist").kendoTreeList({
        dataSource: dataSource,
        columns: [
          { field: "FirstName" }, { field: "LastName" }, { field: "Position" }
        ],
        autoBind: false
      }).data("kendoTreeList");

      $("#btn").click(function(){
        treelist.dataSource.read();
      });
    </script>

### columns `Array`

The configuration of the TreeList columns whcih represents an array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the column is bound. The TreeList will create a column for each item of the array.

#### Example - specifyinging the columns of the TreeList as an array of strings

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

#### Example - specifyinging the columns of the TreeList as an array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.attributes `Object`

The HTML attributes of the table cell (`<td>`) that is rendered for the column.

> Quote all HTML attributes which are JavaScript keywords (for example, `class`).

#### Example - specifyinging the column HTML attributes

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          {
            field: "position",
            attributes: {
              "class": "highlight",
              style: "text-align: right"
            }
          }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .highlight {
        color: red;
      }
    </style>
    // The table cells look like `<td class="name-cell" style="text-align: right">...</td>`.

### columns.columns `Array`

The columns which will be rendered as child columns under this group column header.

> Group columns cannot be data-bound and support a limited number of bound column settings such as title or locked.

#### Example - setting the column group column for displaying multicolumn headers

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
        columns: [
        {
            title: "Personal Info",
            columns: [
                { field: "lastName" },
                { field: "age" }
            ]
        },
        {
            title: "Work info",
            columns: [
                { field: "position" }
            ]
        }
      ],
      dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", age: 25, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", age: 33, position: "	VP, Engineering" }
        ]
    });
    </script>

### columns.command `Array`

The configuration of the column commands. If set, the column will display a button for every command. Commands can be custom or built-in

The built-in commands are:

* `edit` - Switches the current table row to edit mode. Supports the `inline` and `popup` edit modes.
* `createChild`- Adds a new child item to the current table row and switches to edit mode.
* `destroy` - Removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [`click`](/api/javascript/ui/treelist#configuration-columns.command.click) option.

> * Each custom command requires you to explicitly specify its [`name`](/api/javascript/ui/treelist/configuration/columns.command.name).
> * A command column cannot be [`expandable`](/api/javascript/ui/treelist#configuration-columns.expandable).
> * The built-in commands work only if editing is enabled through the [`editable`](/api/javascript/ui/treelist#configuration-editable) option and the DataSource of the TreeList is configured for [CRUD operations](https://docs.telerik.com/kendo-ui/framework/datasource/crud).

#### Example - setting the command as an array of strings

      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "createChild", "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - setting the command as an array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // command button click handler
              },
              imageClass: "k-i-info"
            },
            { name: "destroy" } // built-in "destroy" command
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.command.className `String`

The CSS class that is applied to the command button.

#### Example - setting the CSS class of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              className: "btn-details"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .btn-details {
        color: green;
        font-weight: bold;
      }
    </style>

### columns.command.imageClass `String`

The CSS class that is applied to the icon span of the command button.

#### Example - setting the CSS class of the command icon

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              imageClass: "k-i-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.click `Function`

The JavaScript function that is executed when the user clicks the command button. The function receives a [jQuery event](https://api.jquery.com/category/events/event-object/) as an argument. The function context that is available through the `this` keyword will be set to the TreeList instance.

#### Example - handling the click event of the custom command button

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // e.target is the DOM element which represents the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
                console.log("Details for: " + data.lastName);
              }
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.name `String`

The name of the command. Commands can be built-in ("edit", "createChild" and "destroy") or custom. When set to a custom value, the `name` is rendered as a `data-command` attribute. For more information, refer to the [`columns.command`](/api/javascript/ui/treelist#configuration-columns.command) section.

#### Example - setting the command name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              imageClass: "k-i-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.text `String`

The text that is displayed by the command button. If not set, the [`name`](/api/javascript/ui/treelist#configuration-columns.command.name) option is used as the button text.

#### Example - customizing the text of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "custom",
              text: "Details"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.editable `Function`

The JavaScript function that is executed when the cell or row is about to be opened for editing. The returned result will determine whether an editor for the column will be created.

#### Example - conditionally editing a cell

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [
              {
                  field: "lastName",
                  title: "Last Name",
                  editable: function(dataItem) {
                      return dataItem.lastName !== "Jackson";
                  }
              },
              { field: "position", title: "Position", },
              { title: "Edit", command: ["edit"], width: 250 }
            ],
            editable: true,
            dataSource: [
              { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
              { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
            ]
        });
    </script>

### columns.editor `Function`

Provides a way to specify a custom editing UI for the column. To create the editing UI, use the `container` parameter.

> * The editing UI has to contain an element with a set `name` HTML attribute. The attribute value has to match the [`field`](/api/javascript/ui/treelist#configuration-columns.field) name.
> * The validation settings that are defined in the `model.fields` configuration will not be applied automatically. In order for the validation to work, you (the developer) are responsible for attaching the corresponding validation attributes to the editor input. If the custom editor is a widget, to avoid visual issues, you can [customize the tooltip position of the validation warning](/framework/validator/overview#customizing-the-tooltip-position).

#### Parameters

##### container `jQuery`

The jQuery object that represents the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column that is specified through the [`format`](/api/javascript/ui/treelist#configuration-columns.format) option.

##### options.model `kendo.data.TreeListModel`

The model instance to which the current table row is bound.

#### Example - creating a custom column editor using the Kendo UI AutoComplete

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create an input element
              var input = $("<input/>");
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: true,
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

#### Example - creating a custom column editor with validation

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create input element and add the validation attribute
              var input = $('<input name="' + options.field + '" required="required" />');
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.encoded `Boolean` *(default: true)*

If set to `true`, the column value will be HTML-encoded before it is displayed. If set to `false`, the column value will be displayed as is. By default, the column value is HTML-encoded.

#### Example - preventing HTML encoding

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName"},
          { field: "position", encoded: false},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "<strong>CEO</strong>" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.expandable `Boolean` *(default: false)*

If set to `true`, the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.

> An expandable column cannot hold [commands](/api/javascript/ui/treelist#configuration-columns.command).

#### Example - making the second column expandable

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", expandable: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.field `String`

The field to which the column is bound. The value of this field is displayed by the column during data binding.

> The field name has to be a valid Javascript identifier, has to contain only alphanumeric characters, `$`, or `_`, and must not start with a digit.

#### Example - specifyinging the column field

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` and if filtering is enabled, a filter menu will be displayed for this column. If set to `false`, the filter menu will not be displayed. By default, a filter menu is displayed
for all columns when filtering is enabled through the [`filterable`](/api/javascript/ui/treelist#configuration-filterable) option. Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - disabling filtering

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", filterable: false }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell `Object`

Specifies options for the filter header cell when filter mode is set to 'row'.

Can be set to a JavaScript object which represents the filter cell configuration.

#### Example - cell filtering options

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    enabled: true,
                    delay: 1500
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.dataSource `Object|kendo.data.DataSource`

Specifies a custom dataSource for the AutoComplete when the type of the column is `string`. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance.

It is not recommended that you use the same `dataSource` instance for the TreeList and the AutoComplete because it causes negative side effects.

If the `dataSource` options is missing, a new cloned instance of the TreeList's dataSource will be used.

If the `dataSource` option is an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance, the widget will use that instance and will _not_ initialize a new one.

#### Example - custom cell filter autocomplete dataSource

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.dataTextField `String`

Specifies the name of the field which will provide the text representation for the AutoComplete suggestion (when using String type column) when CustomDataSource is provided. By default the name of the field bound to the column will be used.

#### Example - Using custom dataSource and providing dataTextField option

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.delay `Number` *(default: 200)*

Specifies the delay of the AutoComplete widget which will provide the suggest functionality (when using String type column).

#### Example - Specifying delay option for the AutoComplete widget used to make suggestions while filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.inputWidth `Number`

Specifies the width of the input before it is initialized or turned into a widget. Provides convenient way to set the width according to the column width.

#### Example - Specifying inputWidth option for the filter cell of a column


    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  inputWidth: 333
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.suggestionOperator `String` *(default: "startswith")*

Specifies the AutoComplete `filter` option. The possible values are the same as the ones for the AutoComplete `filter` option - `"startswith"`, `"endswith"`, `"contains"`. The `"contains"` operator performs a case-insensitive search. To perform a case-sensitive filtering, set a custom filtering function through the [`dataSource.filter.operator`](/api/javascript/data/datasource/configuration/filter.operator) option.

> This operator is completely independent from the operator used for the filtering on this column. For more inforamtion, check [`operator`](columns.filterable.cell.operator).

#### Example - Specifying suggestionOperator option for the filter cell of a column

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  suggestionOperator: "contains"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.minLength `Number` *(default: 1)*

Specifies the minLength option of the AutoComplete widget when column is of type string.

#### Example - Specifying minLength of the AutoComplete widget when using filter cell.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                   minLength: 3
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.enabled `Boolean` *(default: true)*

When set to false the TreeList will not render the cell filtering widget for that specific column.

#### Example - Disable the cell filtering for a specific column.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  enabled: false
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.operator `String` *(default: "eq")*

Specifies the default operator that will be used for the cell filtering.

> If you want to change how the AutoComplete suggestions are filtered use [suggestionOperator](columns.filterable.cell.suggestionoperator).

#### Example - Specifying default operator for cell filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  operator: "neq"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.showOperators `Boolean` *(default: true)*

Specifies whether to show or hide the DropDownList with the operators.

#### Example - Hide the operators dropdownlist for cell filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  showOperators: false,
                  operator: "contains"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.template `Function`

JavaScript function which will customize how the input for the filter value is rendered.
The function receives an object argument with two fields:

* **`element`** - the default input inside the filter cell;
* **`dataSource`** - a Kendo UI DataSource instance, which has the same settings as the TreeList dataSource, but will only contain data items with unique values for the current column.
This instance is also used by the default AutoComplete widget, which is used inside the filter cell if no template is set. Keep in mind that the passed dataSource instance may still not be
populated at the time the template function is called, if the TreeList uses remote binding.

#### Example - Using template for the filter cell

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  template: function (args) {
                      // create a DropDownList of unique values (colors)
                      args.element.kendoDropDownList({
                          dataSource: args.dataSource,
                          dataTextField: "position",
                          dataValueField: "position",
                          valuePrimitive: true
                      });

                  },
                  showOperators: false
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
              { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
              { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
              { id: 3, parentId: null, lastName: "Jason", position: "Contractor" }
        ]
      });
    </script>

### columns.filterable.ui `String|Function`

The `role` [data attribute](/framework/data-attribute-initialization) of the widget that is used in the filter menu, or a JavaScript function which initializes that widget.

#### Example - specifyinging the filter UI as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: "datetimepicker" // use Kendo UI DateTimePicker
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

#### Example - initializing the filter UI

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: function(element) {
                element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
              }
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

### columns.footerTemplate `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the footer table cell for the column.

The following fields can be used in the template:

* `average` - The value of the `average` aggregate (if specified).
* `count` - The value of the `count` aggregate (if specified).
* `max` - The value of the `max` aggregate (if specified).
* `min` - The value of the `min` aggregate (if specified).
* `sum` - The value of the `sum` aggregate (if specified).

#### Example - specifyinging a column footer template

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age",
              footerTemplate: "Min: #: min # Max: #: max #"
            }
          ],
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 30 },
              { id: 2, parentId: 1, name: "John Doe", age: 33 },
              { id: 3, parentId: 1, name: "Joseph Doe", age: 42 }
            ],
            aggregate: [
                { field: "age", aggregate: "min" },
                { field: "age", aggregate: "max" }
            ]
          }
        });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the `{0:format}` form where `format` is a [standard number format](/api/javascript/kendo#standard-number-formats), [custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [`kendo.format`](/api/javascript/kendo/methods/format) function is used to format the value.

#### Example - specifyinging the column format string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "successRate", format: "{0:p}" },
          { field: "hireDate", format: "{0:dd/MMM/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", successRate: 0.7, hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", successRate: 0.8, hireDate: new Date(2012, 7, 13) }
          ]
        }
      });
    </script>

### columns.headerAttributes `Object`

The HTML attributes of the table header cell (`<th>`) that is rendered for the column.

> Quote the HTML attributes which are JavaScript keywords (for example, `class`).

#### Example - specifyinging column header HTML attributes

    <div id="treeList"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, lastName: "Jackson" },
            { id: 2, parentId: 1, lastName: "Weber" }
          ]
      });
      $("#treeList").kendoTreeList({
        columns: [ {
          field: "lastName",
          headerAttributes: {
            "class": "name-header",
            style: "text-align: right"
          }
        } ],
        dataSource: dataSource
      });
    </script>
    // The table headers will look like `<th class="name-header" style="text-align: right">...</th>`.


### columns.headerTemplate `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column header content. By default, the value of the [`title`](/api/javascript/ui/treelist/configuration/columns.title) column option is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in an `<a>` element. As a result, the template must contain only inline elements.

#### Example - defining the column header template as a string

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [ {
                field: "lastName",
                headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">check all</label>'
            }],
            dataSource: {
                data: [
                    { id: 1, parentId: null, lastName: "Jackson" },
                    { id: 2, parentId: 1, lastName: "Weber" }
                ]
            }
        });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/treelist/configuration/columns.hidden) setting and the two cannot not be used at the same time.

#### Example - hiding columns when the screen is smaller than a given width

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { field: "id", width: 250, minScreenWidth: 500 }, //column will become hidden if screen size is less than 500px
            { field: "name", width: 250 }, //column will always be visible
            { field: "age", width: 250, minScreenWidth: 750 } //column will become hidden if screen size is less than 750px
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.selectable `Boolean` *(default: false)*

If set to `true` the treelist will render a select column with checkboxes in each cell, thus enabling multi-row selection. The header checkbox allows users to select/deselect all the rows on the current page.

#### Example

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { selectable: true }
            { field: "id", width: 250},
            { field: "name", width: 250 },
            { field: "age", width: 250}
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` and sorting is enabled, the user can click the column header and sort the TreeList by the column [`field`](/api/javascript/ui/treelist#configuration-columns.field). If set to `false`, sorting will be disabled for this column. By default, all columns are sortable if sorting is enabled though the [`sortable`](/api/javascript/ui/treelist#configuration-sortable) option.

#### Example - disabling sorting

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", sortable: false }
        ],
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
            { id: 3, parentId: 1, lastName: "Carr", position: "VP, Finance" }
          ]
        }
      });
    </script>

### columns.sortable.compare `Function`

A JavaScript function for comparing the values.

* If the first argument is less than the second one, returns `-1`.
* If both arguments are the same, returns `0`.
* If the first argument is greater than the second one, returns `+1`.

#### Example - defining the custom compare function

    <div id="treeList"></div>
    <script>
      var numbers = {
        "one"  : 1,
        "two"  : 2,
        "three": 3
      };


      $("#treeList").kendoTreeList({
        dataSource: {
          data: [
                { id: 1, parentId: null, item: "two" },
                { id: 2, parentId: 1, item: "one" },
                { id: 3, parentId: 1, item: "three" }
            ]
        },
        sortable: true,
        columns: [{
          field: "item",
          sortable: {
            compare: function(a, b) {
              return numbers[a.item] - numbers[b.item];
            }
          }
        }]
      });
    </script>

### columns.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column content. The TreeList renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the TreeList columns. By default, the HTML-encoded value of the [`field`](/api/javascript/ui/treelist#configuration-columns.field) is displayed in the column.

> To customize the way the column displays its value, use `template`.

#### Example - setting the template as a string (wrapping the column value in HTML)

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", template: "<strong>#: position #</strong>" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - setting an external template with conditional formatting and a button handler

    <div id="treelist"></div>

    <script type="text/x-kendo-template" id="template">
        # if (data.allowVote) { #
            <button class='k-button btn-vote'>Vote</button>
        # } #
    </script>

    <script>
    $("#treelist")
      .kendoTreeList({
        columns: [
          { field: "name" },
          { template: $("#template").html() }
        ],
        dataSource: [
          { allowVote: true, name: "Jane Doe" },
          { allowVote: true, name: "Joseph Doe" },
          { name: "John Doe" }
        ]
      })
      .on("click", ".btn-vote", function(e) {
        var treelist = $(e.delegateTarget).data("kendoTreeList");
        var dataItem = treelist.dataItem(e.currentTarget);
        alert("Voted for " + dataItem.name)
      });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set, the TreeList uses [`field`](/api/javascript/ui/treelist#configuration-columns.field).

#### Example - setting the title of the column

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.

#### Example - setting the column width as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: "200px" },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - setting the column width as a number

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: 200 },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true`, the TreeList will not display the column. By default, all columns are displayed.

#### Example - hiding columns

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", hidden: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.includeChildren `Boolean` *(default: false)*

If set to `true`, the TreeList will select all child rows upon parent row selection when checkbox selection is used.

#### Example

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { selectable: true, includeChildren: true }
            { field: "id", width: 250},
            { field: "name", width: 250 },
            { field: "age", width: 250}
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.menu `Boolean`

If set to `true`, the TreeList will display the column in the column menu. By default, the column menu includes all data-bound columns, that is, the ones with a set [`field`](/api/javascript/ui/treelist#configuration-columns.field) option.

#### Example - hiding a column from the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", menu: false },
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true`, the TreeList will display the column as locked (frozen).

#### Example - displaying locked columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250 }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columns.lockable `Boolean` *(default: true)*

If set to `false`, the column will remain in that side of the TreeList where its own locked configuration placed it.

> This option is useful when the TreeList has columns which are configured with a [`locked`](/api/javascript/ui/treelist#configuration-columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column while using the user interface.

#### Example - setting locked columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250, lockable: false }
        ],
        reorderable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### resizable `Boolean` *(default: false)*

If set to `true`, the user can resize columns by dragging their header borders. By default, resizing is disabled.

#### Example - enabling column resizing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            resizable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true`, the user can reorder the columns by dragging their header cells. By default, reordering is disabled.

#### Example - enabling column reordering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            reorderable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true`, the TreeList displays the column menu when the user clicks the **Chevron** icon in the column headers. The column menu allows the user to show and hide columns, and, if filtering and sorting are enabled, filter and sort the data. By default, the column menu is disabled. Can be set to a JavaScript object which represents the column menu configuration.

#### Example - enabling the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.columns `Boolean` *(default: true)*

If set to `true`, the column menu allows the user to select (show and hide) TreeList columns. By default, the column menu allows column selection.

#### Example - disabling the showing or hiding of the columns by using the column menu

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        columnMenu: {
          columns: false
        },
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true`, the column menu will allow the user to filter the TreeList. By default, if filtering is enabled through [`filterable`](/api/javascript/ui/treelist#configuration-filterable), the column menu allows the user to filter.

#### Example - disabling column menu filtering

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          filterable: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true`, the column menu will allow the user to sort the TreeList by the column field. By default, if sorting is enabled through [`sortable`](/api/javascript/ui/treelist#configuration-sortable), the column menu allows the user to sort the data.

> If this option is set to `false`, the user will still be able to sort by clicking the column header cell.

#### Example - disabling the sorting of the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            sortable: true,
            columnMenu: {
                sortable: false
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 },
                    { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
                ]
            }
        });
    </script>

### columnMenu.messages `Object`

The text messages that is played in the column menu. Use it to customize or localize the column menu messages.

#### Example - customizing column menu messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        filterable: true,
        columnMenu: {
          messages: {
            columns: "Choose columns",
            filter: "Apply filter",
            sortAscending: "Sort (asc)",
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message that is displayed for the column selection menu item.

#### Example - setting the column selection message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: {
                messages: {
                  columns: "Choose columns"
                }
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message that is displayed for the filter menu item.

#### Example - setting the filter message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          messages: {
            filter: "Apply filter"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message that is displayed for the menu item which performs the ascending sort mode.

#### Example - setting the message for the ascending sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortAscending: "Sort (asc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message that is displayed for the menu item which performs the descending sort mode.

#### Example - setting the message for the descending sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.settings `String` *(default: "Column Settings")*

The text message that is displayed in the menu header.

#### Example - setting the message for the menu header

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            settings: "Column Options"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.lock `String` *(default: "Lock Column")*

The text message that is displayed in the column menu when locking a column.

#### Example - setting the messages for locking a column

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Pin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock Column")*

The text message that is displayed in the column menu for unlocking a column.

#### Example - setting the message for unlocking a column

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Unpin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### dataSource `Object|Array|kendo.data.TreeListDataSource`

The data source of the widget which is used to render table rows. Can be a JavaScript object which represents a valid [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource) configuration, a JavaScript array, or an existing [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource) instance.

* If the `dataSource` option is set to a JavaScript object or an array, the widget will initialize a new [`kendo.data.DataSource`](/api/javascript/data/treelistdatasource) instance and will use that value as the DataSource configuration.
* If the `dataSource` option is an existing `kendo.data.TreeListDataSource` instance, the widget will use that instance and will not initialize a new one.

#### Example - setting the dataSource as a JavaScript object

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

#### Example - setting the dataSource as a JavaScript array

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
        ]
      });
    </script>

#### Example - setting the dataSource as an existing dataSource instance

      <div id="treelist"></div>

      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          }),
          height: 400,
          columns: [
            { field: "FirstName", title: "First Name", width: 220},
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable `Boolean|Object` *(default: false)*

If set to `true`, the user will be able to edit the data to which the TreeList is bound. By default, editing is disabled.

`editable` can be set to a JavaScript object (which represents the editing configuration) or to a string (which specifies the edit mode).

The supported string values are:

* (Default) `inline`
* `popup`
* `incell`

> * The inline and popup edit modes are triggered by the `edit` column command. Therefore, in order for these edit modes to work correctly, you need to have a column with the `edit` command.
> * In order for the edit operations to work correctly, [configure the dataSource for CRUD operations](/framework/datasource/crud).

#### Example - enabling editing

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - enabling popup editing

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: "popup",
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.mode `String` *(default: "inline")*

The edit mode that will be used.

The supported edit modes are:

* `inline`
* `popup`
* `incell`

> The inline and popup edit modes are triggered by the `edit` column command. Therefore, in order for these edit modes to work correctly, you need to have a column with the `edit` command.

#### Example - specifyinging the inline edit mode

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            editable: {
                mode: "inline"
            },
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.move `Boolean|Object` *(default: false)*

Enables the drag-and-drop UI of rows between parents.

#### Example - using the drag-and-drop functionality for editing the row parent node

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: true
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.move.reorderable `Boolean` *(default: false)*

Enables reordering of rows via a drag-and-drop UI.

#### Example - using the drag-and-drop functionality for editing the row parent node

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: {
              reorderable: true
            }
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the popup editor.

The template has to contain elements whose `name` HTML attribute is set to the name of the editable field. In this way, the TreeList recognizes
the field to which it has to bind the each editor. Alternatively, use [MVVM](/framework/mvvm/overview) bindings for binding HTML elements to data item fields.

> To initialize Kendo UI widgets in the template, use the `role` data attribute. For more information, refer to the [`data` attribute initialization](/framework/data-attribute-initialization).

#### Example - customizing the popup editor

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input name="FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input name="LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
              <select name="Position">
          	    <option>Software Developer</option>
                <option>Team Lead</option>
                <option>Technical Lead</option>
        	  </select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

#### Example - using MVVM in the popup editor template

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input data-bind="value: FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input data-bind="value: LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
          <select data-bind="value: Position">
          	<option>CEO</option>
            <option>Team Lead</option>
            <option>Technical Lead</option>
        	</select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

### editable.window `Object`

Configures the Kendo UI Window instance which is used when the TreeList edit mode is set to `popup`. For more information, refer to the [configuration API of the Window](/api/javascript/ui/window).

#### Example - configuring the Window in the popup edit mode

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            mode: "popup",
            window: {
              title: "My Custom Title",
              animation: false,
              open: myOpenEventHandler
            }
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });

        function myOpenEventHandler(e) {
          // ...
        }
      </script>

### excel `Object`

Configures the Excel export settings of the TreeList.

### excel.allPages `Boolean` *(default: false)*

If set to `true` the TreeList will export all pages of data. By default the TreeList exports only the current page.

#### Example - export all pages of data

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          allPages: true
        },        
        pageable: {
          pageSize: 10
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

#### Example - setting the default Excel file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          fileName: "Employees.xlsx"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. Not to be mistaken with the filtering feature of the TreeList.

#### Example - enabling filtering in the output Excel file

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          filterable: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/treelist#configuration-excel.proxyURL) even if the browser supports local file saving.

### excel.proxyURL `String` *(default: null)*

The URL of the server-side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xslx>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name as requested by the caller.

#### Example - setting the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true`, the user can filter the data source by using the TreeList filter menu. By default, filtering is disabled. Can be set to a JavaScript object which represents the filter menu configuration.

#### Example - enabling and configuring filtering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "lastName" },
            { field: "position" },
            { field: "extension" }
          ],
          dataSource: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          filterable: {
            extra: false,
            messages: {
              and: "and",
              or: "or",
              filter: "Apply filter",
              clear: "Clear filter",
              info: "Filter by: ",
              isFalse: "False",
              isTrue: "True",
              selectValue: "Select category",
              cancel: "Reject",
              operator: "Choose operator",
              value: "Choose value"
            },
            operators: {
              string: {
                eq: "Equal to",
                neq: "Not equal to",
                startswith: "Starts",
                endswith: "Ends",
                contains: "Contains",
                doesnotcontain: "Doesn't contain"
              },
              number: {
                eq: "Equal to",
                neq: "Not equal to",
                gt: "Greater than",
                gte: "Greater than or equal to",
                lt: "Less than",
                lte: "Less than or equal to"
              },
              date: {
                gt: "After",
                gte: "On or after",
                lt: "Before",
                lte: "On or before",
                eq: "On",
                neq: "Not equal"
              },
              enums: {
                eq: "Equal to",
                neq: "Not equal to"
              }
            }
          }
        });
    </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true`, the filter menu will allow the user to input a second criteria.

#### Example - disabling the extra filtering criteria

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          extra: false
        }
      });
    </script>

### filterable.messages `Object`

The text messages that are displayed in the filter menu. Use it to customize or localize the filter menu messages.

#### Example - customizing the filter menu messages

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and",
            or: "or",
            filter: "Apply filter",
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.and `String` *(default: "And")*

The text of the option which represents the `AND` logical operation.

#### Example - setting the AND message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and"
          }
        }
      });
    </script>

### filterable.messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.

#### Example - setting the clear message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.

#### Example - setting the filter message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            filter: "Apply filter"
          }
        }
      });
    </script>

### filterable.messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on top of the filter menu.

#### Example - setting the info message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            info: "Filter by: "
          }
        }
      });
    </script>

### filterable.messages.title `String` *(default: "Show items with value that: ")*

The text that is rendered for the `title` attribute of the filter menu form.

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when the user filters Boolean fields.

#### Example - setting the isFalse message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isFalse: "False"
          }
        }
      });
    </script>

### filterable.messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when the user filters Boolean fields.

#### Example - setting the isTrue message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isTrue: "True"
          }
        }
      });
    </script>

### filterable.messages.or `String` *(default: "Or")*

The text of the option which represents the `OR` logical operation.

#### Example - setting the or message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: true,
        filterable: {
          messages: {
            or: "or"
          }
        }
      });
    </script>

### filterable.mode `String` *(default: "menu")*

If set to `row` the user would be able to filter via extra row added below the headers. By default filtering is using the `menu` mode.

Can also be set to the following string values:

- "row" - the user can filter via extra row within the header.
- "menu" - the user can filter via the menu after clicking the filter icon.
- "menu, row" - the user can filter with both modes above enabled.

> When the `filterable.mode` property is set to `"row"` or `"menu, row"`, the TreeList dataSource instance is copied and applied to the Kendo UI AutoComplete widgets used for string filtering.
This will cause one additional read request per string column. The AutoComplete dataSources do not perform paging and will use a collection of the unique column values only.

#### Example - set mode option to use both "menu" and "row" modes simultaneously

    <div id="treeList"></div>

    <script>
      $("#treeList").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
            mode: "menu, row"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

### filterable.operators `Object`

The text of the filter operators that are displayed in the filter menu.

> In multiple TreeLists, you can override the filterable options of the `FilterMenu` before the TreeLists are initialized. Then, the new filter options will be available for all TreeLists without further configuration.

#### Example - overriding the filterable options in multiple TreeLists

    <h4>TreeList One</h4>
    <div id="treeList1"></div>
    <h4>TreeList Two</h4>
    <div id="treeList2"></div>

    <script>
      kendo.ui.FilterMenu.fn.options.operators.string = {
        eq: "Equal to...",
        neq: "Not equal to..."
      };

      $("#treeList1").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });

      $("#treeList2").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

### filterable.operators.string `Object`

The texts of the filter operators that are displayed for columns whcih are bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Contains...` and `Starts with...` operators will be displayed in the DropDownList.

#### Example - setting the string operators

    <div id="treeList"></div>

    <script>
      $("#treeList").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false,
          operators: {
          	string: {
            	contains: "Contains...",
              startswith: "Starts with..."
            }
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>


### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.string.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.string.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.string.isempty `String` *(default: "Is empty")*

The text of the `isempty` filter operator.

### filterable.operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the `isnotempty` filter operator.

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the `startswith` filter operator.

### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the `contains` filter operator.

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the `doesnotcontain` filter operator.

### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the `endswith` filter operator.

### filterable.operators.number `Object`

The texts of the filter operators that are displayed for columns which are bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Equal to...` and `Not equal to...` operators will be displayed in the operators DropDownList.

#### Example - setting the number operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          schema: {
            model: {
              fields: {
                extension: { type: "number" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            number: {
              eq: "Equal to...",
              neq: "Not equal to..."
            }
          }
        }
      });
    </script>

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.number.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.number.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the `gte` (greater than or equal to) filter operator.

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the `gt` (greater than) filter operator.

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the `lte` (less than or equal to) filter operator.

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the `lt` (less than) filter operator.

### filterable.operators.date `Object`

The texts of the filter operators that are displayed for columns which are bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Is before...` and `Is after...` operators will be displayed in the operators DropDownList.

#### Example - setting the date operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "hireDate", format: "{0:MM/dd/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date() },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", hireDate: new Date() }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            date: {
              lt: "Is before...",
              gt: "Is after..."
            }
          }
        }
      });
    </script>

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.

### filterable.operators.date.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.

### filterable.operators.date.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the `gte` (greater than or equal to) filter operator.

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the `gt` (greater than) filter operator.

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "lte" (less than or equal to) filter operator.

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the `lt` (less than) filter operator.

### height `Number|String`

The height of the TreeList. Numeric values are treated as pixels.

#### Example - setting the height as a number

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: 100,
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - setting the height as a string

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the TreeList. Used primarily for localization.

#### Example - changing the messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          noRows: "No records",
          loading: "Fetching records...",
          requestFailed: "Fetching failed.",
          retry: "Reload",
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands `Object`

Defines the text for the command buttons that are used across the widget.

#### Example - setting the command button messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands.canceledit `String` *(default: "Cancel")*

Defines the text of the **Cancel** button that discards the changes during editing.

#### Example - setting the text of the **Cancel** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          canceledit: "Discard"
        }
      }
    });
    </script>

### messages.commands.create `String` *(default: "Add new record")*

Defines the text of the **Add new record** button that adds new data rows.

#### Example - setting the text of the **Add new record** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          create: "Add new"
        }
      }
    });
    </script>

### messages.commands.createchild `String` *(default: "Add child record")*

Defines the text of the **Add child record** button that adds new child data rows.

#### Example - setting the text of the **Add child record** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          createchild: "Add child item"
        }
      }
    });
    </script>

### messages.commands.destroy `String` *(default: "Delete")*

Defines the text of the **Delete** button that deletes a data row.

#### Example - setting the text of the **Delete** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "destroy" ] } ],
      editable: true,
      messages: {
        commands: {
          destroy: "Remove"
        }
      }
    });
    </script>

### messages.commands.edit `String` *(default: "Edit")*

Defines the text of the **Edit** button that shows the editable fields for the row.

#### Example - setting the text of the **Edit** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          edit: "Modify"
        }
      }
    });
    </script>

### messages.commands.save `String` *(default: "Save Changes")*

Defines the text of the **Save Changes** button that saves modifed data rows.

#### Example - setting the text of the **save Changes** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Save data"
        }
      }
    });
    </script>

### messages.commands.search `String` *(default: "Search...")*

Allows the customization of the placeholder text in the treelist search panel.

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      columns: [ "name", "age" ],
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar:["search"],
      messages: {
        commands: {
          search: "Look for..."
        }
      }
    });
    </script>

### messages.commands.cancel `String` *(default: "Cancel Changes")*

Defines the text of the **Cancel Changes** button that cancels all data modifications.

#### Example - setting the text of the **Cancel Changes** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Reject changes"
        }
      }
    });
    </script>

### messages.commands.excel `String` *(default: "Export to Excel")*

Defines the text of the **Export to Excel** button that exports the widget data in spreadsheet format.

#### Example - setting the text of the **Export to Excel** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "excel" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          excel: "Export to XLSX"
        }
      }
    });
    </script>

### messages.commands.pdf `String` *(default: "Export to PDF")*

Defines the text of the **Export to PDF** button that exports the widget data in PDF format.

#### Example - setting the text of the **Export to PDF** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "pdf" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          pdf: "Export data to PDF"
        }
      }
    });
    </script>

### messages.commands.update `String` *(default: "Update")*

Defines the text of the **Update** button that applies the changes during editing.

#### Example - setting the text of the **Update** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          update: "Save"
        }
      }
    });
    </script>

### messages.loading `String` *(default: "Loading...")*

Defines the text of the **Loading...** message when the widget loads its root-level items.

#### Example - setting the text of the **Loading...** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", nullable: false },
                ReportsTo: { field: "ReportsTo", nullable: true }
              }
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          loading: "Fetching records..."
        }
      });
    </script>

### messages.noRows `String` *(default: "No records to display")*

Defines the text of **No records to display** message when the widget does not show any items.

#### Example - setting the text of the **No records to display** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [],
        columns: [ "name", "age" ],
        messages: {
          noRows: "No data"
        }
      });
    </script>

### messages.requestFailed `String` *(default: "Request failed.")*

Defines the text of **Request failed** message when the widget fails to load its root-level items.

#### Example - setting the text of the **Request failed** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          requestFailed: "Fetching failed."
        }
      });
    </script>

### messages.retry `String` *(default: "Retry")*

Defines the text of **Retry** message for the button which triggers the reloading of the TreeList root-level items.

#### Example - setting the text of the **Retry** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          retry: "Try again"
        }
      });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true`, the user can navigate the widget with the keyboard. By default, keyboard navigation is disabled. For a runnable example, refer to the [demo on keyboard navigation in the TreeList](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation).

#### Example - enabling keyboard navigation

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 2, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        navigatable: true
      });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true`, the TreeList displays a pager. By default, paging is disabled. Only client-side paging is supported which means that all data items are expected to be available when the TreeList is initialized. Can be set to a JavaScript object which represents the pager configuration.

> Set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) no matter if paging is performed on the client or on the server. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/treelist/configuration/datasource) settings.

#### Example - enabling paging

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

If client-side paging is used with editing, an item is added, and the `id` field of the model has to be nullable, then you have to configure the model to a default `id` field value on the client-side that is different from the default `parentId` field value. This approach is required because root TreeList items have their `parentId` field set to the default value for no parent which, by default, is equal to `null` but can be configured from the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option. In such cases, the default value of the `id` field (`null`) will be equal to the default `parentId` field value (`null`) which creates a circular dependency. You can set the default `id` field to a different value instead, for example, `zero`.

#### Example - setting id values that are different from parentId values

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            editable: "incell",
            toolbar: ["create"],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ],
                schema: {
                    model: {
                        fields: {
                            id: {
                                type: "number",
                                defaultValue: 0
                            }
                        }
                    }
                }
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.alwaysVisible `Boolean` *(default: true)*

(Available as of the Kendo UI 2017 R3 release) By default, the TreeList will render a pager even when total number of items in the DataSource is less than the `pageSize` value.

If set to `false` the TreeList will toggle the pager visibility as follows:

* When the total amount of items initially set in the DataSource is less than the `pageSize` number, the pager will be hidden.
* When the total amount of items initially set in the DataSource is greater than or equal to the `pageSize` number, the pager will be shown.
* When the total amount of items in the DataSource becomes less than the `pageSize` number (after a delete or filter operation, or upon changing the `pageSize`), the pager will be hidden.
* When the total amount of items in the DataSource becomes greater than or equal to the `pageSize` number (after an insert or filter operation, or upon changing the `pageSize`), the pager will be shown.

#### Example - hiding the pager if the total number of items is less than the pageSize value

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 10,
                alwaysVisible: false
            }
        });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the TreeList.

> This setting will not work if the TreeList has an already existing DataSource instance.

#### Example - setting the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true`, the pager will display buttons for going to the first, previous, next, and last pages. By default, these buttons are displayed.

#### Example - hiding the first, previous, next, and last page navigation buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                previousNext: false
            }
        });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true`, the pager will display buttons for navigating to specific pages. By default, these buttons are displayed.

> Avoid using `pageable.numeric` and [`pageable.input`](pageable.input) simultaneously.

#### Example - hiding the numeric pager buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                numeric: false
            }
        });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons that are displayed in the numeric pager. If more pages than the specified number are rendered, the pager will display ellipsis (`...`).

#### Example - setting the pager button count

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                buttonCount: 1
            }
        });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true`, the pager will display an `input` element which allows the user to type a specific page number. By default, the page input is not displayed.

> Avoid using `pageable.input` and [`pageable.numeric`](pageable.numeric) simultaneously.

#### Example - showing the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true
            }
        });
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true`, the pager will display a drop-down which allows the user to pick a page size. By default, the drop-down for the page size is not displayed. Can be set to an array of predefined page sizes to override the default list. The TreeList supports a special `all` value which sets the page size to the total number of records. If you set a `pageSize` for the data source, then this value will be selected initially.

#### Example - showing the drop-down list for the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: true
            }
        });
    </script>

#### Example - specifyinging the page sizes as an array

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: [2, 3, 4, "all"],
                numeric: false
            }
        });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true`, the pager will display the **Refresh** button. Clicking the **Refresh** button will refresh the TreeList. By default, the **Refresh** button is not displayed.

#### Example - showing the **Refresh** button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true
            }
        });
    </script>

### pageable.responsive `Boolean` *(default: false)*

If set to `false`, the pager will not be responsive. By default, the pager is responsive.

#### Example - showing the responsive button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                responsive: false
            }
        });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true`, the pager will display information about the current page and the total number of data items. By default, the paging information is displayed.

##### Example - hiding the paging information

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                info: false
            }
        });
    </script>

### pageable.messages `Object`

The text messages that are displayed in the pager. Use this option to customize or localize the pager messages.

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The text with the pager information. Uses [`kendo.format`](/api/javascript/kendo/methods/format).

Contains the following placeholders:
- `{0}` - The first data item index.
- `{1}` - The last data item index.
- `{2}` - The total number of data items.

#### Example - setting the display pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    display: "Showing {0}-{1} from {2} data items"
                }
            }
        });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text that is displayed when the TreeList is empty.

#### Example - setting the empty pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    empty: "No data"
                }
            }
        });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label that is displayed before the pager input.

#### Example - setting the label before the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    page: "Enter page"
                }
            }
        });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label that is displayed before the pager input. Uses [`kendo.format`](/api/javascript/kendo/methods/format). Contains one optional `{0}` placeholder which represents the total number of pages.

#### Example - setting the label after the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    of: "from {0}"
                }
            }
        });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label that is displayed after the drop-down list for the page size.

#### Example - setting the label after the drop-down list for the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    itemsPerPage: "data items per page"
                }
            }
        });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.

#### Example - setting the Tooltip of the first page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    first: "First page"
                }
            }
        });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.

#### Example - setting the Tooltip of the last page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    last: "Last page"
                }
            }
        });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The tooltip of the button which goes to the next page.

#### Example - setting the Tooltip of the next page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    next: "Next page"
                }
            }
        });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The tooltip of the button which goes to the previous page.

#### Example - setting the Tooltip of the previous page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    previous: "Previous page"
                }
            }
        });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The tooltip of the **Refresh** button.

#### Example - setting the Tooltip of the **Refresh** button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true,
                messages: {
                    refresh: "Refresh the treelist"
                }
            }
        });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The tooltip of the **...** (ellipsis) button which appears when the number of pages is greater than the `buttonCount`.

#### Example - setting the Tooltip of the ellipsis button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
              pageSize: 1,
              buttonCount: 2,
              refresh: true,
              messages: {
                  morePages: "More pages"
              }
            }
        });
    </script>

### pdf `Object`

Configures the PDF export settings of the TreeList.

### pdf.allPages `Boolean` *(default: false)*

Exports all TreeList pages, starting from the first one.

> **Note:** Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library, which is bundled with Kendo as `pako_deflate.min.js`.  Simply loading
> this library with a `<script>` tag will enable compression in PDF, e.g.:
>
> `<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>`

#### Example - export all pages

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            allPages: true
        },
        pageable: {
          pageSize: 10
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - setting the author

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            author: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### pdf.avoidLinks `Boolean|String` *(default: false)*

(Available as of the 2015.3.1020 release) A flag which indicates whether to produce actual hyperlinks in the exported PDF file. You can also pass a CSS selector as an argument. All matching links will be ignored.

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - setting the creator

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          creator: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - setting the date

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          date: new Date("2014/10/10")
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - setting the default PDF file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          fileName: "Employees.pdf"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/treelist#configuration-pdf.proxyURL) even if the browser supports the local saving of files.

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - setting the keywords

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          keywords: "northwind products"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.landscape `Boolean` *(default: false)*

If set to `true`, reverses the paper dimensions in such a way that the width becomes the larger edge.

#### Example - enabling the landscape mode

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          landscape: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.margin `Object`

Specifies the margins of the page and accepts numbers or strings with units.

The supported units are:

* `mm`
* `cm`
* `in`
* (Default) `pt`

#### Example - setting the margins

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
          }
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as `pt` units.

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as `pt` units.

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as `pt` units.

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as `pt` units.

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document. The default `auto` setting means that the paper size is determined by the content.

The supported values are:

* A predefined size such as `A4`, `A3`, and so on.
* An array of two numbers which specify the width and height in points (1pt = 1/72in).
* An array of two strings which specify the width and height in units. The supported units are:
  * `mm`
  * `cm`
  * `in`
  * `pt`

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

#### Example - setting a custom paper size

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          paperSize: ["20mm", "20mm"]
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier, and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.pdf>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name, as requested by the caller.

#### Example - setting the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword whcih indicates where to display the document that was returned by the proxy. To display the document in a new window or iframe, the proxy will set the `Content-Disposition` header to `inline; filename="<fileName.pdf>"`.

#### Example - opening the generated document in a new window

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - setting the subject

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          subject: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - setting the title

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          title: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### rowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders rows. Be default renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The treelist uses the `uid` data attribute to determine the data to which a table row is bound to.

#### Example - specify row template as a function

        <div id="treelist"></div>
        <script id="template" type="text/x-kendo-template">
            <tr data-uid="#= data.model.uid #">
                <td colspan="2">
                    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                        <span class="k-icon k-i-none"></span>
                    #}#
                    #if(data.hasChildren){#
                        <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                    #}#

                    <strong>#: data.model.lastName # </strong>
                    <strong>#: data.model.position #</strong>
                </td>
            </tr>
        </script>
        <script id="altTemplate" type="text/x-kendo-template">
            <tr data-uid="#= data.model.uid #" class="k-alt">
                <td colspan="2">
                    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                        <span class="k-icon k-i-none"></span>
                    #}#
                    #if(data.hasChildren){#
                        <span class="k-icon k-i-#=data.model.expanded? 'collapse' : 'expand'#"></span>
                    #}#

                    <strong>#: data.model.lastName # </strong>
                    <strong>#: data.model.position #</strong>
                </td>
            </tr>
        </script>
        <script>
          $("#treelist").kendoTreeList({
            rowTemplate: kendo.template($("#template").html()),
            altRowTemplate: kendo.template($("#altTemplate").html()),
            columns: [
              { field: "lastName" }
            ],
            dataSource: {
              data: [
                { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
                { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
                { id: 3, parentId: 2, lastName: "Jason", position: "Director, Engineering" }

              ]
            }
          });
        </script>

### scrollable `Boolean|Object` *(default: true)*

If set to `true`, the TreeList will display a scrollbar when the total row height or width exceeds the TreeList height or width. By default, scrolling is enabled. Scrolling renders separate tables for the header and data area. For accessibility-conscious applications, disable scrolling.

#### Example - disabling scrolling

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        scrollable: false,
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### search `Object`

Configures the Kendo UI TreeList search bar settings.

### search.fields `Array`

Defines a list of fields which will be included in the search. If values for the property are not defined the treelist will search in all column fields.

### selectable `Boolean|String` *(default: false)*

If set to `true`, the user will be able to select TreeList rows. By default, selection is disabled.

Can also be set to the following string values:

- `row` - The user can select a single row.
- `cell` - The user can select a single cell.
- `multiple, row` - The user can select multiple rows.
- `multiple, cell` - The user can select multiple cells.

#### Example - setting selectable as a Boolean

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

#### Example - setting selectable as a string

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: "multiple, row",
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true`, the user is able to sort the TreeList by clicking the column header cells. By default, sorting is disabled. Can be set to a JavaScript object which represents the sorting configuration.

#### Example - enabling sorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true`, the user can get the TreeList in its unsorted state by clicking the sorted column header.

#### Example - preventing unsorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          allowUnsort: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### sortable.mode `String` *(default: "single")*

The sort mode. If set to `single`, the user can sort by one column at a time. If set to `multiple`, the user can sort by multiple columns.

#### Example - allowing the multiple column sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 },
            { id: 4, parentId: 1, name: "John Doe", age: 22 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### toolbar `String|Function|Array`

* If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole TreeList toolbar and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.
* If a `Function` value is assigned (it may be a `kendo.template()` function call or a generic function reference), then the return value of the function will be used to render the contents of the TreeList toolbar.
* If an `Array` value is assigned, it will be treated as the list of commands which are displayed in the TreeList toolbar. Commands can be custom or built-in. The supported built-in commands are:
  * `create` - Adds an empty data item to the treelist.
  * `excel` - Exports the TreeList data in MS Excel format.
  * `pdf` - Exports the TreeList data in PDF format.
  * `search` - built-in search panel for the TreeList.

#### Example - configuring the TreeList toolbar as a string template

      <div id="treeList"></div>
      <script>
        $("#treeList").kendoTreeList({
          toolbar: "<p>My string template in a paragraph.</p>",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          sortable: {
            mode: "multiple"
          },
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
              { id: 2, parentId: 1, name: "John Doe", age: 24 },
              { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
            ]
          }
        });
      </script>

#### Example - configuring the TreeList Toolbar template with a function and including the built in search functionality

    <div id="treeList"></div>
    <script type="text/x-kendo-template" id="template">
			<a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
      <span class="k-textbox k-grid-search k-display-flex">
          <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
          <span class="k-input-icon">
              <span class="k-icon k-i-search"></span>
          </span>
      </span>
    </script>
    <script>
      function toolbar_click() {
        kendo.alert("Toolbar command is clicked!");
        return false;
      }

      $("#treeList").kendoTreeList({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

#### Example - configuring the TreeList toolbar as an array of commands

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel", "pdf", "search"],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [{name: "custom", text: "About", imageClass: "k-i-info" }],
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
        ]
      });
    </script>

### toolbar.name `String`

The name of the toolbar command. Can be either a built-in ("create", "excel", or "pdf") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.text `String`

The text that is displayed by the command button. If not set, the TreeList will use the [`name`](/api/javascript/ui/treelist#configuration-toolbar.name)` option as the button text instead.

#### Example - specifying the text for the command button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", text: "My Command" }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

## Fields

### columns `Array`

The columns of the TreeList that are initialized from the [`columns`](/api/javascript/ui/treelist#configuration-columns) option. Every item from the `columns` array has the same fields as the corresponding [`columns`](/api/javascript/ui/treelist#configuration-columns) option.

#### Example - iterating the TreeList columns

    <button id="countBtn">Log Column Names</button>
    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
      $("#countBtn").click(function(e){
        var treelist = $("#treelist").data("kendoTreeList");
        for (var i = 0; i < treelist.columns.length; i++) {
          console.log(treelist.columns[i].field); // displays "lastName" and then "position"
        }
      });
    </script>

### table `jQuery`

The jQuery object which represents the TreeList `table` element.

### tbody `jQuery`

The jQuery object which represents the table body. Contains all TreeList table rows.

### thead `jQuery`

The jQuery object which represents the TreeList table header element.

### content `jQuery`

The jQuery object which represents the TreeList `content` element which holds the scrollable content. Available only in a TreeList with locked columns.

### lockedHeader `jQuery`

The jQuery object which represents the TreeList locked `header` element. Available only in a TreeList with locked columns.

### lockedTable `jQuery`

The jQuery object which represents the TreeList locked `table` element. Available only in a TreeList with locked columns.

### lockedContent `jQuery`

The jQuery object which represents the TreeList locked `content` element. Available only in a TreeList with locked columns.

## Methods

### addRow

Adds an empty data item to the TreeList. In inline edit mode, appends a table row. In the popup edit mode, displays a popup window. Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### parentRow `String|Element|jQuery`

A string, DOM element, or a jQuery object which represents the parent table row. A string is treated as a jQuery selector.

#### Example - adding a new root data item

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow();
        });
      </script>

#### Example - adding a new child data item

      <button id="add">Add New Row</button>
      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                  dataType: "jsonp"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  dataType: "jsonp"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow("#treelist tbody>tr:first");
        });
      </script>

### autoFitColumn

Applies the minimum possible width for the specified column so that all the text fits without wrapping.

#### Parameters

##### column `Number|String|Object`

The index of the column, the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound, or the column object that is obtained from the [`columns`](/api/javascript/ui/treelist#fields-columns) collection.

#### Example - automatically fitting a column by an index

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(1);
    </script>

#### Example - automatically fitting a column by a field

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn("Position");
    </script>

#### Example - automatically fitting a column by a column object reference

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(treeList.columns[1]);
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed, and updated data items are restored to their initial state.

#### Example - canceling all changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.addRow();
      treeList.cancelChanges();
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.

#### Example - canceling editing

      <button id="cancel">Cancel Editing</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#cancel").click(function(){
          $("#treelist").data("kendoTreeList").cancelRow();
        });
      </script>

### clearSelection

Depending on the current selection [mode](/api/javascript/ui/treelist#configuration-selectable), clears the currently selected table rows or cells.

#### Example - clearing selection

    <button id="clear">Clear Selection</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#clear").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.clearSelection();
      });
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires the incell [edit mode](/api/javascript/ui/treelist/configuration/editable.mode).

> When the user applies keyboard navigation, [`table`](/api/javascript/ui/treelist/fields/table) must be focused programmatically after calling `closeCell`.

#### Parameters

##### isCancel `Boolean` *optional*

A flag which specifies whether to fire the `cancel` event. By default, the event is not fired.

#### Example - canceling cell editing

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        navigatable: true
    });

    var treeList = $("#treeList").data("kendoTreeList");

    treeList.editCell(treeList.tbody.find("td").first());

    setTimeout(function(){
        treeList.closeCell();
        treeList.table.focus();
    }, 1500);
    </script>

### collapse

This method collapses the row that is passed as a parameter.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise`

#### Example - returning a promise

    <button id="collapse">Collapse TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#collapse").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.collapse($("#treeList tbody>tr:eq(0)"));
      });
    </script>

### dataItem

Returns the data item to which the specified table row is bound.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.TreeListModel` - The data item to which the specified table row is bound.

#### Example - getting the data item to which the first table row is bound

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        });
        var treeList = $("#treeList").data("kendoTreeList");
        var data = treeList.dataItem("tbody>tr:eq(1)");
        console.log(data.age); // displays "22"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> This method does not remove the widget element from the DOM.

#### Example - safely removing the TreeList from the DOM

    <button id="destroy">Destroy and remove TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#destroy").click(function(){
        $("#treeList").data("kendoTreeList").destroy(); // destroy the TreeList

        $("#treeList").remove(); // remove all TreeList HTML
      });
    </script>

### editCell

Switches the specified table cell in edit mode. Requires the incell [edit mode](/api/javascript/ui/treelist/configuration/editable.mode). Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switching the first cell to edit mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.editCell($("#treeList td:eq(0)"));
    </script>

### editRow

Switches the specified table row to edit mode. Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switching the first row to edit mode

      <button id="edit">Edit First Row</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#edit").click(function(){
          $("#treelist").data("kendoTreeList").editRow($("#treelist tbody>tr:eq(0)"));
        });
      </script>

### expand

Expands the row.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise`

#### Example - returning a promise

    <button id="expand">Expand TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.expand($("#treeList tbody>tr:eq(0)"));
      });
    </script>

#### Example - expanding a row of a data item with a given id

    <button id="expand">Expand item with ID = 1</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        // find item with id = 1 in datasource
        var dataItem = treeList.dataSource.get(1);

        // find row for data item
        var row = treeList.content.find("tr[data-uid=" + dataItem.uid + "]")

        treeList.expand(row);
      });
    </script>

### getOptions

Retrieves the options that are currently enabled or disabled on the Treelist, also gives the current state of the dataSource.
Use this method if you want to save the state of the Treelist into a variable. It is also possible to extract and store only some of the Treelist options.

### itemFor

(Available as of the 2015.3.930 release) Returns the rendered HTML element for a given model.

#### Parameters

##### model `kendo.data.TreeListModel|Object`

A model from the DataSource, or the `id` of a model in the DataSource.

#### Returns

`jQuery` - The row that corresponds to the model.

#### Example - getting the row from model

    <button id="itemFor">Highlight the row with Jane</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#itemFor").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var jane = treeList.dataSource.get(1);
        var row = treeList.itemFor(jane);

        treeList.select(row);
      });
    </script>

### items

Obtains an array of the DOM elements which correspond to the data items from the [`view`](/api/javascript/data/datasource/methods/view) of the data source.

#### Returns

`Array` - The currently rendered data table rows (`<tr>` elements).

### refresh

Renders all table rows by using the current data items.

#### Example - refreshing the widget

    <button id="btn">Refresh</button>
    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      }).data("kendoTreeList");
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.dataSource.at(0).name="Marta Stewart";
        treelist.refresh();
      });
    </script>

### removeRow

Removes the specified table row from the TreeList. Also removes the corresponding data item from the data source. Fires the [`remove`](/api/javascript/ui/treelist/events/remove) event.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - removing the first table row

    <button id="btn">Remove second row</button>
    <div id="treelist"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
            dataType: "jsonp"
          },
          destroy: {
            url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
              return {models: kendo.stringify(options.models)};
            }
          }
        },
        batch: true,
        schema: {
          model: {
            id: "EmployeeId",
            parentId: "ReportsTo",
            fields: {
              EmployeeId: { type: "number", editable: false, nullable: false },
              ReportsTo: { nullable: true, type: "number" },
              HireDate: {type: "date"},
              BirthDate: {type: "date"}
            },
            expanded: true
          }
        }
      });

      $("#treelist").kendoTreeList({
        dataSource: dataSource,
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }
        ]
      });
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.removeRow($("#treelist tbody>tr:nth(1)"));
      });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/treelist/events/excelexport) event.

> Calling this method may trigger the built-in browser popup blocker. To avoid that, always call it as a response to an end-user action (for example, a button click).

#### Example - manually initiating the Excel export

    <button id="export">Export to Excel</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsExcel();
        });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [`pdfExport`](/api/javascript/ui/treelist/events/pdfexport) event.

> Calling this method may trip the built-in browser popup blocker. To avoid that, call this method as a response to an end-user action (foe examlple, a button click).

#### Returns

`Promise` - A promise that will be resolved when the export completes. The same promise is available in the [`pdfExport`](/api/javascript/ui/treelist/events/pdfexport) event arguments.

#### Example - manually initiating the PDF export

    <button id="export">Export to PDF</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsPDF();
        });
    </script>

### saveChanges

Saves any pending changes by calling the [`sync`](/api/javascript/data/datasource/methods/sync) method. Fires the [`saveChanges`](/api/javascript/ui/treelist/events/savechanges) event.

#### Example - saving changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.addRow();
    treeList.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes that are made by the user. Fires the [`edit`](/api/javascript/ui/treelist/events/save) event.

#### Example - saving a row

    <button id="save">Save Row</button>
    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            create: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"]}
        ]
      });
      $("#save").click(function(){
        $("#treelist").data("kendoTreeList").saveRow($("treelist .k-treelist-edit-row"));
      });
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

#### Parameters

##### rows `Element|jQuery`

A DOM element or a jQuery object which represents the table rows or cells.

#### Returns

`jQuery` - The selected table rows or cells.

#### Example - selecting the first table cell

    <button id="btn">Highlight third row</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        treeList.select($("#treeList tbody>tr:nth(2)"));
      });
    </script>

#### Example - getting the selected table row

    <button id="btn">Get selected row info</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var row = treeList.select();
        if(row.length > 0){
          var data = treeList.dataItem(row);
          console.log(data.name);
        }
      });
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.TreeListDataSource`

The data source to which the widget will be bound.

#### Example - setting the data source

    <button id="btn">Change DataSource</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var dsNew = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, name: "Mark Jameson", age: 26, expanded: true },
            { id: 2, parentId: 1, name: "Joe Reeves", age: 22 },
          ]
        });
        treeList.setDataSource(dsNew);
      });
    </script>

### setOptions

Sets the options of the Treelist. Use this method if you want to enable/disable a particular feature/option or to load
the complete state obtained previously with the [`getOptions`](getoptions) method.

When `setOptions` is called, the Treelist widget will be destroyed and recreated. If the widget is bound to remote data, a new read request will be made.

> There are a few important things to keep in mind when using `getOptions` and `setOptions`.
>
> * **calling `setOptions()` in a Treelist event handler is not possible.**
> * **calling `setOptions()` in a function, which is related to the Treelist's databinding mechanism may cause an endless loop.**
> * `JSON.stringify()` cannot serialize function references (e.g. event handlers), so if stringification is used for the retrieved Treelist state,
> all configuration fields, which represent function references, will be lost. You have two options to avoid this limitation:
> use a [custom implementation](https://github.com/tarruda/super-json) to serialize JavaScript functions, or
> add the function references back to the deserialized configuration object before passing it to the `setOptions` method.

### showColumn

Shows the specified column.

#### Parameters

##### column `Number|String`

The index of the column, or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - showing a hidden column by an index

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn(2);
      });
    </script>

#### Example - showing a hidden column by a field

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn("age");
      });
    </script>

### hideColumn

Hides the specified column.

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - hiding a column by an index

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn(2);
      });
    </script>

#### Example - hiding a column by a field

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn("age");
      });
    </script>

### lockColumn

Locks (freezes) a column and allows the user to see it at all times when scrolling.

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> To use this method, initialize the TreeList with at least one locked column and render unlocked columns which will remain after the target column is locked.

#### Example - locking a column

    <button id="btn">Lock Age Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.lockColumn("age");
      });
    </script>

### unlockColumn

Unlocks (unfreezes) a column.

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> To use this method, initialize the TreeList with at least one locked column and locked columns which will remain after the target column is unlocked.

#### Example - unlock a column

    <button id="btn">Unlock Name Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", locked: true, width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.unlockColumn("name");
      });
    </script>

### reorderColumn

Changes the position of the specified column.

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index has to be calculated with regard to all columns including the hidden ones.

##### column `Object`

The column whose position will be changed.

#### Example - moving a column

    <button id="btn">Switch Name and Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.reorderColumn(2, treeList.columns[1]);
      });
    </script>

## Events

### beforeEdit

Fires when the user tries to edit or creates a data item before the editor is created. Can be used for preventing the editing depending on custom logic. The event handler function context (available through the `this` keyword) will be set to the widget instance. The event will be fired only when the TreeList is editable.

#### Event Data

##### e.model `kendo.data.Model`

The data item which will be edited. To check if the data item is new (created) or not (edited), use its [`isNew`](/api/javascript/data/model/methods/isnew) method.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the beforeEdit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        beforeEdit: function(e) {
          console.log("beforeEdit");

          if (!e.model.isNew()) {
            e.preventDefault();
          }
        }
      });
    </script>

### cancel

Fires when the user clicks the **Cancel** button (in inline or popup [edit mode](/api/javascript/ui/treelist#configuration-editable.mode)) or closes the popup window. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the `cancel` action. The table row remains in edit mode.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the cancel event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          cancel: function(e) {
            console.log("cancel");
          }
        });
    </script>

#### Example - subscribing to the cancel event after initialization

    <div id="treeList"></div>
     <script>
        function cancel(e) {
            console.log("cancel");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("cancel", cancel);
        treeList.dataSource.fetch();
    </script>

### cellClose

Fires when the incell edit mode is used and the cell will be closed. The event is triggered after saving or canceling the changes but before the cell is closed. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. For more information, refer to the [`edit` event arguments](edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action.

The supported types are:

* `save`
* `cancel` - Triggered when the TreeList keyboard navigation is enabled by `navigateble: true` and the `Esc` key is used for the `close` action of the cell.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the cancel event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        cellClose:  function(e) {
          console.log(e.type);
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.editCell($("#treeList td:eq(1)"));
    </script>

### change

Fires when the user selects a table row or cell in the TreeList. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - getting the selected data items when using row selection

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, row",
        change: function(e) {
          var selectedRows = this.select();
          var selectedDataItems = [];
          for (var i = 0; i < selectedRows.length; i++) {
            var dataItem = this.dataItem(selectedRows[i]);
            selectedDataItems.push(dataItem);
          }
          // selectedDataItems contains all selected data items
          console.log(selectedDataItems.length);
        }
      });
    </script>

#### Example - getting the selected data items when using cell selection

    <div id="treeList"></div>
    <script>
      function change(e) {
        var selectedCells = this.select();
        var selectedDataItems = [];
        for (var i = 0; i < selectedCells.length; i++) {
          var dataItem = this.dataItem(selectedCells[i].parentNode);
          if ($.inArray(dataItem, selectedDataItems) < 0) {
            selectedDataItems.push(dataItem);
          }
        }
        // selectedDataItems contains all selected data items
        console.log(selectedDataItems.length + " data items selected.");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, cell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("change", change);
    </script>

### collapse

Fires when an item is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          collapse: function(e) {
            console.log("collapse");
          }
        });
    </script>

#### Example - subscribing to the collapse event after initialization

    <div id="treeList"></div>
     <script>
        function collapse(e) {
            console.log("collapse");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("collapse", collapse);
        treeList.dataSource.fetch();
    </script>

### dataBinding

Fires before the widget binds to its data source. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, prevents the data bind action. The table rows will remain unchanged and the `dataBound` event will not fire.

#### Example - subscribing to the dataBinding event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBinding: function(e) {
            console.log("dataBinding");
          }
        });
    </script>

#### Example - subscribing to the dataBinding event after initialization

    <div id="treeList"></div>
     <script>
        function dataBinding(e) {
            console.log("dataBinding");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBinding", dataBinding);
        treeList.dataSource.fetch();
    </script>

### dataBound

Fires when the widget is bound to data from its data source. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the dataBound event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBound: function(e) {
            console.log("dataBound");
          }
        });
    </script>

#### Example - subscribing to the dataBound event after initialization

    <div id="treeList"></div>
     <script>
        function dataBound(e) {
            console.log("dataBound");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBound", dataBound);
        treeList.dataSource.fetch();
    </script>

### dragstart

(Available as of the 2015.3.1014 release) Fires when the user attempts to drag an item. If prevented, the item is not allowed to move. The event handler function context (available through the `this` keyword) will be set to the widget instance.

##### e.source `kendo.data.TreeListModel`

The model of the source row.

#### Example - subscribing to the dragstart event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragstart: function(e) {
          console.log("dragstart", e.source);
        }
      });
    </script>

#### Example - subscribing to the dragstart event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function dragstart(e) {
        console.log("dragstart");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragstart", dragstart);
    </script>

### drag

(Available as of the 2015.3.1014 release) Fires while the user is dragging and item. This event is triggered on every mouse move. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.target `jQuery`

The element under the cursor.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the drag event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drag: function(e) {
          console.log("dragging", e.source, e.target);
        }
      });
    </script>

#### Example - subscribing to the drag event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function drag(e) {
        console.log("dragging");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drag", drag);
    </script>

### dragend

(Available as of the 2015.3.1014 release) Fires when the user finishes dragging an item and the model was updated. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the dragend event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragend: function(e) {
          console.log("drag ended", e.source, e.destination);
        }
      });
    </script>

#### Example - subscribing to the dragend event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function dragend(e) {
        console.log("drag ended");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragend", dragend);
    </script>

### drop

(Available as of the 2015.3.1014 release) Fires when the user drops an item. If prevented, the source row will not be moved. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.dropTarget `Element`

The element over which the node is placed.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.valid `Boolean`

Indicates whether the drag operation is successful.

##### e.setValid `Boolean`

Sets the valid state. If set to `false`, the row will be animated back to its origin and will indicate to the user that the operation was invalid.

#### The difference between e.setValid(false) and e.preventDefault()

Both operations cancel the default drag operation but the indication to the user is different.

* `e.setValid(false)` indicates that the operation was unsuccessful by animating the drag clue to its original position. Use `setValid(false)` to indicate unsuccessful drag-and-drop operations.
* `e.preventDefault()` only removes the clue as if it was dropped. Use `preventDefault` to manually handle the drag-and-drop operation.

#### Example - subscribing to the drop event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drop: function(e) {
          console.log("drop", e.source, e.destination, e.valid);
        }
      });
    </script>

#### Example - subscribing to the drop event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/kendo-ui/service";

      function drop(e) {
        debugger
        console.log("row dropped");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All",
              dataType: "jsonp"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drop", drop);
    </script>

### edit

Fires when the user edits or creates a data item. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the container element. The container element contains the editing UI.

##### e.model `kendo.data.TreeListModel`

The data item which will be edited. To check if the data item is new (created) or not (edited), use its [`isNew`](/api/javascript/data/model/methods/isnew) method.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the edit event before initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ],
        edit: function(e) {
          console.log("edit");
        }
      });
    </script>

#### Example - subscribing to the edit event after initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      function edit(e) {
        console.log("edit");
      }

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      var treeList = $("#treelist").data("kendoTreeList");
      treeList.bind("edit", edit);
    </script>

### excelExport

Fires when the user clicks the **Export to Excel** toolbar button.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.data `Array`

(Available as of the 2014.3.1205 release) The array of data items that is used to create the Excel workbook.

##### e.workbook `Object`

The Excel [`workbook` configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will be reflected in the output Excel document.

##### e.preventDefault `Function`

If invoked, the TreeList will not save the generated file.

#### Example - subscribing to the excelExport event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.saveAsExcel();
    </script>

#### Example - subscribing to the excelExport event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("excelExport", function(e) {
        e.workbook.fileName = "Employees.xlsx";
      });
      treeList.saveAsExcel();
    </script>

### expand

Fires when an item is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the expand action. The child table rows will not be shown.

#### Example - subscribing to the expand event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          expand: function(e) {
            console.log("expand");
          }
        });
    </script>

#### Example - subscribing to the expand event after initialization

    <div id="treeList"></div>
    <script>
      function expand(e) {
        console.log("expand");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("expand", expand);
    </script>

### filterMenuInit

Fires when the TreeList filter menu is initialized. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the filterMenuInit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuInit: function(e) {
          if (e.field == "name") {
            var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
            firstValueDropDown.value("contains");
            firstValueDropDown.trigger("change");

            var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
            logicDropDown.value("or");
            logicDropDown.trigger("change");

            var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
            secondValueDropDown.value("contains");
            secondValueDropDown.trigger("change");
          }
        }
      });
    </script>

#### Example - subscribing to the filterMenuInit event during initialization and changing the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuInit(e) {
        if (e.field == "name") {
          var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
          firstValueDropDown.value("contains");
          var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
          logicDropDown.value("or");
          var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
          secondValueDropDown.value("contains");
        }
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuInit", treelist_filterMenuInit);
    </script>

### filterMenuOpen

Fires when the TreeList filter menu is opened. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is opened.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the filterMenuOpen event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuOpen: function(e) {
          e.container.find(".k-textbox:last").focus();
        }
      });
    </script>

#### Example - subscribing to the filterMenuOpen event during initialization and change the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuOpen(e) {
        e.container.find(".k-textbox:last").focus();
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuOpen", treelist_filterMenuOpen);
    </script>

### pdfExport

Fires  when the user clicks the **Export to PDF** toolbar button.

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, the TreeList will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribing to the pdfExport event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdfExport: function(e) {
          console.log("exporting PDF");
        }
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.saveAsPDF();
    </script>

#### Example - subscribing to the pdfExport event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("pdfExport", function(e) {
        console.log("exporting pdf");
      });
      treelist.saveAsPDF();
    </script>

### remove

Fires when the user clicks the **Destroy** command button. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object which represents the current table row.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, prevents the removal of the data item. The table rows will remain unchanged.

#### Example - subscribing to the remove event before initialization

    <div id="treelist"></div>
    <script>

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ],
        remove: function(e) {
          console.log("remove");
        }
      });
    </script>

#### Example - subscribing to the remove event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            destroy: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Destroy",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ]
      });

      function remove(e) {
        console.log("remove");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("remove", remove);
    </script>

### save

Fires when a data item is saved. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object which represents the current editor container element. If the [`editable.mode`](/api/javascript/ui/treelist#configuration-editable.mode) is `inline`, the container will be the edited row. If it is set to `popup`, then the container element will be the window element.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the save event before initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ],
        save: function(e){
          console.log("save row");
        }
      });
    </script>

#### Example - subscribing to the save event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/All",
              dataType: "jsonp"
            },
            update: {
              url: "https://demos.telerik.com/kendo-ui/service/EmployeeDirectory/Update",
              dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      function save(e) {
        console.log("save row");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("save", save);
    </script>

### saveChanges

Fires when the user clicks the **Save** command button. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.preventDefault `Function`

If invoked, the TreeList will not call the [`sync`](/api/javascript/data/datasource/methods/sync) method of the data source.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the saveChanges event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"],
        saveChanges: function(e) {
          if (!confirm("Are you sure you want to save all changes?")) {
            e.preventDefault();
          }
        }
      });
    </script>

#### Example - subscribing to the saveChanges event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_saveChanges(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
          e.preventDefault();
        }
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("saveChanges", treelist_saveChanges);
    </script>

### columnShow

Fires when the user shows a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnShow event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnShow: function(e) {
          console.log(e.column.field); // displays the field of the shown column
        }
      });
    </script>

#### Example - subscribing to the columnShow event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnShow(e) {
        console.log(e.column.field); // displays the field of the shown column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnShow", treelist_columnShow);
    </script>

### columnHide

Fires when the user hides a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnHide event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnHide: function(e){
          console.log(e.column.field); // displays the field of the hidden column
        }
      });
    </script>

#### Example - subscribing to the columnHide event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnHide(e) {
        console.log(e.column.field); // displays the field of the hidden column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnHide", treelist_columnHide);
    </script>

### columnReorder

Fires when the user changes the order of a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnReorder event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true,
            columnReorder: function(e) {
                console.log(e.column.field, e.newIndex, e.oldIndex);
            }
        });
    </script>

#### Example - subscribing to the columnReorder event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnReorder(e) {
          console.log(e.column.field, e.newIndex, e.oldIndex);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnReorder", treelist_columnReorder);
    </script>

### columnResize

Fires when the user resizes a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnResize event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true,
            columnResize: function(e) {
                console.log(e.column[0].field, e.newWidth, e.oldWidth);
            }
        });
    </script>

#### Example - subscribing to the columnResize event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnResize(e) {
          console.log(e.column[0].field, e.newWidth, e.oldWidth);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnResize", treelist_columnResize);
    </script>

### columnMenuInit

Fires when the column menu is initialized. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnMenuInit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuInit: function(e) {
          var menu = e.container.find(".k-menu").data("kendoMenu");
          var field = e.field;
          menu.append({ text: "Custom" });
          menu.bind("select", function(e) {
            if ($(e.item).text() == "Custom") {
              console.log("Custom button for", field);
            }
          });
        }
      });
    </script>

#### Example - subscribing to the columnMenuInit event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuInit(e) {
        var menu = e.container.find(".k-menu").data("kendoMenu");
        var field = e.field;
        menu.append({ text: "Custom" });
        menu.bind("select", function(e) {
          if ($(e.item).text() == "Custom") {
            console.log("Custom button for", field);
          }
        });
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuInit", treelist_columnMenuInit);
    </script>

### columnMenuOpen

Fires when the column menu is opened. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnMenuOpen event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuOpen: function(e) {
          var menu = e.container.children().data("kendoMenu");
          menu.open(menu.element.find("li:first"));
        }
      });
    </script>

#### Example - subscribing to the columnMenuOpen event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuOpen(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuOpen", treelist_columnMenuOpen);
    </script>

### columnLock

Fires when the user lock a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnLock event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnLock: function(e) {
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribing to the columnLock event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnLock(e) {
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnLock", treeList_columnLock);
    </script>

### columnUnlock

Fires when the user unlock a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnUnlock event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnUnlock: function (e) {
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribing to the columnUnlock event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnUnlock(e) {
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnUnlock", treeList_columnUnlock);
    </script>
