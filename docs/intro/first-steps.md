---
title: First Steps
page_title: First Steps with Your Kendo UI for jQuery Project Guide - Getting Started 
meta_title: First Steps with Kendo UI for jQuery | Kendo UI for jQuery
description: "Learn how to use Kendo UI for jQuery by setting up your development environment, creating a new project, and adding a UI component."
components: ["general"]
tag: "updated"
previous_url: /install/onsite, /getting-started, /intro/getting-started, /using-kendo-with, /getting-started/using-kendo-with, /bootstrapper, /intro/installation/getting-started
slug: getting_started_installation_kendoui
position: 0
---

# Getting Started with Kendo UI for jQuery

This article explains how to use Kendo UI for jQuery in a new application. You will create a project and add a UI component.

{% if site.has_cta_panels == true %}
{% include cta-panel-introduction.html %}
{% endif %}


## Quick Start

Set up your first Kendo UI for jQuery project and start building in minutes. Use the [Kendo CLI]({% slug kendoui_kendo_cli %}) for fast command-line scaffolding or the [Kendo UI Productivity Tools extension for VS Code]({% slug kendoui_vscode_integration %}) for a visual, wizard-driven experience.

<TabStrip>
<TabStripTab title="CLI">

The [Kendo CLI]({% slug kendoui_kendo_cli %}) offers both an [interactive wizard]({% slug kendoui_kendo_cli %}#kendo-create-jquery) and direct setup commands. If you are new to Kendo UI for jQuery, the wizard gives you the fastest way to start.

1. Install the Kendo CLI globally:

    ````SH.skip-repl
    npm i -g @progress/kendo-cli@latest
    ````

1. Launch the interactive wizard by running `kendo` with no arguments:

    ````SH.skip-repl
    kendo
    ````

1. In the **Quick Start** section, select **Create a new project**, then follow the prompts to configure your project.

When the setup is complete, the wizard shows a summary similar to this:

````sh
╭───────────────────────────────────────────────────────────────╮
│  ✓ Kendo UI for jQuery app ready                              │
│                                                               │
│  Next steps:                                                  │
│    cd MyApp                                                   │
│    npm install                                                │
│    npm start                                                  │
│                                                               │
│  Theme       Default                                          │
│                                                               │
│  Docs  https://www.telerik.com/kendo-jquery-ui/documentation  │
╰───────────────────────────────────────────────────────────────╯
````

Run the commands in the **Next steps** section to install dependencies and start the development server.

> Prefer to run commands manually? See [Generate a Kendo UI for jQuery Project]({% slug kendoui_kendo_cli %}#kendo-create-jquery) for all available options and templates.

</TabStripTab>
<TabStripTab title="VS Code Extension">

Use the [Kendo UI Productivity Tools extension for VS Code]({% slug kendoui_vscode_integration %}) to scaffold a project from a template wizard.

1. Install the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=KendoUI.kendotemplatewizard).

1. On Windows, open the **VS Code Command Palette** (`Ctrl + Shift + P`). On macOS, use (`Command + Shift + P`). Type **"Kendo UI Template Wizard: Launch"**.

1. Set the project **name** and **path**, choose **Kendo UI for jQuery** as the project type and select a **Theme** (Meridian, Default, Bootstrap, Material, Fluent, or Classic).

1. Click **Create Project**, then install dependencies and run:

    ````SH.skip-repl
    npm i && npm start
    ````

</TabStripTab>
</TabStrip>

## Have an Existing Project?

If you want to add Kendo UI for jQuery components to an existing project, add the required scripts and styles manually:

1. Add the [Kendo UI theme](https://www.telerik.com/design-system/docs/themes/get-started/introduction/) and scripts to your HTML page:

    ```html
    <!-- Kendo UI theme -->
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Kendo UI scripts -->
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    ```

2. Initialize a Kendo UI component:

    ```html
    <input id="my-datepicker" />

    <script>
        $(function() {
            $("#my-datepicker").kendoDatePicker();
        });
    </script>
    ```

> Prefer installing through a package manager? See [Installing with NPM]({% slug kendoui_npm_packages_kendoui_installation %}).


You now have your first Kendo UI for jQuery component running in your application.

## Next Steps

<article-card-container>
    <article-card
        href="slug://overview_kendoui_grid_widget"
        src="../images/aicomponents/AI_Data_Highlight_Light_Large.svg"
        title="Get Started with Data Grid"
        darkSrc="../images/aicomponents/AI_Data_Highlight_Dark_Large.svg"
        description="Bind the Kendo UI for jQuery Grid to data and choose from the large variety of built-in features.">
    </article-card>
    <article-card
        href="slug://overview_kendoui_datasourcecomponent"
        src="../images/aicomponents/AI_Column_Assistant_Light_Large.svg"
        title="Learn Telerik Data Binding"
        darkSrc="../images/aicomponents/AI_Column_Assistant_Dark_Large.svg"
        description="Learn the data binding fundamentals for Kendo UI for jQuery components.">
    </article-card>
    <article-card
        href="slug://welcometo_kendoui#list-of-components"
        src="../images/aicomponents/Editor_AI_Integration_Light_Large.svg"
        title="Use Components"
        darkSrc="../images/aicomponents/Editor_AI_Integration_Dark_Large.svg"
        description="Check the list of available Kendo UI for jQuery components.">
    </article-card>
    <article-card
        href="https://demos.telerik.com/kendo-ui"
        src="../images/aicomponents/Grid_AI_Chat_Integration_Light_Large.svg"
        title="Browse Online Demos"
        darkSrc="../images/aicomponents/Grid_AI_Chat_Integration_Dark_Large.svg"
        description="Explore the live Kendo UI for jQuery examples.">
    </article-card>
    <article-card
        href="slug://sassbasedthemes_kendoui"
        src="../images/aicomponents/AIPrompt_Light_Large.svg"
        title="Create Themes"
        darkSrc="../images/aicomponents/AIPrompt_Dark_Large.svg"
        description="Review the built-in themes, customize them, or create your own.">
    </article-card>
    <article-card
        href="slug://ai_coding_assistant_overview"
        src="../images/aicomponents/Chat_Light_Large.svg"
        title="Use Telerik AI Tools"
        darkSrc="../images/aicomponents/Chat_Dark_Large.svg"
        description="Kendo UI for jQuery provides AI-powered development assistance through a unified MCP server that delivers intelligent, context-aware help directly in your IDE.">
    </article-card>
</article-card-container>

## See Also

* [Creating Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [Video Onboarding]({% slug getting_started_video_onboarding %})
* [Licensing Overview]({% slug licensing-overview %})

<style>
[class^="tab-strip-module--container"] {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    padding: 15px;
}

[class^="tab-strip-module--tabList"] [class^="tab-strip-module--tabElement"]:first-child::after {
    content: "Recommended";
    display: inline-block;
    margin-left: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #e7f6ec;
    color: #1f7a3d;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    vertical-align: middle;
}
</style>
