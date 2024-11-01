---
title: Override Theme Styles
page_title: Override Theme Styles
description: "General rules of thumb to override {{ site.product_short }} themes."
slug: themes-override
position: 4
---

# Override Theme Styles

Often you may need to implement a minor change to the appearance of a component while still using the same [built-in]({%slug sassbasedthemes_overview%}) or [custom]({%slug sassbasedthemes_customization_telerikui%}) theme.

This article provides high-level guidance about the knowledge and tools required to override existing CSS styles without changing the theme's CSS file. In scenarios with a larger number of customizations, it may be [more practical to use a different approach, for example, a custom theme]({%slug sassbasedthemes_customization_telerikui%}).

## CSS Knowledge

To override an existing style, you implement another [conflicting style](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#conflicting_rules). To make sure the new style takes precedence, it must have a *higher specificity*. If it has the same specificity, then the style must come later in the order of CSS rules and files on the page.

* [MDN Documentation for CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). You may prefer a [less formal explanation](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/).
* How to easily [calculate CSS Specificity](https://stuffandnonsense.co.uk/blog/css-specisithity).
* [CSS Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) provide different ways to target an element, depending on its place in the DOM structure. Combinators are often called ["selectors"](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors), which is something different. Developers most commonly use *descendant* or *child* combinators, but there are many other options.

## Tools

To see what CSS styles are applied on an HTML element, use the browser's developer tools.

* [Inspect the HTML output of a page](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#inspect-the-generated-html-of-a-control)
* [See the applied styles for a specific element](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#see-the-applied-styles)
* [Inspect elements that hide automatically and disappear from the DOM](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools-(part-2)#inspect-auto-hiding-tooltips-and-elements)

## Best Practices

When implementing CSS overrides, it's usually best to set custom CSS classes through the exposed component parameters and event arguments. This brings the following benefits:

* It reduces the need to be familiar with the components' HTML rendering and built-in CSS styles, although some knowledge is recommended and may still be necessary.
* The custom CSS code in the application is more future-proof if a [rendering change]({%slug components_rendering_overview%}) occurs.
* The custom CSS classes can follow the naming convention of the app, rather than those of the Telerik themes.

The example below demonstrates using custom CSS classes with the Grid and the ComboBox.

````HtmlHelper
<style>
    .custom-grid {
        border-color: #00f;
    }

        .custom-grid .custom-grid-header {
            font-weight: bold;
            color: #f00;
            background: #ff0;
            font-style: italic;
        }

    .custom-combobox {
        font-size: 12px;
        color: #00f;
        font-weight: bold;
        border-color: #00f;
    }
</style>

@(Html.Kendo().ComboBox()
    .Name("comboBox")
    .Filter(FilterType.Contains)
    .Placeholder("Select fabric...")
    .DataTextField("Text")
    .DataValueField("Value")
    .BindTo(new List<SelectListItem>() {
        new SelectListItem() {
            Text = "Cotton", Value = "1"
        },
        new SelectListItem() {
            Text = "Polyester", Value = "2"
        },
        new SelectListItem() {
            Text = "Cotton/Polyester", Value = "3"
        },
        new SelectListItem() {
            Text = "Rib Knit", Value = "4"
        }
    })
    .Suggest(true)
    .HtmlAttributes(new { @class = "custom-combobox" })
)

@(Html.Kendo().Grid<OrderViewModel>()    
    .Name("grid")
    .Columns(columns => {
        columns.Bound(p => p.OrderID).HeaderHtmlAttributes(new { @class = "custom-grid-header"});
        columns.Bound(p => p.ShipName);
        columns.Bound(p => p.ShipCity);
    })
    .Pageable()
    .Scrollable()
    .Sortable()
    .HtmlAttributes(new { style = "height:430px;", @class = "custom-grid" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(20)
        .Read(read => read.Action("Orders_Read", "Grid"))
     )
)
````
{% if site.core %}
````TagHelper
@addTagHelper *, Kendo.Mvc

@{
    var fabric_data = new List<SelectListItem>() {
        new SelectListItem() {
            Text = "Cotton", Value = "1"
        },
        new SelectListItem() {
            Text = "Polyester", Value = "2"
        },
        new SelectListItem() {
            Text = "Cotton/Polyester", Value = "3"
        },
        new SelectListItem() {
            Text = "Rib Knit", Value = "4"
        }
    };
}

<style>
    .custom-grid {
        border-color: #00f;
    }

        .custom-grid .custom-grid-header {
            font-weight: bold;
            color: #f00;
            background: #ff0;
            font-style: italic;
        }

    .custom-combobox {
        font-size: 12px;
        color: #00f;
        font-weight: bold;
        border-color: #00f;
    }
</style>

<kendo-combobox name="comboBox" class="custom-combobox"
    datatextfield="Text" 
    datavaluefield="Value" 
    placeholder="Select fabric..." 
    suggest="true" 
    filter="FilterType.Contains"
    bind-to="fabric_data">
</kendo-combobox>

<kendo-grid name="grid" height="430" class="custom-grid">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <read url="@Url.Action("Orders_Read","Grid")"/>
        </transport>
    </datasource>
    <columns>
        <column field="OrderID" header-html-attributes='new Dictionary<string,object> { ["class"] = "custom-grid-header" }'/>
        <column field="ShipName"/>
        <column field="ShipCity"/>
    </columns>
    <pageable enabled="true"/>
    <sortable enabled="true"/>
    <scrollable enabled="true"/>
</kendo-grid>
````
{% endif %}

## See Also

* [Customizing the look of Telerik UI components]({%slug sassbasedthemes_customization_telerikui%})