---
title: Dragging and Dropping
page_title: Dragging and Dropping
description: "Enable the drag-and-drop feature of the Telerik UI ListBox TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: dragdrops_listbox_aspnetcore
position: 4
---

# Dragging and Dropping

To enable the drag-and-drop feature of the ListBox, set its `draggable` property to `true`.

You can also customize the drag-and-drop behavior of the widget by using its `draggable.placeholder` and `draggable.hint` options.

```tagHelper

    <kendo-listbox name="listbox" template-id="template" selectable="ListBoxSelectable.Multiple"  datatextfield="ProductName" datavaluefield="ProductID">
            <draggable hint="hint" enabled="true" placeholder="placeholder" />
            <datasource>
                <transport>
                    <read datatype="jsonp" url="https://demos.telerik.com/kendo-ui/service/Products" />
                </transport>
            </datasource>
            <toolbar position="ListBoxToolbarPosition.Right"
                        tools='new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"}' />
        </kendo-listbox>

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="background-color:aqua">#=ProductName#</h5>
    </script>

```
```cshtml

    @(Html.Kendo().ListBox().Name("listbox")
                        .DataTextField("ProductName")
                        .TemplateId("template")
                        .Selectable(ListBoxSelectable.Multiple)
                        .DataValueField("ProductID")
                        .Toolbar(x => x.Position(ListBoxToolbarPosition.Right)
                            .Tools(y =>
                            {
                                y.MoveUp();
                                y.MoveDown();
                                y.TransferTo();
                                y.TransferFrom();
                                y.TransferAllTo();
                                y.TransferAllFrom();
                                y.Remove();

                            }))
                        .DataSource(x =>
                            x.Custom()
                            .Transport(y => y.Read(z => z.Url("https://demos.telerik.com/kendo-ui/service/Products").DataType("jsonp"))))
    )

    <script type="text/kendo-x-tmpl" id="template">
        <h5 style="background-color:aqua">#=ProductName#</h5>
    </script>
```

## See Also

* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
* [Server-Side API](/api/listbox)
