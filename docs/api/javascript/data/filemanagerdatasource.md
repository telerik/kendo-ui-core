---
title: FileManagerDataSource
page_title: API Reference for Kendo UI FileManager DataSource
description: Learn more about the configuration of Kendo UI DataSource, methods and events.
res_type: api
component: filemanager-data-source
---

# kendo.data.FileManagerDataSource

## Configuration

See the [HierarchicalDataSource configuration](/api/framework/hierarchicaldatasource#configuration) for all inherited configuration.

### schema `Object`

The schema configuration. See the [`DataSource.schema` configuration](/api/framework/datasource#configuration-schema) for all available options.


<div class="meta-api-description">
How do I configure the schema for Kendo UI FileManager to correctly identify file metadata? Define and customize the structure and format of data records for file management by specifying field names, data types, unique identifiers, and nested or hierarchical relationships, enabling the parsing, mapping, and transformation of server or local datasets into the file manager’s internal model; configure data schemas to control how incoming files and metadata are interpreted, shaped, and organized for efficient access, manipulation, and display within file management components.
</div>

#### Example

    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: new kendo.data.FileManagerDataSource({
            schema: {
                model: {
                    id: "name",
                    fields: {
                        name: { type: "string" },
                        size: { type: "number" },
                        path: { type: "string" },
                        extension: { type: "string" },
                        isDirectory: { type: "boolean" }
                    }
                }
            },
            data: [
                { name: "Folder 1", size: null, path: "Folder 1", extension: "", isDirectory: true },
                { name: "File 1.txt", size: 1024, path: "File 1.txt", extension: ".txt", isDirectory: false }
            ]
        })
    });
    </script>

### schema.model `Object|kendo.data.FileEntry`

The data item (model) configuration. See the [`DataSource.schema.model` configuration](/api/framework/datasource#configuration-schema.model) for all available options.

> The model must inherit from [`kendo.data.FileEntry`](/api/javascript/data/fileentry).


<div class="meta-api-description">
How do I customize the data structure of file entries in Kendo UI FileManager's data source? Define and customize the data structure, fields, identifiers, parsing rules, validation, and data model behavior for file entries managed and displayed by the file management system, enabling control over how files are represented, processed, and manipulated during data binding, create, read, update, and delete operations, including setting up field mappings, validation logic, and inheritance from specific file entry schemas to ensure consistent handling and interaction with file items in the data source.
</div>

#### Example

    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: new kendo.data.FileManagerDataSource({
            schema: {
                model: kendo.data.FileEntry.extend({
                    id: "name",
                    fields: {
                        name: { type: "string" },
                        size: { type: "number" },
                        path: { type: "string" },
                        extension: { type: "string" },
                        isDirectory: { type: "boolean" },
                        dateCreated: { type: "date" },
                        dateModified: { type: "date" }
                    }
                })
            },
            data: [
                { name: "Documents", size: null, path: "Documents", extension: "", isDirectory: true, dateCreated: new Date(2023, 0, 1), dateModified: new Date(2023, 5, 15) },
                { name: "report.pdf", size: 2048576, path: "Documents/report.pdf", extension: ".pdf", isDirectory: false, dateCreated: new Date(2023, 2, 10), dateModified: new Date(2023, 3, 5) }
            ]
        })
    });
    </script>

### schema.model.isDirectory `Boolean|String|Function` *(default: false)*

Specifies whether the model is directory


<div class="meta-api-description">
How to determine if an item in the FileManager is a folder using its schema model? Identify and distinguish folders from files within a file management system by configuring a boolean indicator that marks items as directories or not, enabling developers to customize rendering with folder icons, implement folder-specific behaviors like opening, navigating, uploading content, filtering file lists to separate folders from files, controlling how file trees display hierarchical structures, and managing user interactions based on item type through model configuration during setup for effective file system manipulation and UI presentation.
</div>

#### Example

    <div id="filemanager"></div>
    <script>
    $("#filemanager").kendoFileManager({
        dataSource: new kendo.data.FileManagerDataSource({
            schema: {
                model: {
                    id: "name",
                    fields: {
                        name: { type: "string" },
                        size: { type: "number" },
                        path: { type: "string" },
                        extension: { type: "string" },
                        isDirectory: { type: "boolean" }
                    }
                }
            },
            data: [
                { name: "Images", size: null, path: "Images", extension: "", isDirectory: true },
                { name: "Videos", size: null, path: "Videos", extension: "", isDirectory: true },
                { name: "photo.jpg", size: 524288, path: "Images/photo.jpg", extension: ".jpg", isDirectory: false },
                { name: "video.mp4", size: 10485760, path: "Videos/video.mp4", extension: ".mp4", isDirectory: false }
            ]
        })
    });
    </script>

## Methods

See the [HierarchicalDataSource](/api/framework/hierarchicaldatasource#methods) for all inherited methods.

## Events

See the [HierarchicalDataSource](/api/framework/hierarchicaldatasource#events) for all inherited events.
