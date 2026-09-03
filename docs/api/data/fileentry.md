---
title: FileEntry
page_title: API Reference for Kendo Data FileEntry
description: Documentation how to get started with the kendo.data.FileEntry, the extended type of kendo.data.Node. Find examples and guidelines for methods, fields and events of kendo.data.FileEntry.
res_type: api
---

# kendo.data.FileEntry

The `FileEntry` is an extended type of a [`Node`](/api/framework/node) that works with hierarchical data. The [FileManagerDataSource](/api/javascript/data/filemanagerdatasource) contains instances of the `FileEntry` type.

## Fields

See the [`Node` fields](/api/framework/node#fields) for all inherited fields.

### children

The child `kendo.data.FileManagerDataSource` of the node. This field is initialized lazily if the `hasChildren` or `isDirectory` field is set or when the [`load`](/api/javascript/data/node/methods/load) or [`append`](/api/javascript/data/node/methods/append) methods were called.


<div class="meta-api-description">
How do I access child nodes in Kendo UI file manager? Access, retrieve, or configure the child nodes, subfolders, or nested files within a file management system by interacting with the hierarchical data source representing directory contents; manage and traverse folder structures dynamically, enable lazy loading and on-demand expansion of nested directories, bind or link to child data collections, control loading or appending of subitems, and explore or manipulate file tree branches programmatically for scenarios involving recursive navigation, folder expansion, or fetching child entries in a directory hierarchy.
</div>

#### Example

    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: {
            data: [
                {
                    name: "Documents",
                    isDirectory: true,
                    hasDirectories: true,
                    size: 0
                }
            ]
        }
    });

    // Access the FileEntry for a directory
    var fileManager = $("#filemanager").data("kendoFileManager");
    var dataSource = fileManager.dataSource;
    var rootEntry = dataSource.at(0);
    
    // Access the children property
    console.log("Has children:", rootEntry.hasChildren);
    console.log("Children DataSource:", rootEntry.children);
    </script>

## Methods

See the [`Node` events](/api/framework/node#methods) for all inherited methods.

## Events

See the [`Node` events](/api/framework/node#events) for all inherited events.
