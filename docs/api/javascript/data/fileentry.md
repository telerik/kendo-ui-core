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

## Methods

See the [`Node` events](/api/framework/node#methods) for all inherited methods.

## Events

See the [`Node` events](/api/framework/node#events) for all inherited events.
