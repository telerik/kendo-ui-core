---
title: 2022 Releases
page_title: 2022 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2022."
slug: breakingchanges_2022
position: 2
---

# 2022 Releases

This article lists the breaking or important changes in the 2022 releases of {{ site.product }}.

## {{ site.product }} R3 2022

**Selectable**

As of the 2022 R3 release, the `Selectable` events mechanism is altered for a variety of the components. The `Change` event will now be fired only when Selection/Deselection is performed. Invoking the client-side API methods would not fire the event as well. 

Below you can find a list of the impacted components:

* `Grid`
* `Calendar`
* `MultiViewCalendar`
* `ListBox`
* `ListView`
* `TreeList`
* `FileManager`
* `Gantt`

**Badge**

`Shape` property is replaced with `Rounded` and `Fill` property is now called `FillMode`.

## {{ site.product }} R2 2022 SP2

The Size, FillMode and Rounded properties now provide the None option instead of Null.

`.Size(ComponentSize.None)`

{% if site.core %}
## {{ site.product }} R2 2022 SP1

**DatePicker TagHelper**

As of the 2022 R2 SP1 release the DatePicker `month-template` and `month-template-id` attributes are depricated. Exposed is a `month-template` child tag to support full customization as the [month](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker/configuration/month) configuration option.


**DateTimePicker TagHelper**

As of the 2022 R2 SP1 release the DatePicker `month-template` and `month-template-id` attributes are depricated. Exposed is a `month-template` child tag to support full customization as the [month](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/configuration/month) configuration option.

{% endif %}

{% if site.core %}
## {{ site.product }} R2 2022

**.NET Framework**

As of the 2022 R2 release, [.NET Framework](https://dotnet.microsoft.com/en-us/download/dotnet-framework) is out of support. You can switch to [.NET Core](https://dotnet.microsoft.com/en-us/download).

{% endif %}

## {{ site.product }} R1 2022 SP2

**Button**

As of the 2022 R1 SP2 release the `Shape` configuration option of the Button component is no longer available. The Button height is determined by the specified `Size` and font-size, while the width depends on the `Size`, font-size, and text length.

## {{ site.product }} R1 2022 SP1

**Scheduler**

As of the 2022 R1 SP1 release the Scheduler exposes a modified keyboard navigation behavior. The main reason behind the change is to make the widget a single Tab stop element on the page. This would allow easier navigation to and away from the Scheduler. Further details on the new keyboard navigation behavior could be found on the [Keyboard Navigation demo](https://demos.telerik.com/{{ site.platform }}/scheduler/selection).

## {{ site.product }} 2022 R1

With R1 2022 {{ site.product }} starts to introduce a concept of sizing capabilities with the components from the suite. The components will be able to be configured via:

- [`ThemeColor`]
- [`Size`]
- [`Shape`]
- [`Rounded`]
- [`FillMode`]

Here you can find more information regarding the concept and reasoning [Components Rendering Overview]({% slug components_rendering_overview %})
Below you can find the list of first portion of updated components with R1 2022.

### Updated Components

| Component   | Appearance Documentation  |
|:---         |:---       |
| `AutoComplete` | [AutoComplete Appearance Documentation]({% slug appearance_autocomplete_aspnetcore %})
| `Button` | [Button Appearance Documentation]({% slug button_appearance %})
| `ColorPicker` | [ColorPicker Appearance Documentation]({% slug appearance_colorpicker_aspnetcore %})
| `ComboBox` | [ComboBox Appearance Documentation]({% slug appearance_combobox_aspnetcore %})
| `DateInput` | [DateInput Appearance Documentation]({% slug appearance_dateinput %})
| `DatePicker` | [DatePicker Appearance Documentation]({% slug appearance_datepicker_aspnetcore %})
| `DateRangePicker` | [DateRangePicker Appearance Documentation]({% slug appearance_daterangepicker_aspnetcore %})
| `DateTimePicker` | [DateTimePicker Appearance Documentation]({% slug appearance_datetimepicker_aspnetcore %})
| `DropDownList` | [DropDownList Appearance Documentation]({% slug appearance_dropdownlist_aspnetcore %})
| `DropDownTree` | [DropDownTree Appearance Documentation]({% slug appearance_dropdowntree %})
| `FloatingActionButton` | [FloatingActionButton Appearance Documentation]({% slug htmlhelpers_appearance_floatingactionbutton_aspnetcore %})
| `MaskedTextBox` | [MaskedTextBox Appearance Documentation]({% slug appearance_maskedtextbox %})
| `Menu` | [MaskedTextBox Appearance Documentation]({% slug appearance_menu %})
| `MultiColumnComboBox` | [MultiColumnComboBox Appearance Documentation]({% slug appearance_multicolumncombobox %})
| `MultiSelect` | [MultiSelect Appearance Documentation]({% slug appearance_multiselect %})
| `NumericTextBox` | [NumericTextBox Appearance Documentation]({% slug numerictextbox_appearance %})
| `Slider` | [Slider Appearance Documentation]({% slug slider_appearance %})
| `Switch` | [Switch Appearance Documentation]({% slug switch_appearance %})
| `TextArea` | [TextArea Appearance Documentation]({% slug textarea_appearance %})
| `TextBox` | [TextBox Appearance Documentation]({% slug textbox_appearance %})
| `TimePicker` | [TimePicker Appearance Documentation]({% slug appearance_timepicker %})
| `TreeView` | [TreeView Appearance Documentation]({% slug appearance_treeview %})`

**Button**

As of the 2022 R1 release the `type` attribute of the Button is set to `button` by default. Previously, the Button rendered a `<button>` element without an explicitly set `type`. The main reason behind this change is to ensure the Button behaves as the Kendo UI for jQuery Button widget. As a result of this change, a Button with a default configuration nested in a form does not submit the form. If you want the Button to submit the form, set its `type` to `submit` in the `HtmlAttributes` configuration, as demonstrated in the example below.

```
@(Html.Kendo().Button()
	.Name("button1")
	.ThemeColor(ThemeColor.Primary)
	.Content("Button1")
	.HtmlAttributes(new { type = "submit" })
)
```
