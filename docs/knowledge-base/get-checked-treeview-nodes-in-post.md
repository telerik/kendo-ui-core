---
title: Get Checked Nodes in a POST
description: The treeview checkboxes need unique name attributes when they will be used in a POST query
type: troubleshooting
page_title: How to get all checked treeview nodes in a POST query
slug: get-checked-treeview-nodes-in-post
position: 
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
When you are trying to select a node in a treeview it may appear to check all nodes but in the POST query when you submit the form you only see one entry only, so you cannot tell the checked nodes apart and to list them in a POST query as part of the form data.

The stems from two distinct behaviors:
* The treeview checks child nodes if you set the [checkboxes.checkChildren](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.checkChildren) property to `true`. If you want only the current node to be checked, set it to `false` or remove it.
* Checkboxes participate in the POST of a `<form>` through their [name](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.name) - if a checkbox is checked, its name is present in the POST data. 

One way to resolve this is to use JavaScript to loop through the nodes on the client and collect the checked ones. You can then put them in a hidden field, or otherwise serialize/send to the server. You can find an example of collecting the checked nodes in the [TreeView / Checkboxes](https://demos.telerik.com/kendo-ui/treeview/checkboxes) online demo.

Another approach is to tell checkboxes apart through unique names. To generate such names, use the [checkbox.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/configuration/checkboxes#checkboxes.template) where you can ensure unique names are provided for each checkbox.

Basic template string:

```
"<input type='checkbox' name='checkedFiles#=item.id#' #= item.checked ? 'checked' : '' #>"
```

This example shows a template that mimics the default template the treeview uses, complete with classes for appearance and an aria-label attribute for accessibility.

```MVC
.Checkboxes(checkboxes => checkboxes
    .Name("checkedFiles")
    .CheckChildren(true)
    .Template("<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /><span class='k-checkbox-label checkbox-span'></span></span>")
)
```

Here are full examples of jQuery and MVC initialization:

```dojo
<form>
	<input type="submit" value="post me" />
	<div id="treeview"></div>
</form>

<script>
	$("#treeview").kendoTreeView({
		checkboxes: {
			checkChildren: true,
			template: "<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /><span class='k-checkbox-label checkbox-span'></span></span>"
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
					id: 6, text: "New Web Site", expanded: true, spriteCssClass: "folder", items: [
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

```MVC
<form>
	<input type="submit" value="submit form" />
	@(Html.Kendo().TreeView()
		.Name("treeview")
		.Checkboxes(checkboxes => checkboxes
			.Name("checkedFiles")
			.CheckChildren(true)
			.Template("<span class='k-checkbox-wrapper'><input class='k-checkbox' name='checkedFiles#=item.id#' type='checkbox' value='true' #= item.checked ? 'checked' : '' #  aria-label='#=item.text#' /><span class='k-checkbox-label checkbox-span'></span></span>")
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

					root.Add().Text("New Web Site").Id("6")
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
