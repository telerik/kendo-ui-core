---
title: Using an Older Telerik.SvgIcons Version with the Icon Overrides Service
description: "Learn how to use older Telerik.SvgIcons with the Icon Overrides service in {{ site.product }}."
type: how-to
page_title: Using an Older Telerik.SvgIcons Version with the Icon Overrides Service
slug: use-older-svgicons-version
tags: svg icons, icon overrides, seticons, svgicons, assembly name, namespace, downgrade, migration
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product_long }}</td>
 </tr>
 <tr>
  <td>{{ site.product }} version</td>
  <td>2026.4.1111 and later</td>
 </tr>
</table>

## Description

{{ site.product }} references a specific version of the `Telerik.SvgIcons` package. How can I use the [Icon Overrides]({% slug icon_overrides_aspnetmvc6_aspnetmvc %}) service to display icons from an older version, such as the filled v4 set, without changing the existing package reference?

This article shows how to supply the older icons to the `SetIcons` API in an {{ site.framework }} application.

## Solution

Keep the `Telerik.SvgIcons` version required by {{ site.product }}. The components are compiled against that version and depend on its API. To use older artwork without replacing that dependency, make both icon sets available to the application.

Both package versions use the same assembly name (`Telerik.SvgIcons`), public key token, namespaces, and type names. Although their assembly versions differ, adding both as ordinary references creates naming conflicts. A namespace is not part of an assembly's identity.

Rebuild the older icon set with a **different assembly name and namespace**. The icon classes contain icon data and do not require additional libraries. The application can then reference both assemblies without custom assembly-loading code.

### 1. Get the Icon Sources

The icon sources live in the [telerik/kendo-icons](https://github.com/telerik/kendo-icons) repository under `packages/svg-icons/src-cs`. Clone the repository and check out the tag of the version you need:

```sh
git clone https://github.com/telerik/kendo-icons.git
cd kendo-icons
git checkout v4.11.0
```

If you already have the repository and do not want to change its current checkout, export the folder at that tag instead. Replace `<staging-folder>` with an existing destination folder:

```sh
git archive v4.11.0 packages/svg-icons/src-cs | tar -x -C <staging-folder>
```

The folder contains:

| Item | Contents |
| --- | --- |
| `Telerik.SvgIcons/Models/ISvgIcon.cs` | The icon contract - `Name`, `Content`, `ViewBox`, and `Variants`. |
| `Telerik.SvgIcons/Models/SvgIconBase.cs` | The base class that implements the contract. |
| `Telerik.SvgIcons/Icons/*.cs` | One class per icon. Version 4.11.0 contains 827 files. |
| `Telerik.SvgIcons/SvgIcon.cs` | A generated static class that exposes every icon as a property. |
| `Telerik.SvgIcons/Telerik.SvgIcons.csproj` | The original project file. |

### 2. Build the Assembly Under a Different Identity

Copy the `Icons` and `Models` folders and `SvgIcon.cs` into a new folder. Do not reuse the original project file, because it sets `PackageId` to `Telerik.SvgIcons` and signs the output with the Telerik key.

Every source file declares `namespace Telerik.SvgIcons`. From the folder containing the copied sources, run the following PowerShell script to change these declarations to a distinct namespace, such as `Telerik.SvgIcons.V4`:

```powershell
Get-ChildItem -Recurse -Filter *.cs | ForEach-Object {
    $text = [System.IO.File]::ReadAllText($_.FullName)
    $text = $text -replace 'namespace Telerik\.SvgIcons(?!\.)', 'namespace Telerik.SvgIcons.V4'
    [System.IO.File]::WriteAllText($_.FullName, $text)
}
```

Setting the `RootNamespace` property alone is **not** sufficient. It does not change explicit `namespace` declarations in existing files.

Add a project file next to the copied sources:

```XML
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    <AssemblyName>Telerik.SvgIcons.V4</AssemblyName>
    <RootNamespace>Telerik.SvgIcons.V4</RootNamespace>
    <AssemblyVersion>4.11.0.0</AssemblyVersion>
    <SignAssembly>False</SignAssembly>
    <NoWarn>$(NoWarn);618</NoWarn>
  </PropertyGroup>
</Project>
```

The `618` warning is suppressed because the older icon set marks some of its own members as obsolete, and `SvgIcon.cs` references them.

{% if site.core %}
Build the project:
{% else %}
The project is SDK-style and builds with the .NET SDK even though it is consumed from a .NET Framework application:
{% endif %}

```sh
dotnet build -c Release
```

{% if site.core %}
Build with the .NET SDK. The icon sources require no additional libraries, and the `netstandard2.0` target is compatible with supported {{ site.framework }} applications.
{% else %}
A `netstandard2.0` assembly can be referenced by .NET Framework 4.6.1 and later applications. For an application targeting .NET Framework 4.6.2 or later, you can instead set `<TargetFramework>net462</TargetFramework>` to avoid the .NET Standard compatibility assemblies. If you change the target, replace `netstandard2.0` with `net462` in the output path below.
{% endif %}

Confirm the identity of the result:

```powershell
[System.Reflection.AssemblyName]::GetAssemblyName("bin\Release\netstandard2.0\Telerik.SvgIcons.V4.dll").FullName
```

The output assembly identifies itself as `Telerik.SvgIcons.V4, Version=4.11.0.0, PublicKeyToken=null`, which no longer conflicts with the referenced `Telerik.SvgIcons` assembly. Copy `Telerik.SvgIcons.V4.dll` to a folder in your solution, for example `lib`.

### 3. Reference the Assembly

{% if site.core %}
Add an assembly reference next to the existing package reference. Keep the package version required by your installed {{ site.product }} version; `5.5.0` is used here as an example. Adjust `HintPath` to match the location of the rebuilt assembly:

```XML
<ItemGroup>
  <PackageReference Include="Telerik.SvgIcons" Version="5.5.0" />
  <Reference Include="Telerik.SvgIcons.V4">
    <HintPath>..\lib\Telerik.SvgIcons.V4.dll</HintPath>
    <Private>true</Private>
  </Reference>
</ItemGroup>
```

`Private` set to `true` copies the assembly to the output folder. Because the two assemblies no longer share an identity, no load context, probing path, or copy target is required.
{% else %}
Add an assembly reference to the project file. Adjust `HintPath` to match the location of the rebuilt assembly:

```XML
<ItemGroup>
  <Reference Include="Telerik.SvgIcons.V4">
    <HintPath>..\lib\Telerik.SvgIcons.V4.dll</HintPath>
    <Private>True</Private>
  </Reference>
</ItemGroup>
```

`Private` set to `True` copies the assembly into `bin`. Because the two assemblies no longer share an identity, no `Assembly.LoadFrom` call, probing path, binding redirect, or copy target is required.

Do **not** add the older assembly as a `None` item in a non-SDK project. Assemblies listed as `None` are fed to `ResolveAssemblyReference` through `{CandidateAssemblyFiles}`, which takes precedence over `HintPath`, and the compiler may bind to the wrong assembly.
{% endif %}

### 4. Create the Icons Collection

The `Override` method requires an `ISvgIcon` instance of the **referenced** package. The rebuilt assembly exposes its own `ISvgIcon` under the new namespace, which is a distinct CLR type, so the icon data must be copied into an `SvgIconBase` of the referenced package.

Add the following `KendoV4IconSource` class to the application. It reads the older icon types and creates compatible instances from the referenced package:

```C#
using System;
using System.Collections.Generic;
using System.Linq;
using Telerik.SvgIcons;
using V4 = Telerik.SvgIcons.V4;

public static class KendoV4IconSource
{
    public static IReadOnlyDictionary<string, ISvgIcon> All { get; } = typeof(V4.ISvgIcon).Assembly
        .GetExportedTypes()
        .Where(type => type.IsClass && !type.IsAbstract && typeof(V4.ISvgIcon).IsAssignableFrom(type))
        .Select(type => (V4.ISvgIcon)Activator.CreateInstance(type))
        .Where(icon => !string.IsNullOrEmpty(icon.Name) && !string.IsNullOrEmpty(icon.Content))
        .ToDictionary(icon => icon.Name, icon => (ISvgIcon)new SvgIconBase
        {
            Name = icon.Name,
            Content = icon.Content,
            ViewBox = icon.ViewBox
        }, StringComparer.OrdinalIgnoreCase);

    public static ISvgIcon Get(string name)
    {
        ISvgIcon icon;

        if (!All.TryGetValue(name, out icon))
        {
            throw new ArgumentException(string.Format("Telerik.SvgIcons.V4 does not contain an icon named '{0}'.", name), "name");
        }

        return icon;
    }
}
```

The filter on `Name` and `Content` skips `SvgIconBase`, which implements the contract but carries no icon data. Version 4.11.0 yields 829 icons.

{% if site.mvc %}
In a non-SDK project, include the new file in the project with a `Compile` item. Adjust the path to match the file location:

```XML
<Compile Include="IconOverrides\KendoV4IconSource.cs" />
```
{% endif %}

The `Telerik.SvgIcons` package contains icon types named `Path` and `File`, which can conflict with `System.IO.Path` and `System.IO.File`. Use aliases or fully qualified names if the file also uses these `System.IO` types.

### 5. Register the Overrides

The Icon Overrides service keeps a map of icon names to replacements and consults it whenever a component resolves an icon. It has two scopes:

* `Global` applies to every component.
* `Component` applies to a specific component type and takes precedence over the global map when both define the same icon name.

{% if site.core %}
Register the configuration in `Program.cs`:

```C#
using Kendo.Mvc;

builder.Services.AddKendo(options =>
{
    options.SetIcons(icons => icons
        .Global(global =>
        {
            foreach (var icon in KendoV4IconSource.All)
            {
                global.Override(icon.Key, icon.Value);
            }
        }));
});
```
{% else %}
Register the configuration in `Application_Start` in `Global.asax.cs`:

```C#
using Kendo.Mvc;
using Kendo.Mvc.Infrastructure;

protected void Application_Start()
{
    KendoMvc.Setup(options =>
    {
        options.SetIcons(icons => icons
            .Global(global =>
            {
                foreach (var icon in KendoV4IconSource.All)
                {
                    global.Override(icon.Key, icon.Value);
                }
            }));
    });
}
```
{% endif %}

Overrides are applied in two ways:

* Components that render their icons on the server apply the overrides directly in the HTML response.
* Components that render their icons with JavaScript rely on the client-side configuration generated by `OverrideIcons`.

Add the following call to the shared layout after the Kendo UI scripts and before component initialization. Without it, only server-rendered icons use the overrides:

```Razor
@Html.Kendo().OverrideIcons()
```

{% if site.core %}
In {{ site.product }}, the Menu, ContextMenu, PanelBar, and TabStrip pass a component name on the server, so their overrides appear in the initial HTML. The TreeView and Grid build their icons on the client and depend on the `OverrideIcons` payload.
{% else %}
In {{ site.product }}, the Menu, ContextMenu, PanelBar, TabStrip, TreeView, and Grid all pass a component name on the server, so their overrides are already present in the raw HTML response. Inspect the page source rather than the browser developer tools to confirm this.
{% endif %}

For more details, see the [Icon Overrides]({% slug icon_overrides_aspnetmvc6_aspnetmvc %}) article.

### 6. Map Renamed and Missing Icons

Iterating `All` only overrides names that exist in **both** sets. Comparing 4.11.0 with 5.5.0 gives:

| Group | Count | Result of the global loop |
| --- | --- | --- |
| Names present in both versions | 666 | Overridden - the older artwork is rendered. |
| Names present only in 5.5.0 | 161 | **Not overridden** - the loop has no entry for them, so the newer artwork remains. |
| Names present only in 4.11.0 | 163 | Added to the map but never requested by a component. |

The 161 names found only in 5.5.0 need additional handling. Some icons were **renamed** between versions, so the older set contains equivalent artwork under a different name. The [v4 to v5 migration guide](https://github.com/telerik/kendo-icons/blob/v4.12.0/v4-v5-migration-assets/migration-guide.md) lists these renames.

The guide maps an old name to its new replacement, so read it **in reverse** for this scenario. For example, the guide lists `microphone-solid` as replaced by `microphone`. Version 5.5.0 therefore has `microphone` while 4.11.0 only has `microphone-solid` and `microphone-outline`, and the global loop never produces a `microphone` entry. Add the mapping explicitly:

```C#
{% if site.core %}builder.Services.AddKendo(options =>{% else %}KendoMvc.Setup(options =>{% endif %}
{
    options.SetIcons(icons => icons
        .Global(global =>
        {
            foreach (var icon in KendoV4IconSource.All)
            {
                global.Override(icon.Key, icon.Value);
            }

            global.Override("microphone", KendoV4IconSource.Get("microphone-solid"));
            global.Override("users", KendoV4IconSource.Get("users-solid"));
            global.Override("laptop", KendoV4IconSource.Get("laptop-solid"));
            global.Override("lightbulb", KendoV4IconSource.Get("lightbulb-outline"));
            global.Override("superscript", KendoV4IconSource.Get("supscript"));
        }));
});
```

Add these mappings to the registration from step 5 rather than registering the service again. Place the explicit `Override` calls **after** the loop so the loop cannot overwrite them.

Of the 161 missing names, the migration guide resolves 43. The remaining 118 have no counterpart in 4.11.0, including `tree-view`, `map-pin`, and `rocket`. These icons retain their newer artwork unless you supply a custom `ISvgIcon`. The following example illustrates the configuration; replace the placeholder `Content` with valid SVG path markup:

```C#
global.Override("rocket", new SvgIconBase
{
    Name = "rocket",
    Content = "<path d=\"...\" />",
    ViewBox = "0 0 512 512"
});
```

## See Also

* [Icon Overrides]({% slug icon_overrides_aspnetmvc6_aspnetmvc %})
* [SVG Icons]({% slug svgicons_core_mvc %})
* [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %})
* [{{ site.product }} API Reference](https://docs.telerik.com/{{ site.platform }}/api)
* [Telerik SVG icon sources (telerik/kendo-icons)](https://github.com/telerik/kendo-icons)
* [v4 to v5 icon migration guide (telerik/kendo-icons)](https://github.com/telerik/kendo-icons/blob/v4.12.0/v4-v5-migration-assets/migration-guide.md)
* [AssemblyName MSBuild property (.NET documentation)](https://learn.microsoft.com/en-us/dotnet/core/project-sdk/msbuild-props#assemblyname)
* [Assembly names (.NET documentation)](https://learn.microsoft.com/en-us/dotnet/standard/assembly/names)
{% if site.core %}
* [Common MSBuild project items - Reference (MSBuild documentation)](https://learn.microsoft.com/en-us/visualstudio/msbuild/common-msbuild-project-items#reference)
{% else %}
* [.NET Standard versions and supported frameworks (.NET documentation)](https://learn.microsoft.com/en-us/dotnet/standard/net-standard)
{% endif %}