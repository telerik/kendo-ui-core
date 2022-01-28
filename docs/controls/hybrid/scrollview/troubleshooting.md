---
title: Troubleshooting
page_title: Hybrid ScrollView Documentation | Troubleshooting
description: "Get started with the Hybrid ScrollView by Kendo UI and handle some of the display an dperformance issues that may occur while working with the widget."
slug: troubleshooting_hybridscrollview
position: 70
---

# Troubleshooting

This article provides solutions for issues you might encounter while working with the Hybrid ScrollView by Kendo UI.

## A data-bound ScrollView does not display any data

Below are listed some of the possible reasons and solutions for that:

* **Cause** The [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) of the DataSource is undefined.

  **Solution** Set the `pageSize`. Setting the `pageSize` is mandatory.

* **Cause** The [`total`](/api/javascript/data/datasource/configuration/schema.total) amount of records in the DataSource is undefined.

  **Solution** Set the `total`. Setting the `total` is mandatory.

* **Cause** The widget's [`template`](/api/javascript/mobile/ui/scrollview/configuration/template) is undefined.

  **Solution** Set the `template`. Setting the `template` is mandatory.

* **Cause** The widget's content height is zero.

  **Solution** If the `contentHeight` is set to 100%, the ScrollView element should be the immediate child of the View and the View's `stretch` option should be set to `true`. For a code sample, refer to [this demo](/api/javascript/mobile/ui/scrollview/configuration/contentheight).

## The ScrollView loads data but the application hangs or crashes

The possible reason is that the total amount of records that you are loading is large.

**Solution** Set the [`enablePager`](/api/mobile/scrollview#configuration-enablePager) to `false`.

## See Also

* [Basic Usage of the Hybrid ScrollView (Demo)](https://demos.telerik.com/kendo-ui/m/index#mobile-scrollview/mobile)
* [JavaScript API Reference of the Hybrid ScrollView](/api/javascript/mobile/ui/scrollview)
