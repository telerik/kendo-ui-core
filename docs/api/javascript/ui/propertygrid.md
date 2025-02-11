---
title: PropertyGrid
page_title: Configuration, methods and events of Kendo UI PropertyGrid
description: Code examples for the PropertyGrid UI component configuration. Learn how to use its methods and which events to set once the PropertyGrid UI component is initialized and expanded.
res_type: api
component: propertygrid
---

# kendo.ui.PropertyGrid

Represents the Kendo UI PropertyGrid component. Inherits from [TreeList](/api/javascript/ui/treelist).

## Configuration

### columns `Object`

The configuration of the PropertyGrid columns which allows for setting the field and value column configuration options.

#### Example - specifying the columns of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        width: 400,
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### columns.fieldColumn `Object`

The configuration of the field column.

### columns.fieldColumn.width `Number`

The width of the column. Numeric values are treated as pixels. Refer to the documentation for details on using column widths and scrolling.

### columns.valueColumn `Object`

The configuration of the value column.

### columns.valueColumn.width `Number`

The width of the column. Numeric values are treated as pixels. Refer to the documentation for details on using column widths and scrolling.

### contextMenu `Object|Boolean` *(default: false)*

Configures the ContextMenu of the PropertyGrid. If set to `true` enables the default ContextMenu.

### contextMenu.body `Array`

Configures the items of the ContextMenu for the table body element. Those are some valid predefined tools: "separator", "copy", "copyName", "copyDeclaration", "resize", "reset", "expandItem", "collpaseItem".

You can also specify a custom item and associate it with a command.

#### Example

    <div id="propertyGrid"></div>
    <script>
        $("#propertyGrid").kendoPropertyGrid({
            columns: {
                fieldColumn: { width: 200 },
                valueColumn: { width: 250 }
            },
            model: {
                foo: "bar",
                baz: 5
            },
            contextMenu: {
                body: [
                    "copyDeclaration",
                    "separator",
                    "resize",
                    { name: "MyCustomCommand", text: "Save State", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.propertygrid.defaultBodyContextMenu.concat([
                //     { name: "MyCustomCommand", text: "SaveState", icon: "gear", command: "CustomCommand" }
                // ])
            }
        });

        kendo.ui.propertygrid.commands["CustomCommand"] = kendo.ui.propertygrid.PropertyGridCommand.extend({
            exec: function() {
                var that = this,
                    propertyGrid = that.propertyGrid;

                propertyGrid.saveState();
            }
        });
    </script>

### contextMenu.body.name `String`

Specifies the name of the item.

### contextMenu.body.text `String`

Specifies the text of the item.

### contextMenu.body.icon `String`

Specifies the icon of the item.

### contextMenu.body.command `String`

Specifies the command of the item.

### editMode `Boolean|String` *(default: true)*

If set to `true`, the user will be able to edit the values of the object's properties to which the PropertyGrid is bound. By default, editing is enabled.

`editMode` can also be set to a string (which specifies the edit mode).

The supported string values are:

* (Default) `incell`

#### Example - disable editing for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        editMode: false
      });
    </script>

### excel `Object`

Configures the Excel export settings of the PropertyGrid.

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.

#### Example - setting the default Excel file name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        excel: {
          fileName: "Employees.xlsx"
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file.

#### Example - enabling filtering in the output Excel file

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        excel: {
          filterable: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/propertygrid#configuration-excel.proxyURL) even if the browser supports local file saving.

### excel.proxyURL `String` *(default: null)*

The URL of the server-side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xslx>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType`&mdash;The MIME type of the file.
* `base64`&mdash;The base-64 encoded file content.
* `fileName`&mdash;The file name as requested by the caller.

#### Example - setting the server proxy URL

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        excel: {
          proxyURL: "/save"
        }
      });
    </script>

### groupable `Boolean` *(default: true)*

Enables the grouping of properties. Set this configuration to `false` to disable grouping.

> For the `ToggleGroupLayout` command button to be rendered in the ToolBar, the `items` configuration should specify the groups to which the fields belong.

#### Example - define groups of items for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        items:[
            {field:"foo", group: "Group A"},
            {field:"baz", group: "Group B"}
        ]
      });
    </script>

#### Example - disable grouping for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        groupable: false
      });
    </script>

### height `Number`

Sets the height of the PropertyGrid. Numeric values are treated as pixels.

#### Example - set the height of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        height: 500
      });
    </script>

### items `Array`

Additional configuration options for the properties of the model.

#### Example - set the items configuration for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5,
            price: 10,
            agree: false,
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida tincidunt tellus."
        },
        items:[
            {field: "foo", group: "Group A", editable: false},
            {field: "baz", group: "Group B", editor: "NumericTextBox", editorOptions: { min: 1, max: 10 } },
            {field: "agree", group: "Group C", validation: { required: true } },
            {field: "details", group: "Group D", editor: "TextArea", editorOptions: { rows: 5 }, template: (data)=>`<span style="color:red">${data.value}</span>`},
            {field: "price", group: "Group A", editable: false, format: "{0:C}", description: "The price for the item."}
        ]
      });
    </script>

### items.description `String`

Sets the description for the property.

### items.editable `Boolean|Function`

The JavaScript function that is executed when the value cell is about to be opened for editing. The returned result will determine whether an editor  will be created.

> Items of type Object are not editable.

### items.editor `String|Function`

Provides a way to specify a custom editing UI for the value of the property. To create the editing UI, use the `container` parameter.

> * The editing UI has to contain an element with a set `name` HTML attribute. The attribute value should be set to `value`.
> * The validation settings that are defined in the `model.fields` configuration will not be applied automatically. In order for the validation to work, you (the developer) are responsible for attaching the corresponding validation attributes to the editor input. If the custom editor is a component, to avoid visual issues, you can [customize the tooltip position of the validation warning](/framework/validator/overview#customizing-the-tooltip-position).

When used as `String`, defines the editor component type. Set the options for the component via the [items.editorOptions](/api/javascript/ui/propertygrid/configuration/items#editoroptions).For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditor)

### items.editorOptions `Object`

Defines the component options for the custom property value UI editor that is set via the `items.editor` configuration. For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditoroptions).

### items.field `String`

Maps the item configuration to the model property.

### items.format `String`

The format that is applied to the value before it is displayed. Takes the `{0:format}` form where `format` is a [standard number format](/api/javascript/kendo#standard-number-formats), [custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [`kendo.format`](/api/javascript/kendo/methods/format) function is used to format the value.

### items.group `String`

Sets the name of the group to which the property will belong, if grouping is enabled. Only root level items can be grouped.

### items.items `Array`

Additional configuration options for the nested properties of the model, if any.

### items.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which is rendered for the property's value.

### items.validation `Object`

Specifies the validation rules for the field.

### messages `Object`

Defines the text of the command buttons that are shown within the PropertyGrid. Used primarily for localization.

### messages.defaultGroupName `String` *(default: Other)*

When grouping is enabled, sets the name for the group, to which any root properties without a defined group will be added to.

#### Example - set default group name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5,
            price: 10,
            agree: false,
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida tincidunt tellus."
        },
        items:[
            {field: "foo", group: "Group A", editable: false},
            {field: "baz", group: "Group B", editor: "NumericTextBox", editorOptions: { min: 1, max: 10 } },
            {field: "agree", group: "Group C", validation: { required: true } },
            {field: "details", group: "Group D", editor: "TextArea", editorOptions: { rows: 5 }, template: (data)=>`<span style="color:red">${data.value}</span>`},
            {field: "price", editable: false, format: "{0:C}"}
        ],
        messages: { defaultGroupName: "Other Items"}
      });
    </script>

### messages.commands `Object`

Defines the text and/or title for the command buttons that are used across the component.

### messages.commands.details `String` *(default: "Toggle Info box")*

Defines the title attribute for the `details` command.

### messages.commands.excel `String` *(default: "Export to Excel")*

Defines the text of the **Export to Excel** button that exports the component's data in spreadsheet format.

### messages.commands.group `String` *(default: "Group Items")*

Defines the title attribute for the `group` DropDownList.

### messages.commands.pdf `String` *(default: "Export to PDF")*

Defines the text of the **Export to PDF** button that exports the component's data in PDF format.

### messages.commands.search `String` *(default: "Search...")*

Defines the placeholder text in the PropertyGrid search panel.

### messages.commands.sort `String` *(default: "Sort")*

Defines the title attribute for the Sort DropDownList.

### model `Object`

Defines the model to which the PropertyGrid is bound to.

#### Example - define the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true`, the user can navigate the component with the keyboard. By default, keyboard navigation is disabled.

#### Example - enabling keyboard navigation

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        navigatable: true
      });
    </script>

### pdf `Object`

Configures the PDF export settings of the PropertyGrid.

> Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library. Simply loading this library with a `<script>` tag enables compression in the PDF, e.g.:
>
> `<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>`

### pdf.author `String` *(default: null)*

The author of the PDF document.

#### Example - setting the author

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe"
        }
      });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.

### pdf.avoidLinks `Boolean|String` *(default: false)*

A flag which indicates whether to produce actual hyperlinks in the exported PDF file. You can also pass a CSS selector as an argument. All matching links will be ignored.

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.

#### Example - setting the creator

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          creator: "John Doe"
        }
      });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.

#### Example - setting the date

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          date: new Date("2014/10/10")
        }
      });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.

#### Example - setting the default PDF file name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          fileName: "Employees.pdf"
        }
      });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/propertygrid#configuration-pdf.proxyURL) even if the browser supports the local saving of files.

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.

### pdf.keepPNG `Boolean` *(default: false)*

If set to `true` all PNG images contained in the exported file will be kept in PNG format.

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.

#### Example - setting the keywords

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          keywords: "object details"
        }
      });
    </script>

### pdf.landscape `Boolean` *(default: false)*

If set to `true`, reverses the paper dimensions in such a way that the width becomes the larger edge.

#### Example - enabling the landscape mode

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          landscape: true
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

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
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

Specifies the paper size of the PDF document. when `auto` (default), the paper size is determined by the content.

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

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          paperSize: ["20mm", "20mm"]
        },
      });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier, and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.pdf>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType`&mdash;The MIME type of the file.
* `base64`&mdash;The base-64 encoded file content.
* `fileName`&mdash;The file name, as requested by the caller.

#### Example - setting the server proxy URL

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          proxyURL: "/save"
        },
      });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword which indicates where to display the document that was returned by the proxy. To display the document in a new window or iframe, the proxy will set the `Content-Disposition` header to `inline; filename="<fileName.pdf>"`.

#### Example - opening the generated document in a new window

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
      });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.

#### Example - setting the subject

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          subject: "Details"
        },
      });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.

#### Example - setting the title

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          title: "Information"
        },
      });
    </script>

### resizable `Boolean` *(default: true)*

When set to `true` the user will be able to resize columns via the context menu. When set to `false` the ContextMenu `Resize` command will not be available.

#### Example - disable the Details/Info box for properties displayed in the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        width: 400,
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        resizable: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### showDetails `Boolean` *(default: true)*

Use this configuration to disable the `ToggleDetails` command button on the toolbar and to prevent the rendering of the Details/Info box.

#### Example - disable the Details/Info box for properties displayed in the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        showDetails: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### scrollable `Boolean` *(default: true)*

If set to `true`, the PropertyGrid will display a scrollbar when the total row height or width exceeds the PropertyGrid height or width. By default, scrolling is enabled.

#### Example - disable the scrolling for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        scrollable: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### toolbar `String|Function|Array|Object`

* If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole PropertyGrid toolbar and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.
* If a `Function` value is assigned (it may be a `kendo.template()` function call or a generic function reference), then the return value of the function will be used to render the contents of the PropertyGrid toolbar.
* If an `Array` value is assigned, it will be treated as the list of commands which are displayed in the PropertyGrid toolbar. Commands can be custom or built-in. The supported built-in commands are:
  * `search`&mdash;Adds a Search input to the ToolBar of the PropertyGrid. Search is performed by property name.
  * `sort`&mdash;Adds a DropDownList with sorting options. Properties are sorted by property name.
  * `group`&mdash;Renders a button for toggling between List and Group layout.
  * `details`&mdash;Renders a button for toggling the Details/Info box.
  * `separator`&mdash;Renders a separator element.
  * `spacer`&mdash;Renders a spacer element.
  * `excel`&mdash;Exports the data in MS Excel format.
  * `pdf`&mdash;Exports the data in PDF format.
* If an `Object` value is assigned, it will propagate these properties to the underlying Toolbar:
  * `items` - an array of commands as explained above
  * `overflow` - an object that configures the overflow behavior of the toolbar. The same as [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) property

#### Example - set the ToolBar as an array of commands

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: ["search", "spacer", "sort"],
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

#### Example - set the ToolBar as a string template

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: "<p>My string template in a paragraph.</p>",
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

Apart from the built-in tools, the PropertyGrid fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the component using the components available in the ToolBar itself. Note that all tools (commands) must have their name specified, as demonstrated in the next example:

#### Example - add split button to the ToolBar

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: [
            "search",
            "spacer",
            "sort",
            {
                name: "splitbtn",
                type: "splitButton",
                text: "SplitButton",
                menuButtons: [
                    {text: "Option 1"},
                    {text: "Option 2"}]
            }],
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### toolbar.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          "search",
          { name: "custom", click: function() { alert("custom"); } }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.name `String`

The name of the toolbar command. Can be either a built-in ("search", "sort", "group" or "details") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          "search",
          { name: "custom", click: function() { alert("custom"); } }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.text `String`

The text that is displayed by the command button. If not set, the PropertyGrid will use the [`name`](/api/javascript/ui/propertygrid#configuration-toolbar.name) option as the button text instead.

#### Example - specifying the text for the command button

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          { name: "custom", text: "My Command" }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>



### toolbar.items.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.


### toolbar.items.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


### toolbar.items.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


### toolbar.items.name `String`

The name of the toolbar command. Can be either a built-in ("search", "sort", "group" or "details") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.

### toolbar.items.text `String`

The text that is displayed by the command button. If not set, the PropertyGrid will use the [`name`](/api/javascript/ui/propertygrid#configuration-toolbar.name) option as the button text instead.


### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.


### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


### width `Number`

Sets the width of the PropertyGrid. Numeric values are treated as pixels.

#### Example - set the width of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

## Methods

### dataItem

Returns the data item to which the specified table row is bound.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.TreeListModel`&mdash;The data item to which the specified table row is bound.

#### Example - getting the data item to which the first table row is bound

    <div id="propertyGrid"></div>
    <script>
        $("#propertyGrid").kendoPropertyGrid({
            model: {
                foo: "bar",
                baz: 5
            },
            width: 500
        });

        var component = $("#propertyGrid").data("kendoPropertyGrid");
        var data = component.dataItem("tbody>tr:eq(1)");
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.value); // displays "bar"
    </script>

### edit

Switches the specified value cell in edit mode. Requires the [edit mode](/api/javascript/ui/propertygrid/configuration/editMode) to be enabled. Fires the [`beforeEdit`](/api/javascript/ui/propertygrid/events/beforeedit) and [`edit`](/api/javascript/ui/propertygrid/events/edit) events.

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switching the first value cell to edit mode

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    component.edit($("#propertyGrid td:eq(1)"));
    </script>

### model

Gets or sets the model to which the PropertyGrid is bound to.

#### Parameters

##### model `Object`

The object to which the PropertyGrid will bind to.

##### items `Array`

An array of configuration options for the fields of the passed object. Refer to the [`items`](/api/javascript/ui/propertygrid/configuration/items) configuration option for further details.

#### Returns

`model`&mdash;The current state of the object to which the PropertyGrid is bound.

#### Example - get the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    console.log(component.model())
    </script>

#### Example - set the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    component.model({
            title: "A Title",
            author: "John Doe",
            price: 15
        },[
            {field: "price", format: "{0:C}" }
        ])
    </script>

### resetState

Cancels any changes in the values of the object's properties. Resets the object to the initial state or the latest state set via the [`saveState`](/api/javascript/ui/propertygrid/methods/savestate) method.

#### Example - reset to initial state

    <button id="btn">Reset state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.resetState();
      });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/propertygrid/events/excelexport) event.

> Calling this method may trigger the built-in browser popup blocker. To avoid that, always call it as a response to an end-user action (for example, a button click).

#### Example - manually initiate the Excel export

    <button id="export">Export to Excel</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#export").click(function(e) {
          var component = $("#propertyGrid").data("kendoPropertyGrid");
          component.saveAsExcel();
      });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [`pdfExport`](/api/javascript/ui/propertygrid/events/pdfexport) event.

> Calling this method may trip the built-in browser popup blocker. To avoid that, call this method as a response to an end-user action (for example, a button click).

#### Returns

`Promise`&mdash;A promise that will be resolved when the export completes. The same promise is available in the [`pdfExport`](/api/javascript/ui/propertygrid/events/pdfexport) event arguments.

#### Example - manually initiate the PDF export

    <button id="export">Export to PDF</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#export").click(function(e) {
          var component = $("#propertyGrid").data("kendoPropertyGrid");
          component.saveAsPDF();
      });
    </script>

### saveState

Updates the state of the object and clears all `dirty` flags. Calling the [`resetState`](/api/javascript/ui/propertygrid/methods/resetstate) method will revert any changes to that updated state.

#### Example - save state of the object

    <button id="btn">Save state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.saveState();
      });
    </script>

### selectItem

Gets or sets the table row which is selected.

#### Parameters

##### row `Element|jQuery`

A DOM element or a jQuery object which represents the table row.

#### Returns

`jQuery`&mdash;The selected table row.

#### Example - selecting a table row

    <button id="btn">Highlight the second row</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.selectItem($("#propertyGrid tbody>tr:nth(1)"));
      });
    </script>

#### Example - getting the selected table row

    <button id="btn">Get selected row info</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");
        var row = component.selectItem();

        if(row.length > 0){
            var data = component.dataItem(row);
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(data.value);
        }
      });
    </script>

### toggleDetails

Toggles the Details/Info box, when enabled. See the [`showDetails`](/api/javascript/ui/propertygrid/configuration/showdetails) configuration option for details on enabling/disabling the functionality.

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleDetails();
      });
    </script>

### toggleGroup

Toggles the expanded or collapsed state of a group.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents a grouping row. A string is treated as a jQuery selector.

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state of the first group</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        items:[
          { field: "foo", group: "Group A" }
        ],
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleGroup($("#propertyGrid .k-table-group-row.k-grouping-row:nth-child(1)"));
      });
    </script>

### toggleItem

Toggles the expanded or collapsed state of a row.

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleItem($("#propertyGrid tbody>tr:nth(0)"));
      });
    </script>

## Events

### beforeEdit

Fires when the user tries to edit a data item before the editor is created. Can be used for preventing the editing depending on custom logic. The event handler function context (available through the `this` keyword) will be set to the component instance. The event will be fired only when the PropertyGrid is editable.

#### Event Data

##### e.model `kendo.data.Model`

The data item which will be edited.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the beforeEdit event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        beforeEdit: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("beforeEdit");

          if (!e.model.field == "title") {
            e.preventDefault();
          }
        }
      });
    </script>

### cancel

Fires when the user closes the edit cell via the `Esc` key or when the `Reset` command from the ContextMenu is executed. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the `cancel` action. The table row remains in edit mode.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the cancel event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        cancel: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("cancel");
        }
      });
    </script>

#### Example - subscribing to the cancel event after initialization

    <div id="propertyGrid"></div>

    <script>
      function cancel(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("cancel");
      }

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });

        var component = $("#propertyGrid").data("kendoPropertyGrid");
        component.bind("cancel", cancel);
    </script>

### cellClose

Fires when the `incell` edit mode is used and the cell will be closed. The event is triggered after saving or canceling the changes but before the cell is closed. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. For more information, refer to the [`edit` event arguments](/api/javascript/ui/propertygrid/events/edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action.

The supported types are:

* `save`
* `cancel`&mdash;Triggered when the PropertyGrid keyboard navigation is enabled by `navigatable: true` and the `Esc` key is used for the `close` action of the cell.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the cellClose event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        cellClose:  function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.type);
        }
      });

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.edit($("#propertyGrid td:eq(2)"));
    </script>

### change

Fires when the user selects a table row in the PropertyGrid. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - getting the selected data item from the selected row

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        change: function(e) {
          var selectedRow = this.selectItem();
          var dataItem = this.dataItem(selectedRow);
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(`field: ${dataItem.field}: value: ${dataItem.value}`);
        }
      });
    </script>

### collapse

Fires when an item is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        collapse: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("collapse");
        }
      });
    </script>

### edit

Fires when the user edits a data item. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the container element. The container element contains the editing UI.

##### e.model `kendo.data.TreeListModel`

The data item which will be edited.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the edit event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        edit: function(e) {
	        /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("edit");
        }
      });
    </script>

#### Example - subscribing to the edit event after initialization

    <div id="propertyGrid"></div>

    <script>
      function edit(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("edit");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("edit", edit);
    </script>

### excelExport

Fires when the user clicks the **Export to Excel** toolbar button.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.data `Array`

The array of data items that is used to create the Excel workbook.

##### e.workbook `Object`

The Excel [`workbook` configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will be reflected in the output Excel document.

##### e.preventDefault `Function`

If invoked, the PropertyGrid will not save the generated file.

#### Example - subscribing to the excelExport event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        excelExport: function(e) {
          e.workbook.fileName = "Details.xlsx";
        }
      });
      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.saveAsExcel();
    </script>

### expand

Fires when an item is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the expand action. The child table rows will not be shown.

#### Example - subscribing to the expand event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        expand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("expand");
        }
      });
    </script>

#### Example - subscribing to the expand event after initialization

    <div id="propertyGrid"></div>

    <script>
      function expand(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("expand");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("expand", expand);
    </script>

### groupCollapse

Fires when a group of items is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.group `kendo.data.TreeListModel`

The group object associated with the group row.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        groupCollapse: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("groupCollapse", e.group);
        }
      });
    </script>

### groupExpand

Fires when a group of items is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.group `kendo.data.TreeListModel`

The group object associated with the group row.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        groupExpand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("groupExpand", e.group);
        }
      });
    </script>

### pdfExport

Fires when the user clicks the **Export to PDF** toolbar button.

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.preventDefault `Function`

If invoked, the PropertyGrid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribing to the pdfExport event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        pdfExport: function(e) {
	        /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("exporting PDF");
        }
      });
      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.saveAsPDF();
    </script>

### save

Fires when a data item is saved. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object which represents the current editor container element.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the save event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        save: function(e){
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("save");
        }
      });
    </script>

#### Example - subscribing to the save event after initialization

    <div id="propertyGrid"></div>

    <script>
      function save(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("save");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("save", save);
    </script>

### columnResize

Fires when the user resizes a column via the `Resize` contextMenu command. The event handler function context (available through the `this` keyword) will be set to the component instance.

#### Event Data

##### e.column `Object`

A JavaScript object which represents the column configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the columnResize event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        columnResize: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.column[0].field, e.newWidth, e.oldWidth);
        }
      });
    </script>

