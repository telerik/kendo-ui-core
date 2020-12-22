---
title: Column Menu Component Types
page_title: Telerik UI Grid Documentation | Grid Column Menu Component Types | Telerik UI
description: "Get started with the Telerik UI Grid and learn how to enable the modern component type of the column menu."
slug: htmlhelpers_grid_aspnetcore_componenttype
position: 2
---

# Component Types

As of R1 2021 version of the Telerik UI for {{ site.framework }} suite, the Grid widget introduces a new component type for its column menu. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the column menu of the Grid is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```
    @(Html.Kendo().Grid()
            .Name("datePicker")
            .ColumnMenu(m=>{
               m.ComponentType("modern"); 
            })
    )
```

## See Also

* [Server-Side API](/api/datepicker)
