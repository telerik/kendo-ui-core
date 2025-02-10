---
title: Adaptive Rendering
page_title: Adaptive Rendering
description: "Explore how the {{ site.product }} components that support adaptive mode are rendered based on the screen dimensions."
slug: adaptive_rendering
position: 1
---

# Adaptive Rendering

{{ site.product }} supports adaptive rendering for the components that incorporate popup elements. This functionality allows the component to adapt to the screen size by rendering the popup element differently based on the screen dimensions.

## Supported Components

The following components support the adaptive rendering functionality:

| **Component** | **Documentation** |
|-----------|---------------|
| AutoComplete | [AutoComplete Adaptive Rendering Mode Documentation]({%slug htmlhelpers_autocomplete_adaptive_mode_aspnetcore%}) |
| ColorPicker | [ColorPicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_colorpicker_adaptive_mode_aspnetcore %}) |
| ComboBox | [ComboBox Adaptive Rendering Mode Documentation]({%slug htmlhelpers_combobox_adaptive_mode_aspnetcore%}) |
| DatePicker | [DatePicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_datepicker_adaptive_mode_aspnetcore%}) |
| DateRangePicker | [DateRangePicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_daterangepicker_adaptive_mode_aspnetcore%}) |
| DateTimePicker | [DateTimePicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_datetimepicker_adaptive_mode_aspnetcore%}) |
| DropDownList | [DropDownList Adaptive Rendering Mode Documentation]({%slug htmlhelpers_dropdownlist_adaptive_mode_aspnetcore%}) |
| DropDownTree | [DropDownTree Adaptive Rendering Mode Documentation]({%slug htmlhelpers_dropdowntree_adaptive_mode_aspnetcore%}) |
| MultiColumnComboBox | [MultiColumnComboBox Adaptive Rendering Mode Documentation]({%slug htmlhelpers_multicolumncombobox_adaptive_mode_aspnetcore%}) |
| MultiSelect | [MultiSelect Adaptive Rendering Mode Documentation]({%slug htmlhelpers_multiselect_adaptive_mode_aspnetcore%}) |
| TimeDurationPicker | [TimeDurationPicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_timedurationpicker_adaptive_mode_aspnetcore%}) |
| TimePicker | [TimePicker Adaptive Rendering Mode Documentation]({%slug htmlhelpers_timepicker_adaptive_mode_aspnetcore%}) |

## Basics

To enable the adaptive rendering, use the `AdaptiveMode` option. It takes a member of the [`AdaptiveMode` enum](/api/kendo.mvc.ui/adaptivemode):

* `None` (default)
* `Auto`

>caption Enable the adaptive rendering

```HtmlHelper
    // NOTE: The configuration below includes only the DropDownList, but it applies to all components that support adaptive rendering.

    // Adapts to the screen size to use the appropriate rendering.
    @(Html.Kendo().DropDownList()
        .Name("adaptiveDropDown")
        .AdaptiveMode(AdaptiveMode.Auto)
        ... // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <!--NOTE: The configuration below includes only the DropDownList, but it applies to all components that support adaptive rendering.-->

    <!--Adapts to the screen size to use the appropriate rendering.-->
    <kendo-dropdownlist name="adaptiveDropDown" 
        adaptive-mode="AdaptiveMode.Auto">
        <!-- Additional configuration.-->
    </kendo-dropdownlist>
```
{% endif %}

## Rendering Specifics

When the `AdaptiveMode` option is set to `Auto`, the component considers the screen size to determine the appropriate rendering. The different rendering affects the popup element and how it is displayed to the user.

Three breakpoints define the rendering options as follows:

|| **Small** | **Medium** | **Large** |
|-------|-------|--------|-------|
**Dimensions** | up to 500px | 501px to 768px | over 768px |
**Rendering** | The popup is rendered as a fullscreen action sheet. | The popup is rendered as an action sheet docked to the bottom of the screen. | The popup is rendered as an animation container docked to the main element of the component. |

## Customizing the Default Adaptive Breakpoints

You can customize the [default adaptive breakpoints](#rendering-specifics) at the root level by using the `kendo.setDefaults()` client-side method. To specify your desired breakpoints, call the `kendo.setDefaults()` method by passing a key `breakpoints` and a value that contains an object with properties:

| **Property**    | **Description** |
| ----------- | ----------- |
| `small`  | The upper boundary of the small threshold. Sets the `max-width` of the small media query in `px`. |
| `medium` | The lower and upper boundaries of the medium threshold. Sets the `min-width` and `max-width` of the medium media query in `px`.|
| `large`  | The lower boundary of the large threshold. Sets the `min-width` of the large media query in `px`.|

Also, you can dynamically modify any of the adaptive breakpoints in your application at runtime by calling the `kendo.setDefaults()` method.

The following example demonstrates how to customize the default breakpoints of the [components with enabled adaptve mode](#supported-components).

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("adaptiveDropDown")
        .DataTextField("Text")
        .DataValueField("Value")
        .AdaptiveMode(AdaptiveMode.Auto)
        .BindTo(new List<SelectListItem>() {
            new SelectListItem() {
                Text = "Black",
                Value = "1"
            },
            new SelectListItem() {
                Text = "Orange",
                Value = "2"
            },
            new SelectListItem() {
                Text = "Grey",
                Value = "3"
            }
        })
    )

    // The below script sets the following thresholds:
    //  - small: 0 to 600 px (screen width is less than 601 px)
    //  - medium: 601 px to 1000 px (screen width is between 601 px and 1000 px)
    //  - large: over 1000 px (screen width is more than 1000 px)
    <script>
        kendo.setDefaults("breakpoints", {
            small: "(max-width: 600px)", 
            medium: "(min-width: 600.1px) and (max-width: 1000px)", 
            large: "(min-width: 1000.1px)"
        });
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var color_data = new List<SelectListItem>()
        {
            new SelectListItem() {
                Text = "Black",
                Value = "1"
            },
            new SelectListItem() {
                Text = "Orange",
                Value = "2"
            },
            new SelectListItem() {
                Text = "Grey",
                Value = "3"
            }
        };
    }

    <kendo-dropdownlist name="adaptiveDropDown" 
        adaptive-mode="AdaptiveMode.Auto"
        datatextfield="Text"
        datavaluefield="Value"
        bind-to="color_data">
    </kendo-dropdownlist>

    // The below script sets the following thresholds:
    //  - small: 0 to 600 px (screen width is less than 601 px)
    //  - medium: 601 px to 1000 px (screen width is between 601 px and 1000 px)
    //  - large: over 1000 px (screen width is more than 1000 px)
    <script>
        kendo.setDefaults("breakpoints", {
            small: "(max-width: 600px)", 
            medium: "(min-width: 600.1px) and (max-width: 1000px)", 
            large: "(min-width: 1000.1px)"
        });
    </script>
```
{% endif %}

Often, you may need to dynamically adjust the appearance of the components based on the current screen size. In such cases, you can utilize the <a href="https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/mediaquery" target="_blank">`kendo.mediaQuery()`</a> client-side method, which allows you to handle media queries using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList" target="_blank">MediaQueryList object</a>. 

The following example showcases how to dynamically manage the orientation of the [Menu]({% slug htmlhelpers_menu_aspnetcore%}) component depending on the screen size:

* When the screen is up to 600 px wide, the Menu will be rendered vertically.
* When the screen is more than 600 px wide, the Menu will be rendered horizontally.

    ```HtmlHelper
        @(Html.Kendo().Menu()
            .Name("navMenu")
            .Items(items =>
            {
                items.Add().Text("Baseball")
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                    children.Add().Separator(true);
                    children.Add().Text("Videos Records");
                    children.Add().Text("Radio Records");
                });

                items.Add().Text("Golf")
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                    children.Add().Separator(true);
                    children.Add().Text("Videos Records");
                    children.Add().Text("Radio Records");
                });

                items.Add().Text("Swimming")
                .Items(children =>
                {
                    children.Add().Text("Top News");
                    children.Add().Text("Photo Galleries");
                });
            })
        )

        <script>
            $(document).ready(function () {
                const mediaQueryListener = kendo.mediaQuery('(max-width: 600px)')
                .onEnter((e) => { // The logic will be executed when the media query is matched. 
                    var menu = $("#navMenu").getKendoMenu();
                    menu.setOptions({orientation: "vertical"});
                    menu.wrapper.css("width", "150px");
                })
                .onLeave(() => { // The logic will be executed when the media query is not matched.
                    var menu = $("#navMenu").getKendoMenu();
                    menu.setOptions({orientation: "horizontal"});
                    menu.wrapper.css("width", "100%");
                });
            });
        </script>
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-menu name="navMenu">
            <items>
                <menu-item text="Baseball">
                    <sub-items>
                        <menu-item text="Top News"/>
                        <menu-item text="Photo Galleries"/>
                        <menu-item separator="true"></menu-item>
                        <menu-item text="Videos Records"/>
                        <menu-item text="Radio Records"/>
                    </sub-items>
                </menu-item>
                <menu-item text="Golf">
                    <sub-items>
                        <menu-item text="Top News"/>
                        <menu-item text="Photo Galleries"/>
                        <menu-item separator="true"></menu-item>
                        <menu-item text="Videos Records"/>
                        <menu-item text="Radio Records"/>
                    </sub-items>
                </menu-item>
                <menu-item text="Swimming">
                    <sub-items>
                        <menu-item text="Top News"/>
                        <menu-item text="Photo Galleries"/>
                    </sub-items>
                </menu-item>
            </items>
        </kendo-menu>

        <script>
            $(document).ready(function () {
                const mediaQueryListener = kendo.mediaQuery('(max-width: 600px)')
                .onEnter((e) => { // The logic will be executed when the media query is matched. 
                    var menu = $("#navMenu").getKendoMenu();
                    menu.setOptions({orientation: "vertical"});
                    menu.wrapper.css("width", "150px");
                })
                .onLeave(() => { // The logic will be executed when the media query is not matched.
                    var menu = $("#navMenu").getKendoMenu();
                    menu.setOptions({orientation: "horizontal"});
                    menu.wrapper.css("width", "100%");
                });
            });
        </script>
    ```
    {% endif %}

## See also

* [Adaptive Rendering by the AutoComplete for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/adaptive-mode)
* [Adaptive Rendering by the ColorPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/adaptive-mode)
* [Adaptive Rendering by the ComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/adaptive-mode)
* [Adaptive Rendering by the DatePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datePicker/adaptive-mode)
* [Adaptive Rendering by the DateRangePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/adaptive-mode)
* [Adaptive Rendering by the DateTimePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/adaptive-mode)
* [Adaptive Rendering by the DropDownList for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/adaptive-mode)
* [Adaptive Rendering by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/adaptive-mode)
* [Adaptive Rendering by the MultiColumnComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/adaptive-mode)
* [Adaptive Rendering by the MultiSelect for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/adaptive-mode)
* [Adaptive Rendering by the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/adaptive-mode)
* [Adaptive Rendering by the TimePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/adaptive-mode)
