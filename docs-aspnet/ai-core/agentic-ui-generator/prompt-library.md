---
title: Prompt Library
page_title: Agentic UI Generator Prompt Library
description: Explore example prompts that demonstrate the capabilities of the Telerik UI for ASP.NET Core Agentic UI Generator for building modern web applications.
slug: agentic-ui-generator-prompt-library-core
position: 4
tags: telerik,aspnet-core,ai,agentic,ui,generator,prompts
previous_url: /ai/ai-coding-assistant/prompt-library
published: True
tag: updated
---

# Agentic UI Generator Prompt Library

The prompts in this library are optimized for use with the Telerik UI for ASP.NET Core AI tools - the Telerik ASP.NET Core MCP Server. They can help you accelerate the creation and styling of modern web applications, from individual components to complete responsive pages and custom themes.

>tip [Go straight to the prompts ⬇️](#general-prompts)

## How to Use the Prompts

The prompts in this library target the [Agentic UI Generator](slug:agentic-ui-generator-getting-started-core). You can invoke them by using the dedicated assistant handle syntax in a supported AI client.

Use the dedicated `#handle` syntax, such as `#telerik_ui_generator`, to prefix your prompt when working with GitHub Copilot and the Telerik ASP.NET Core MCP Server.

Make sure that you have [installed and enabled](slug:agentic-ui-generator-getting-started-core#quick-start) the Agentic UI Generator before attempting to run the prompts.

1. Browse the [prompt library](#general-prompts) to find a prompt that suits your needs.
2. Copy the prompt text, including the handle prefix if shown.
3. (Optional) Customize the prompt as needed for your specific use case.
4. Run the prompt in your AI-powered IDE.

### General Prompts

This section provides examples of common UI creation tasks that demonstrate the capabilities of the Agentic UI Generator. The Agentic UI Generator is the main tool for building full UI flows and coordinates all other tools to deliver complete solutions.

```prompt Project Setup
I have created an empty application that now needs a login screen and an admin dashboard. Add a login form with email/password fields and validation using Telerik UI for ASP.NET Core components. After a successful login, redirect to an admin dashboard page featuring a sidebar menu and a main content area displaying key metrics and recent activity.
```
```Razor
```

```prompt System Dashboard Section
Create a new page using the existing top navigation and footer. In the middle, add 3 rows with 3 responsive columns each. The top row shows system health KPIs for CPU, memory, and error counts. The middle row includes a Log Stream panel, a Telerik LineChart of API response times, and a BarChart of requests per service. The bottom row contains a Deployment History table, an Alerts panel, and a list of open tickets.
```
```Razor
```

```prompt Appointments Dashboard
Create a responsive appointments dashboard in the Schedule.razor page using a 3x2 grid layout. The top row contains a Telerik dropdown to filter appointments by doctor and a list of today's upcoming appointments. The middle row displays a month-view scheduler showing the filtered appointments. The bottom row shows a bar chart visualizing doctor occupancy rates and a pie chart showing appointment status distribution (completed, pending, canceled).
```
```Razor
```

```prompt Responsive Page
Create a product catalog page with a responsive CSS layout that uses Telerik components. The layout should display product cards. Add a Telerik toolbar with filtering options and an expandable detail view for each product that works seamlessly on mobile, tablet, and desktop.
```
```Razor
```

```prompt Landing Page
Build a landing page similar to the "Automotive Industry" Telerik page UI template with a hero section, feature highlights, statistics, and a call-to-action section.
```
```Razor
```

```prompt Employee Directory
Add an employee directory page with a search bar and department filter at the top. Display employee details in a responsive grid layout showing names, titles, and hiring dates. Include a TreeView on the left for navigating the organizational hierarchy. Add a Tooltip showing detailed employee information when a row in the Grid is hovered.
```
```Razor
```

```prompt Event Management Calendar
Create an event management interface with a Scheduler component as the main element displaying events in month, week, and day views. Add a top toolbar with view switcher, date navigation, and create event button. Include a sidebar showing upcoming events list and a small Calendar for quick date selection. Add filtering options for event types and venues.
```
```Razor
```

```prompt Healthcare Patient Portal
Build a patient portal with a Card layout showing different sections: upcoming appointments with a ListView, current prescriptions Grid, recent lab results with expandable rows, and a messaging panel for communicating with healthcare providers. Add a top navigation with icons for appointments, records, billing, and messages. Include a notification Badge showing unread messages.
```
```Razor
```

```prompt Maintenance Schedule
Add a maintenance tracking page with a Grid listing all machines showing last service date, next scheduled maintenance, operating hours, and status indicators. Add a Form for scheduling maintenance with DateTimePicker, technician DropDownList, and maintenance type CheckBoxList. Include a Chart showing downtime analysis.
```
```Razor
```

```prompt Employee Wizard
Create an employee onboarding wizard (using the Telerik Wizard) with step icons: user for personal info, briefcase for job details, id-card for credentials, checkmark for review. Step 1 shows a Form for name, email, and phone with user icon in the header. Step 2 displays department DropDownList and role selection with briefcase icon. Step 3 contains system access CheckBoxList and password setup with lock icon. Final step shows a summary Card with all entered information and a submit Button with checkmark icon.
```
```Razor
```

### Assistant Prompts

For more precise control, you can target a specific skill or assistant directly.


You can invoke the specialized assistants individually using their dedicated handles.

| Assistant | Handle | Purpose |
|------------|-------------|-------------|
| Getting Started Assistant| `#telerik_getting_started_assistant` | Performs the initial Telerik UI for ASP.NET Core setup workflow, including project scaffolding, Telerik NuGet setup, Telerik MCP server configuration, and license activation. You can specify the project name, project type, and Kendo theme for the scaffolded app. Use this assistant when you want to get from zero setup to your first working prompt quickly. |
| Layout Assistant | `#telerik_layout_assistant` | Applies suitable CSS utility classes from the [Progress Design System](https://www.telerik.com/design-system/docs/) for styling and positioning elements. Use this assistant when you need help with spacing, typography, colors, layout structure, or transforms. |
| Component Assistant | `#telerik_component_assistant` | Answers questions and generates code related to Telerik UI for ASP.NET Core components. Use this assistant when you need to implement or configure specific Telerik UI for ASP.NET Core components like Grid, Charts, Forms, and more. |
| Style Assistant | `#telerik_style_assistant` | Generates custom styles and theme configurations for your application. Use this assistant when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI. |
| Icon Assistant | `#telerik_icon_assistant` | Searches and retrieves icons from the [Progress Design System Iconography](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/) by name, category, or keywords. Use this assistant when you need to find and add specific icons for your UI components or design elements. |
| Accessibility Assistant | `#telerik_accessibility_assistant` | Provides WCAG 2.2 Level AA guidance and component-specific accessibility implementation details. Use this assistant to ensure your UI meets compliance standards, implement correct ARIA roles, validate color contrast, and retrieve accessibility API references for Telerik UI for ASP.NET Core components. |
| Validator Assistant | n/a | Not designed to be invoked manually. It is called automatically by the UI Generator Orchestrator and ensures the generated code follows Telerik UI for ASP.NET Core best practices and standards. |

#### Getting Started Assistant Prompts

```prompt
#telerik_getting_started_assistant create a new telerik asp.net core web app with a responsive dashboard page and Telerik UI components configured through the Telerik MCP server
```

#### Layout Assistant Prompts

The Layout Assistant applies suitable CSS utility classes from the [Progress Design System](https://www.telerik.com/design-system/docs/) for styling and positioning elements. Use it when you need help with spacing, typography, colors, layout structure, or transforms.

```prompt Responsive Layout
#telerik_layout_assistant Update the existing page layout by adding a new section in the middle of the page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message. Make the page responsive with proper spacing and typography.
```
```Razor
```

#### Component Assistant Prompts

The Component Assistant answers questions and generates code related to Telerik UI for ASP.NET Core components. Use this tool when you need to implement or configure specific Telerik UI for ASP.NET Core components like the Grid, Charts, Forms, and more.

```prompt Interactive Data Page
#telerik_component_assistant Create a Grid component with paging, sorting, and filtering. Include column configuration for a product catalog with name, price, category, and actions. Ensure the Grid is properly integrated into a card layout with responsive design and consistent spacing.
```
```Razor
```

```prompt Multi-Component Data View
#telerik_component_assistant Insert a new section with a Grid on the left to filter and sort product data. On the right, add a Chart and DateRangePicker to visualize product sales over time. Both components should be data-bound to the same source.
```
```Razor
```

#### Style Assistant Prompts

The Style Assistant generates custom styles and theme configurations for your application. Use this assistant when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Accessible Color Theme
#telerik_style_assistant Generate a custom theme for a corporate blue and green color scheme with high contrast accessibility requirements.
```
```Razor
```

```prompt Dark Mode Theme
#telerik_style_assistant Create a comprehensive dark mode theme with a dark background, light text, subtle border radius on cards and buttons, and increased spacing between the UI components.
```
```Razor
```

</div>

#### Icon Assistant Prompts

The Icon Assistant searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this assistant when you need to find and add specific icons for your UI components or design elements.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Navigation Icons
#telerik_icon_assistant Add icons suitable for the Home, Settings, and User Profile buttons in my navigation bar.
```
```Razor
```

```prompt Toolbar Action Icons
#telerik_icon_assistant Find appropriate icons for data visualization actions like export, print, refresh, and search in a dashboard toolbar.
```
```Razor
```

</div>

#### Accessibility Assistant

Use the `#telerik_accessibility_assistant` handle to verify WCAG 2.2 Level AA compliance, including color contrast verification, and implement proper accessibility features:

```prompt Grid Cell Template Navigation
#telerik_accessibility_assistant I have a Grid with a custom cell template that has multiple buttons like view report, download PDF, and send email. When I try to navigate with the keyboard, I can't get to these buttons properly. How can I make the keyboard navigation work for focusable elements inside the cell?
```
```Razor
```

```prompt Grid Row Headers
#telerik_accessibility_assistant I have a Grid that displays employee data where the first column contains employee names, followed by columns for department, salary, and hire date. How can I improve accessibility for screen reader users navigating this table?
```
```Razor
```

</TabStripTab>
</TabStrip>



## See Also

* [Telerik MCP Server Overview](slug:ai-overview-core)
* [Getting Started with the Agentic UI Generator](slug:agentic-ui-generator-getting-started-core)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
