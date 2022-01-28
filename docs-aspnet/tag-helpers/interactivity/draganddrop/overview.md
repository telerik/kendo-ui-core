---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Drag-and-Drop tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/dragdrop, /helpers/tag-helpers/dragdrop
slug: taghelpers_dragdrop_aspnetcore
position: 1
---

# DragAndDrop TagHelper Overview

The Telerik UI DragAndDrop TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DragAndDrop widget.

The `kendoDraggable` and the `kendoDropTarget` combine together to enable the implementation of the drag-and-drop scenarios.

## Initializing the Drag-and-Drop

The following example demonstrates how to define the Drag and Drop by using the DragAndDrop TagHelper.

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

* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/draganddrop)
