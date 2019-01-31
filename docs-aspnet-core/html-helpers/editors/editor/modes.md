---
title: Modes
page_title: Editor Modes | Kendo UI Editor HtmlHelper for ASP.NET Core
description: "Learn which are the modes in which the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC) operates."
slug: htmlhelpers_editor_modes_aspnetcore
position: 2
---

# Editor Modes

Depending on the element from which the Editor is initiated, it provides two types of operation modes&mdash;the [classic](#classic-mode) and the [inline](#inline-mode) mode.   

## Classic Mode

If you use the default element for initializing the Editor (the `<textarea>` element), the Editor assumes its classic mode. The `textarea` is not visible and is used to hold the value of the widget. You can type in the `contenteditable iframe` that is created.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

The classic Editor posts its value automatically because it is based on a `form` element. The tools of the Editor are always visible. Its content does not reside on the main web page and the styling of the page does not influence the editable content. To apply custom styles to the editable content, [inject them through the configuration of the Editor]({% slug htmlhelpers_editor_styling_aspnetcore %}). For more information, refer to the [demo on the classic Editor mode](https://demos.telerik.com/aspnet-core/editor/index).

## Inline Mode

If you use the `Tag()` method of the Editor HTML helper with a `"div"` parameter, the Editor assumes its inline mode. The `<div>` element is content-editable and is used by the widget to return its value.

###### Example

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Tag("div")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

With the previous configuration, the tools of the Editor are only visible when the widget is focused. Its content resides on the main web page and the styling of the page influences the editable content.

> **Important**
>
> While it is possible to initialize an inline Editor from a non-`div` element, such as `p` or `h1`, it is strongly recommended that you use the `<div>` one. Do not use `<table>` elements for creating inline Editors because of Internet Explorer browser limitations.

Editors that are instantiated from a `contentEditable` element will not post their value to the server when the value was submitted within a form. For more information on submitting Editor values, refer to the article about [posting the value of an inline Editor value](https://docs.telerik.com/kendo-ui/controls/editors/editor/troubleshoot/troubleshooting#inline-editor-value-is-not-posted-to-the-server#inline-value-is-not-posted-to-server). For more information, refer to the [demo on the inline Editor mode](https://demos.telerik.com/aspnet-core/editor/inline-editing).

> **Important**
>
> Because of the limited `iframe` support by the iOS Safari browser, it is recommended to use the inline Editor mode on iOS devices.

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [Styling Content]({% slug htmlhelpers_editor_styling_aspnetcore %})
