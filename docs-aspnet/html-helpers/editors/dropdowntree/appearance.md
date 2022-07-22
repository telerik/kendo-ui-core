---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DropDownTree for {{ site.framework }}."
slug: appearance_dropdowntree
position: 2
---

# DropDownTree Appearance

As of the R1 2022 release, the DropDownTree component uses a new rendering. To learn more about why we decided to create a new rendering for our components, see the [Components Rendering Overview]({% slug components_rendering_overview %}) article.

For a live example of the styling options of the DropDownTree, visit the [Appearance Demo of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/appearance).

## Options

The DropDownTree supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DropDownTree. The `k-input-{size}` class, which is applied to the wrapping span element of the DropDownTree, reflects the value of the `Size` option. The `k-input-{size}` class is used when the DropDownTree is configured for Multiple Selection. When Single Selection is used in the DropDownTree, the class we apply is `k-picker-{size}`. The option also affects the `span.k-chip` element through the `k-chip-{size}` class.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-input-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-input-md` class to the wrapping span element)
- `Large`—large size (applies the `k-input-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .Size(ComponentSize.Large)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

    <kendo-dropdowntree datavaluefield="id" size="ComponentSize.Large" height="auto" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
        <items>
            <dropdowntree-item expanded="true" text="Furniture" id="1">
                <items>
                    <dropdowntree-item expanded="false" text="Tables & Chairs" id="2">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Sofas" id="3">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Occasional Furniture" id="4">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Childerns Furniture" id="5">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Beds" id="6">
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
            <dropdowntree-item expanded="false" text="Decor" id="7">
                <items>
                    <dropdowntree-item expanded="false" text="Bed Linen" id="8">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Throws" id="9">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Curtains & Blinds" id="10">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Rugs" id="11">
                    </dropdowntree-item>
                    <dropdowntree-item expanded="false" text="Carpets" id="12">
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
        </items>
    </kendo-dropdowntree>

```
{% endif %}

The default size value is `Medium` and it is applied to the `span` wrapping element through the `k-input-md` class.

Below is the HTML of the DropDownTree that is affected from the `Size` option. The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-solid k-picker-lg k-rounded-full">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-solid k-dropdowntree-clearable k-input-lg k-rounded-full">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DropDownTree. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest (ellipse-like) border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The default value is `Full`. It applies the `k-rounded-full` class to the `span.k-dropdowntree` wrapping element that contains the HTML of the component.

The following example demonstrates how to set `Rounded` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .Rounded(Rounded.Medium)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

     <kendo-dropdowntree datavaluefield="id" height="auto" rounded="Rounded.Medium" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
                <items>
                    <dropdowntree-item expanded="true" text="Furniture" id="1">
                        <items>
                            <dropdowntree-item  text="Tables & Chairs" id="2">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Sofas" id="3">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Occasional Furniture" id="4">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Childerns Furniture" id="5">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Beds" id="6">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                    <dropdowntree-item  text="Decor" id="7">
                        <items>
                            <dropdowntree-item  text="Bed Linen" id="8">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Throws" id="9">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Curtains & Blinds" id="10">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Rugs" id="11">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Carpets" id="12">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </kendo-dropdowntree>

```
{% endif %}

When single selection is used, the changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-solid k-picker-md k-rounded-md">
</span>
```

The HTML when multiple selection is enabled:

```html
<span class="k-dropdowntree k-input k-input-md k-dropdowntree-clearable k-input-solid k-rounded-md k-state-border-down">
</span>
```

### FillMode

The `FillMode` option controls how color is applied to the component. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-input-solid` class to the wrapping span element
- `Flat`—applies the `k-input-flat` class to the wrapping span element
- `Outline`—applies the `k-input-outline` class to the wrapping span element
- `None`—unset.

The default value is `Solid` and it is applied to the `span.k-dropdowntree` wrapping element through the `k-picker-solid` class.

The following example demonstrates how to set `FillMode` in the declaration of the DropDownTree:

```HtmlHelper

    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree-single")
        .HtmlAttributes(new { style = "width: 100%" })
        .Height("auto")
        .Placeholder("Select Product")
        .DataValueField("id")
        .FillMode(FillMode.Outline)
        .Items(items =>
        {
            items.Add().Text("Furniture").Id("1").Expanded(true)
                .Items(children =>
                {
                    children.Add().Text("Tables & Chairs").Id("2");
                    children.Add().Text("Sofas").Id("3");
                    children.Add().Text("Occasional Furniture").Id("4");
                    children.Add().Text("Childrens furniture").Id("5");
                    children.Add().Text("Beds").Id("6");
                });
            items.Add().Text("Decor").Id("7")
                .Items(children =>
                {
                    children.Add().Text("Bed Linen").Id("8");
                    children.Add().Text("Curtains & Blinds").Id("9");
                    children.Add().Text("Carpets").Id("10");
                    children.Add().Text("Rugs").Id("11");
                    children.Add().Text("Carpets").Id("12");
                });
        })
    )
```
{% if site.core %}
```TagHelper

     <kendo-dropdowntree datavaluefield="id" height="auto" fill-mode="FillMode.Outline" placeholder="Select Product" name="dropdowntree-single" style="width: 100%">
                <items>
                    <dropdowntree-item expanded="true" text="Furniture" id="1">
                        <items>
                            <dropdowntree-item  text="Tables & Chairs" id="2">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Sofas" id="3">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Occasional Furniture" id="4">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Childerns Furniture" id="5">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Beds" id="6">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                    <dropdowntree-item  text="Decor" id="7">
                        <items>
                            <dropdowntree-item  text="Bed Linen" id="8">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Throws" id="9">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Curtains & Blinds" id="10">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Rugs" id="11">
                            </dropdowntree-item>
                            <dropdowntree-item  text="Carpets" id="12">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                </items>
            </kendo-dropdowntree>
            
```
{% endif %}



The `FillMode.Outline` value is reflected through the respective classes applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-picker-outline k-picker-md k-rounded-full k-dropdowntree-clearable">
</span>
```

The HTML when multiple selection is enabled:

```html
<span class="k-dropdowntree k-input k-input-outline k-input-md k-dropdowntree-clearable k-rounded-full k-state-border-down">
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering of the DropDownTree. Some of the HTML elements rendered before are replaced with others in the new rendering.

Old Single Selection Rendering:

```html
 <span title="" class="k-widget k-dropdowntree k-dropdowntree-clearable k-state-border-down" unselectable="on"
    tabindex="0" aria-disabled="false" aria-haspopup="tree" aria-expanded="true"
    aria-owns="d5464a25-e452-4eee-bd7a-8aebcb918a00" role="listbox"
    aria-activedescendant="a18f7c00-9e73-4db1-ac81-b41bf193b1dc">
    <span unselectable="on" class="k-dropdown-wrap k-state-default k-state-active k-state-border-down">
        <span unselectable="on" class="k-input k-readonly" role="option" aria-selected="true"
            id="a18f7c00-9e73-4db1-ac81-b41bf193b1dc">Select ...</span>
        <span unselectable="on" class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1">
            <span class="k-icon k-i-x"></span>
        </span>
        <span role="button" unselectable="on" class="k-select"
            aria-label="select"><span class="k-icon k-i-arrow-60-down"></span>
        </span></span>
    <input id="dropdowntree" style="width: 100%; display: none;" data-role="dropdowntree">
</span>
```

New Single Selection Rendering:

```html
<span class="k-dropdowntree k-picker k-picker-solid k-picker-md k-rounded-md k-dropdowntree-clearable k-hover"
        unselectable="on" tabindex="0" aria-disabled="false" aria-haspopup="tree" aria-expanded="false"
        aria-owns="d380d0fa-2f21-4d11-90bf-d21226c147a6" role="listbox"
        aria-activedescendant="de8203cb-189a-4341-92aa-d7337a65ece4" style="">
    <span unselectable="on"
    class="k-input-inner k-readonly" role="option" aria-selected="true"
    id="de8203cb-189a-4341-92aa-d7337a65ece4">Select ...</span>
    <span unselectable="on" class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1"><span
        class="k-icon k-i-x"></span>
    </span>
    <button unselectable="on"
        class="k-select k-input-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button"
        aria-label="select"><span class="k-icon k-i-arrow-60-down k-button-icon"></span>
    </button>
    <input id="dropdowntree" data-role="dropdowntree" style="display: none;">
</span>
```

Old Multiple Selection Rendering:

```html
 <div class="k-widget k-dropdowntree k-dropdowntree-clearable" unselectable="on" title=""
    aria-owns="dace9881-3aee-4a51-8940-8c3278b77ff1" tabindex="0" aria-disabled="false" aria-haspopup="tree"
    aria-expanded="false" role="listbox" aria-multiselectable="true"
    aria-describedby="d69ca64c-e5d4-4a63-abd5-01065574092c_tagList" style="width: 100%;">
    <div class="k-multiselect-wrap k-floatwrap" unselectable="on">
        <ul unselectable="on" data-template="tagTemplate" data-bind="source: tags" class="k-reset"
            id="d69ca64c-e5d4-4a63-abd5-01065574092c_tagList" data-stop="true" role="none">
            <li class="k-button " unselectable="on" role="option" aria-selected="true"><span
                    unselectable="on">Sofas</span><span aria-hidden="true" title="delete" aria-label="delete"
                    class="k-select"><span class="k-icon k-i-close"></span></span></li>
        </ul><span unselectable="on" class="k-input k-readonly" role="option" aria-selected="true"
            style="display: none;">Select ...</span><span unselectable="on" class="k-clear-value" title="clear"
            role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
    </div><input id="dropdowntree" style="width: 100%; display: none;" data-role="dropdowntree" multiple="multiple">
</div>
```

New Multiple Selection rendering:

```html
<span class="k-dropdowntree k-input k-input-solid k-input-md k-rounded-md k-dropdowntree-clearable k-hover"
        unselectable="on" title="" aria-owns="faa1c5a4-47ae-4e8a-b0c5-b8fa95443a5a" tabindex="0" aria-disabled="false"
        aria-haspopup="tree" aria-expanded="false" role="listbox" aria-multiselectable="true"
        aria-describedby="f809adf5-0db6-4945-a17a-9b408a9fd86b_tagList" style="">
    <select id="dropdowntree1"
        data-role="dropdowntree" multiple="multiple" style="display: none;"></select>
    <div unselectable="on" class="k-input-values k-chip-list k-chip-list-md" data-template="tagTemplate"
        data-bind="source: tags" id="f809adf5-0db6-4945-a17a-9b408a9fd86b_tagList" data-stop="true" role="none">
        <span unselectable="on" class="k-input-inner k-readonly" role="option" aria-selected="true"
            style="display: flex;">Select ...</span>
    </div>
    <span unselectable="on" class="k-clear-value" title="clear"
    role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
</span>
```

## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, make sure to use the classes available in the new rendering. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Appearance Overview]({% slug components_rendering_overview %}) article for additional information.

> If you use a LESS theme, the new rendering will support only the [default options](#options).

The following example showcases how to change the background colors of the input elements of the **DropDownTree** in both the new, and the old rendering:

```
    <style>
      /* Doesn't work BEFORE R1 2022 */ 
      .k-input-inner{ /* customize the style input */
        background: lightyellow;
      }
      .k-treeview-item{ /* customize the style of the items in the popup */
        background: pink;
      }
      .k-treeview-leaf{ /* customize the styles of the items in the popup */
        background-color: #FFDFDD;
        border: 1px solid purple;
      }  
      .k-treeview-leaf-text{
        color: purple;
      }
      .k-selected{ /* customize the styles of the selected items in the popup */
        background-color: purple !important;
      }  
      .k-selected .k-treeview-leaf-text{ /* customize the text of the selected item in the popup */
        color: white;
      }
      /*customize nodataTemplate */
      .k-no-data{
        color: fuchsia !important;
        font-weight: bold;
      }

      /* Doesn't work AFTER R1 2022 */ 
      /* .k-item{ background: red; }  k-item will style the items in the DropDownTree with the old as well as with the new rendering */
      .k-input{
        background-color: salmon !important;
      }
      .k-textbox{
        background-color: #FED8B1;
      }
      .k-item .k-in{ /* customize the style of the items in the popup */
        color: orange;
        background-color: lightyellow;
      }
      .k-state-selected{ /* customize the styles of the selected items in the popup */
        background-color: #FED8B1 !important;
        border: 2px solid orange !important;
        color: brown !important;
      }
      .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
        background-color: orange !important;
        color: white !important;
      }       
      /*customize nodataTemplate */
      .k-nodata{        
        color: red;
      }
    </style>

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/appearance)
