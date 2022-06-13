---
title: Sass Theme Builder
page_title: Sass Theme Builder
description: "Use the Sass Theme Builder to customize Kendo UI themes in {{ site.product }} applications."
slug: sass_theme_builder
previous_url: /styles-and-layout/overview
position: 4
---

# Using the Sass Theme Builder

[**Progress Sass Theme Builder**](https://themebuilder.telerik.com/{{ site.platform }}) for {{ site.product_short }} is an Angular web application that enables you to create new or customize existing themes.

The tool renders the same look and feel as the look and feel of all other components in the suite. It also delivers full control over the skin elements of each component and automatically updates its composite units. After you create the skin and achieve the desired look of the theme, the Sass Theme Builder enables you to download and integrate it in your project.

Bootstrap 5 compatibility was added to the SASS themes in the R3 2021 release. As of R3 2021, you can choose from different predefined swatches of the SASS themes:

* Default theme swatches: Main, Main Dark, Nordic, Purple, Turquoise.
* Bootstrap theme swatches: Main, Main Dark, Nordic, Urban, Vintage.
* Material theme swatches: Main, Arctic, Fuscia, Lime Dark, Main Dark.
* Classic theme swatches: Main, Opal, Silver.

If you are using Bootstrap 4, we recommend using the Bootstrap-v4 swatch of the Bootstrap theme.

**Figure 1: A preview of the Sass Theme Builder**

![Theme Builder Overview](images/theme-builder-overview-{{ site.framework_short }}.png)

{% if site.core %}
## Using Newly Created Themes

To create a new theme:

1. On the initial Sass Theme Builder pane, select the **Start Theming** option.
1. Choose one of the existing themes to serve as a starting point.
1. Select the components which you intend to style. You can also change the selection at a later stage.

    **Figure 2: Selecting a base theme and components**

    ![Theme Builder Create](images/theme-builder-create-core.gif)

Complex {{ site.product }} components, such as the Grid, rely on other components to deliver their full set of features. If you select the Grid, then all of its components dependencies styles (Button, AutoComplete, DropDownList, DatePicker, etc.) will also be included in the final bundle. The Theme Builder automatically updates the styling on all required components so that you do not need to customize each of them separately.
{% else %}
## Creating New Themes

To create a new theme:

1. On the initial Sass Theme Builder pane, select the **Start Theming** option.
1. Choose one of the existing skins to use as a base. The currently available built-in skins are **Default**, **Bootsrap**, and **Material**.

    ![Selecting a base theme in the Theme Builder](images/theme-builder-create-and-download-1.png)

1. Scroll down and select the components you want to customize.

    ![Selecting the widgets for customization in the Theme Builder](images/theme-builder-create-and-download-2.png)

1. (Optional) After the initial selection, add or remove elements for customization.

To deliver the full set of their functionalities, some {{ site.product }} components, such as the Grid, have composite structures and include child components. In such cases, the Theme Builder automatically applies the theme modification to the child components and you do not need to customize each of them separately. It will also include their styles in the final CSS bundle.

{% endif %}

## Modifying Themes

The Sass Theme Builder supports the following options for customization:

* Color pickers which customize the appearance of the components.
* The **Apply changes instantly** option which enables you to observe the changes on the fly.
* Manual updates of each component element.
* Utilization of predefined color swatches.

To customize an existing theme, use the following Sass Theme Builder features:

1. Color swatches&mdash;Contains predefined color palettes that you can apply to all components in your application.
1. Default&mdash;Provides the applicable color customization options.
1. Selected Components&mdash;List of components to include in the preview and the final CSS bundle.
1. Download&mdash;Downloads the archive that holds the generated style files after the customization completes. When you click the button, a dialog appears and prompts you to name your theme. The archive contains a `.css`, `.scss` and a `.json` file. The [JSON file](#json-file-structure) contains information on the modified variables of the customized theme.

**Figure 3: Available options for customization**

![Theme Builder Create and Download 3](images/theme-builder-create-and-download-3.png)

To upload an existing theme you have previously created:

1. On the initial Sass Theme Builder pane, select **Import Theme**.
1. Upload the `MyThemeName.json` file which contains information on the modified variables of the customized theme. As a result, the selected components and styling elements load.
1. Start customizing your theme.

> The previous versions of the Sass Theme Builder required you to upload the `variables.scss` file which contains the modifications of the customized theme. To customize a theme generated with a previous version of the Sass Theme Builder:

> 1. Download a theme from the new version of the Sass Theme Builder.
> 1. Update the generated [JSON file](#json-file-structure) by entering the variable values from your existing `variables.scss` file.
> 1. Upload the [JSON file](#json-file-structure) to the Sass Theme Builder and continue the customization.

### JSON File Structure

The JSON file holds the information about the modified variables of the customized theme. The structure of the file is defined in the [kendo-swatch JSON schema](https://github.com/telerik/kendo-theme-tasks/blob/develop/lib/schemas/kendo-swatch.json) part of the [kendo-theme-tasks package](https://github.com/telerik/kendo-theme-tasks).

If you don't have a JSON file and your custom theme targets all components, you can create the JSON file manually from the existing SCSS file. Make sure you consider the following specifics:

* `THEME_NAME`&mdash;Indicates the name of your custom theme.
* `BASE_THEME`&mdash;The name of your base theme, for example, **default**, **bootstrap**, **material**, and so on.
* `THEME_VERSION`&mdash;The recommended version of the [Kendo UI Themes](https://github.com/telerik/kendo-themes) against which you compile your theme.
* `components`&mdash;The list of all components that will be included in the compiled theme. Leave empty for all.
* `groups`&mdash;The list of variables that will be customized in the Theme Builder, organized in groups.
* `key` and `value` variables&mdash;The `key` of the variable outputs its name. The `value` of the variable outputs its value.

For example:

        ```json
        "border-radius": {
            "name": "Border radius",
            "type": "number",
            "value": "2px"
        }
        ```

      outputs

      ```scss
      $border-radius: 2px;
      ```

The following example demonstrates the JSON file for the **Default** and **Bootstrap** base themes.

```json
{
    "name": "THEME_NAME",
    "product": "kendo",
    "base": "@progress/kendo-theme-BASE_THEME",
    "version": "THEME_VERSION",
    "components": [],
    "groups": [
        {
            "variables": {
                "border-radius": {
                    "name": "Border radius",
                    "type": "number",
                    "value": "2px"
                }
            }
        },
        {
            "name": "Theme colors",
            "variables": {
                "primary": {
                    "name": "Primary",
                    "type": "color",
                    "value": "#ff6358"
                },
                "secondary": {
                    "name": "Secondary",
                    "type": "color",
                    "value": "#f6f6f6"
                },
                "info": {
                    "name": "Info",
                    "type": "color",
                    "value": "#3e80ed"
                },
                "success": {
                    "name": "Success",
                    "type": "color",
                    "value": "#5ec232"
                },
                "warning": {
                    "name": "Warning",
                    "type": "color",
                    "value": "#fdce3e"
                },
                "error": {
                    "name": "Error",
                    "type": "color",
                    "value": "#d51923"
                }
            }
        },
        {
            "name": "Body",
            "variables": {
                "body-text": {
                    "name": "Body text color",
                    "type": "color",
                    "value": "#424242"
                },
                "body-bg": {
                    "name": "Body background",
                    "type": "color",
                    "value": "#ffffff"
                },
                "headings-text": {
                    "name": "Headings text color",
                    "type": "color",
                    "value": "#272727"
                },
                "subtle-text": {
                    "name": "Subtle text color",
                    "type": "color",
                    "value": "#666666"
                },
                "disabled-text": {
                    "name": "Disabled text color",
                    "type": "color",
                    "value": "#8f8f8f"
                }
            }
        },
        {
            "name": "Components",
            "variables": {
                "component-text": {
                    "name": "Component text color",
                    "type": "color",
                    "value": "#424242"
                },
                "component-bg": {
                    "name": "Component background",
                    "type": "color",
                    "value": "#ffffff"
                },
                "base-text": {
                    "name": "Header text color",
                    "type": "color",
                    "value": "#424242"
                },
                "base-bg": {
                    "name": "Header background",
                    "type": "color",
                    "value": "#fafafa"
                },
                "hovered-text": {
                    "name": "Hover text color",
                    "type": "color",
                    "value": "#424242"
                },
                "hovered-bg": {
                    "name": "Hover background",
                    "type": "color",
                    "value": "#ececec"
                },
                "selected-text": {
                    "name": "Selected text color",
                    "type": "color",
                    "value": "#ffffff"
                },
                "selected-bg": {
                    "name": "Selected background",
                    "type": "color",
                    "value": "#ff6358"
                }
            }
        },
        {
            "name": "Button",
            "variables": {
                "kendo-button-text": {
                    "name": "Button text color",
                    "type": "color",
                    "value": "#424242"
                },
                "kendo-button-bg": {
                    "name": "Button background",
                    "type": "color",
                    "value": "#f5f5f5"
                }
            }
        },
        {
            "name": "Link",
            "variables": {
                "link-text": {
                    "name": "Link text color",
                    "type": "color",
                    "value": "#ff6358"
                },
                "link-hover-text": {
                    "name": "Link hover text color",
                    "type": "color",
                    "value": "#d6534a"
                }
            }
        },
        {
            "name": "Dataviz",
            "variables": {
                "series-a": {
                    "name": "Series A",
                    "type": "color",
                    "value": "#ff6358"
                },
                "series-b": {
                    "name": "Series B",
                    "type": "color",
                    "value": "#ffe162"
                },
                "series-c": {
                    "name": "Series C",
                    "type": "color",
                    "value": "#4cd180"
                },
                "series-d": {
                    "name": "Series D",
                    "type": "color",
                    "value": "#4b5ffa"
                },
                "series-e": {
                    "name": "Series E",
                    "type": "color",
                    "value": "#ac58ff"
                },
                "series-f": {
                    "name": "Series F",
                    "type": "color",
                    "value": "#ff5892"
                }
            }
        }
    ]
}
```

The following example demonstrates the JSON file for the **Material** base theme.

```json
{
    "name": "THEME_NAME",
    "product": "kendo",
    "base": "@progress/kendo-theme-BASE_THEME",
    "version": "THEME_VERSION",
    "components": [],
    "groups": [
        {
            "variables": {
                "border-radius": {
                    "name": "Border radius",
                    "type": "number",
                    "value": "2px"
                }
            }
        },
        {
            "name": "Theme colors",
            "variables": {
                "primary-palette-name": {
                    "name": "Primary",
                    "type": "material-colorlist",
                    "enum": [
                        {
                            "value": "red",
                            "text": "Red",
                            "preview": "#f44336"
                        },
                        {
                            "value": "pink",
                            "text": "Pink",
                            "preview": "#e91e63"
                        },
                        {
                            "value": "purple",
                            "text": "Purple",
                            "preview": "#9c27b0"
                        },
                        {
                            "value": "deepPurple",
                            "text": "Deep Purple",
                            "preview": "#673ab7"
                        },
                        {
                            "value": "indigo",
                            "text": "Indigo",
                            "preview": "#3f51b5"
                        },
                        {
                            "value": "blue",
                            "text": "Blue",
                            "preview": "#2196f3"
                        },
                        {
                            "value": "lightBlue",
                            "text": "Light Blue",
                            "preview": "#03a9f4"
                        },
                        {
                            "value": "cyan",
                            "text": "Cyan",
                            "preview": "#00bcd4"
                        },
                        {
                            "value": "teal",
                            "text": "Teal",
                            "preview": "#009688"
                        },
                        {
                            "value": "green",
                            "text": "Green",
                            "preview": "#4caf50"
                        },
                        {
                            "value": "lightGreen",
                            "text": "Light Green",
                            "preview": "#8bc34a"
                        },
                        {
                            "value": "lime",
                            "text": "Lime",
                            "preview": "#cddc39"
                        },
                        {
                            "value": "yellow",
                            "text": "Yellow",
                            "preview": "#ffeb3b"
                        },
                        {
                            "value": "amber",
                            "text": "Amber",
                            "preview": "#ffc107"
                        },
                        {
                            "value": "orange",
                            "text": "Orange",
                            "preview": "#ff9800"
                        },
                        {
                            "value": "deepOrange",
                            "text": "Deep Orange",
                            "preview": "#ff5722"
                        },
                        {
                            "value": "brown",
                            "text": "Brown",
                            "preview": "#795548"
                        },
                        {
                            "value": "gray",
                            "text": "Gray",
                            "preview": "#9e9e9e"
                        },
                        {
                            "value": "blueGray",
                            "text": "Blue Gray",
                            "preview": "#607d8b"
                        }
                    ],
                    "value": "indigo"
                },
                "secondary-palette-name": {
                    "name": "Secondary",
                    "type": "material-colorlist",
                    "enum": [
                        {
                            "value": "red",
                            "text": "Red",
                            "preview": "#f44336"
                        },
                        {
                            "value": "pink",
                            "text": "Pink",
                            "preview": "#e91e63"
                        },
                        {
                            "value": "purple",
                            "text": "Purple",
                            "preview": "#9c27b0"
                        },
                        {
                            "value": "deepPurple",
                            "text": "Deep Purple",
                            "preview": "#673ab7"
                        },
                        {
                            "value": "indigo",
                            "text": "Indigo",
                            "preview": "#3f51b5"
                        },
                        {
                            "value": "blue",
                            "text": "Blue",
                            "preview": "#2196f3"
                        },
                        {
                            "value": "lightBlue",
                            "text": "Light Blue",
                            "preview": "#03a9f4"
                        },
                        {
                            "value": "cyan",
                            "text": "Cyan",
                            "preview": "#00bcd4"
                        },
                        {
                            "value": "teal",
                            "text": "Teal",
                            "preview": "#009688"
                        },
                        {
                            "value": "green",
                            "text": "Green",
                            "preview": "#4caf50"
                        },
                        {
                            "value": "lightGreen",
                            "text": "Light Green",
                            "preview": "#8bc34a"
                        },
                        {
                            "value": "lime",
                            "text": "Lime",
                            "preview": "#cddc39"
                        },
                        {
                            "value": "yellow",
                            "text": "Yellow",
                            "preview": "#ffeb3b"
                        },
                        {
                            "value": "amber",
                            "text": "Amber",
                            "preview": "#ffc107"
                        },
                        {
                            "value": "orange",
                            "text": "Orange",
                            "preview": "#ff9800"
                        },
                        {
                            "value": "deepOrange",
                            "text": "Deep Orange",
                            "preview": "#ff5722"
                        },
                        {
                            "value": "brown",
                            "text": "Brown",
                            "preview": "#795548"
                        },
                        {
                            "value": "gray",
                            "text": "Gray",
                            "preview": "#9e9e9e"
                        },
                        {
                            "value": "blueGray",
                            "text": "Blue Gray",
                            "preview": "#607d8b"
                        }
                    ],
                    "value": "pink"
                },
                "theme-type": {
                    "name": "Theme luminosity",
                    "type": "color-mode",
                    "enum": [
                        {
                            "value": "light",
                            "text": "Light",
                            "preview": "#ffffff"
                        },
                        {
                            "value": "dark",
                            "text": "Dark",
                            "preview": "#000000"
                        }
                    ],
                    "value": "light"
                },
                "adjust-contrast": {
                    "name": "Adjust contrast",
                    "type": "boolean",
                    "value": true
                }
            }
        }
    ]
}
```

**Figure 4: Importing themes for customization**

![Themebuilder import existing theme](images/theme-builder-import-existing-theme-{{ site.framework_short }}.png)

{% if site.core %}
When you complete the modifications and the theme is ready to be used:

1. Download the theme as a compact archive by clicking the **Download** button.
1. Copy the downloaded `THEME_NAME.css` file and paste it in the **wwwroot** folder of your application.
1. Include the `THEME_NAME.css` file to the [client side resources](https://docs.telerik.com/aspnet-core/getting-started/installation/getting-started-copy-client-resources).

> Reference only the `THEME_NAME.css` file because the exported CSS file contains all styles you need.

{% else %}
## Adding the Themes to Your Project

When you complete the modifications and the theme is ready to be used:

1. Download the theme as a compact archive by clicking the **Download** button.
1. Copy the downloaded `THEME_NAME.css` file and paste it in the **Content** folder of your application.
1. Bundle the styles to render them or directly reference the styles in `Layout.cshtml`. For more information on CSS bundling in Telerik UI for ASP.NET MVC applications, refer to the article on [CSS bundling fundamentals]({% slug fundamentals_aspnetmvc %}#css-bundling).

> Reference or bundle only the `THEME_NAME.css` file because the exported CSS file contains all styles you need.

{% endif %}

## See Also

* [Cards]({% slug cards_aspnetmvc6_aspnetmvc %})
