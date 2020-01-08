---
title: FileManager
page_title: Configuration, methods and events of Kendo UI FileManager
description: How to initialize an FileManager UI widget, configure its properties.
res_type: api
component: filemanager
---

# kendo.ui.FileManager

Represents the Kendo UI FileManager. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### width `Number | String`

### height `Number | String`

### initialView `String`

### resizable `Boolean`

### draggable `Boolean` *(default: true)*

### dataSource `Object | Array | kendo.data.FileManagerDataSource`

### upload `Object`

### uploadUrl `String`

### toolbar `Boolean | Object` *(default: true)*

### toolbar.items `Array`

### toolbar.items.type `String`

### toolbar.items.overflow `String`

### toolbar.items.command `String`

### toolbar.items.options `String`

### toolbar.items.name `String`

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

### dialogs `Object`

### dialogs.upload `Object`

### dialogs.moveConfirm `Object`

### dialogs.deleteConfirm `Object`

### dialogs.renamePrompt `Object`

### contextMenu `Object|Boolean` *(default: true)*

### contextMenu.items `Array`

### contextMenu.items.name `String`

### contextMenu.items.text `String`

### contextMenu.items.spriteCssClass `String`

### contextMenu.items.command `String`

### views `Object`

### views.grid `Object`

### views.list `Object`

### views.tree `Object`

### previewPane `Object`

### previewPane.metaFields `Array`

### previewPane.noFileTemplate `String|Function`

### previewPane.singleFileTemplate `String|Function`

### previewPane.multipleFilesTemplate `String|Function`

### breadcrumb `Object|Boolean` *(default: true)*

### breadcrumb.rootIcon `String`

### breadcrumb.delimiterIcon `String`

### messages `Object`

### messages.toolbar `Object`

### messages.toolbar.createFolder `String`

### messages.toolbar.uploadDialog `String`

### messages.toolbar.sortDirection `String`

### messages.toolbar.sortDirectionAsc `String`

### messages.toolbar.sortDirectionDesc `String`

### messages.toolbar.sortField `String`

### messages.toolbar.nameField `String`

### messages.toolbar.sizeField `String`

### messages.toolbar.typeField `String`

### messages.toolbar.dateModifiedField `String`

### messages.toolbar.dateCreatedField `String`

### messages.toolbar.search `String`

### messages.toolbar.details `String`

### messages.toolbar.detailsChecked `String`

### messages.toolbar.detailsUnchecked `String`

### messages.toolbar.delete `String`

### messages.toolbar.rename `String`
        
### messages.views  `Object`

### messages.views.nameField `String`

### messages.views.sizeField `String`

### messages.views.typeField `String`

### messages.views.dateModifiedField `String`

### messages.views.dateCreatedField `String`

### messages.views.items `String`

### messages.dialogs `Object`

### messages.dialogs.upload `Object`

### messages.dialogs.upload.title `String`

### messages.dialogs.upload.clear `String`

### messages.dialogs.upload.done `String` 

### messages.dialogs.moveConfirm `Object`

### messages.dialogs.moveConfirm.title `String`

### messages.dialogs.moveConfirm.content `String`

### messages.dialogs.moveConfirm.okText `String`

### messages.dialogs.moveConfirm.cancel `String`

### messages.dialogs.moveConfirm.close `String`

### messages.dialogs.deleteConfirm `Object`

### messages.dialogs.deleteConfirm.title `String`

### messages.dialogs.deleteConfirm.content `String`

### messages.dialogs.deleteConfirm.okText `String`

### messages.dialogs.deleteConfirm.cancel `String`

### messages.dialogs.deleteConfirm.close `String`

### messages.dialogs.renamePrompt `Object`

### messages.dialogs.renamePrompt.title `String`

### messages.dialogs.renamePrompt.content `String`

### messages.dialogs.renamePrompt.okText `String`

### messages.dialogs.renamePrompt.cancel `String`

### messages.dialogs.renamePrompt.close `String`

### messages.previewPane `Object`

### messages.previewPane.noFileSelected `String`

### messages.previewPane.extension `String`

### messages.previewPane.size `String`

### messages.previewPane.created `String`

### messages.previewPane.modified `String`

### messages.previewPane.items `String`
        
    

## Methods

### path

### view

### navigate

### refresh

### executeCommand

### getSelected

### getSize

### destroy

## Events

### navigate

### select

### open

### execute

### error

### dataBinding

### dataBound

### drop

