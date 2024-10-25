---
title: Configuring Existing Projects
page_title: Configuring Existing Projects
description: "Learn how to configure a {{ site.product }} application with Visual Studio."
previous_url: /installation/vs-integration/configure-project-wizard, /getting-started/vs-integration/configure-project-wizard, /vs-integration-mvc/configure-project-wizard
slug: projectwizardconfig_visualstudio_aspnetcore
position: 13
---

# Configuring Existing {{ site.product }} Projects

This article demonstrates how to configure an existing {{ site.product }} application by using the **Project Configuration Wizard**. The wizard comes with the {{ site.product }} VS extension and helps you to modify settings like visual theme, use of CDN, localization, and right-to-left configuration in an existing project.

To use the wizard, your project must be already [configured as a {{ site.product }} application]({%slug convertprojectwizard_visualstudio_aspnetcore%}) and to use the Telerik UI components.

To open the **Project Configuration Wizard**, click **Extensions** > **Telerik** > **{{ site.product }}** > **Configure Project**.

{% if site.core %}
![{{ site.product_short }} Visual Studio 2022 Extensions menu](../vs-integration/images/configure-project-core.png)
{% else %}
![{{ site.product_short }} Visual Studio 2019 Extensions menu](../vs-integration/images/images-mvc/configure_menu.png)
{% endif %}

The configuration wizard handles the following tasks:  
- [Theme selection](#theme-selection)
- [Project settings configuration](#project-settings)

## Theme Selection

The **Theme Selection** page enables you to change the [visual theme](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#getting-started) of your {{ site.product }} application.

{% if site.core %}
![{{ site.product_short }} Visual theme configuration page of the Project Configuration Wizard](../vs-integration/images/configure_theme.png)
{% else %}
![{{ site.product_short }} Visual theme configuration page of the Project Configuration Wizard](../vs-integration/images/images-mvc/configure_theme.png)
{% endif %}

After selecting the desired theme, click **Next** to navigate to the [Project settings](#project-settings) page.

## Project Settings

The **Project Settings** page allows you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;Updates the master page with the right-to-left (RTL) support class and adds a CSS reference for RTL styles.
- **Copy Global Resources**&mdash;Copies the localization files to {% if site.core %}`~/wwwroot/lib/kendo-ui/js/messages`{% else %}`~/Scripts/kendo/{version}/cultures`{% endif %}.
- **Use CDN Support**&mdash;Enables or disables the [Kendo UI CDN support](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

{% if site.core %}
![{{ site.product_short }} Project settings configuration page of the Project Configuration Wizard](../vs-integration/images/configure_settings.png)
{% else %}
![{{ site.product_short }} Project settings configuration page of the Project Configuration Wizard](../vs-integration/images/images-mvc/configure_settings.png)
{% endif %}

## See Also

* [Integrating {{ site.product }} in Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Downloading the Latest {{ site.product }} Versions]({% slug latestversionretrieval_visualstudio_aspnetcore %})
