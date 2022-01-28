---
title: Modes of Operation
page_title: Modes of Operation
description: "Learn which are the modes in which the Telerik UI Editor HtmlHelper for {{ site.framework }} (MVC 6 or {{ site.framework }} MVC) operates."
slug: htmlhelpers_editor_modes_aspnetcore
position: 2
---

# Modes of Operation

Depending on the element from which the Editor is initiated, it provides two types of operation modes&mdash;the [classic](#classic-mode) and the [inline](#inline-mode) mode.   

## Classic Mode

If you use the default `<textarea>` element for initializing the Editor, the Editor assumes its classic mode. The `textarea` is not visible and is used to hold the value of the widget. You can type in the `contenteditable iframe` that is created.

The classic Editor posts its value automatically because it is based on a `form` element. The tools of the Editor are always visible. Its content does not reside on the main web page and the styling of the page does not influence the editable content. To apply custom styles to the editable content, [inject them through the configuration of the Editor]({% slug htmlhelpers_editor_styling_aspnetcore %}). For more information, refer to the [demo on the classic Editor mode](https://demos.telerik.com/{{ site.platform }}/editor/index).

```
@(Html.Kendo().Editor()
    .Name("editor")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

## Inline Mode

If you use the `Tag()` method of the Editor HTML helper with a `"div"` parameter, the Editor assumes its inline mode. The `<div>` element is content-editable and is used by the widget to return its value. For a runnable example, refer to the [demo on inline editing by the Editor](https://demos.telerik.com/{{ site.platform }}/editor/inline-editing).

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Tag("div")
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
)
```

With the previous configuration, the tools of the Editor are only visible when the widget is focused. Its content resides on the main web page and the styling of the page influences the editable content.

> While it is possible to initialize an inline Editor from a non-`div` element, such as `p` or `h1`, it is strongly recommended that you use the `<div>` one. Do not use `<table>` elements for creating inline Editors because of Internet Explorer browser limitations.

Editors that are instantiated from a `contentEditable` element will not post their value to the server when the value was submitted within a form. For more information, refer to the [demo on the inline Editor mode](https://demos.telerik.com/{{ site.platform }}/editor/inline-editing).

> Because of the limited `iframe` support by the iOS Safari browser, it is recommended to use the inline Editor mode on iOS devices.

## See Also

* [Inline Mode by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/inline-editing)
* [Server-Side API](/api/editor)
