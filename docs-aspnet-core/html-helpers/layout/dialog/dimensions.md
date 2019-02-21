---
title: Dimensions
page_title: Dialog Dimensions | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the Dimensions configuration of the Kendo UI Dialog HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: dimensions_dialoghelper_aspnetcore
position: 4
---

# Dimensions

By default, the Dialog does not have any preset dimensions and its size depends on its content.

If the Dialog contains horizontally expandable block-level elements&mdash;including Kendo UI widgets such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Dialog is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Dialog and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

## See Also

* [Overview of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug overview_dialoghelper_aspnetcore %})
* [Structure and Placement of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug structure_and_placement_dialoghelper_aspnetcore %})
* [Action Buttons of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug action_buttons_dialoghelper_aspnetcore %})
