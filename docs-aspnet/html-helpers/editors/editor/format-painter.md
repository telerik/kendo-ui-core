---
title: Format Painter
page_title: Editor Format Painter
description: "Learn about the format painter of the Telerik UI Editor component for {{ site.framework }}."
slug: htmlhelpers_editor_format_painter_aspnetcore
position: 11
---

# Format Painter

Use the `Format Painter` option of the Editor to quickly apply the same formatting such as color, border style, font style and size to multiple pieces of text. It allows you to copy all formatting from a text fragment to another one - like copy and paste but for formatting. 

1. Ensure that the `FormatPainter` option is added to the Editor's toolbox. 

    ```HtmlHelper
        @(Html.Kendo().Editor()
            .Name("editor")
            .Tools(tools => tools
                .Clear()
                .FormatPainter()
                .CleanFormatting()
            )
        )
    ```
1. Focus or select the text that you want to copy the formatting from.
1. Click on the `Copy Format` tool in the widget's toolbar.
1. Select the text fragment that you want to apply the style to.
1. Click on the `Apply Format` tool in the widget's toolbar.
1. The format can be applied multiple times or canceled by clicking on the `Clean Formatting` tool.

## See Also

* [Format Painter in the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/format-painter)
* [Server-Side API](/api/editor)
