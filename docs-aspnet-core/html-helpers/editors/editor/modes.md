---
title: Modes
page_title: Editor Modes | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn which are the modes in which the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) operates."
slug: htmlhelpers_editor_modes_aspnetcore
position: 2
---

# Editor Modes

Depending on the element from which the Editor is created, it assumes 2 mode types:
* The [classic mode type](#classic-mode).
* The [inline mode type](#inline-mode).

## Classic Mode

If you use the default element for the Editor initialization (a `<textarea>` element), it assumes its classic mode. The `textarea` is not visible and is used to hold the value of the widget. You can type in the `contenteditable iframe` that is created.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

The classic Editor posts its value automatically because it is based on a `form` element. The tools of the Editor are always visible. Its content does not reside on the main web page and the styling of the page does not influence the editable content. To apply custom styles to the editable content, [inject them through the configuration of the Editor]({% slug htmlhelpers_editor_styling_aspnetcore %}).

[Demo of the Classic Mode Editor](https://demos.telerik.com/aspnet-core/editor/index)

## Inline Mode

If you use the `Tag()` method of the Editor HTML helper with parameter `"div"`, it assumes its inline mode. The `<div>` element is made content-editable and is used by the widget to return its value.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Tag("div")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

With the above, the tools of the Editor are only visible when the widget is focused. Its content resides on the main web page and the styling of the page influences the editable content.

> **Important**
>
> While it is possible to initialize an inline Editor from a non-`div` element, such as `p` or `h1`, it is strongly recommended that you use the `<div>` one. Do not use `<table>` elements for creating inline Editors because of Internet Explorer browser limitations.

Editor widgets instantiated from a contentEditable element will not post their value to the server when submitted within a form. If you need to submit these, see [the how to post the inline editor value help section](https://docs.telerik.com/kendo-ui/controls/editors/editor/troubleshoot/troubleshooting#inline-editor-value-is-not-posted-to-the-server#inline-value-is-not-posted-to-server).

[Demo of the Inline Mode Editor](https://demos.telerik.com/aspnet-core/editor/inline-editing)

> **Important**
>
> Because of the limited `iframe` support provided by the iOS Safari browser, it is recommended to use the inline Editor mode on iOS devices.

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [Styling Content]({% slug htmlhelpers_editor_styling_aspnetcore %})
