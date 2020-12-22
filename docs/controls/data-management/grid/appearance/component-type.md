---
title: Column Menu Component Types
page_title: jQuery Grid Documentation | Grid Column Menu Component Types
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable the modern component type of the column menu."
slug: componenttypes_grid
position: 2
---

# Component Types

As of R1 2021 version of the Kendo UI suite, the Grid widget introduces a new component type for its column menu. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the Grid's column menu is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```
    $("#grid").kendoGrid({
        columnMenu:{
            componentType:"modern"
        }
    });
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)