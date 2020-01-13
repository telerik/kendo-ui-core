---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Editor TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_editor_aspnetcore
previous_url: /helpers/tag-helpers/editor
position: 1
---

# Editor TagHelper Overview

The Telerik UI Editor TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Editor widget.

The Editor allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and generate widget value as an XHTML markup.

* [Demo page for the Editor](https://demos.telerik.com/aspnet-core/editor/index)

## Initializing the Editor

The following example demonstrates how to define the Editor by using the Editor TagHelper.

		<kendo-editor name="editor">
		</kendo-editor>

## Basic Configuration

The tools collection of the Editor TagHelper is passed through the nest `<tools>` tag.

```tagHelper
		<kendo-editor name="editor">
			<tools>
        <tool name="bold" />
        <tool name="italic" />
				<tool name="underline" />
        <tool name="fontName" />
			</tools>
		</kendo-editor>
```
```cshtml
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

You can adjust and set up the tools in the tools collection through the `<tools>` tag. To define their items collection, use the `<tool-items>` and `<tool-item>` tags.

```tagHelper
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
```cshtml
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

To specify a chunk of content in the Editor TagHelper, use the `<content>` tag or the `value` attribute.

```tagHelper
	<kendo-editor name="editor">
			<content>
					<p>Some content.</p>
			</content>
	</kendo-editor>
```
```cshtml
	@(Html.Kendo().Editor()
			.Name("editor")
			.Value(@<text>
				<p>Some content.</p>
			</text>)
	)
```

The `ImageBrowser` and `FileBrowser` dialogs are configured through the `<image-browser>` and `<file-browser>` tags.

```tagHelper
	<kendo-editor name="editor">
    <image-browser file-types="*.png,*.gif,*.jpg,*.jpeg">
        <transport upload-url="/ImageBrowser/Upload" image-url="/shared/UserFiles/Images/{0}">
            <create url="/ImageBrowser/Create"/>
            <read url="/ImageBrowser/Read" />
            <destroy url="/ImageBrowser/Destroy" />
        </transport>
    </image-browser>
    <file-browser>
        <transport upload-url="/FileBrowser/Upload" file-url="/shared/UserFiles/Images/{0}">
            <create url="/FileBrowser/Create" />
            <read url="/FileBrowser/Read" />
            <destroy url="/FileBrowser/Destroy" />
        </transport>
    </file-browser>
	</kendo-editor>
```
```cshtml
	@(Html.Kendo().Editor()
		.Name("editor")
		.ImageBrowser(imageBrowser => imageBrowser
				.Image("~/shared/UserFiles/Images/{0}")
				.Read("Read", "ImageBrowser")
				.Create("Create", "ImageBrowser")
				.Destroy("Destroy", "ImageBrowser")
				.Upload("Upload", "ImageBrowser")
		)
		.FileBrowser(fileBrowser => fileBrowser
				.File("~/shared/UserFiles/Images/{0}")
				.Read("Read", "FileBrowser")
				.Create("Create", "FileBrowser")
				.Destroy("Destroy", "FileBrowser")
				.Upload("Upload", "FileBrowser")
		)
	)
```

The `serialization`, `deserialization` and `paste-cleanup` settings are configured with the `<serialization>`, `<deserialization>`, and `<paste-cleanup>` tags respectively.

```tagHelper
	<kendo-editor name="editor">
    <deserialization custom="myDeserialization" />
    <serialization custom="mySerialization" entities="false" />
		<paste-cleanup custom="myPasteCleanup" keep-new-lines="true" />
	</kendo-editor>
```
```cshtml
	@(Html.Kendo().Editor()
		.Name("editor")
    .Deserialization(deserialization => deserialization.Custom("myDeserialization"))
    .Serialization(serialization => serialization.Custom("mySerialization").Entities(false))
		.PasteCleanup(pasteCleanup => pasteCleanup.Custom("myPasteCleanup").KeepNewLines(true))
	)
```

To configure other Editor options, such as PDF export, immutables, rezisability or messages, use the respective inner tags&mdash;`<pdf>`, `<immutables>`, `<resizable>`, or `<messages>`.

```tagHelper
	<kendo-editor name="editor">
    <immutables enabled="true" />
    <resizable toolbar="true" content="true" />
    <pdf paper-size="A4" />
    <messages bold="Strong" />
	</kendo-editor>
```
```cshtml
	@(Html.Kendo().Editor()
		.Name("editor")
		.Immutables(true)
    .Resizable(resizable => resizable.Toolbar(true).Content(true))
    .Pdf(pdf => pdf.PaperSize("A4"))
    .Messages(messages => messages.Bold("Strong"))
	)
```

## See Also

* [Basic Usage of the Editor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/editor/tag-helper)
* [Server-Side API](/api/editor)
