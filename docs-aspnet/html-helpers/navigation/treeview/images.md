---
title: Images
page_title: Images
description: "Learn how to enhance the items of the Telerik UI for {{ site.framework }} TreeView by adding images and sprites."
slug: htmlhelpers_treeview_images
position: 5
---

# Images

The TreeView items support images and sprite icons.

## Images

To enhance the appearance of the TreeView items, add the [`ImageUrl()`](/api/kendo.mvc.ui.fluent/treeviewitembuilder#imageurlsystemstring) option with the image URL as a parameter to the respective item. The example below shows how to display each TreeView item with an image and text.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Items(treeview =>
        {
            treeview.Add().Text("Inbox")
            .ImageUrl(Url.Content("~/TreeView_images/mail.png")) // The "TreeView_images" folder is located in the "wwwroot" application folder.
            .Expanded(true)
            .Items(inbox =>
            {
                inbox.Add().Text("Read Mail")
                    .ImageUrl(Url.Content("~/TreeView_images/readmail.png"));
            });

            treeview.Add().Text("Search Folders")
                .ImageUrl(Url.Content("~/TreeView_images/search.png"));

            treeview.Add().Text("Settings")
                .ImageUrl(Url.Content("~/TreeView_images/settings.png"));
        })
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-treeview name="treeview">
        <items>
            <treeview-item expanded="true" image-url="@Url.Content("~/TreeView_images/mail.png")" text="Inbox">
                <items>
                    <treeview-item image-url="@Url.Content("~/TreeView_images/readmail.png")" text="Read Mail"></treeview-item>
                </items>
            </treeview-item>
            <treeview-item image-url="@Url.Content("~/TreeView_images/search.png")" text="Search Folders"></treeview-item>
            <treeview-item image-url="@Url.Content("~/TreeView_images/settings.png")" text="Settings"></treeview-item>
        </items>
    </kendo-treeview>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Items(treeview =>
        {
            treeview.Add().Text("Inbox")
            .ImageUrl(Url.Content("~/Content/TreeView_images/mail.png"))
            .Expanded(true)
            .Items(inbox =>
            {
                inbox.Add().Text("Read Mail")
                    .ImageUrl(Url.Content("~/Content/TreeView_images/readmail.png"));
            });

            treeview.Add().Text("Search Folders")
                .ImageUrl(Url.Content("~/Content/TreeView_images/search.png"));

            treeview.Add().Text("Settings")
                .ImageUrl(Url.Content("~/Content/TreeView_images/settings.png"));
        })
    )
```
{% endif %}

When the TreeView is configured for [remote data binding]({% slug htmlhelpers_treeview_binding_aspnetcore %}#remote-data-binding), you can define a field that holds the image URL for the data item and use the [`DataImageUrlField()`](/api/kendo.mvc.ui.fluent/treeviewbuilder#dataimageurlfieldsystemstring) option to specify the name of that field.

The following example shows how to display images in the TreeView items when the component retrieves the data from a remote endpoint.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataTextField("Name")
        .DataImageUrlField("ItemImage")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("ReadItems", "TreeView")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview" datatextfield="Name" data-image-url-field="ItemImage">
        <hierarchical-datasource>
            <transport>
                <read url="@Url.Action("ReadItems", "Treeview")"/>
            </transport>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treeview>
```
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item", ItemImage = "/TreeView_images/rootImage.png" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1", ItemImage = "/TreeView_images/item1.png" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2", ItemImage = "/TreeView_images/item2.png" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1", ItemImage = "/TreeView_images/item1_1.png" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2", ItemImage = "/TreeView_images/item_2.png" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren,
            ItemImage = item.ItemImage
        });

        return Json(result);
    }
```
{% else %}
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item", ItemImage = "/TreeView_images/rootImage.png" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1", ItemImage = "/TreeView_images/item1.png" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2", ItemImage = "/TreeView_images/item2.png" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1", ItemImage = "/TreeView_images/item1_1.png" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2", ItemImage = "/TreeView_images/item_2.png" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren,
            ItemImage = item.ItemImage
        });

        return Json(result, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

## Sprites

[Sprites](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Implementing_image_sprites_in_CSS) are a collection of image files combined into a single file that is loaded on the page with the `background-image` CSS property. 

To include sprites in the TreeView items, specify the respective sprite CSS class for each item by using the `SpriteCssClasses()` method. As a result, the sprite images will be loaded on the page through a single HTTP request.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeviewSprites")
        .Items(treeview =>
        {
            treeview.Add().Text("My Documents")
            .SpriteCssClasses("rootfolder")
            .Expanded(true)
            .Items(inbox =>
            {
                inbox.Add().Text("Kendo UI Project").SpriteCssClasses("folder");
            });

            treeview.Add().Text("PDF Reports").SpriteCssClasses("pdf");

            treeview.Add().Text("New Web Site").SpriteCssClasses("image");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-treeview name="treeviewSprites">
        <items>
            <treeview-item expanded="true" sprite-css-class="rootfolder" text="My Documents">
                <items>
                    <treeview-item sprite-css-class="folder" text="Kendo UI Project"></treeview-item>
                </items>
            </treeview-item>
            <treeview-item sprite-css-class="pdf" text="PDF Reports"></treeview-item>
            <treeview-item sprite-css-class="image" text="New Web Site"></treeview-item>
        </items>
    </kendo-treeview>
```
```Styles
    <style>
        #treeviewSprites .k-sprite { /* "treeviewSprites" matches the "Name" of the TreeView component. */
            /* The "TreeView_sprites" folder is located in the "wwwroot" application folder. */
            background-image: url("@Url.Content("~/TreeView_sprites/coloricons-sprite.png")");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .image { background-position: 0 -64px; }
    </style>
```
{% else %}
```Styles
    <style>
        #treeviewSprites .k-sprite { /* "treeviewSprites" matches the "Name" of the TreeView component. */
            background-image: url("@Url.Content("~/Content/TreeView_sprites/coloricons-sprite.png")");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .image { background-position: 0 -64px; }
    </style>
```
{% endif %}

When the TreeView is configured for [remote data binding]({% slug htmlhelpers_treeview_binding_aspnetcore %}#remote-data-binding), you can define a field that holds the sprite CSS class for the data item and use the [`DataSpriteCssClassField()`](/api/kendo.mvc.ui.fluent/treeviewbuilder#dataspritecssclassfieldsystemstring) option to specify the name of that CSS class.

The following example shows how to render sprites for the TreeView items when the component retrieves the data from a remote endpoint.

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataTextField("Name")
        .DataSpriteCssClassField("SpriteClass")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("ReadItems", "TreeView")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-treeview name="treeview" datatextfield="Name" data-sprite-css-class-field="SpriteClass">
        <hierarchical-datasource>
            <transport>
                <read url="@Url.Action("ReadItems", "Treeview")"/>
            </transport>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treeview>
```
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item", SpriteClass = "rootfolder" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1", SpriteClass = "folder" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2", SpriteClass = "pdf" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1", SpriteClass = "html" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2", SpriteClass = "image" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren,
            SpriteClass = item.SpriteClass
        });

        return Json(result);
    }
```
```Styles
    <style>
        #treeviewSprites .k-sprite { /* "treeviewSprites" matches the "Name" of the TreeView component. */
            /* The "TreeView_sprites" folder is located in the "wwwroot" application folder. */
            background-image: url("@Url.Content("~/TreeView_sprites/coloricons-sprite.png")");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .html { background-position: 0 -48px; }
        .image { background-position: 0 -64px; }
    </style>
```
{% else %}
```Controller
    public List<HierarchicalViewModel> GetHierarchicalData()
    {
        var data = new List<HierarchicalViewModel>()
        {
            new HierarchicalViewModel() { ID = 1, ParendID = null, HasChildren = true, Name = "Parent item", SpriteClass = "rootfolder" },
            new HierarchicalViewModel() { ID = 2, ParendID = 1, HasChildren = true, Name = "Item 1", SpriteClass = "folder" },
            new HierarchicalViewModel() { ID = 3, ParendID = 1, HasChildren = false, Name = "Item 2", SpriteClass = "pdf" },
            new HierarchicalViewModel() { ID = 4, ParendID = 2, HasChildren = false, Name = "Item 1.1", SpriteClass = "html" },
            new HierarchicalViewModel() { ID = 5, ParendID = 2, HasChildren = false, Name = "Item 1.2", SpriteClass = "image" }
        };
        return data;
    }

    public JsonResult ReadItems(int? id)
    {
        var result = GetHierarchicalData()
        .Where(x => id.HasValue ? x.ParendID == id : x.ParendID == null)
        .Select(item => new {
            id = item.ID,
            Name = item.Name,
            hasChildren = item.HasChildren,
            SpriteClass = item.SpriteClass
        });

        return Json(result, JsonRequestBehavior.AllowGet);
    }
```
```Styles
    <style>
        #treeviewSprites .k-sprite { /* "treeviewSprites" matches the "Name" of the TreeView component. */
            background-image: url("@Url.Content("~/Content/TreeView_sprites/coloricons-sprite.png")");
        }

        .rootfolder { background-position: 0 0; }
        .folder { background-position: 0 -16px; }
        .pdf { background-position: 0 -32px; }
        .html { background-position: 0 -48px; }
        .image { background-position: 0 -64px; }
    </style>
```
{% endif %}

## See Also

* [Images in the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/images)
* [Server-Side API of the TreeView HtmlHelper](/api/treeview)
{% if site.core %}
* [Server-Side API of the TreeView TagHelper](/api/taghelpers/treeview)
{% endif %}
* [Client-Side API of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
