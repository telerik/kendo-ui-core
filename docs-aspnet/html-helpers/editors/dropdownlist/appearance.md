---
title: Appearance
page_title: Appearance
description: "Learn about the rendering and appearance options of the Telerik UI DropDownList for {{ site.framework }}."
slug: appearance_dropdownlist_aspnetcore
position: 2
---

# DropDownList Appearance

As of the R1 2022 release, the DropDownList component uses a new rendering. To learn more about the reasons for this decision, see the [Components Appearance]({% slug components_rendering_overview %}) article.

For a live example of the DropDownList styling options, visit the [DropDownList Appearance Demo](https://demos.telerik.com/{{ site.platform }}/dropdownlist/appearance).

## Options

The DropDownList supports the following styling options:

- [`Size`](#size)—configures the overall size of the component.
- [`Rounded`](#rounded)—configures the border radius of the component.
- [`FillMode`](#fillmode)—configures how the color is applied to the component.

### Size

The `Size` option controls the size of the DropDownList. The `k-picker-{size}` class, which is applied to the wrapping span element of the DropDownList, reflects the value of the `Size` option.

The following values are available for the `Size` option:

- `Small`—small size (applies the `k-picker-sm` class to the wrapping span element)
- `Medium`—medium size (applies the `k-picker-md` class to the wrapping span element)
- `Large`—large size (applies the `k-picker-lg` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Size` in the declaration of the DropDownList:

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .Size(ComponentSize.Medium)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    size="ComponentSize.Medium"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}

The default `Size` value is `Medium` and it is applied to the wrapping span element through the `k-picker-md` class.

```html
<span class="k-dropdownlist k-picker k-picker-md">
</span>
```

### Rounded

The `Rounded` option controls the border radius of the DropDownList. The class that corresponds to the `Rounded` option is `k-rounded-{rounded}`.

The following values are available for the `Rounded` option:

- `Small`—small border radius (applies the `k-rounded-sm` class to the wrapping span element)
- `Medium`—medium border radius (applies the `k-rounded-md` class to the wrapping span element)
- `Large`—large border radius (applies the `k-rounded-lg` class to the wrapping span element)
- `Full`—largest border radius (applies the `k-rounded-full` class to the wrapping span element)
- `None`—unset.

The following example demonstrates how to set `Rounded` in the declaration of the DropDownList:
```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .Rounded(Rounded.Medium)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    rounded="Rounded.Medium"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
```
{% endif %}
The default `Rounded` value is `Medium` and it is applied to the wrapping span element through the `k-rounded-md` class.

```html
<span class="k-dropdownlist k-picker k-rounded-md">
</span>
```

### FillMode

The `FillMode` option controls the way color is applied to the rendered DropDownList. The `k-picker-{fillMode}` class, which is applied to the wrapping span element of the DropDownList, reflects the value of the `FillMode` option.

The following values are available for the `FillMode` option:

- `Solid`—applies the `k-picker-solid` class to the wrapping span element
- `Flat`—applies the `k-picker-flat` class to the wrapping span element
- `Outline`—applies the `k-picker-outline` class to the wrapping span element
- `None`—unset.

The following example demonstrates how to set `FillMode` in the declaration of the DropDownList:
```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("categories")
        .FillMode(FillMode.Solid)
        .HtmlAttributes(new { style = "width:100%" })
        .OptionLabel("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Height(310)
        .Template("<span class=\"k-state-default\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" +
            "<span class=\"k-state-default\" style=\"padding-left: 15px;\"><h3>#: data.CategoryName #</h3></span>")
        .ValueTemplate("<span class=\"selected-value\" style=\"background-image: url(" + Url.Content("~/Content/web/dropdownlist/") + "#:data.CategoryId#.jpg" + ");\" ></span>" + "<span>#:data.CategoryName#</span>")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Overview_Get_Categories", "DropDownList");
            });
        })
        .FooterTemplate("Total number of <strong>#: instance.dataSource.total() #</strong> categories found")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="CategoryName"
                    datavaluefield="CategoryId"
                    fill-mode="FillMode.Solid"
                    option-label="Select category..."
                    height="310"
                    template="<span class='k-state-default' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span class='k-state-default' style='padding-left: 15px;'><h3>#: data.CategoryName #</h3></span>"
                    value-template="<span class='selected-value' style='background-image: url(/Content/web/dropdownlist/#:data.CategoryId#.jpg);'></span><span>#:data.CategoryName#</span>"
                    footer-template="Total number of <strong>#: instance.dataSource.total() #</strong> categories found">

    <datasource>
        <transport>
            <read url="@Url.Action("Overview_Get_Categories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
The default `FillMode` value is `Solid` and it is applied to the wrapping span element through the `k-picker-solid` class.

```html
<span class="k-dropdownlist k-picker k-picker-solid">
</span>
```

## Old vs New Rendering

The old rendering of the component consisted of several wrapping elements:

- The outer `span` wrapper with the `k-dropdown` and `k-widget` classes.

  ```html
  <span class="k-widget k-dropdown">
  </span>
  ```

- The inner `span` wrapper with the `k-dropdown-wrap` class.

  ```html
  <span class="k-dropdown-wrap k-state-default">
  </span>
  ```

- The `input` element with the `k-input` class. This element is a child of the `k-dropdown-wrap` span.

  ```html
  <input class="k-input" role="combobox" >
  </span>
  ```

- The button `span` element with `k-select` class. This element is a child of the `k-dropdown-wrap` span and renders the button which expands the dropdown on click.

  ```html
  <span unselectable="on" class="k-select" role="button">
  </span>
  ```

- The icon `span` element with the `k-icon` class. This element is a child of the `k-select` span and renders the dropdown arrow icon.

  ```html
  <span class="k-icon k-i-arrow-60-down">
  ```

The new rendering of the component consists of a single wrapping `span` element that contains the child `input` and `button` elements:

- The `span` element controls the overall appearance of the widget and has the following class structure:

  ```html
  <span class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md">
  </span>
  ```

- The `span` element controls the appearance of the DropDownList itself and has the following class structure:

  ```html
  <span class="k-input-inner"></span>
  ```

- The `button` element controls the appearance of the button that expands the dropdown popup and has the following class structure:

  ```html
  <button type="button" class="k-select k-input-button k-button k-icon-button k-button-md k-button-solid k-button-solid-base k-icon-button">
  </button>
  ```

- The inner `span` element renders the dropdown arrow icon of the DropDownList and has the following class structure:

  ```html
  <span class="k-icon k-i-arrow-s k-button-icon"></span>
  ```

- The input with `data-role="dropdownlist"` attribute

```html
 <input id="products" data-role="dropdownlist">
```

With the previous versions, when the filtering was enabled, the search icon in the DropDownList popup was rendered on the right side. With the new rendering, the search icon is rendered on the left side.

The examples below demonstrate the full version of the old and new rendering:

Wrapper Rendering:

```html
<!-- OLD WRAPPER-->
<span class="k-widget k-dropdown">
    <input id="dropdownlist" type="text" class="k-input" placeholder="...">
</span>

<!-- NEW WRAPPER -->
<span class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md">
    <span class="k-input-inner">
        <span class="k-input-value-text">Patricio Simpson</span>
    </span>
    <button class="k-select k-input-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button">
        <span class="k-icon k-i-arrow-s k-button-icon"></span>
    </button>
</span>
```

Popup rendering without virtualization:

```html
<!-- OLD POPUP WITHOUT VIRTUALIZATION-->
<div class="k-list-container k-popup k-group k-reset k-state-border-up" id="products-list" data-role="popup">
    [Header template]
    <div class="k-group-header">Argentina</div>
    <div class="k-list-scroller">
      <ul class="k-list k-reset">
        <li class="k-item">Patricio Simpson</li>
        ...
        <li class="k-item k-first">
            Ann Devon
            <div class="k-group">UK</div>
        </li>
        ...
      </ul>
    </div>
    <div class="k-nodata">
      <div>No Data!</div>
    </div>
    <div class="k-footer">
      [Footer template]
    </div>
</div>

<!-- NEW POPUP NO VIRTUALIZATION -->
<div class="k-popup k-group k-reset">
    <div class="k-list k-list-md">
        <div class="k-list-header">
            [header template]
        </div>
        <div class="k-list-group-sticky-header">Argentina</div>
        <div class="k-list-content k-list-scroller">
            <ul class="k-list-ul">
                <li class="k-list-item">
                    <span class="k-list-item-text">Patricio Simpson</span>
                </li>
                ...
                <li class="k-list-item k-first">
                    <span class="k-list-item-text">Roland Mendel</span>
                    <div class="k-list-item-group-label">Austria</div>
                </li>
                ...
            </ul>
        </div>
        <div class="k-nodata">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```

Popup rendering with virtualization:

```html
<!-- OLD POPUP WITH VIRTUALIZATION-->
<div class="k-list-container k-popup k-group k-reset">
    <div>
       [Header template]
    </div>
    <div class="k-virtual-wrap">
        <div class="k-group-header"></div>
        <div class="k-virtual-content">
          <ul class="k-list k-reset k-virtual-list">
            <li class="k-virtual-item k-item">
              Vins et alcools Chevalier
            </li>
            ...
            <li class="k-virtual-item k-item">
              Toms Spezialitäten
            </li>
            ...
          </ul>
          <div class="k-height-container">
            <div style="height: ....;"></div>
          </div>
        </div>
    </div>
    <div class="k-nodata">
        <div>No data found.</div>
    </div>
    <div class="k-footer">
        [Footer template]
    </div>
</div>

<!-- NEW POPUP WITH VIRTUALIZATION-->
<div class="k-popup k-group k-reset">
    <div class="k-list k-list-md k-virtual-list">
        <div class="k-list-header">
            [Header template]
        </div>
        <div class="k-list-group-sticky-header">Argentina</div>
        <div class="k-list-content k-virtual-content">
            <ul class="k-list-ul">
                <li class="k-list-item">
                    <span class="k-list-item-text">
                        Text
                    </span>
                </li>
                ...
                <li class="k-list-item k-first">
                    <span class="k-list-item-text">
                        Ernst Handel, Austria
                    </span>
                    <div class="k-list-item-group-label">Austria</div>
                </li>
                ...
            </ul>
            <div class="k-height-container">
                <div style="height: ...;"></div>
            </div>
        </div>
        <div class="k-nodata">
            <div>No data found.</div>
        </div>
        <div class="k-list-footer">
            [Footer template]
        </div>
    </div>
</div>
```


## Visual Backwards Compatibility

In order to achieve the same look and feel as the old rendering, the element references must be updated. Visit the [CSS Classes Migration]({% slug components_rendering_overview %}#css-classes-migration) and [JQuery Selectors Migration]({% slug components_rendering_overview %}#jquery-selectors-migration) sections of the [Styling Overview]({% slug components_rendering_overview %}) article for additional information.

> The new styling and rendering support only the [default options](#options) when you use a LESS theme.

Previously, a reference to the DropDownList input element was obtainable through the `k-input` class.

```javascript
$(".k-input") // Returns a reference to the input element in the old rendering.
```

With the new rendering, the DropDownList input element must be targeted by using the `k-input-inner` class.

```javascript
$('.k-dropdownlist .k-input-inner') // Returns a reference to the input element in the new rendering.
```

Previously, a reference to the dropdown button element was obtainable through the `k-select` class.

```javascript
$(".k-select") // Returns a reference to the calendar button element in the old rendering.
```

With the new rendering, a reference to the dropdown button element is obtainable through the `k-button` and `k-input-button` classes.

```javascript
$(".k-button") // Returns a reference to the calendar button element in the new rendering.
$(".k-input-button") // Returns a reference to the calendar button element in the new rendering.
```

Previously, a reference to the items in the DropDownList popup was obtainable through the `k-item` class.

```javascript
$(".k-item") // Returns a reference to the items rendered in the DropDownList popup.
```

With the new rendering, the DropDownList item elements must be targeted by using the `k-list-item` class.

```javascript
$('.k-list-item') // Returns a reference to the items rendered in the DropDownList popup.
```

If you are upgrading from a version prior to R1 2022 and you are using custom CSS to override default DropDownList styles, you will need to update the classes used in the selectors of your custom CSS rules. The following example shows how to achieve the same customization in the DropDownList, depending on whether you are using an old product version or a new one. 

The first set of CSS rules relies on the classes available in the old rendering.

```
<style>
/*  Old rendering (versions prior to R1 2022)*/ 

/* Apply lightblue background-color to the items */
.k-popup .k-item {
  background-color: lightblue;
}

/* Apply lightgreen background-color to the selected item */
.k-popup .k-item.k-state-selected {
  background-color: lightgreen;
}

/* Apply yellow background-color to the footer */
.k-popup .k-footer{
  background-color: yellow;
}
</style>
```

The second set of CSS rules relies on the classes available in the new rendering.

```
<style>
/*  New Rendering (versions after R1 2022) */   
      
/* Apply lightblue background-color to the items */
.k-list-item{ 
  background-color: lightblue;
}    

/* Apply lightgreen background-color to the selected item */
.k-popup .k-list-item.k-selected {
  background-color: lightgreen;
}
      
/* Apply yellow background-color to the footer */
.k-popup .k-list-footer{
  background-color: yellow;
}
</style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the DropDownList](https://demos.telerik.com/aspnet-mvc/dropdownlist/appearance)
