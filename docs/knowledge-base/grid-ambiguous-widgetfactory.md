---
title: Error: 'Grid' is Ambiguous Because Multiple Kinds of Members with this Name Exist
description: 'Grid' is ambiguous because multiple kinds of members with this name exist in class 'Kendo.Mvc.UI.Fluent.WidgetFactory' after upgrade to 2017.2.621
type: troubleshooting
page_title: 'Grid' is Ambiguous Because Multiple Kinds of Members with this Name Exist in Class 'Kendo.Mvc.UI.Fluent.WidgetFactory'
slug: grid-ambiguous-widgetfactory
position: 0
tags: ambiguous, grid, upgrade, WidgetFactory
teampulseid:
ticketid: 1117665
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr> <tr>
  <td>UI for ASP.NET MVC version</td>  <td>2017.2 621</td>
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
I'm getting the following error after upgrading to version 2017.2 621:  

````
'Grid' is ambiguous because multiple kinds of members with this name exist in class 'Kendo.Mvc.UI.Fluent.WidgetFactory'.
````

## Solution
  
The error in question will be thrown if the following __NuGet__ package is missing from the project:

* [Microsoft.CodeDom.Providers.DotNetCompilerPlatform](https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform) ([https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform](https://www.nuget.org/packages/Microsoft.CodeDom.Providers.DotNetCompilerPlatform))
  
Installing the package in your project from the __NuGet Package Manager__ in __Visual Studio__ should add the following lines in your __web.config__ file:  

````
<system.codedom>
    <compilers>
        <compiler language="c#;cs;csharp" extension=".cs" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.CSharpCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.5.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:6 /nowarn:1659;1699;1701" />
        <compiler language="vb;vbs;visualbasic;vbscript" extension=".vb" type="Microsoft.CodeDom.Providers.DotNetCompilerPlatform.VBCodeProvider, Microsoft.CodeDom.Providers.DotNetCompilerPlatform, Version=1.0.5.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" warningLevel="4" compilerOptions="/langversion:14 /nowarn:41008 /define:_MYTYPE=\"Web\" /optionInfer+" />
    </compilers>
</system.codedom>
````
  
Once you install the NuGet package and rebuild the project, the issue should be resolved.    
  
