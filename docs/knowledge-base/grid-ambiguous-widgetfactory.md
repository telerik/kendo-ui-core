---
title: Ambiguous Grid Because Multiple Kinds of Members with This Name Exist
description: An error message occurs about an ambiguous Grid because multiple kinds of members with this name exist in the Kendo.Mvc.UI.Fluent.WidgetFactory class after an upgrade to the 2017.2.621 version.
type: troubleshooting
page_title: The Grid Is Ambiguous Because Multiple Kinds of Members with This Name Exist | Kendo UI Grid for ASP.NET MVC
slug: grid-ambiguous-widgetfactory
tags: ambiguous, grid, upgrade, WidgetFactory
ticketid: 1117665
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr> <tr>
  <td>UI for ASP.NET MVC version</td>  
  <td>2017.2 621</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>VB NET</td>
 </tr>
 <tr>
  <td>MVC Version</td>
  <td>MVC 4</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

## Description

After I upgrade to the 2017.2.621 version, I am getting the following error message:  

````
'Grid' is ambiguous because multiple kinds of members with this name exist in class 'Kendo.Mvc.UI.Fluent.WidgetFactory'.
````

## Solutions

To solve this issue, either:

* [Upgrade to a later version](#upgrading-the-version), or
* [Install a missing NuGet package](#installing-the-missing-nuget-package).

### Upgrading the Version

Upgrade to the Kendo UI R3 2017 version or to internal builds version later than 2017.2 621.

### Installing the Missing NuGet Package

Such an error occurs if the [Microsoft.CodeDom.Providers.DotNetCompilerPlatform](https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform) ([https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform](https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform)) NuGet package is missing from the project.

1. Install the missing package from the NuGet Package Manager in Visual Studio. As a result, the following lines are added to the `web.config` file of your project:  

    ```
    <system.codedom>
        <compilers>
            <compiler language="c#;cs;csharp" extension=".cs" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.CSharpCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.5.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:6 /nowarn:1659;1699;1701" />
            <compiler language="vb;vbs;visualbasic;vbscript" extension=".vb" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.VBCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.5.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:14 /nowarn:41008 /define:_MYTYPE=\"Web\" /optionInfer+" />
        </compilers>
    </system.codedom>
    ```

1. Rebuild the project to locally resolve the error.

1. Deploy the project.

1. Make sure that the `..\bin\roslyn\vbc.exe` file is available.     
