---
title: Add Google WebFonts to the Editor
page_title: Add Google WebFonts to the Editor | Kendo UI Editor
description: "Learn how to add Google WebFonts in the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/add-google-web-fonts-to-editor
slug: howto_add_google_webfonts_editor
---

# Add Google WebFonts to the Editor

The following example demonstrates how to include Google Web Fonts to the Kendo UI Editor.

```dojo
<textarea id="editor" rows="10" cols="30" style="width:740px;height:440px">
		<p>
			Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
			In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists, and image handling. The widget <strong>outputs identical HTML</strong> across all major browsers, follows accessibility standards and provides API for content manipulation.
		</p>
		<p>Features include:</p>
		<ul>
			<li>Text formatting &amp; alignment</li>
			<li>Bulleted and numbered lists</li>
			<li>Hyperlink and image dialogs</li>
			<li>Cross-browser support</li>
			<li>Identical HTML output across browsers</li>
			<li>Gracefully degrades to a <code>textarea</code> when JavaScript is turned off</li>
		</ul>
		<p>
			Read <a href="https://docs.telerik.com/kendo-ui/introduction">more details</a> or send us your
			<a href="https://www.telerik.com/kendo-ui/forums.aspx">feedback</a>!
		</p>
    </textarea>
	<script>
		// Add Google Web Fonts to font name drop-down.
		var editor = $("#editor").kendoEditor({
      tools: ["fontName"],
		  fontName: [].concat(
			// The default fonts.
			kendo.ui.Editor.fn.options.fontName,
			// The value has to contain a list of fonts including a fallback.
			[{text: "Fjalla One", value: "'Fjalla One',sans-serif" },
			 {text: "Griffy", value: "'Griffy',cursive" },
			 {text: "Jacques Francois Shadow", value: "'Jacques Francois Shadow',cursive" },
			 {text: "Fascinate", value: "'Fascinate',cursive" }
			 //...
			]
		  )
		});

		// Load Google Web Font in the editing area.
		$(editor.data("kendoEditor").body)
		  .prevAll("head")
			.append("<link href='http://fonts.googleapis.com/css?family=Fjalla+One' rel='stylesheet'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Griffy' rel='stylesheet' type='text/css'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Jacques+Francois+Shadow' rel='stylesheet' type='text/css'>")
			.append("<link href='http://fonts.googleapis.com/css?family=Fascinate' rel='stylesheet' type='text/css'>");
	</script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
