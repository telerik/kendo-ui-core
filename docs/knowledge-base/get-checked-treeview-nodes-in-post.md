---
title: Get Checked Nodes in a POST Query
description: The TreeView checkboxes need unique name attributes when they are used in a POST query.
type: troubleshooting
page_title: Get Checked Nodes in POST Queries | Kendo UI TreeView for jQuery
slug: get-checked-treeview-nodes-in-post
tags: treeview, node, checked, checkbox, name, post, query, unique
ticketid: 1363907, 1363212, 1364154
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Treeview for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

When the user tries to select a TreeView node, it seems that all TreeView nodes are checked while in the `POST` query after the form is submitted, only one entry is visible and it is impossible to distinguish the checked nodes and to list them in the `POST` as part of the form data.

## Cause

* If the [`checkboxes.checkChildren`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.checkChildren) property is set to `true`, the TreeView checks all child nodes. To enable the TreeView to check only the current node, set `checkboxes.checkChildren` to `false` or remove it.
* Checkboxes participate in the `POST` of a `<form>` through their [`name`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.name) property&mdash; if a checkbox is checked, its `name` is present in the `POST` data.

## Solution

Apply either of the following approaches:

* Use JavaScript to loop through the nodes on the client and collect the checked ones. Then put them in a hidden field, or serialize or send them to the server. For the full implementation of this approach, refer to the [example on collecting the checked TreeView nodes](https://demos.telerik.com/kendo-ui/treeview/checkboxes).
* Distinguish checkboxes by generating unique names with the [`checkbox.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.template).

The following example demonstrates a template that mimics the default TreeView template with classes for appearance and an `aria-label` attribute for accessibility.

```MVC
.Checkboxes(checkboxes => checkboxes
    .Name("checkedFiles")
    .CheckChildren(true)
    .Template("<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /></span>")
)
```

The following example demonstrates the jQuery initialization.

```dojo
<form>
	<input type="submit" value="post me" />
	<div id="treeview"></div>
</form>

<script>
	$("#treeview").kendoTreeView({
		checkboxes: {
			checkChildren: true,
			template: "<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /></span>"
		},

		dataSource: [{
			id: 1, text: "My Documents", expanded: true, spriteCssClass: "rootfolder", items: [
				{
					id: 2, text: "Kendo UI Project", expanded: true, spriteCssClass: "folder", items: [
						{ id: 3, text: "about.html", spriteCssClass: "html", checked: true },
						{ id: 4, text: "index.html", spriteCssClass: "html" },
						{ id: 5, text: "logo.png", spriteCssClass: "image" }
					]
				},
				{
					id: 6, text: "New Website", expanded: true, spriteCssClass: "folder", items: [
						{ id: 7, text: "mockup.jpg", spriteCssClass: "image" },
						{ id: 8, text: "Research.pdf", spriteCssClass: "pdf" },
					]
				},
				{
					id: 9, text: "Reports", expanded: true, spriteCssClass: "folder", items: [
						{ id: 10, text: "February.pdf", spriteCssClass: "pdf" },
						{ id: 11, text: "March.pdf", spriteCssClass: "pdf" },
						{ id: 12, text: "April.pdf", spriteCssClass: "pdf" }
					]
				}
			]
		}]
	});
</script>
```

The following example demonstrates the ASP.NET MVC syntax.

```MVC
<form>
	<input type="submit" value="submit form" />
	@(Html.Kendo().TreeView()
		.Name("treeview")
		.Checkboxes(checkboxes => checkboxes
			.Name("checkedFiles")
			.CheckChildren(true)
			.Template("<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /></span>")
		)
		.Items(treeview =>
		{
			treeview.Add().Text("My Documents").Id("1")
				.SpriteCssClasses("rootfolder")
				.Expanded(true)
				.Items(root =>
				{
					root.Add().Text("Kendo UI Project").Id("2")
						.Expanded(true)
						.SpriteCssClasses("folder")
						.Items(project =>
						{
							project.Add().Text("about.html").Id("3").SpriteCssClasses("html").Checked(true);
							project.Add().Text("index.html").Id("4").SpriteCssClasses("html");
							project.Add().Text("logo.png").Id("5").SpriteCssClasses("image");
						});

					root.Add().Text("New Website").Id("6")
						.Expanded(true)
						.SpriteCssClasses("folder")
						.Items(item =>
						{
							item.Add().Text("mockup.jpg").Id("7").SpriteCssClasses("image");
							item.Add().Text("Research.pdf").Id("8").SpriteCssClasses("pdf");
						});

					root.Add().Text("Reports").Id("9")
						.Expanded(true)
						.SpriteCssClasses("folder")
						.Items(reports =>
						{
							reports.Add().Text("February.pdf").Id("10").SpriteCssClasses("pdf");
							reports.Add().Text("March.pdf").Id("11").SpriteCssClasses("pdf");
							reports.Add().Text("April.pdf").Id("12").SpriteCssClasses("pdf");
						});
				});
		})
	)
</form>
```
