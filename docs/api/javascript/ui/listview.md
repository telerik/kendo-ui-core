---
title: ListView
page_title: Configuration, methods and events of Kendo UI ListView
description: Step-by-step instructions and samples for Kendo UI ListView widget configuration, methods and event handling.
---

# kendo.ui.ListView

Represents the Kendo UI ListView widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

#### Example - disable automatic binding

    <div id ="listView"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listView").kendoListView({
         dataSource: dataSource,
         template: "<div>#:name#</div>",
         autoBind: false
     });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: [
            { name: "Jane Doe" },
            { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id ="listView"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
    });
    </script>

### editTemplate `Function`

Specifies ListView item template in edit mode.

#### Example of

    <script type="text/x-kendo-tmpl" id="template">
         <div>
           <dl>
             <dt>Name</dt> <dd>#:name#</dd>
             <dt>Age</dt> <dd>#:age#</dd>
           </dl>
           <div>
               <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
               <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
           </div>
         </div>
     </script>

     <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           <dl>
             <dt>Name</dt>
             <dd><input type="text" data-bind="value:name" name="name" required="required" /></dd>
             <dt>Age</dt>
             <dd><input type="text" data-bind="value:age" data-role="numerictextbox" data-type="number" name="age" required="required" /></dd>
           </dl>
           <div>
               <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
               <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
           </div>
         </div>
     </script>

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        }
     });
     </script>

### navigatable `Boolean` *(default: false)*

 Indicates whether keyboard navigation is enabled/disabled.

#### Example

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        navigatable: true
    });
    </script>

### selectable `Boolean|String` *(default: false)*

 Indicates whether selection is enabled/disabled. Possible values:


#### *true*

Single item selection.

#### *"single"*

Single item selection.

#### *"multiple"*

Multiple item selection.

#### Example of ListView with multiple selection enabled

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        selectable: "multiple"
    });
    </script>

### template `Function`

Specifies ListView item template.

#### Example

     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html())
    });
    </script>

### altTemplate `Function`

Template to be used for rendering the alternate items in the ListView.

#### Example of alternate item template


     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <script type="text/kendo-x-tmpl" id="altTemplate">
        <div>
            Alternate item template for #:name#
        </div>
     </script>

     <div id ="listView"></div>
     <script>
     $("#listView").kendoListView({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html()),
        altTemplate: kendo.template($("#altTemplate").html())
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

## Methods

### add

Inserts empty item as first item on the current view and prepare it for editing.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        editTemplate: '<div><input type="text" name="name" data-bind="value:name" /></div>'
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // add item
    listView.add();
    </script>

### cancel

Cancels changes in currently edited item.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        editTemplate: '<div><input type="text" name="name" data-bind="value:name" /></div>'
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // add item
    listView.add();
    // cancel changes in currently edited item
    listView.cancel();
    </script>

### clearSelection

Clears ListView selected items and triggers change event.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        selectable: true
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    listView.clearSelection();
    </script>

### dataItem

Returns the specified data item.

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the listview item. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` the data item to which the specified listview item is bound. [More information about the ObservableObject type...](/api/javascript/data/observableobject)

#### Example - get the data item to which the first listview element is bound

    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      var listview = $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListView")

      var row = $('#listView > div').first();
      console.log(listview.dataItem(row));
    </script>

### dataItems

Returns the array that is bound to the widget

#### Example

    <div id ="listView"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      var listview = $("#listView").kendoListView({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListView")
      console.log(listview.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the **ListView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    listView.destroy();
    </script>

### edit

Edit specified ListView item. Fires the [edit](#events-edit) event.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>",
        editTemplate: '<div><input type="text" name="name" data-bind="value:name" /></div>'
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // edit first list view item
    listView.edit(listView.element.children().first());
    </script>

#### Parameters

##### item `jQuery`

jQuery object which represents the item to be edited.

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered ListView items (`<div>`, `<li>`, `<tr>` elements, etc., depending on the item template).

### refresh

Reloads the data and repaints the list view.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    var listView = $("#listView").data("kendoListView");
    // refreshes the list view
    listView.refresh();
    </script>

### remove

Removes specified ListView item. Triggers [remove](#events-remove) event and if not prevented calls DataSource [sync](/api/javascript/data/datasource#methods-sync) method.

#### Example

    <div id ="listView"></div>
    <script>
    $("#listView").kendoListView({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // remove first list view item
    listView.remove(listView.element.children().first());
    </script>

#### Parameters

##### item `Object`

jQuery object which represents the item to be removed.

### save

Saves edited ListView item. Triggers [save](#events-save) event. If save event is not prevented and validation succeeds will call DataSource [sync](/api/javascript/data/datasource#methods-sync) method.

#### Example

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        },
        template: "<div>#:name#</div>",
        editTemplate: '<div><input type="text" name="name" data-bind="value:name" /></div>'
     });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // edit first list view item
    listView.edit(listView.element.children().first());
    // save edited item
    listView.save();
    </script>

### select

Get/set the selected ListView item(s).

#### Example

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ]
        },
        template: "<div>#:name#</div>",
        selectable: true
    });
    // get a reference to the list view widget
    var listView = $("#listView").data("kendoListView");
    // selects first list view item
    listView.select(listView.element.children().first());
    </script>

#### Returns

`jQuery` the selected items if called without arguments.

#### Parameters

##### items `jQuery | Array`

Items to select.

### setDataSource

Sets the dataSource of an existing ListView and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "Jane Doe", age: 30 }
        ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "John Doe", age: 33 }
      ]
    });
    var listView = $("#listView").data("kendoListView");
    listView.setDataSource(dataSource);
    </script>

## Events

### cancel

Fired when the user clicks the "cancel" button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <script type="text/x-kendo-tmpl" id="template">
        <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           Name: <input type="text" data-bind="value:name" name="name" required="required" />
           <div>
               <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
               <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
           </div>
         </div>
    </script>

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        },
        cancel: function(e) {
            e.preventDefault();
        }
    });
    var listView = $("#listView").data("kendoListView");
    listView.edit(listView.element.children().first());
    </script>

#### To set after initialization

    <script type="text/x-kendo-tmpl" id="template">
        <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           Name: <input type="text" data-bind="value:name" name="name" required="required" />
           <div>
               <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
               <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
           </div>
         </div>
    </script>

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        }
    });
    var listView = $("#listView").data("kendoListView");
    // bind to the cancel event
    listView.bind("cancel", function(e) {
        e.preventDefault();
    });
    listView.edit(listView.element.children().first());
    </script>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.Model`

The model to which the current grid row is bound to.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The row remains in edit mode.

### change

Fires when the list view selection has changed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "John Doe", age: 30 }
        ],
        selectable: true,
        change: function() {
            //handle event
        }
     });
     </script>

#### To set after initialization

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "John Doe", age: 30 }
        ],
        selectable: true
     });
     // get a reference to the list view
     var listView = $("#listView").data("kendoListView");
     // bind to the change event
     listView.bind("change", function(e) {
         // handle event
     });
     </script>

### dataBound

Fires when the list view has received data from the data source and it is already rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "John Doe", age: 30 }
        ],
        dataBound: function() {
            //handle event
        }
     });
     </script>

### dataBinding

Fires when the list view is about to be rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "John Doe", age: 30 }
        ],
        dataBinding: function() {
            //handle event
        }
     });
     </script>

#### To set after initialization

     <div id="listView"></div>
     <script>
     $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: [
            { name: "John Doe", age: 30 }
        ]
     });
     // get a reference to the ListView
     var listview = $("#listView").data("kendoListView");
     // bind to the dataBinding event
     listview.bind("dataBinding", function(e) {
         // handle event
     });
     </script>

### edit

Fires when the list view enters edit mode.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <script type="text/x-kendo-tmpl" id="template">
        <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           Name: <input type="text" data-bind="value:name" name="name" required="required" />
           <div>
               <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
               <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
           </div>
         </div>
    </script>

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        },
        edit: function(e) {
            //handle event
        }
    });
	var listView = $("#listView").data("kendoListView");
    listView.edit(listView.element.children().first());
    </script>

#### To set after initialization

    <script type="text/x-kendo-tmpl" id="template">
        <div> #:name# </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
         <div>
           Name: <input type="text" data-bind="value:name" name="name" required="required" />
           <div>
               <a class="k-button k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
               <a class="k-button k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
           </div>
         </div>
    </script>

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: kendo.template($("#template").html()),
        editTemplate: kendo.template($("#editTemplate").html()),
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        }
    });
    // get a reference to the list view
    var listView = $("#listView").data("kendoListView");
    // bind to the edit event
    listView.bind("edit", function(e) {
        // handle event
    });
    listView.edit(listView.element.children().first());
    </script>

#### Event Data

##### e.item `jQuery`

The jQuery element to be edited.

##### e.model `kendo.data.Model`

The model to be edited.

### remove

Fires before the list view item is removed. If it is not prevented will call DataSource [sync](/api/javascript/data/datasource#methods-sync) method.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        },
        remove: function(e) {
            //handle event
            e.preventDefault();
        }
    });
    // get a reference to the list view
    var listView = $("#listView").data("kendoListView");
    listView.remove(listView.element.children().first());
    </script>

#### To set after initialization

    <div id="listView"></div>
    <script>
    $("#listView").kendoListView({
        template: "<div>#: name#</div>",
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" },
                        age: { type: "number" }
                    }
                }
            }
        }
    });
    // get a reference to the list view
    var listView = $("#listView").data("kendoListView");
    // bind to the remove event
    listView.bind("remove", function(e) {
        // handle event
        e.preventDefault();
    });
    listView.remove(listView.element.children().first());
    </script>

#### Event Data

##### e.item `jQuery`

The item element to be deleted.

##### e.model `kendo.data.Model`

The model which to be deleted.

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the ListView item is bound.

##### e.item `jQuery`

The jQuery object representing the current ListView item.

##### e.sender `kendo.ui.ListView`

The widget instance which fired the event.

#### Example - subscribe to the "save" event

    <div id="listview"></div>

    <script type="text/x-kendo-tmpl" id="template">
      <div class="item">
        <p>#: name # || #: age #</p>
          <div class="edit-buttons">
            <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
          </div>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="editTemplate">
      <div class="item">
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-update"></span></a>
            <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-cancel"></span></a>
        </div>
        <input type="text" class="k-textbox" data-bind="value:name" name="name" required="required" validationMessage="required" />
        <span data-for="name" class="k-invalid-msg"></span>
        <br />
        <input type="text" data-role="numerictextbox" data-bind="value:age" name="age" required="required" validationMessage="required" />
        <span data-for="age" class="k-invalid-msg"></span>
      </div>
    </script>

    <script>
    $("#listview").kendoListView({
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      template: kendo.template($("#template").html()),
      editTemplate: kendo.template($("#editTemplate").html()),
      save: function(e) {
        console.log("record is modified");
        //handle event
      }
    });
    </script>
