---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Editor component for {{ site.framework }}."
previous_url: /helpers/html-helpers/editor, /helpers/editors/editor/overview
slug: htmlhelpers_editor_aspnetcore
position: 1
---

# Editor Overview

{% if site.core %}
The Telerik UI Editor TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Editor widget.
{% else %}
The Telerik UI Editor HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Editor widget.
{% endif %}

The Editor allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and generate widget value as an XHTML markup.

* [Demo page for the Editor HtmlHelper](https://demos.telerik.com/{{ site.platform }}/editor/index)
{% if site.core %}
* [Demo page for the Editor TagHelper](https://demos.telerik.com/aspnet-core/editor/index)
{% endif %}

## Initializing the Editor

The following example demonstrates how to define the Editor.

```HtmlHelper
@(Html.Kendo().Editor()
    .Name("editor")
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
        </p>
    </text>)
)
```
{% if site.core %}
```TagHelper
    <kendo-editor name="editor">
    </kendo-editor>
```
{% endif %}

## Basic Configuration

{% if site.core %}
```HtmlHelper
		@(Html.Kendo().Editor()
				.Name("editor")
				.Tools(tools => tools
						.Clear()
						.Bold()
						.Italic()
						.Underline()
						.FontName()
				)
		)
```
```TagHelper
		<kendo-editor name="editor">
			<tools>
                <tool name="bold" />
                <tool name="italic" />
                <tool name="underline" />
                <tool name="fontName" />
			</tools>
		</kendo-editor>
```


You can adjust and set up the tools in the tools collection through the `tools` attribute.

```HtmlHelper
	@(Html.Kendo().Editor()
			.Name("editor")
			.Tools(tools => {
					tools.Clear();
					tools.FontName(items => items
							.Add("Default site font", "Arial, Verdana, sans - serif")
							.Add("Monospaced", "monospace")
					);
			})
	)
```
```TagHelper
	<kendo-editor name="editor">
		<tools>
			<tool name="fontName">
				<tool-items>
					<tool-item text="Default site font" value="Arial,Verdana,sans-serif" />
					<tool-item text="Monospaced font" value="monospace" />
				</tool-items>
			</tool>
		</tools>
	</kendo-editor>
```

{% else %}
The following example demonstrates the basic configuration of the Editor.

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .Encoded(true)
        .HtmlAttributes(new { style = "width: 100%;height:440px" })
        .Value(@<text>
            <p>
                Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
            </p>
        </text>)
    )

    <script type="text/javascript">
        $(function() {
            // The Name() of the Editor is used to get its client-side instance.
            var editor = $("#editor").data("kendoEditor");
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Modes of operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serializing and deserializing content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [CRUD operations]({% slug htmlhelpers_crud_editor_aspnetcore %})
* [Styling the content]({% slug htmlhelpers_editor_styling_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_editor %})

## Events

The following example demonstrates Editor events, which could be handled on the client-side. For a complete example on basic Editor events, refer to the [demo on using the events of the Editor](https://demos.telerik.com/{{ site.platform }}/editor/events).

```HtmlHelper
    @(Html.Kendo().Editor()
        .Name("editor")
        .Events(e => e
            .Change("onChange")
            .Execute("onExecute")
            .Keydown("onKeydown")
            .Keyup("onKeyup")
            .Paste("onPaste")
            .PdfExport("onPdfExport")
            .Select("onSelect")
        )
    )

    <script>
        function onChange(e) {
            kendoConsole.log("value change");
        }

        function onExecute(e) {
            kendoConsole.log("command :: " + e.name);
        }

        function onKeydown(e) {
            kendoConsole.log("key down");
        }

        function onKeyup(e) {
            kendoConsole.log("key up");
        }

        function onPaste(e) {
            kendoConsole.log("paste :: " + kendo.htmlEncode(e.html));
        }

        function onPdfExport(e) {
            kendoConsole.log("PDF export");
        }

        function onSelect(e) {
            kendoConsole.log("selection  change");
        }
    </script>
```

## See Also

* [Basic Usage of the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor)
{% if site.core %}
* [Basic Usage of the Editor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/editor/tag-helper)
{% endif %}
* [Using the API of the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/api)
* [Server-Side API](/api/editor)
