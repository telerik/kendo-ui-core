---
title: Action Buttons
page_title: Action Buttons
description: "Learn about the Action Buttons of the Telerik UI Dialog component for {{ site.framework }}."
components: ["dialog"]
slug: action_buttons_dialoghelper_aspnetcore
position: 3
---

# Action Buttons

The Dialog action buttons allow you to provide specific interaction to users.

Each defined button has a text and an action handler attached to it. By default, the action buttons close the Dialog, but you can prevent the Dialog from closing by setting the respective action handler to return `false`.

## Basic Configuration

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        ...
        {
            actions.Add().Text("Ok");
            actions.Add().Text("Cancel").Action("onCancel");
        })
    )

    <script type="text/javascript">
        function onCancel(e) {
            alert("Cancel action was clicked");
            return false; // Returning false will prevent the closing of the Dialog.
        }
    </script>
```
{% if site.core %}
```TagHelper
  <kendo-dialog name="dialog" title="Software Update">
        <actions>
            <action text="Ok">
            </action>
            <action text="Cancel" action="onCancel">
            </action>
        </actions>
        <!-- Other configuration -->
    </kendo-dialog>

    <script type="text/javascript">
        function onCancel(e) {
            alert("Cancel action was clicked");
            return false; // Returning false will prevent the closing of the Dialog.
        }
    </script>
```
{% endif %}

The order of the values in the `Actions()` configuration method determines the order in which the action buttons are rendered in the Dialog. You can also define a button as `Primary(true)`.

## Available Options

The Dialog action buttons support the following configuration options:

* `Text()`&mdash;The text displayed on the button.
* `Action()`&mdash;The callback function executed when the button is clicked.
* `Primary()`&mdash;A boolean indicating whether the button is styled as a primary button.
* `ThemeColor()`&mdash;Controls the main color applied to the button.
* `Size()`&mdash;Controls the physical size of the button.
* `Rounded()`&mdash;Controls the border radius of the button.
* `FillMode()`&mdash;Controls how the color is applied to the button.
* `Icon()`&mdash;Defines a built-in Kendo UI icon to display in the button.
* `IconClass()`&mdash;Defines custom CSS classes for displaying custom icons.
* `CssClass()`&mdash;Adds custom CSS classes to the button.

## Adding Icons to Action Buttons

You can enhance action buttons with icons to improve visual communication and user experience. The Dialog supports both built-in Kendo UI icons and custom icon libraries.

### Using Built-in Icons

Use the `Icon()` method to add a built-in Kendo UI icon to an action button. For a complete list of available icons, refer to the [List of Icons](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/).

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Delete File")
        .Content("Are you sure you want to delete this file?")
        .Actions(actions =>
        {
            actions.Add().Text("Cancel").FillMode("flat");
            actions.Add().Text("Delete").Icon("trash").ThemeColor("error").Primary(true).Action("onDelete");
        })
    )

    <script type="text/javascript">
        function onDelete(e) {
            console.log("Delete action triggered");
            return true;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Delete File">
        <content>Are you sure you want to delete this file?</content>
        <actions>
            <action text="Cancel" fill-mode="flat">
            </action>
            <action text="Delete" icon="trash" theme-color="error" primary="true" action="onDelete">
            </action>
        </actions>
    </kendo-dialog>

    <script type="text/javascript">
        function onDelete(e) {
            console.log("Delete action triggered");
            return true;
        }
    </script>
```
{% endif %}

### Using Custom Icons

Use the `IconClass()` method to add icons from external icon libraries such as Font Awesome or Material Icons.

```HtmlHelper
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Archive Document")
        .Content("Would you like to archive this document?")
        .Actions(actions =>
        {
            actions.Add().Text("Cancel").FillMode("flat");
            actions.Add().Text("Archive").IconClass("fas fa-archive").ThemeColor("primary").Action("onArchive");
        })
    )

    <script type="text/javascript">
        function onArchive(e) {
            console.log("Archive action triggered");
            return true;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

    <kendo-dialog name="dialog" title="Archive Document">
        <content>Would you like to archive this document?</content>
        <actions>
            <action text="Cancel" fill-mode="flat">
            </action>
            <action text="Archive" icon-class="fas fa-archive" theme-color="primary" action="onArchive">
            </action>
        </actions>
    </kendo-dialog>

    <script type="text/javascript">
        function onArchive(e) {
            console.log("Archive action triggered");
            return true;
        }
    </script>
```
{% endif %}

## Customizing Button Appearance

The Dialog action buttons support extensive appearance customization through several properties.

### Theme Colors

The `ThemeColor()` method controls the color scheme of the button. Available values are: `base`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverse`, and `none`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Confirm Action")
        .Content("Please choose an option:")
        .Actions(actions =>
        {
            actions.Add().Text("Info").ThemeColor("info");
            actions.Add().Text("Success").ThemeColor("success");
            actions.Add().Text("Warning").ThemeColor("warning");
            actions.Add().Text("Error").ThemeColor("error");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Confirm Action">
        <content>Please choose an option:</content>
        <actions>
            <action text="Info" theme-color="info"></action>
            <action text="Success" theme-color="success"></action>
            <action text="Warning" theme-color="warning"></action>
            <action text="Error" theme-color="error"></action>
        </actions>
    </kendo-dialog>
```
{% endif %}

### Button Sizes

The `Size()` method controls the physical size of the button. Available values are: `small`, `medium`, `large`, and `none`. The default value is `medium`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Button Sizes")
        .Content("Buttons with different sizes:")
        .Actions(actions =>
        {
            actions.Add().Text("Small").Size("small");
            actions.Add().Text("Medium").Size("medium");
            actions.Add().Text("Large").Size("large");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Button Sizes">
        <content>Buttons with different sizes:</content>
        <actions>
            <action text="Small" size="small"></action>
            <action text="Medium" size="medium"></action>
            <action text="Large" size="large"></action>
        </actions>
    </kendo-dialog>
```
{% endif %}

### Border Radius

The `Rounded()` method controls the border radius of the button. Available values are: `small`, `medium`, `large`, `full`, and `none`. The default value is `medium`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Button Shapes")
        .Content("Buttons with different border radius:")
        .Actions(actions =>
        {
            actions.Add().Text("Sharp").Rounded("none");
            actions.Add().Text("Rounded").Rounded("medium");
            actions.Add().Text("Pill").Rounded("full");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Button Shapes">
        <content>Buttons with different border radius:</content>
        <actions>
            <action text="Sharp" rounded="none"></action>
            <action text="Rounded" rounded="medium"></action>
            <action text="Pill" rounded="full"></action>
        </actions>
    </kendo-dialog>
```
{% endif %}

### Fill Modes

The `FillMode()` method controls how the color is applied to the button. Available values are: `solid`, `outline`, `flat`, `link`, and `none`. The default value is `solid`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Fill Modes")
        .Content("Buttons with different fill modes:")
        .Actions(actions =>
        {
            actions.Add().Text("Solid").ThemeColor("primary").FillMode("solid");
            actions.Add().Text("Outline").ThemeColor("primary").FillMode("outline");
            actions.Add().Text("Flat").ThemeColor("primary").FillMode("flat");
            actions.Add().Text("Link").ThemeColor("primary").FillMode("link");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Fill Modes">
        <content>Buttons with different fill modes:</content>
        <actions>
            <action text="Solid" theme-color="primary" fill-mode="solid"></action>
            <action text="Outline" theme-color="primary" fill-mode="outline"></action>
            <action text="Flat" theme-color="primary" fill-mode="flat"></action>
            <action text="Link" theme-color="primary" fill-mode="link"></action>
        </actions>
    </kendo-dialog>
```
{% endif %}

## Comprehensive Example

The following example demonstrates a Dialog with enhanced action buttons combining icons, colors, and custom styling:

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Confirm Delete")
        .Content("<p>This action cannot be undone. Are you sure you want to permanently delete this item?</p>")
        .Width(450)
        .Actions(actions =>
        {
            actions.Add().Text("Cancel").FillMode("flat").Action("onCancel");
            actions.Add().Text("Delete").Icon("trash").ThemeColor("error").Size("medium").Rounded("medium").FillMode("solid").Primary(true).Action("onDelete");
        })
    )

    <script type="text/javascript">
        function onCancel(e) {
            console.log("Cancelled");
            return true;
        }

        function onDelete(e) {
            console.log("Item deleted");
            // Perform delete operation
            return true;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-dialog name="dialog" title="Confirm Delete" width="450">
        <content>
            <p>This action cannot be undone. Are you sure you want to permanently delete this item?</p>
        </content>
        <actions>
            <action text="Cancel" fill-mode="flat" action="onCancel">
            </action>
            <action text="Delete" icon="trash" theme-color="error" size="medium" rounded="medium" fill-mode="solid" primary="true" action="onDelete">
            </action>
        </actions>
    </kendo-dialog>

    <script type="text/javascript">
        function onCancel(e) {
            console.log("Cancelled");
            return true;
        }

        function onDelete(e) {
            console.log("Item deleted");
            // Perform delete operation
            return true;
        }
    </script>
```
{% endif %}

## Example with Stretched Layout

The following example demonstrates how to set three action buttons in a Dialog with a `stretched` layout. The last button has an `Action()` event handler attached and is set as `Primary(true)`.

```HtmlHelper
    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Software Update")
        .Content("<p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?<p>")
        .Width(400)
        .Modal(false)
        .ButtonLayout("stretched")
        .Actions(actions =>
        {
            actions.Add().Text("Skip this version");
            actions.Add().Text("Remind me later");
            actions.Add().Text("Install update").Primary(true).Action("onInstall");
        })
    )

    <script type="text/javascript">
        function onInstall(e) {
            alert("Install update action was clicked");
            // Returning false will prevent the closing of the dialog.
            return true;
        }
    </script>
```
{% if site.core %}
```TagHelper
  <kendo-dialog name="dialog" title="Software Update" width="400" modal="false">
        <actions>
            <action text="Skip this version">
            </action>
            <action text="Remind me later">
            </action>
            <action text="Install update" primary="true" action="onInstall">
            </action>
        </actions>
        <content>
            <p>A new version of <strong>Kendo UI</strong> is available. Would you like to download and install it now?</p>
        </content>
    </kendo-dialog>

    <script type="text/javascript">
        function onInstall(e) {
            alert("Install update action was clicked");
            // Returning false will prevent the closing of the dialog.
            return true;
        }
    </script>

```
{% endif %}

## See Also

* [Server-Side API](/api/dialog)
