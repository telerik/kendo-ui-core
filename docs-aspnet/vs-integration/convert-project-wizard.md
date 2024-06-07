---
title: Adding Telerik UI to Existing Projects
page_title: Adding Telerik UI to Existing Projects
description: "Learn how to convert an existing {{ site.framework }} application to a {{ site.product }} application."
previous_url: /installation/vs-integration/convert-project-wizard, /getting-started/vs-integration/convert-project-wizard, /vs-integration-mvc/convert-project-wizard
slug: convertprojectwizard_visualstudio_aspnetcore
position: 10
---

# Adding {{ site.product }} to Existing Projects

Enhance existing {{ site.framework }} applications with Telerik UI Components such as [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}), [Chart]({% slug htmlhelpers_charts_aspnetcore %}), [DropDownList]({% slug htmlhelpers_dropdownlist_aspnetcore %}), and more with a few mouse clicks.

The **Convert Project Wizard** turns an existing {% if site.core %}ASP.NET Core{% else %}ASP.NET MVC 5{% endif %} app into a {{ site.product }} app&mdash;an application that is ready to use the Telerik UI components. The wizard handles the setup of NuGet packages and client-side resources for you. Once complete, you can directly reference a specific release version of the {{ site.product }} in your app. This allows you to start using the Telerik UI components without additional manual configuration.

{% if site.core %}
> The Convert Project Wizard does not support converting Razor Pages projects and projects with .Net version 5.
> The Convert Project Wizard is independent from the Visual Studio version and requires:
 - A .NET Core project version 3.1, 6, 7 or 8
 - The `Microsoft.NET.Sdk.Web` to be included as property of the project file
    ```
        <Project Sdk="Microsoft.NET.Sdk.Web">
            <!-- omitted for brevity -->
        </Project>
    ```
Alternatively, the `Microsoft.NET.Sdk.Web` can be included with the following dependencies as well `Microsoft.AspNetCore`, `Microsoft.AspNetCore.App`, `Microsoft.AspNetCore.All`.
{% endif %}

## Using the Convert Project Wizard

To use the **Convert Project Wizard**, install the {{ site.product }} [Visual Studio Extensions]({% slug overview_visualstudio_aspnetcore %}#installing-the-extensions).

To start the wizard, use either the **Extensions** menu in VS or the context menu in the **Solution Explorer**:

- You can start the **Convert Project Wizard** from the Extensions menu at the top. In Visual Studio's Solution Explorer select the project, not the solution, click **Extensions** > **Telerik** > **{{ site.product }}** > **Convert to Telerik Application**.

{% if site.core %}
![{{ site.product_short }} Convert Wizard in VS from Extensions](../vs-integration/images/select-wizard.png)
{% endif %}

- Alternatively, use the context menu in the **Solution Explorer**:

    1. In the **Solution Explorer**, select the ASP.NET Core app you want to convert to Telerik Application.
    1. Right-click the project file and select **{{ site.product }}** > **Convert to Telerik Application**.
    1. Follow the wizard.

{% if site.core %}
![{{ site.product_short }} Convert Wizard in VS from context menu](../vs-integration/images/start-wizard-context.png)
{% endif %}

The conversion wizard provides the following steps:  
- [Version selection](#version-selection)
- [Theme selection](#theme-selection)
- [Project settings](#project-settings)

## Version Selection

The version selection allows you to choose which version of {{ site.product }} to use in your application.

{% if site.core %}
![{{ site.product_short }} Version selection](../vs-integration/images/convert-wizard-version.png)
{% else %}
![{{ site.product_short }} Version selection](../vs-integration/images/images-mvc/convert_distribution.png)
{% endif %}

## Theme Selection

The theme selection allows you to choose from a large list of professionally styled built-in themes for your {{ site.product }} application.

{% if site.core %}
![{{ site.product_short }} Theme selection](../vs-integration/images/theme-selection.png)
{% else %}
![{{ site.product_short }} Theme selection](../vs-integration/images/images-mvc/convert_theme.png)
{% endif %}

## Project Settings

The **Project Settings** page enables you to modify the project settings by configuring the following options:

- **Render Right-To-Left**&mdash;Updates the master page with the Right-to-left support class and adds CSS reference for RTL styles.
- **Copy Editor Templates**&mdash;Copies the predefined editor templates to `~/Views/Shared/EditorTemplates`. Existing editor templates will be overwritten.
- **Copy Global Resources**&mdash;Copies the localization files to {% if site.core %}`~/wwwroot/lib/kendo-ui/js/messages`{% else %}`~/Scripts/kendo/{version}/cultures`{% endif %}.
- **Use CDN Support**&mdash;Enables or disables the [Kendo UI CDN support](https://docs.telerik.com/kendo-ui/intro/installation/cdn-service).

{% if site.core %}
![{{ site.product_short }} Project settings](../vs-integration/images/project-settings.png)
{% else %}
![{{ site.product_short }} Project settings](../vs-integration/images/images-mvc/convert_settings.png)
{% endif %}

The wizard automates several steps that are crucial for the project configuration. If you decide to perform these steps manually, follow the links below:

- [Adding the NuGet Package]{% if site.core %}({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#adding-the-nuget-package){% else %}({% slug setupwithnuget_aspnetmvc %}#installing-the-nuget-package){% endif %}
{% if site.core %}
- [Setting for JSON Serialization]({% slug jsonserialization_core %}) 
{% endif %}
- [Adding a reference to Kendo.MVC.UI]{% if site.core %}({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#adding-a-reference-to-kendomvcui){% else %}({% slug manualsetup_aspnetmvc %}#downloading-and-referencing-the-kendomvcdll-assembly){% endif %}
- [Including the client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})

{% if site.mvc %}
## Conversion of Existing Telerik MVC Extensions Projects

You can convert an existing Telerik MVC Extensions project by using the **Convert Project Wizard**. This adds the Kendo UI components to the project without removing the existing Telerik MVC Extensions content. For compatibility reasons, the Kendo UI Convert Wizard will attempt to disable the Telerik MVC Extensions embedded jQuery usage because it might interfere with the Kendo UI jQuery inclusion.
{% endif %}

## See Also

* [Using the CDN Services]({% slug cdnservices_core %})
* [Installing {{ site.product }} with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
