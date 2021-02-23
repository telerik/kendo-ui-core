---
title: Overview
page_title: Overview
description: "How to configure and use the Loader PHP class in Kendo UI."
slug: overview_loader_uiforphp
---

# Loader PHP Class Overview

The Kendo UI Loader for PHP is a server-side wrapper for the [Kendo UI Loader](https://demos.telerik.com/kendo-ui/loader/index) widget.

## Getting Started

### Configuration

The Loader provides a set of [default API configuration options](/api/php/Kendo/UI/Loader) that can be set during its initialization. Follow the steps below to configure the Kendo UI Loader for PHP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Loader](/api/php/Kendo/UI/Loader):
    
        $loader = new \Kendo\UI\Loader('loader');
                        
**Step 3** Output the Loader by echoing the result of the `render` method:

       <?= $loader->render() ?>

## Appearance

The Loader component provides several predefined appearance options such as different types, sizes and theme colors.

### Type

The Loader allows you to set different animations by using the `type` input property.

The available [`types`](/api/javascript/ui/loader/configuration/type) values are:
* `pulsing` (Default)&mdash;Applies pulsing animation on the Loader.
* `infinite-spinner`&mdash;Applies infinite-spinner animation on the Loader.
* `converging-spinner`&mdash;Applies converging-spinner animation on the Loader.

        <?php
            $loader = new \Kendo\UI\Loader('loader');

            $loader->type('infinite-spinner');
                
            echo $loader->render();
        ?>

### Theme Color

The Loader allows you to specify predefined theme colors.

The available [`themeColor`](/api/javascript/ui/loader/configuration/themecolor) values are:

* `primary` (Default)&mdash;Applies coloring based on primary theme color.
* `secondary`&mdash;Applies coloring based on secondary theme color.
* `tertiary`&mdash; Applies coloring based on tertiary theme color.
* `info`&mdash;Applies coloring based on info theme color.
* `success`&mdash; Applies coloring based on success theme color.
* `warning`&mdash; Applies coloring based on warning theme color.
* `error`&mdash; Applies coloring based on error theme color.
* `dark`&mdash; Applies coloring based on dark theme color.
* `light`&mdash; Applies coloring based on light theme color.
* `inverse`&mdash; Applies coloring based on inverted theme color.

        <?php
            $loaderInfo = new \Kendo\UI\Loader('loaderInfo');

            $loaderInfo->themeColor('info');
                
            echo $loaderInfo->render();
        ?>

### Size

The Loader allows you to set different sizes.

The available [`size`](/api/javascript/ui/loader/configuration/size) values are:

* `small`
* `medium` (Default)
* `large`

        <?php
            $loaderLarge = new \Kendo\UI\Loader('loaderLarge');

            $loaderLarge->themeColor('large');
                
            echo $loaderLarge->render();
        ?>

## Reference

### Client-Side Instances

To reference to an existing Loader instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/Loader) to control its behavior.

The following example demonstrates how to access an existing Loader instance.

        <?php
            $loader = new \Kendo\UI\Loader('loader');

            $loader->themeColor('secondary');
                
            echo $loader->render();
        ?>

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the Loader
                var loader = $("#loader").data("kendoLoader");
            });
        </script>

## See Also

* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/Loader)
