---
title: 2020 Releases
page_title: 2020 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2020."
slug: breakingchanges_2020
position: 2
---

# 2020 Releases

## {{ site.product }} R3 2020 SP1

**Upload**

Changed appearance in `Less-based themes` of the Upload action buttons that are rendered when the `Async.AutoUpload` option is set to `false`.

Reverting to the previous appearance is possible by utilizing the following styles:

```
<style>
.k-upload .k-action-buttons {
    padding: 0;
    align-items: stretch;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-width: 1px 0 0;
    border-top-width: 1px;
    border-style: solid;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    flex-basis: auto;
    overflow: hidden;
    border-color: transparent;
}

.k-upload .k-action-buttons .k-button {
    background-clip: border-box;
    border-radius: 0;
    margin: 0;
    padding: 12px 16px;
    border-width: 0;
    text-overflow: ellipsis;
    flex: 1 0 0%;
    flex-grow: 1;
    flex-grow: 1;
    display: inline-block;
    overflow: hidden;
    width: auto;
    max-width: 100%;
}
</style>


@(Html.Kendo().Upload()
    .Name("files")
    .Async(a => a
        .Save("Async_Save", "Upload")
        .Remove("Async_Remove", "Upload")
        .AutoUpload(false)
    )
)

```

## {{ site.product }} R3 2020

**Badge**

Deprecated configuration options and methods:

<table>
    <thead>
        <tr>
            <th>Old configuration/method</th><th>New configuration/method</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>Appearance(string value)</code></td><td><code>Shape(Kendo.Mvc.UI.BadgeShape)
</code></td>
        </tr>
        <tr>
            <td><code>BadgeStyle(Kendo.Mvc.UI.BadgeFill)</code></td><td><code>Fill(Kendo.Mvc.UI.BadgeFill)</code></td>
        </tr>
        <tr>
            <td><code>Color(Kendo.Mvc.UI.BadgeColor)</code></td><td><code>ThemeColor(Kendo.Mvc.UI.BadgeColor)</code></td>
        </tr>
        <tr>
            <td><code>Look(string value)</code></td><td><code>Fill(Kendo.Mvc.UI.BadgeFill)</code></td>
        </tr>
      <tr>
            <td><code>Overlay(bool value)</code></td><td>use <code>Position(BadgePosition.Edge)</code> and <code>Align(BadgeAlign.TopEnd)</code></td>
        </tr>
        <tr>
            <td><code>Placement(Kendo.Mvc.UI.BadgePlacement)</code></td><td><code>Position(Kendo.Mvc.UI.BadgePosition)</code></td>
        </tr>
        <tr>
            <td><code>Position(Kendo.Mvc.UI.BadgePosition)</code></td><td><code>Align(Kendo.Mvc.UI.BadgeAlign)</code></td>
        </tr>
        <tr>
            <td><code>Value(string value)</code></td><td><code>Text(string value)</code><code>Text(double value)</code></td>
        </tr>
        <tr>
            <td>client-side API method<code>value()</code></td><td>client-side API method<code>text()</code></td>
        </tr>
    </tbody>
</table>

**Scheduler**

As of the Kendo UI 2020 R3 release, the {{ site.product }} Scheduler RecurrenceEditor will be rendered as a ButtonGroup and not a DropDownList. Apart from that, in the Weekly recurrence view the days selection is also displayed as a ButtonGroup instead of checkboxes.

## {{ site.product }} R2 2020

**TextBox**

As of the Kendo UI R2 2020 release, the {{ site.product }} TextBox is a component, not a plain styled input. As a result, the following changes were made:

* A wrapping `<span>` element is added to facilitate the new floating labels functionality.

* The `Format` configuration is removed. This configuration was setting the initial format of the TextBox. After the R2 2020 release, if you need to change the initial format, use code similar to:

```
  @(Html.Kendo().TextBox()
    .Name("textbox")
    .HtmlAttributes(new { @Value = String.Format("{0:C}", 2500) })
  )
```
