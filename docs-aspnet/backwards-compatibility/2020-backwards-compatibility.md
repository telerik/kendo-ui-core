---
title: 2020 Releases
page_title: 2020 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2020."
slug: breakingchanges_2020
position: 1
---

# 2020 Releases

## Kendo UI R2 2020

As of the Kendo UI R2 2020 release, the {{ site.product }} TextBox no longer has the `Format` configuration. This configuration was setting the initial format of the TextBox. After the R2 2020 release, if you need to change the initial format, use code similar to:

```
  @(Html.Kendo().TextBox()
    .Name("textbox")
    .HtmlAttributes(new { @Value = String.Format("{0:C}", 2500) })
  )
```
