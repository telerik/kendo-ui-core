---
title: 2022 Releases
page_title: 2022 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2022."
slug: breakingchanges2022_kendoui
position: 1
---

# 2022 Releases

This article lists the breaking or important changes in the 2022 releases of Kendo UI.

## Kendo UI 2022 R3

**Selectable**

As of the 2022 R3 release, the `Selectable` events mechanism is altered for a variety of the components. The `change` event will now be fired only when selection/deselection is performed. Invoking the client-side API methods would not fire the event as well. 

Below you can find a list of the impacted components:

* `Grid`
* `Calendar`
* `MultiViewCalendar`
* `ListBox`
* `ListView`
* `TreeList`
* `FileManager`
* `Gantt`

## Kendo UI 2022 R2 SP1

**Toolbar**

As of 2022 R2 SP1, the Toolbar's SplitButton is replaced with the [standalone SplitButton widget](../api/javascript/ui/splitbutton.md).

### Old vs New Rendering of the SplitButton in the Toolbar

Old 

```html
    <div class="k-split-button k-button-group k-rounded-md" tabindex="0" id="f1beae85-2137-47b1-8ed0-a7cb1465a5ea_wrapper" data-overflow="auto" data-uid="f1beae85-2137-47b1-8ed0-a7cb1465a5ea" aria-disabled="false">
        <a role="button" class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-base" type="splitButton" data-uid="f1beae85-2137-47b1-8ed0-a7cb1465a5ea" data-overflow="auto" aria-disabled="false">
            <span class="k-button-text">Paste</span>
        </a>
        <a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button k-split-button-arrow">
            <span class="k-icon k-i-arrow-s"></span>
            </a>
    </div>
    <ul class="k-list-container k-split-container k-group k-menu-group k-reset k-menu-group-md k-popup k-state-border-up" id="f1beae85-2137-47b1-8ed0-a7cb1465a5ea_optionlist" data-uid="a57c3928-7cc4-44b4-9695-91f65fd99664" data-role="popup" aria-hidden="false" style="position: absolute; font-family: Arial, Helvetica, sans-serif; min-width: 77px; display: block; transform: translateY(0px);">
        <li class="k-menu-item k-item">
            <span tabindex="0" class="k-link k-menu-link" data-uid="d25b1945-3901-44a4-b824-14c612ef17f5" data-overflow="auto" aria-disabled="false">
                <span class="k-icon k-i-paste-plain-text"></span>
                <span class="k-menu-link-text">Keep Text Only</span></span>
        </li>
        <li class="k-menu-item k-item">
            <span tabindex="0" class="k-link k-menu-link" data-uid="bb574191-a650-4f2a-9f7d-7a82b5aea10a" data-overflow="auto" aria-disabled="false">
                <span class="k-icon k-i-paste-as-html"></span>
                <span class="k-menu-link-text">Paste as HTML</span>
            </span>
        </li>
    </ul>
```

New 

```html
    <div id="default_wrapper" class="k-split-button k-button-group k-rounded-md">
        <button id="default" data-role="splitbutton" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="default_buttonmenu" aria-label="Paste splitbutton">
        <span class="k-icon k-i-paste k-button-icon"></span>
        <span class="k-button-text">Paste</span></button><button tabindex="-1" aria-label="arrow-button" class="k-split-button-arrow k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button" type="button"><span class="k-icon k-i-arrow-s k-button-icon"></span>
        </button>
    </div>
    <div data-role="buttonmenu" class="k-menu-popup k-popup k-group k-reset k-split-wrapper k-state-border-up" aria-hidden="false" style="display: block; position: absolute; min-width: 99px; transform: translateY(0px);">
    <ul role="menu" class="k-group k-menu-group k-reset k-menu-group-md" id="default_buttonmenu">
      <li id="keep-text" role="menuitem" class="k-item k-menu-item" tabindex="0">
          <span class="k-link k-menu-link">
              <span class="k-icon k-i-paste-plain-text"></span>
              <span class="k-menu-link-text">Keep Text Only</span>
            </span>
        </li>
      <li id="paste-html" role="menuitem" class="k-item k-menu-item" tabindex="0">
          <span class="k-link k-menu-link">
              <span class="k-icon k-i-paste-as-html"></span>
              <span class="k-menu-link-text">Paste as HTML</span>
            </span>
        </li>
   </ul>
</div>
```

## Kendo UI R1 2022 SP2

**Button**

As of the 2022 R1 SP2 release the `shape` configuration option of the Button component is no longer available. The Button height is determined by the specified `size` and font-size, while the width depends on the `size`, font-size, and text length.

## Kendo UI 2022 R1 SP1

**Scheduler**

As of the 2022 R1 SP1 release the Scheduler exposes a modified keyboard navigation behavior. The main reason behind the change is to make the widget a single Tab stop element on the page. This allows for easier navigation to and away from the Scheduler. For further details on the new keyboard navigation behavior, refer to the [Keyboard Navigation demo](https://demos.telerik.com/kendo-ui/scheduler/selection).

## Kendo UI 2022 R1

The R1 2022 release begins to introduce a concept of sizing component capabilities. The components will be able to be configured through:

- [`themeColor`]
- [`size`]
- [`shape`]
- [`rounded`]
- [`fillMode`]

For more information regarding the concept and reasoning behind it, refer to the article about [styling]({% slug components_rendering_overview %}). 

### Updated Components

The following table lists the first part of the updated components. 

| Component   | Appearance Documentation  |
|:---         |:---       |
| AutoComplete | [AutoComplete Appearance Documentation]({% slug sizedimensions_kendoui_autocomplete %})
| Button | [Button Appearance Documentation]({% slug button_styling_widget %})
| ColorPicker | [ColorPicker Appearance Documentation]({% slug appearance_kendoui_colorpicker_widget %})
| ComboBox | [ComboBox Appearance Documentation]({% slug appearance_kendoui_combobox %})
| DateInput | [DateInput Appearance Documentation]({% slug appearance_kendoui_dateinput_widget %})
| DatePicker | [DatePicker Appearance Documentation]({% slug appearance_kendoui_datepicker_widget %})
| DateRangePicker | [DateRangePicker Appearance Documentation]({% slug appearance_kendoui_daterangepicker_widget %})
| DateTimePicker | [DateTimePicker Appearance Documentation]({% slug appearance_kendoui_datetimepicker_widget %})
| DropDownList | [DropDownList Appearance Documentation]({% slug appearance_kendoui_dropdownlist_widget %})
| DropDownTree | [DropDownTree Appearance Documentation]({% slug appearance_kendoui_dropdowntree %})
| FloatingActionButton | [FloatingActionButton Appearance Documentation]({% slug appearance_floatingactionbutton_widget %})
| MaskedTextBox | [MaskedTextBox Appearance Documentation]({% slug maskedtextbox_appearance %})
| Menu | [Menu Appearance Documentation]({% slug appearance_kendoui_menu %})
| MultiColumnComboBox | [MultiColumnComboBox Appearance Documentation]({% slug appearance_kendoui_multicolumncombobox_widget %})
| MultiSelect | [MultiSelect Appearance Documentation]({% slug appearance_kendoui_multiselect_widget %})
| NumericTextBox | [NumericTextBox Appearance Documentation]({% slug appearance_kendoui_numerictextbox_widget %})
| Slider | [Slider Appearance Documentation]({% slug appearance_kendoui_slider_widget %})
| Switch | [Switch Appearance Documentation]({% slug appearance_kendoui_switch_widget %})
| TextArea | [TextArea Appearance Documentation]({% slug textarea_appearance %})
| TextBox | [TextBox Appearance Documentation]({% slug appearance_kendoui_textbox_widget %})
| TimePicker | [TimePicker Appearance Documentation]({% slug appearance_kendoui_timepicker_widget %})
| TreeView | [TreeView Appearance Documentation]({% slug appearance_kendoui_treeview_widget %})`

**Button**

All button variables in SASS themes are changed and have prefix `$kendo-`. For example, `$button-*` is changed to  `$kendo-button-*`. The reason behind this change is to  to prevent overwriting custom variables.

The state variables `$button-focused` and `$button-hovered` are changed to `$kendo-button-focus` and `$kendo-button-hover`. 