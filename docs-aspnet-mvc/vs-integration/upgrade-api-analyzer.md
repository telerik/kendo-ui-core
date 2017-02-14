---
title: Upgrade API Analyzer tool
page_title: Upgrade API Analyzer tool | UI for ASP.NET MVC Visual Studio Integration
description: "Learn how to analyze a Telerik UI for ASP.NET MVC application."
slug: upgrade_api_analyzer_visualstudio_aspnetmvc
position: 8
---

# Telerik Upgrade API Analyzer 

With every release of UI for ASP.NET MVC, we try to avoid introducing changes that affect the public API. However, sometimes such changes are needed for the product to evolve. We understand that this could cause issues when  you upgrade your app to the latest Telerik release. That is why we have the **Telerik Upgrade API Analyzer**; its purpose is to make your upgrade process easier by comparing both versions and determining the problematic areas.

Aside from UI for ASP.NET MVC product, Telerik Upgrade API Analyzer could be used when upgrading your desktop application such as WPF or WinForms as well as your Silverlight application.

**Telerik Upgrade API Analyzer** currently supports Telerik releases from  Q2 2013 SP1 (2013.2.918) until Q1 2017 (2017.1.118). Additional releases can be added upon request. 

## Why Do You Need This Tool?
           
In short, the __Telerik Upgrade API Analyzer__ tool will help you with the upgrade of the Telerik controls to a newer version. It thoroughly analyzes the code of your project and provides a list of the changes found between the currently used release and the release you’re planning to upgrade to. Such changes could include obsolete and removed methods and properties as well as modified methods and properties. Additionally, the tool points out the exact piece of code that is affected by a certain change and in cases that involve an obsolete method/property, the tool gives suggestions of how to modify that code.                      


>importantAt this stage of development, Telerik Upgrade API Analyzer checks only the **C#** code of your application. 

## Where Do You Get Telerik Upgrade API Analyzer?

**Telerik Upgrade API Analyzer** is a **ClickOnce** application and you can download the installation file directly from [our site](http://demos.telerik.com/UpgradeAPIAnalyzer/setup.exe).

>The tool relies on **Microsoft .NET Framework 4.5.2** and if you haven’t got the framework on your machine, the setup of the tool installs it automatically.

## How Do You Use The Tool?

Running the __Telerik Upgrade API Analyzer__ opens the screen shown in __Figure 1__.

#### __Figure 1: Initial screen of  Telerik Upgrade API Analyzer__

![](images/upgrade-api-analyzer_0.png)

All you need to do is:

1. Choose the platform.

2. Select the current version of Telerik assemblies you are using.

3. Select the version you would like to upgrade to. 

	The three comboboxes are populated on the fly depending on your choices, so you should select the desired values consecutively.

4. Open the solution you’re planning to upgrade.  

> **Important**
> 
>You can also run the Telerik Upgrade API Analyzer from the [Upgrade Project Wizard]({%slug projectwizardupgrade_visualstudio_aspnetmvc%}), by clicking the *Compatibility* button (see **Figure 2**). In this case, the tool opens with *Technology*, *Your Version* and *Version to Upgrade* parameters pointed out in the wizard. When Upgrade API Analyzer is started directly through the *Compatibility* button without installing the tool first, the installation starts automatically. In case .NET Framework 4.5.2 is not present on your machine, the application prompts you to install it manually at the end of the installation.

#### __Figure 2: Compatibility button in Upgrade Project Wizard__

![](images/upgrade-api-analyzer_5.png)

The tool starts analyzing the code, as shown in __Figure 3__, and lists all the changes found between both versions, as demonstrated in __Figure 4__. 

#### __Figure 3: The tool starts analyzing as soon as you open a solution__

![](images/upgrade-api-analyzer_1.png)

#### __Figure 4: Upgrade API Analyzer lists the found differences__

![](images/upgrade-api-analyzer_2.png)
 
__Upgrade API Analyzer__ provides a detailed list of the found differences between both versions in a convenient way for reviewing.  The tool uses [RadGridView for WPF](http://docs.telerik.com/devtools/wpf/controls/radgridview/overview2.html) to present the results, so you can benefit from its features such as sorting, filtering and resizing columns. 

For each of the changes, you can see the following information:

* __Difference__: It could be Obsolete, Deleted and Modified.

By default, the Modified changes are not shown as they actually indicate that there is an internal change in the method/class, which does not affect its function as a whole and does not require any action from your side. Still, you could see the __Modified__ changes by updating the Filter of the __Difference__ column as shown in __Figure 5__.

#### __Figure 5: Displaying all the changes found including the Modified ones.__

![](images/upgrade-api-analyzer_3.png)

* __Kind__: It could be Type, Property, Method, and Field.
* __Node__: The name of the Type/Property/Method/Field.
* __Assembly__: The assembly where the change is found.
* __Message__: Presents a kind of “What to do now?” message; gives additional information on what action should be taken regarding the concrete change in order to make the upgrade flawless.
* __Project__: The project where the change resides.
* __Source__: The file in the project where the change is found.
* __Line__: The exact line in the source file.
* __Character__: The character in the previously set line.

Additionally, __Upgrade API Analyzer__ provides the option to save the gathered information for a later moment through the __Export button__ in the upper right corner, as shown in __Figure 6__. The data will be arranged and exported to a HTML document. The exported information include the currently visible (filtered) data in the grid.

#### __Figure 6: API Analyzer provides export to a HTML document__

![](images/upgrade-api-analyzer_4.png)

## Do You Have a Question?

__Upgrade API Analyzer__ is a subject of current and future development and we’d appreciate any feedback you might have regarding the tool. Let us know what you’d expect the tool to do and whether you’ve experienced any issues with it. Your feedback will help us prioritize our plans for adding the most requested features.

Please send us your comments either through the Feedback link inside __API Analyzer__ or directly at [UpgradeApiAnalyzer@telerik.com](mailto:UpgradeApiAnalyzer@telerik.com).

Additionally, please review the Frequently Asked Questions section in the [API Analyzer Helps Upgrading Telerik Projects](http://www.telerik.com/blogs/api-analyzer-helps-upgrading-telerik-projects) blog post.
