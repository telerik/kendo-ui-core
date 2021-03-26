---
title: Overview
page_title: Overview 
description: "Get started with the Loader JSP tag in Kendo UI."
slug: overview_loader_uiforjsp
position: 1
---

# Loader JSP Tag Overview

The Loader JSP tag is a server-side wrapper for the [Kendo UI Loader](/api/javascript/ui/loader) widget.

## Getting Started

### Configuration

The Loader provides a set of default API configuration options that can be set during its initialization. Follow the steps below to configure the Kendo UI Loader for JSP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/loader/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page:

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `loader` tag and configure the component:

        <kendo:loader name="loader-medium" size="medium"></kendo:loader>

## Appearance

The Loader component provides several predefined appearance options such as different types, sizes and theme colors.

### Type

The Loader allows you to set different animations by using the `type` input property.

The available [`types`](/api/javascript/ui/loader/configuration/type) values are:
* `pulsing` (Default)&mdash;Applies pulsing animation on the Loader.
* `infinite-spinner`&mdash;Applies infinite-spinner animation on the Loader.
* `converging-spinner`&mdash;Applies converging-spinner animation on the Loader.

        <kendo:loader name="loader" type="infinite-spinner"></kendo:loader>

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

        <kendo:loader name="loader" themeColor="info"></kendo:loader>

### Size

The Loader allows you to set different sizes.

The available [`size`](/api/javascript/ui/loader/configuration/size) values are:

* `small`
* `medium` (Default)
* `large`

        <kendo:loader name="loader" size="large"></kendo:loader>

## Reference

### Existing Instances

You are able to reference an existing Loader instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Loader API](/api/javascript/ui/loader#methods) to control its behavior.

    <kendo:loader name="loader" size="small"></kendo:loader>
    
    // Put this after your Kendo Loader tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the Loader is used to get its client-side instance
        var loader = $("#loader").data("kendoLoader");
    });
    </script>

## See Also

* [Telerik UI for JSP API Reference Folder](/api/jsp/loader)
