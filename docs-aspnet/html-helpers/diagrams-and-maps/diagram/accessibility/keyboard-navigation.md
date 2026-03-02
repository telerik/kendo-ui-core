---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the Telerik UI for {{ site.framework }} Diagram and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["diagram"]
slug: keynav_diagram_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the {{ site.product }} Diagram is always available and enabled by default.

For a complete example, refer to the [demo on keyboard navigation of the Diagram](https://demos.telerik.com/{{ site.platform }}/diagram/keyboard-navigation).

The Diagram provides comprehensive keyboard navigation capabilities that allow users to interact with shapes, connections, and other diagram elements without using a mouse. You can disable keyboard navigation by setting the `Navigatable` configuration with `Disabled` set to `true`.

The following example demonstrates how to disable the keyboard navigation in the Diagram.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Navigatable(nav => nav.Disabled(true))
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <navigatable disabled="true" />
    </kendo-diagram>
```
{% endif %}

## Focus and Navigation Shortcuts

The Diagram supports the following keyboard shortcuts for focusing and navigating between diagram elements.

| SHORTCUT              | DESCRIPTION
|:---                   |:---
| `Tab`                 | Focuses the diagram and the first shape.
| `Shift` & `Tab`       | Focuses the previous element on the page.
| `Right Arrow`         | Moves focus to the next shape or connection.
| `Left Arrow`          | Moves focus to the previous shape or connection.
| `Home`                | Moves focus to the first item in the diagram.
| `End`                 | Moves focus to the last item in the diagram.

## Selection Shortcuts

Use the following keyboard shortcuts to manage selection in the Diagram.

| SHORTCUT              | DESCRIPTION
|:---                   |:---
| `Ctrl` (or `Cmd`) & `A` | Selects all shapes and connections in the diagram.
| `Escape`              | Deselects all selected items.

## Movement Shortcuts

The Diagram supports moving selected shapes using keyboard shortcuts. Movement is performed in small or large steps depending on the key combination.

### Small Step Movement

| SHORTCUT                      | DESCRIPTION
|:---                           |:---
| `Ctrl` (or `Cmd`) & `Up`      | Moves the selected shapes up by a small step.
| `Ctrl` (or `Cmd`) & `Down`    | Moves the selected shapes down by a small step.
| `Ctrl` (or `Cmd`) & `Left`    | Moves the selected shapes left by a small step.
| `Ctrl` (or `Cmd`) & `Right`   | Moves the selected shapes right by a small step.

### Large Step Movement

| SHORTCUT                              | DESCRIPTION
|:---                                   |:---
| `Shift` & `Ctrl` (or `Cmd`) & `Up`    | Moves the selected shapes up by a large step.
| `Shift` & `Ctrl` (or `Cmd`) & `Down`  | Moves the selected shapes down by a large step.
| `Shift` & `Ctrl` (or `Cmd`) & `Left`  | Moves the selected shapes left by a large step.
| `Shift` & `Ctrl` (or `Cmd`) & `Right` | Moves the selected shapes right by a large step.

## Editing Shortcuts

The Diagram provides keyboard shortcuts for common editing operations.

| SHORTCUT                  | DESCRIPTION
|:---                       |:---
| `Ctrl` (or `Cmd`) & `C`   | Copies the selected shapes and connections.
| `Ctrl` (or `Cmd`) & `X`   | Cuts the selected shapes and connections.
| `Ctrl` (or `Cmd`) & `V`   | Pastes the previously copied or cut items.
| `Ctrl` (or `Cmd`) & `D`   | Duplicates the selected shapes and connections.
| `Delete`                  | Deletes the selected shapes and connections.

## Action Shortcuts

Use the following keyboard shortcuts to perform diagram actions.

| SHORTCUT                  | DESCRIPTION
|:---                       |:---
| `Ctrl` (or `Cmd`) & `Z`   | Undoes the last action.
| `Ctrl` (or `Cmd`) & `Y`   | Redoes the previously undone action.
| `Ctrl` (or `Cmd`) & `L`   | Applies the configured layout to the diagram.

## Accessibility Configuration

The Diagram provides accessibility options for both the component itself and its connections through ARIA attributes.

### Diagram Accessibility

Configure the accessibility attributes of the Diagram using the `Accessibility` option.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Accessibility(a => a
            .Role("application")
            .AriaRoleDescription("Diagram")
            .AriaLabel("Organization Chart")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <accessibility role="application" 
                      aria-role-description="Diagram" 
                      aria-label="Organization Chart" />
    </kendo-diagram>
```
{% endif %}

### Connection Accessibility

Configure accessibility attributes for connections using the `ConnectionDefaults.Accessibility` option.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .ConnectionDefaults(cd => cd
            .Accessibility(a => a
                .AriaRoleDescription("Connection")
                .AriaLabel("Connection between shapes")
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <connection-defaults>
            <accessibility aria-role-description="Connection" 
                          aria-label="Connection between shapes" />
        </connection-defaults>
    </kendo-diagram>
```
{% endif %}

The `AriaRoleDescription` property sets the accessibility role description for connection elements, which defaults to `"Connection"`. The `AriaLabel` property defines the accessibility label for connection elements.

## See Also

* [Keyboard Navigation by the Diagram for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/keyboard-navigation)
* [Accessibility in {{ site.product }}](slug:overview_accessibility)
