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

### schema.model `Object|kendo.data.FileEntry`

The data item (model) configuration. See the [`DataSource.schema.model` configuration](/api/framework/datasource#configuration-schema.model) for all available options.

> The model must inherit from [`kendo.data.FileEntry`](/api/javascript/data/fileentry).

### schema.model.isDirectory `Boolean|String|Function` *(default: false)*

Specifies whether the model is directory

## Methods

See the [HierarchicalDataSource](/api/framework/hierarchicaldatasource#methods) for all inherited methods.

## Events

See the [HierarchicalDataSource](/api/framework/hierarchicaldatasource#events) for all inherited events.
