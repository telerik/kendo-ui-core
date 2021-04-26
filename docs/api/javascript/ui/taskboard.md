---
title: TaskBoard
page_title: Configuration, methods and events of Kendo UI TaskBoard
description: Configuration options, methods and events for the Kendo UI TaskBoard widget. 
res_type: api
component: taskboard
---

# kendo.ui.TaskBoard

Represents the Kendo UI TaskBoard. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

Controls whether to bind the TaskBoard to the data source on initialization. 

### cardMenu `Array | Object` 

Defines the list of buttons rendered in the card.

### cardMenu.name `String` 

The name of the button.

### cardMenu.text `String` 

The text of the button.

### cardMenu.icon `String` 

The icon of the button.

### cardMenu.spriteCssClass `String` 

The class name of the icon element.

### cardMenu.command `String` 

The command of the button.

### cardMenu.options `String` 

The command options of the button.

### columns `Object|Array|kendo.data.DataSource` 

Sets the DataSource for the Columns of the TaskBoard. Can be bound to a remote service or local data.

### columnSettings `Object` 

Defines the settings for the columns.

### columnSettings.buttons `Array` 

Defines the list of buttons rendered in the column.

### columnSettings.buttons.name `String` 

The name of the button.

### columnSettings.buttons.text `String` 

The text of the button.

### columnSettings.buttons.icon `String` 

The icon of the button.

### columnSettings.buttons.spriteCssClass `String` 

The class name of the icon element.

### columnSettings.buttons.command `String` 

The command of the button.

### columnSettings.buttons.options `String` 

The command options of the button.

### columnSettings.dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the column. Mapped with the status of the cards.

### columnSettings.dataTextField `String` *(default: "text")*

The text field of the column.

### columnSettings.dataOrderField `String`

The field used to order columns (number based). If not set, columns will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.

### columnSettings.width `String|Number` 

Configures the width of the columns

### columnSettings.template `String|Function` 

Controls the rendering of the column header.

### dataOrderField `String`

The field used to order cards (number based). If not set, cards will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.

### dataCategoryField `String` *(default: "category")*

The category field of the card.

### dataDescriptionField `String` *(default: "description")*

The description field of the card.

### dataSource `Object|Array|kendo.data.DataSource` 

Sets the DataSource for the Cards of the TaskBoard. Can be bound to a remote service or local data.

### dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the card. Mapped with the status of the columns.

### dataTitleField `String` *(default: "title")*

The title field of the card.

### editable `Boolean|Object` *(default: true)*

Toggles the editing in the TaskBoard. Both for columns and cards.

### editable.buttons `Array` 

Defines a list of buttons rendering in the footer pane

### editable.buttons.name `String` 

The name of the button.

### editable.buttons.text `String` 

The text of the button.

### editable.buttons.icon `String` 

The icon of the button.

### editable.buttons.spriteCssClass `String` 

The class name of the icon element.

### editable.buttons.command `String` 

The command of the button.

### editable.buttons.options `String` 

The command options of the button.

### editable.buttons.primary `Boolean` 

Toggles whether the color of the button to be primary or not.

### editable.form `Object` 

The Kendo Form configuration for Card editing.

### editable.headerTemplate `String|Function` 

Controls the rendering of the header 

### height `String|Number` *(default: "800px")*

Configures the height of the TaskBoard wrapper.

### previewPane `Boolean|Object` *(default: true)*

Toggles the previewPane in the TaskBoard.

### previewPane.buttons `Array` 

Defines a list of buttons rendering in the footer pane.

### previewPane.buttons.name `String` 

The name of the button.

### previewPane.buttons.text `String` 

The text of the button.

### previewPane.buttons.icon `String` 

The icon of the button.

### previewPane.buttons.spriteCssClass `String` 

The class name of the icon element.

### previewPane.buttons.command `String` 

The command of the button.

### previewPane.buttons.options `String` 

The command options of the button.

### previewPane.buttons.primary `Boolean` 

Toggles whether the color of the button to be primary or not.

### previewPane.template `String|Function`

The template rendering of the preview pane.

### previewPane.headerTemplate `String|Function` 

The template rendering of the header for the preview pane.

### reorderable `Boolean` *(default: true)*

Toggles the reordering of cards in the TaskBoard.

### resources `Array`

The configuration of the TaskBoard resource(s). A TaskBoard resource is optional metadata that can be associated
with a TaskBoard event.

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.

### resources.dataValueField `String` *(default: "value")*

The field of the resource data item which represents the resource value. The resource value is used to link a TaskBoard event with a resource.

### resources.field `String`

The field of the TaskBoard event which contains the resource id.

### resources.multiple `Boolean` *(default: false)*

If set to `true` the TaskBoard event can be assigned multiple instances of the resource. The TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option will contain an array of resources.
By default only one resource instance can be assigned to an event.

### resources.name `String`

The name of the resource used to distinguish resource. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.

### resources.title `String`

The user friendly title of the resource displayed in the TaskBoard edit form. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.

### resources.valuePrimitive `Boolean` *(default: true)*

Set to `false` if the TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option contains a resource data item.
By default the TaskBoard expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via `dataValueField`).

### selectable `Boolean` *(default: true)*

Toggles the selection of the TaskBoard.

### template `String|Function` 

Controls the rendering of the card.

### toolbar `Boolean|Object` *(default: true)*

Configures the Tools of the TaskBoard

### toolbar.items `Array`

Configures the items collection of the toolbar.

### toolbar.items.type `String`
Specifies the type of the button.

### toolbar.items.overflow `String`
Specifies the overflow of the button.

### toolbar.items.click `Function`
Specifies the click handler of the button.

### toolbar.items.command `String`
Specifies the command of the button.

### toolbar.items.options `String`
Specifies the command options of the button.

### toolbar.items.name `String`
Specifies the name of the button.

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

### toolbar.items.text `String`
Sets the text of the button.

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

### toolbar.items.id `String`
Specifies the ID of the button.

### width `String|Number` *(default: "100%")*

Configures the width of the TaskBoard wrapper.

### messages `Object`

Provides configuration options for the messages present in the TaskBoard widget.

### messages.edit `String` *(default: "Edit")*

Specifies text to be rendered for the "Edit" message.

### messages.createNewCard `String` *(default: "Create new card")*

Specifies text to be rendered for the "Create new card" message.

### messages.create `String` *(default: "Create")*

Specifies text to be rendered for the "Create" message.

### messages.search `String` *(default: "Search")*

Specifies text to be rendered for the "Search" message.

### messages.previewCard `String` *(default: "Preview card")*

Specifies text to be rendered for the "Preview card" message.

### messages.addCard `String` *(default: "Add card")*

Specifies text to be rendered for the "Add card" message.

### messages.editCard `String` *(default: "Edit card")*

Specifies text to be rendered for the "Edit card" message.

### messages.deleteCard `String` *(default: "Delete Card")*

Specifies text to be rendered for the "Delete Card" message.

### messages.addColumn `String` *(default: "Add column")*

Specifies text to be rendered for the "Add column" message.

### messages.editColumn `String` *(default: "Edit column")*

Specifies text to be rendered for the "Edit column" message.

### messages.deleteColumn `String` *(default: "Delete column")*

Specifies text to be rendered for the "Delete column" message.

### messages.close `String` *(default: "Close")*

Specifies text to be rendered for the "Close" message.

### messages.cancel `String` *(default: "Cancel")*

Specifies text to be rendered for the "Cancel" message.

### messages.delete `String` *(default: "Delete")*

Specifies text to be rendered for the "Delete" message.

### messages.saveChanges `String` *(default: "Save changes")*

Specifies text to be rendered for the "Save changes" message.

### messages.title `String` *(default: "Title:")*

Specifies text to be rendered for the "Title:" message.

### messages.description `String` *(default: "Description:")*

Specifies text to be rendered for the "Description:" message.

### messages.newColumn `String` *(default: "New column")*

Specifies text to be rendered for the "New column" message.

### messages.deleteColumnConfirm `String` *(default: "Are you sure you want to delete this column?")*

Specifies text to be rendered for the "Are you sure you want to delete this column?" message.

### messages.deleteCardConfirm `String` *(default: "Are you sure you want to delete this card?")*

Specifies text to be rendered for the "Are you sure you want to delete this card?" message.

## Methods

### addCard 

Adds a card and opens edit pane with the data passed.

#### Parameters

##### data `Object`

Predefine data object for the card.


### addColumn

Adds a column and toggles edit mode.

#### Parameters

##### data `Object`

Predefine data object for the column.

### columns  

Returns all the column elements.

#### Returns

`jQuery`

### columnByStatus  

Returns the column element that is associated to the status.

#### Parameters

##### status `String`

The status of the column.

#### Returns

`jQuery`


### deleteCard 

Deletes a card by the uid passed as parameter.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to delete.


### deleteColumn 

Deletes a column by the uid passed as parameter.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to delete.


### editCard 

Edits a card by the uid passed as parameter.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to edit.


### editColumn

Edits a column by the uid passed as parameter.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to edit.


### enable

Toggles the disabled state of a specific card.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

### enableByColumn

Toggles the disabled state of all cards in the specified column.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If false the card will appear disabled.

### readOnly

Toggles the readonly state of a specific card.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

### readOnlyByColumn

Toggles the readonly state of all cards in the specified column.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If false the card will appear disabled.


### items  

Returns the card elements in the TaskBoard.

#### Returns

`jQuery`

### itemsByStatus  

Returns the card elements in the TaskBoard filtered by column status.

#### Parameters

##### status `String`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### itemsByColumn  

Returns the card elements in the TaskBoard filtered by column elemennt.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`jQuery`

### load 

Loads all DataSource instances (columns, dataSource and resources) configured in the correct order.

### previewCard  

Opens the preview pane for the card element.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

### registerShortcut  

Registers a new shortcut for the TaskBoard.

#### Parameters

##### selector `String`

The jQuery selector to match the element(s) on which the shortcut to be affected. 

##### shortcut `Object`

The shortcut definition.

##### options `Object`

The options of the shortcut execution

##### options.command `String`

The command to be executed

##### options.options `String`

Command-specific options

##### options.handler `Function`

A function callback.

### dataItem  

Returns the data item bound to the specific card element.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`kendo.data.ObservableObject`

### columnDataItem  

Returns the data item bound to the specific column element.

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`kendo.data.ObservableObject`

### saveCard 

Saves the edited card and closes editing.


### saveColumn

Saves the edited column and closes editing.


### select

Returns the selected card or selects a card.

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### setDataSource

Changes the DataSource of the TaskBoard

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the widget should be bound.


### setColumnsDataSource

Changes the DataSource of the TaskBoard's columns.

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the columns should be bound.



## Events

### columnsDataBinding 

Fired before the TaskBoard binds the columns' data source.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### columnsDataBound  

Fired when the TaskBoard's columns are bound to their data source.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### select  

args: `sender: kendo.ui.TaskBoard, card: jQuery` 

Fired when the user selects a card in the TaskBoard.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `jQuery`

The selected card element wrapped in jQuery object.

##### e.preventDefault `Function`

If invoked prevents the selection. 

### dataBinding 

Fired before the TaskBoard binds to its data source.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### dataBound  

Fired when the TaskBoard is bound to data from its data source.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### deleteCard

Fired when the user deletes a card.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion. 

### deleteColumn

Fired when the user deletes a column.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion. 

### editCard

Fired when the user edits or creates a card.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action. 

### editColumn

Fired when the user edits or creates a column.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

### execute

Fires when a command is executed.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.command `String`

The command name to be executed.

##### e.options `Object`

The options to be passed in the command. Possible fields included are card and column data items, card and column elements and string value passed to the command.  

##### e.preventDefault `Function`

If invoked prevents the command execution.

### move  

args: `sender: kendo.ui.TaskBoard, card: kendo.data.Model` 

Fired when the user moves a card.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.Sortable`

The Sortable widget instance which the item belongs to (useful in case there are connected Sortable widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveEnd

Fired when the user dropped a card in a column.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position of the item in the Sortable collection. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveStart

Fired when the user started moving a card.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

### change 

Fired when the user changed the card order or status by dragging.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position where the item was located at. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item is placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### saveCard  

Fired when the user saves a card.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action. 

### saveColumn

Fired when the user saves a column.

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action.




