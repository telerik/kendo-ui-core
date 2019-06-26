---
title: Overview
page_title: Drag-and-Drop Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Drag-and-Drop tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dragdrop, /aspnet-core/helpers/tag-helpers/dragdrop
slug: taghelpers_dragdrop_aspnetcore
position: 1
---

# Drag-and-Drop Tag Helper Overview

The `kendoDraggable` and the `kendoDropTarget` combine together to enable the implementation of the drag-and-drop scenarios.

The Drag-and-Drop tag helper extension is a server-side wrapper for the [Kendo UI Drag-and-Drop](https://demos.telerik.com/kendo-ui/sortable/index) widget and enables you to configure the Kendo UI Drag and Drop widget in ASP.NET Core applications.

## Initializing the Drag-and-Drop

The following example demonstrates how to define the Drag and Drop by using the Drag and Drop tag helper.

      <div id="droptarget" class="k-header"
           kendo-droptarget="true"
           on-kendo-dragenter="droptargetOnDragEnter"
           on-kendo-dragleave="droptargetOnDragLeave"
           on-kendo-drop="droptargetOnDrop" >Drag the small circle here.</div>
      <div id="draggable"
           kendo-draggable="true"
           kendo-hint="draggableHint"
           on-kendo-dragstart="draggableOnDragStart"
           on-kendo-dragend="draggableOnDragEnd"></div>

## See Also

* [JavaScript API Reference of the Drag-and-Drop](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/draganddrop)
