---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI TreeView for {{ site.framework }}."
slug: appearance_treeview
position: 3
---

# Appearance

As of the R1 2022 release, the TreeView component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the TreeView, visit the [Appearance Demo of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/appearance).


### Size

The `Size` option controls the overall size of the TreeView. The `k-treeview-{size}` class, which is applied to the wrapping div element of the TreeView, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-treeview-sm` class to the wrapping div element)
- `Medium`—medium size (applies the `k-treeview-md` class to the wrapping div element)
- `Large`—large size (applies the `k-treeview-lg` class to the wrapping div element)
- `None`—unset.

The default size value is `Medium`.

The example below shows a basic TreeView configuration and how to set `Size` to "Large":

```HtmlHelper
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Size(ComponentSize.Large)
        .Items(items =>
        {
            items.Add().Text("Item 1").Expanded(true)
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 1.1");
                    subItems.Add().Text("Item 1.2");
                    subItems.Add().Text("Item 1.3");
                });
            items.Add().Text("Item 2")
                .Items(subItems =>
                {
                    subItems.Add().Text("Item 2.1");
                    subItems.Add().Text("Item 2.2");
                    subItems.Add().Text("Item 2.3");
                });
            items.Add().Text("Item 3");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-treeview auto-bind="true" load-on-demand="true" name="treeview" size="ComponentSize.Large">
        <items>
            <treeview-item expanded="true" checked="false" text="Item 1" selected="false" enabled="true">
                <items>
                    <treeview-item expanded="false" checked="false" text="Item 1.1" selected="false" enabled="true">
                    </treeview-item>
                    <treeview-item expanded="false" checked="false" text="Item 1.2" selected="false" enabled="true">
                    </treeview-item>
                    <treeview-item expanded="false" checked="false" text="Item 1.3" selected="false" enabled="true">
                    </treeview-item>
</items>
            </treeview-item>
            <treeview-item expanded="false" checked="false" text="Item 2" selected="false" enabled="true">
                <items>
                    <treeview-item expanded="false" checked="false" text="Item 2.1" selected="false" enabled="true">
                    </treeview-item>
                    <treeview-item expanded="false" checked="false" text="Item 2.2" selected="false" enabled="true">
                    </treeview-item>
                    <treeview-item expanded="false" checked="false" text="Item 2.3" selected="false" enabled="true">
                    </treeview-item>
                </items>
            </treeview-item>
            <treeview-item expanded="false" checked="false" text="Item 3" selected="false" enabled="true">
            </treeview-item>
        </items>
    </kendo-treeview>
```
{% endif %}

Below is the HTML that is affected from by the `Size` option. The changes are applied to the `div.k-treeview` wrapping element:

```html
<div id="treeview" data-role="treeview" class="k-treeview k-treeview-lg" tabindex="0" role="tree" aria-busy="false">
    ...
</div>
```

## Old vs New Rendering

The differences between the old and the new rendering of the TreeView are shown below. 

Old Rendering:

```html
<div id="treeview-left" data-role="treeview" class="k-widget k-treeview" tabindex="0" role="tree" aria-busy="false"
    aria-activedescendant="treeview-left_tv_active">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-first k-last" data-uid="a2bbf1df-e3d1-48b8-ac64-fec8a312c6ee"
            aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false"
            id="treeview-left_tv_active">
            <div class="k-top k-bot"><span class="k-icon k-i-collapse"></span><span class="k-in">foo</span></div>
            <ul class="k-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-last" data-uid="fa2f98ee-0bfe-4d6d-b8f5-7c7acfedb63a"
                    aria-selected="false" aria-disabled="true" aria-expanded="true" data-expanded="true"
                    aria-busy="false">
                    <div class="k-bot"><span class="k-icon k-i-collapse"></span><span
                            class="k-in k-state-disabled">bar</span></div>
                    <ul class="k-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-last" data-uid="dc2ec9eb-56d2-4178-9201-81180e31c929"
                            aria-selected="true" aria-expanded="false" data-expanded="false">
                            <div class="k-bot"><span class="k-in k-state-selected">baz</span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

New Rendering:

```html
<div id="treeview-left" data-role="treeview" class="k-treeview k-treeview-{size}" tabindex="0" role="tree"
    aria-busy="false">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-treeview-item k-first k-last"
            data-uid="e023e8b6-c3ab-4bda-9590-21361b00ab4d" aria-selected="false" aria-expanded="true"
            data-expanded="true" aria-busy="false">
            <div class="k-treeview-top k-treeview-bot"><span class="k-treeview-toggle"><span
                        class="k-icon k-i-collapse"></span></span><span class="k-treeview-leaf k-in"><span
                        class="k-treeview-leaf-text">foo</span></span></div>
            <ul class="k-group k-treeview-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-treeview-item k-last"
                    data-uid="c86b0972-66ca-4bdc-adf1-6a2dcceb2198" aria-selected="false" aria-disabled="true"
                    aria-expanded="true" data-expanded="true" aria-busy="false">
                    <div class="k-treeview-bot"><span class="k-treeview-toggle"><span
                                class="k-icon k-i-collapse"></span></span><span
                            class="k-treeview-leaf k-in k-disabled"><span class="k-treeview-leaf-text">bar</span></span>
                    </div>
                    <ul class="k-group k-treeview-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-treeview-item k-last"
                            data-uid="e6b9f504-57ee-42b9-8898-bb1ca050d535" aria-selected="true" aria-expanded="false"
                            data-expanded="false">
                            <div class="k-treeview-bot"><span class="k-treeview-leaf k-in k-selected"><span
                                        class="k-treeview-leaf-text">baz</span></span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

Old Rendering with Checkboxes:

```html
<div id="treeview-left" data-role="treeview" class="k-widget k-treeview" tabindex="0" role="tree" aria-busy="false" aria-activedescendant="treeview-left_tv_active">
   <ul class="k-group k-treeview-lines" role="none">
      <li role="treeitem" class="k-item k-first k-last" data-uid="df2c744f-fbe9-4935-878f-b36d5cc97ccb" aria-checked="false" aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false">
         <div class="k-top k-bot"><span class="k-icon k-i-collapse"></span>
		 <span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_df2c744f-fbe9-4935-878f-b36d5cc97ccb" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in">foo</span></div>
         <ul class="k-group" role="group" style="display: block; overflow: visible; height: auto;">
            <li role="treeitem" class="k-item k-last" data-uid="f0a5ce33-57f1-45ba-ae1d-2e652d0a4705" aria-checked="false" aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false">
               <div class="k-bot"><span class="k-icon k-i-collapse"></span><span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_f0a5ce33-57f1-45ba-ae1d-2e652d0a4705" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in">bar</span></div>
               <ul class="k-group" role="group" style="display: block; overflow: visible; height: auto;">
                  <li role="treeitem" class="k-item k-last" data-uid="b0f0e249-5c64-47eb-8a6f-d0bd383c46ed" aria-checked="false" aria-selected="false" aria-expanded="false" data-expanded="false" id="treeview-left_tv_active">
                     <div class="k-bot"><span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_b0f0e249-5c64-47eb-8a6f-d0bd383c46ed" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in k-state-selected" aria-selected="true">baz</span></div>
                  </li>
               </ul>
            </li>
         </ul>
      </li>
   </ul>
</div>
```

New Rendering with Checkboxes:

```html
<div id="treeview-left" data-role="treeview" class="k-treeview k-treeview-{size}" tabindex="0" role="tree"
    aria-busy="false">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-treeview-item k-first k-last"
            data-uid="d326b551-4386-4dda-8a12-bee3dbcbb940" aria-checked="false" aria-selected="false"
            aria-expanded="true" data-expanded="true" aria-busy="false">
            <div class="k-treeview-top k-treeview-bot"><span class="k-treeview-toggle"><span
                        class="k-icon k-i-collapse"></span></span><span class="k-checkbox-wrapper"
                    role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1"
                        id="_d326b551-4386-4dda-8a12-bee3dbcbb940" class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                        class="k-checkbox-label checkbox-span"></span></span><span class="k-treeview-leaf k-in"><span
                        class="k-treeview-leaf-text">foo</span></span></div>
            <ul class="k-group k-treeview-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-treeview-item k-last"
                    data-uid="ce664b23-821c-4a63-9b86-b926c540e714" aria-checked="false" aria-selected="false"
                    aria-disabled="true" aria-expanded="true" data-expanded="true" aria-busy="false">
                    <div class="k-treeview-bot"><span class="k-treeview-toggle"><span
                                class="k-icon k-i-collapse"></span></span><span class="k-checkbox-wrapper"
                            role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" disabled=""
                                id="_ce664b23-821c-4a63-9b86-b926c540e714"
                                class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                                class="k-checkbox-label checkbox-span"></span></span><span
                            class="k-treeview-leaf k-in k-disabled"><span class="k-treeview-leaf-text">bar</span></span>
                    </div>
                    <ul class="k-group k-treeview-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-treeview-item k-last"
                            data-uid="eea3515a-89ef-4a97-bd6f-05e537073be0" aria-checked="false" aria-selected="true"
                            aria-expanded="false" data-expanded="false">
                            <div class="k-treeview-bot"><span class="k-checkbox-wrapper"
                                    role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1"
                                        id="_eea3515a-89ef-4a97-bd6f-05e537073be0"
                                        class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                                        class="k-checkbox-label checkbox-span"></span></span><span
                                    class="k-treeview-leaf k-in k-selected"><span
                                        class="k-treeview-leaf-text">baz</span></span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering support only the [default options](#options) when you use a LESS theme.

If you are upgrading from a version prior to R1 2022 and you are using custom CSS to override default TreeView styles, you will need to update the classes used in the selectors of your custom CSS rules. The following example shows how to achieve the same customization in the TreeView, depending on whether you are using an old product version or a new one. 

The first set of CSS rules relies on the classes available in the old rendering.

```
<style>
/*  Old rendering (versions prior to R1 2022)*/      

/* Apply red color to the text of the TreeView nodes */
.k-treeview .k-item .k-in {
  color: red;
}

/* Apply lightblue background-color and white text color to the selected TreeView node */
.k-treeview .k-item .k-state-selected {
  background-color: lightblue;
  color: white;
} 
</style>
```

The second set of CSS rules relies on the classes available in the new rendering.

```
<style>
/*  New Rendering (versions after R1 2022) */     

/* Apply red color to the text of the TreeView nodes */
.k-treeview .k-treeview-leaf-text {
  color: red;
}

/* Apply lightblue background-color to the selected TreeView node */
.k-treeview .k-treeview-leaf.k-selected {
  background-color: lightblue;
}  

/* Apply white text color to the selected TreeView node */
.k-treeview .k-treeview-leaf.k-selected .k-treeview-leaf-text {
   color: white;
}
</style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the TreeView](https://demos.telerik.com/{{ site.platform }}/treeview/appearance)
