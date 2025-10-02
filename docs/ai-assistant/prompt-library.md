---
title: Prompt Library
page_title: Kendo UI for jQuery Prompt Library
description: Explore a collection of ready-to-use prompt ideas you can run with the Kendo UI for jQuery AI Coding Assistant (MCP Server) to quickly scaffold components and configurations.
slug: ai_prompt_library
position: 4
---

# Kendo UI for jQuery Prompt Library

Welcome to the Kendo UI for jQuery Prompt Library.

These prompts are optimized for use with the Kendo UI for jQuery AI Coding Assistant through the [Kendo UI for jQuery MCP Server]({% slug kendo_jquery_mcp_server %}). Use them to jump‑start component setup, feature configuration, data binding, or to iteratively refine a UI. Treat them as starting points—adjust the wording to fit your exact scenario.

The library will evolve over time as we add more component scenarios and patterns.

>tip [Skip to the component prompts ⬇️](#component-specific-prompts)

## How to Use the Prompts

All prompt examples target the MCP Server by invoking its handle. You can:

* Prefix the prompt with the handle `#kendo-jquery-assistant`, or
* Start your prompt with `/kendojquery` (recommended for VS Code and clients that support slash commands).

1. Browse the prompt list and pick (or combine) the scenarios you need.
2. Copy the prompt text including the handle (e.g., `#kendo-jquery-assistant`).
3. (Optional) Refine the prompt—add specifics (data fields, feature flags, desired UX). Keep the handle intact so the MCP Server is invoked.
4. Run the prompt in your AI client (Chat panel, inline, etc.).
5. Review and adapt the generated code. Always validate before committing or deploying.

>warning Always double‑check and test the generated code. Treat AI output as a draft—not production‑ready code.

### Use Without the MCP Server
If you want to run these prompts only through a generic AI chat (e.g., GitHub Copilot Chat without MCP enabled), you can remove the handle and explicitly mention: "Use Kendo UI for jQuery APIs." Results may be less accurate without the server context.

## Prompt Writing Tips

* Be explicit about: data shape, feature list, UX goals, and constraints (e.g. "No custom CSS" or "Use remote data").
* Chain instructions: "Create X. Then extend it with Y and Z." (Some clients require a second follow‑up prompt.)
* Ask for explanations: "Explain each configuration option in a comment."
* Avoid leaking proprietary data—use dummy or anonymized structures.

## General Prompts

This section provides examples of general questions related to Kendo UI for jQuery.

```prompt Setup New Project
#kendo-jquery-assistant Create a simple HTML page that utilizes Kendo UI for jQuery and add a Grid with sample local data.
```
```js
```

```prompt Component Overview
#kendo-jquery-assistant What are the main Kendo UI for jQuery components and their primary use cases?
```
```js
```

## Component-Specific Prompts

Below are grouped prompt ideas for popular and feature‑rich Kendo UI for jQuery components.

---
### Grid
The [Kendo UI for jQuery Grid]({% slug overview_kendoui_grid_widget %}) renders tabular data with rich interactivity (sorting, filtering, grouping, editing, export, virtualization, and more).

```prompt Basic Grid
#kendo-jquery-assistant Create a Kendo UI for jQuery Grid that displays employees with fields: id, name, position, salary. Enable sorting and paging. Use inline dummy data (array of objects). Page size 10.
```
```js
```

```prompt Row Filtering
#kendo-jquery-assistant Create a Grid with filter row mode. Provide default operators: name (contains), position (startswith), salary (gte), hireCity (eq). Include sample inline data.
```
```js
```

```prompt Export to Excel & PDF
#kendo-jquery-assistant Add Excel and PDF export to a Kendo UI for jQuery Grid that lists employees. Use inline data.
```
```js
```

```prompt Virtualization
#kendo-jquery-assistant Create a Grid with row virtualization for a large local dataset. Use server paging, page size 100, height 400, and columns: id, name, email, department, salary (currency).
```
```js
```

```prompt Column Templates
#kendo-jquery-assistant Create a Grid with columns: Name (template shows Name and Age), StartDate (dd/MM/yyyy), Status (shows Active / Inactive based on boolean). Inline data.
```
```js
```

```prompt Inline Editing
#kendo-jquery-assistant Generate a Grid with inline editing for fields id (non editable), name (required), position (dropdown editor), salary (numeric), hireDate (date picker).
```
```js
```

### TreeList
The [Kendo UI for jQuery TreeList]({% slug overview_kendoui_treelist_widget %}) enables you to display self-referencing tabular data and allows you to sort, filter, and edit data.

```prompt Basic TreeList
#kendo-jquery-assistant Create a Kendo UI for jQuery TreeList showing hierarchical employees (Id, Name, Title, ReportsTo). Enable sorting and expand all nodes on load.
```
```js
```

```prompt TreeList Filtering and Sorting
#kendo-jquery-assistant Create a Kendo UI for jQuery TreeList showing hierarchical employees (Id, Name, Title, ReportsTo). Enable row filtering and sorting.
```
```js
```

### Chart
The [Kendo UI for jQuery Charts]({% slug overview_kendoui_charts_widget %}) provide a comprehensive charting solution for data visualization with multiple chart types and customization options.

```prompt Multiple Charts
#kendo_jquery_assistant Create three different charts to give different visual demonstration of the 8 most air polluted cities in the world.
```
```js
```

```prompt Smooth Area Chart
#kendo_jquery_assistant Create Kendo Area Chart with smooth style (two series) over Jan–Dec. Inline arrays. Markers visible. Shared tooltip.
```
```js
```

```prompt Stacked Bar Chart
#kendo_jquery_assistant Create self-contained Stacked Bar Chart (Male vs Female) across age bands ["0–18","19–29","30–44","45–64","65+"]. Legend top; Shared tooltip.
```
```js
```

```prompt Area Chart with Time Data
#kendo_jquery_assistant Build an area chart with time data using date/time axis and enabled zooming.
```
```js
```

### Scheduler
The [Kendo UI for jQuery Scheduler]({% slug overview_kendoui_scheduler_widget %}) enables you to create calendar and scheduling applications with multiple view types and rich editing capabilities.

```prompt Basic Scheduler
#kendo_jquery_assistant Create a page that contains a basic Scheduler component with 3 views - day, month and week.
```
```js
```

```prompt Scheduler with custom Toolbar
#kendo_jquery_assistant Create a Scheduler that contains a custom Combobox in its Toolbar. Also add a Button in the toolbar to navigate to the current date.
```
```js
```

```prompt Export Scheduler to PDF
#kendo_jquery_assistant Implement export functionality in the Scheduler to allow users to save events as PDF files.
```
```js
```

### Editor

The [Kendo UI for jQuery Editor]({% slug overview_kendoui_editor_widget %}) provides a rich text editing experience with support for various content types, including text, images, and tables. It includes features like formatting, styling, and content manipulation.

```prompt Basic Editor
#kendo_jquery_assistant Add an Editor to the page. Add only 5 tools in the Editor.
```
```js
```

```prompt Basic Editor
#kendo_jquery_assistant Configure an Editor with paste cleanup functionality to remove unwanted formatting and tags from copied content.
```
```js
```


### ComboBox
The [Kendo UI for jQuery ComboBox]({% slug overview_kendoui_combobox_widget %}) allows you to display a single selection from a list of choices, and provides virtualization and customization through templates.


```prompt Basic ComboBox
#kendo-jquery-assistant Create a ComboBox bound to an inline array of products with fields id and name. Placeholder "Select product". Filter contains.
```
```js
```

```prompt Cascading ComboBoxes
#kendo-jquery-assistant Create two ComboBoxes. The second one cascades from the first one.
```
```js
```

### DropDownList
The [Kendo UI for jQuery DropDownList]({% slug overview_kendoui_dropdownlist_widget %}) allows you to display a single selection from a list of choices, and provides virtualization and customization through templates.

```prompt Basic ComboBox
#kendo-jquery-assistant Create a DropDownList with category data and include a default "Select category..." option.
```
```js
```

```prompt DropDownList with Filtering
#kendo-jquery-assistant Create a DropDownList with countries data and enable filtering. Show how to handle the filtering event.
```
```js
```

### MultiSelect
The [Kendo UI for jQuery MultiSelect]({% slug overview_kendoui_multiselect_widget %}) allows you to display a multiple selection from a list of choices. It provides virtualization and customization through templates.


```prompt Basic MultiSelect
#kendo-jquery-assistant Create a MultiSelect with an array of product objects.
```
```js
```

```prompt MultiSelect with Checkboxes
#kendo-jquery-assistant Create a MultiSelect with checkboxes bound to a simple list of countries and show the selected count.
```
```js
```

### DatePicker
The [Kendo UI for jQuery DatePicker]({% slug overview_kendoui_datepicker_widget %}) enables you to select a date from a calendar or through a direct input.


```prompt DatePicker with Default Value
#kendo-jquery-assistant Render a DatePicker with a default selected date.
```
```js
```

```prompt DatePicker with Week Numbers
#kendo-jquery-assistant Configure the DatePicker to show week numbers in its calendar popup.
```
```js
```
```js
```

```prompt Disabled Dates
#kendo-jquery-assistant Build a DatePicker for appointment booking that disables specific dates (holidays array).
```
```js
```

```prompt Adaptive Mode
#kendo-jquery-assistant Create an adaptive DatePicker using the adaptive mode for a mobile friendly user interface.
```
```js
```

### Form
The [Kendo UI for jQuery Form]({% slug overview_kendoui_form_widget %}) provides a variety of built-in options and features to generate and manage forms in your application.


```prompt Validation
#kendo-jquery-assistant Create a Form with required validation on FirstName and Email. Enable ValidationSummary.
```
```js
```

```prompt Editors
#kendo-jquery-assistant Show me how to create a Form that has three fields - a textbox for the name, a DatePicker for start date and a DropDownList for the selected tier (free, premium, ultimate).
```
```js
```

## See Also
* [Intended Use & Recommendations]({% slug ai_coding_assistant_overview %})
* [MCP Server Usage]({% slug kendo_jquery_mcp_server %})