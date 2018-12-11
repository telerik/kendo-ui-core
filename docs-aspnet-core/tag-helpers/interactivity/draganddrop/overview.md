---
title: Overview
page_title: Drag-and-Drop  | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Drag-and-Drop tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dragdrop, /aspnet-core/helpers/tag-helpers/dragdrop
slug: taghelpers_dragdrop_aspnetcore
position: 1
---

# Drag-and-Drop Tag Helper Overview

The Drag-and-Drop tag helper helps you configure the Kendo UI Drag and Drop widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Drag and Drop by using the Drag and Drop tag helper.

###### Example

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
