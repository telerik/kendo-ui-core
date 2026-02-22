---
title: Overview
page_title: Data Binding Overview
description: "Learn about the different types of data binding when working with the Telerik UI FileManager component for {{ site.framework }}."
components: ["filemanager"]
slug: htmlhelpers_filemanager_aspnetcore_binding_overview
position: 0
---

# Data Binding Overview

Under the hood, the FileManager formats the responses as `FileManagerEntry` abstractions, which are a transmutation of the `FileManagerDataSource` schema.

To ensure that the FileManager component processes the files successfully, each of the binding methods that you use must format the responses by using the `FileManagerEntry` abstraction.

```C# FileManagerEntry
    public class FileManagerEntry
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public string Path { get; set; }
        public string Extension { get; set; }
        public bool IsDirectory { get; set; }
        public bool HasDirectories { get; set; }

        public DateTime Created { get; set; }
        public DateTime CreatedUtc { get; set; }
        public DateTime Modified { get; set; }
        public DateTime ModifiedUtc { get; set; }
    }
```
```JS FileManagerDataSourceSchema
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

For more information and examples about the data-binding scenarios, see the following articles:

{% if site.core %}
* [Binding the FileManager in a Razor Pages Scenario]({% slug htmlhelpers_filemanager_razorpage_aspnetcore %})
{% endif %}
* [Binding the FileManager to Remote Data]({% slug htmlhelpers_filemanager_aspnetcore_remotebinding %})

## See Also
{% if site.core %}
* [FileManager in Razor Pages]({% slug htmlhelpers_filemanager_razorpage_aspnetcore %})
{% endif %}
* [Overview of {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Navigation in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_navigation %})
* [Preview Panes in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_previewpane %})
​​
