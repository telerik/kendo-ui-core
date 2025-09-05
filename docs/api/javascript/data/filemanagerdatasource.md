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
