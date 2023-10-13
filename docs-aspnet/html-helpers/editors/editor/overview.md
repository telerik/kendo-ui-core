---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Editor component for {{ site.framework }}."
previous_url: /helpers/html-helpers/editor, /helpers/editors/editor/overview
slug: htmlhelpers_editor_aspnetcore
position: 0
---

# {{ site.framework }} Editor Overview

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

The example below illustrates how to bind the Editor to a Model property that is passed to the View.

```HtmlHelper
    @model ProductViewModel

    @(Html.Kendo().EditorFor(m => m.ProductName)
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
    @model ProductViewModel
    <kendo-editor for="@Model.ProductName">
        <tools>
            <tool name="bold" />
            <tool name="italic" />
            <tool name="underline" />
            <tool name="fontName" />
        </tools>
    </kendo-editor>
```
```Controller

    public IActionResult Index()
    {
        ProductViewModel product = new ProductViewModel() { ProductName = "Name 1" };
        return View(product);
    }

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

|Feature|Description|
|-------|-----------|
| [Modes of operation]({% slug htmlhelpers_editor_modes_aspnetcore %})| The Editor supports two operation modes: classic and inline.|
| [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})| The Editor allows you to enable a large set of built-in text editing tools. You can also add your custom tools. |
| [Pasting content]({% slug htmlhelpers_editor_pasting_aspnetcore %})| The users can paste content from HTML and Microsoft Word documents into the Editor.|
| [Serializing and deserializing content]({% slug htmlhelpers_editor_serialize_aspnetcore %})| You can configure custom definitions for serializing and deserializing of the Editor's content.|
| [Image browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})| The Editor allows the user to insert an image by browsing a list of predefined files and directories.|
| [Immutable elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})| By using the immutable feature, the Editor allows you to add HTML elements that cannot be edited by the user.|
| [CRUD operations]({% slug htmlhelpers_crud_editor_aspnetcore %})| The Editor docs and demos demonstrate how to save, read, update, and delete text content in a database.|
| [Styling the content]({% slug htmlhelpers_editor_styling_aspnetcore %})| You can choose between the default styling options for the Editor's content or add your custom styles.|
| [Accessibility]({% slug accessibility_aspnetcore_editor %})| The Editor is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.|

## Next Steps

* [Getting Started with the Editor]({% slug aspnetcore_editor_getting_started %})
* [Basic Usage of the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/index)
{% if site.core %}
* [Basic Usage of the Editor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/editor/tag-helper)
{% endif %}

## See Also

* [Using the API of the Editor for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/api)
* [Knowledge Base Section](/knowledge-base)
