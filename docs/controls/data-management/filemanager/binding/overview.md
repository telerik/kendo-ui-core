---
title: Overview
page_title: jQuery FileManager Documentation | DataBinding Overview in FileManager
description: "Get familiar with the DataBinding techniques in the FileManager and how you can define your preferable databinding approach."
slug: bindingoverview_kendoui_filemanager_widget
position: 0
---

# DataBiding Overview

The FileManager provides different data-binding options.

* [Local data binding]({% slug localdata_kendoui_filemanager_widget %})
* [Remote data binding]({% slug remotedata_kendoui_filemanager_widget %})

The Component uses an extended [HierarchicalDataSource]({% slug overview_hierarchical_datasourcecomponent %}) - FileManagerDataSource and an extended [Node](/api/javascript/ui/filemanager) - FileEntry. 

The FileManager uses the following built-in `filemanager` schema:

```js
model: {
    id: "path",
    hasChildren: "hasDirectories",
    fields: {
        name: {editable: true, type: "String", defaultValue: "New Folder" },
        size: {editable: false, type: "Number"},
        path: {editable: false, type: "String"},
        extension: {editable: false, type: "String"},
        isDirectory: {editable: false, defaultValue: true, type: "Boolean"},
        hasDirectories: {editable: false, defaultValue: false, type: "Boolean"},
        created: { from: "created", type: "Date", editable: false},
        createdUtc: { from: "createdUtc", type: "Date", editable: false },
        modified: { from: "modified", type: "Date", editable: false},
        modifiedUtc: { from: "modifiedUtc", type: "Date", editable: false }
    }
}

```

* [Overview of Kendo UI FileManager]({% slug overview_kendoui_filemanager_widget %})
* [Search in Kendo UI FileManager]({% slug search_kendoui_filemanager_widget %})
* [Toolbar Commands in Kendo UI FileManager]({% slug toolbar_kendoui_filemanager_widget %})
