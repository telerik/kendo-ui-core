---
title: Custom Key Handling
page_title: Custom Key Handling - Kendo UI Accessibility Support
description: "Learn how to customize the key handling behavior of Kendo UI for jQuery components by using the kendoKeydown event to override built-in key mappings and add custom key combinations."
components: ["general"]
slug: custom_keyboard_nav_kendoui
position: 4
---

# Custom Key Handling

Some of the Kendo UI for jQuery components expose a `kendoKeydown` event that lets you intercept keyboard interactions before the component processes them. You can use this event to:

* **Override** a built-in key or key combination by blocking the default behavior and replacing it with your own logic.
* **Add** new key combinations that the component does not handle out of the box.

## How the kendoKeydown Event Works

The event argument exposes the following relevant properties:

| Property | Type | Description |
| --- | --- | --- |
| `e.sender` | Object | The component instance. |
| `e.keyCode` | Number | The code of the pressed key. Use [`kendo.keys`](/api/javascript/kendo/fields/keys) constants for readable comparisons. |
| `e.ctrlKey` | Boolean | `true` when `Ctrl` is held. |
| `e.shiftKey` | Boolean | `true` when `Shift` is held. |
| `e.altKey` | Boolean | `true` when `Alt` is held. |
| `e.preventKendoKeydown` | Boolean | Set to `true` to prevent the component from running its default keydown handler for this key press. |


## Supported Components

The following components support the `kendoKeydown` event:

| Component | Key Handling Article |
| --- | --- |
| [ActionSheet]({% slug jquery_actionsheet_accessibility %}) | [Custom Key Handling in ActionSheet]({% slug custom_keynav_actionsheet_kendoui %}) |
| [AIPrompt]({% slug jquery_aiprompt_accessibility %}) | [Custom Key Handling in AIPrompt]({% slug custom_keynav_aiprompt_kendoui %}) |
| [AutoComplete]({% slug jquery_autocomplete_accessibility %}) | [Custom Key Handling in AutoComplete]({% slug custom_keynav_autocomplete_kendoui %}) |
| [BottomNavigation]({% slug jquery_bottomnavigation_accessibility %}) | [Custom Key Handling in BottomNavigation]({% slug custom_keynav_bottomnavigation_kendoui %}) |
| [Breadcrumb]({% slug jquery_breadcrumb_accessibility %}) | [Custom Key Handling in Breadcrumb]({% slug custom_keynav_breadcrumb_kendoui %}) |
| [Button]({% slug jquery_button_accessibility %}) | [Custom Key Handling in Button]({% slug custom_keynav_button_kendoui %}) |
| [ButtonGroup]({% slug jquery_buttongroup_accessibility %}) | [Custom Key Handling in ButtonGroup]({% slug custom_keynav_buttongroup_kendoui %}) |
| [Calendar]({% slug jquery_calendar_accessibility %}) | [Custom Key Handling in Calendar]({% slug custom_keynav_calendar_kendoui %}) |
| [ChartWizard]({% slug jquery_chartwizard_accessibility %}) | [Custom Key Handling in ChartWizard]({% slug custom_keynav_chartwizard_kendoui %}) |
| [Chip]({% slug jquery_chip_accessibility %}) | [Custom Key Handling in Chip]({% slug custom_keynav_chip_kendoui %}) |
| [ChipList]({% slug jquery_chiplist_accessibility %}) | [Custom Key Handling in ChipList]({% slug custom_keynav_chiplist_kendoui %}) |
| [ColorPicker]({% slug jquery_colorpicker_accessibility %}) | [Custom Key Handling in ColorPicker]({% slug custom_keynav_colorpicker_kendoui %}) |
| [ComboBox]({% slug jquery_combobox_accessibility %}) | [Custom Key Handling in ComboBox]({% slug custom_keynav_combobox_kendoui %}) |
| [DateInput]({% slug jquery_dateinput_accessibility %}) | [Custom Key Handling in DateInput]({% slug custom_keynav_dateinput_kendoui %}) |
| [DatePicker]({% slug jquery_datepicker_accessibility %}) | [Custom Key Handling in DatePicker]({% slug custom_keynav_datepicker_kendoui %}) |
| [DateRangePicker]({% slug jquery_daterangepicker_accessibility %}) | [Custom Key Handling in DateRangePicker]({% slug custom_keynav_daterangepicker_kendoui %}) |
| [DateTimePicker]({% slug jquery_datetimepicker_accessibility %}) | [Custom Key Handling in DateTimePicker]({% slug custom_keynav_datetimepicker_kendoui %}) |
| [Dialog]({% slug jquery_dialog_accessibility %}) | [Custom Key Handling in Dialog]({% slug custom_keynav_dialog_kendoui %}) |
| [Drawer]({% slug jquery_drawer_accessibility %}) | [Custom Key Handling in Drawer]({% slug custom_keynav_drawer_kendoui %}) |
| [DropDownList]({% slug jquery_dropdownlist_accessibility %}) | [Custom Key Handling in DropDownList]({% slug custom_keynav_ddl_kendoui %}) |
| [DropDownTree]({% slug jquery_dropdowntree_accessibility %}) | [Custom Key Handling in DropDownTree]({% slug custom_keynav_dropdowntree_kendoui %}) |
| [ExpansionPanel]({% slug jquery_expansionpanel_accessibility %}) | [Custom Key Handling in ExpansionPanel]({% slug custom_keynav_expansionpanel_kendoui %}) |
| [FileManager]({% slug jquery_filemanager_accessibility %}) | [Custom Key Handling in FileManager]({% slug custom_keynav_filemanager_kendoui %}) |
| [Filter]({% slug jquery_filter_accessibility %}) | [Custom Key Handling in Filter]({% slug custom_keynav_filter_kendoui %}) |
| [FloatingActionButton]({% slug jquery_floatingactionbutton_accessibility %}) | [Custom Key Handling in FloatingActionButton]({% slug custom_keynav_floatingactionbutton_kendoui %}) |
| [Gantt]({% slug jquery_gantt_accessibility %}) | [Custom Key Handling in Gantt]({% slug custom_keynav_gantt_kendoui %}) |
| [Grid]({% slug jquery_grid_accessibility %}) | [Custom Key Handling in Grid]({% slug custom_keynav_grid_kendoui %}) |
| [ImageEditor]({% slug jquery_imageeditor_accessibility %}) | [Custom Key Handling in ImageEditor]({% slug custom_keynav_imageeditor_kendoui %}) |
| [InlineAIPrompt]({% slug jquery_inlineaiprompt_accessibility %}) | [Custom Key Handling in InlineAIPrompt]({% slug custom_keynav_inlineaiprompt_kendoui %}) |
| [ListBox]({% slug jquery_listbox_accessibility %}) | [Custom Key Handling in ListBox]({% slug custom_keynav_listbox_kendoui %}) |
| [ListView]({% slug jquery_listview_accessibility %}) | [Custom Key Handling in ListView]({% slug custom_keynav_listview_kendoui %}) |
| [MaskedTextBox]({% slug jquery_maskedtextbox_accessibility %}) | [Custom Key Handling in MaskedTextBox]({% slug custom_keynav_maskedtextbox_kendoui %}) |
| [MediaPlayer]({% slug jquery_mediaplayer_accessibility %}) | [Custom Key Handling in MediaPlayer]({% slug custom_keynav_mediaplayer_kendoui %}) |
| [Menu]({% slug jquery_menu_accessibility %}) | [Custom Key Handling in Menu]({% slug custom_keynav_menu_kendoui %}) |
| [MultiSelect]({% slug jquery_multiselect_accessibility %}) | [Custom Key Handling in MultiSelect]({% slug custom_keynav_multiselect_kendoui %}) |
| [MultiViewCalendar]({% slug jquery_multiviewcalendar_accessibility %}) | [Custom Key Handling in MultiViewCalendar]({% slug custom_keynav_multiviewcalendar_kendoui %}) |
| [NumericTextBox]({% slug jquery_numerictextbox_accessibility %}) | [Custom Key Handling in NumericTextBox]({% slug custom_keynav_numerictextbox_kendoui %}) |
| [OrgChart]({% slug jquery_orgchart_accessibility %}) | [Custom Key Handling in OrgChart]({% slug custom_keynav_orgchart_kendoui %}) |
| [OTPInput]({% slug jquery_otpinput_accessibility %}) | [Custom Key Handling in OTPInput]({% slug custom_keynav_otpinput_kendoui %}) |
| [Pager]({% slug jquery_pager_accessibility %}) | [Custom Key Handling in Pager]({% slug custom_keynav_pager_kendoui %}) |
| [PanelBar]({% slug jquery_panelbar_accessibility %}) | [Custom Key Handling in PanelBar]({% slug custom_keynav_panelbar_kendoui %}) |
| [PDFViewer]({% slug jquery_pdfviewer_accessibility %}) | [Custom Key Handling in PDFViewer]({% slug custom_keynav_pdfviewer_kendoui %}) |
| [PropertyGrid]({% slug jquery_propertygrid_accessibility %}) | [Custom Key Handling in PropertyGrid]({% slug custom_keynav_propertygrid_kendoui %}) |
| [Rating]({% slug jquery_rating_accessibility %}) | [Custom Key Handling in Rating]({% slug custom_keynav_rating_kendoui %}) |
| [Scheduler]({% slug jquery_scheduler_accessibility %}) | [Custom Key Handling in Scheduler]({% slug custom_keynav_scheduler_kendoui %}) |
| [ScrollView]({% slug jquery_scrollview_accessibility %}) | [Custom Key Handling in ScrollView]({% slug custom_keynav_scrollview_kendoui %}) |
| [Signature]({% slug jquery_signature_accessibility %}) | [Custom Key Handling in Signature]({% slug custom_keynav_signature_kendoui %}) |
| [Slider]({% slug jquery_slider_accessibility %}) | [Custom Key Handling in Slider]({% slug custom_keynav_slider_kendoui %}) |
| [Sortable]({% slug jquery_sortable_accessibility %}) | [Custom Key Handling in Sortable]({% slug custom_keynav_sortable_kendoui %}) |
| [Splitter]({% slug jquery_splitter_accessibility %}) | [Custom Key Handling in Splitter]({% slug custom_keynav_splitter_kendoui %}) |
| [Spreadsheet]({% slug jquery_spreadsheet_accessibility %}) | [Custom Key Handling in Spreadsheet]({% slug custom_keynav_spreadsheet_kendoui %}) |
| [Stepper]({% slug jquery_stepper_accessibility %}) | [Custom Key Handling in Stepper]({% slug custom_keynav_stepper_kendoui %}) |
| [Switch]({% slug jquery_switch_accessibility %}) | [Custom Key Handling in Switch]({% slug custom_keynav_switch_kendoui %}) |
| [TabStrip]({% slug jquery_tabstrip_accessibility %}) | [Custom Key Handling in TabStrip]({% slug custom_keynav_tabstrip_kendoui %}) |
| [TileLayout]({% slug jquery_tilelayout_accessibility %}) | [Custom Key Handling in TileLayout]({% slug custom_keynav_tilelayout_kendoui %}) |
| [TimeDurationPicker]({% slug jquery_timedurationpicker_accessibility %}) | [Custom Key Handling in TimeDurationPicker]({% slug custom_keynav_timedurationpicker_kendoui %}) |
| [Timeline]({% slug jquery_timeline_accessibility %}) | [Custom Key Handling in Timeline]({% slug custom_keynav_timeline_kendoui %}) |
| [TimePicker]({% slug jquery_timepicker_accessibility %}) | [Custom Key Handling in TimePicker]({% slug custom_keynav_timepicker_kendoui %}) |
| [Toolbar]({% slug jquery_toolbar_accessibility %}) | [Custom Key Handling in Toolbar]({% slug custom_keynav_toolbar_kendoui %}) |
| [TreeList]({% slug jquery_treelist_accessibility %}) | [Custom Key Handling in TreeList]({% slug custom_keynav_treelist_kendoui %}) |
| [TreeView]({% slug jquery_treeview_accessibility %}) | [Custom Key Handling in TreeView]({% slug custom_keynav_treeview_kendoui %}) |
| [Window]({% slug jquery_window_accessibility %}) | [Custom Key Handling in Window]({% slug custom_keynav_window_kendoui %}) |
| [Wizard]({% slug jquery_wizard_accessibility %}) | [Custom Key Handling in Wizard]({% slug custom_keynav_wizard_kendoui %}) |

## Basic Usage Pattern

The example below shows the structure of a `kendoKeydown` handler. The same pattern applies to all supported components.

    // 1. Override a built-in key (e.g., Arrow Down is replaced by the 'D' key).
    // 2. Add a new key combination (e.g., Ctrl+X for a custom action).
    $("#component").kendoGrid({
        navigatable: true,
        kendoKeydown: function(e) {
            var component = e.sender;
            var keys = kendo.keys;

            // Block the default Arrow Down behavior.
            if (e.keyCode === keys.DOWN) {
                e.preventKendoKeydown = true;
            }

            // Replace Arrow Down with the 'D' key.
            if (e.keyCode === 68) { // 'D'
                e.preventKendoKeydown = true;
                // Custom navigation logic here.
            }

            // Add a new key combination: Ctrl+X.
            if (e.ctrlKey && e.keyCode === 88) { // Ctrl+X
                e.preventKendoKeydown = true;
                // Custom action here.
            }
        }
    });

### Blocking the Default Behavior

To prevent a component from reacting to a specific key, set `e.preventKendoKeydown` to `true` for that key in the handler. You do not need to call `e.preventDefault()` in most cases—setting the flag is sufficient to stop the component from handling the key.

If you also want to prevent the browser's default behavior for that key (for example, preventing `Ctrl+R` from reloading the page), call `e.preventDefault()` in addition to setting the flag:

    kendoKeydown: function(e) {
        if (e.ctrlKey && e.keyCode === 82) { // Ctrl+R
            e.preventDefault();              // Prevent browser reload.
            e.preventKendoKeydown = true;    // Prevent component behavior.
            // Custom logic here.
        }
    }

### Adding a Custom Key Combination

You can add a key combination that the component does not use. You do not need to set `e.preventKendoKeydown = true` in this case because there is nothing to block—the component already ignores that key. Set the flag only when you want to take over a key that the component already handles.

    kendoKeydown: function(e) {
        // 'I' is not used by the TreeView, so no blocking is needed.
        if (e.keyCode === 73) { // 'I'
            var node = e.sender.dataItem(e.sender.current());
            console.log("Node info:", node);
        }
    }

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
