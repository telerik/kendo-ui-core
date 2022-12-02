---
title: Using Telerik NuGet Server in Docker
description: How to restore Telerik UI for ASP.NET Core NuGet packages in a Docker container build.
type: how-to
page_title: Build Applications in Docker with the Telerik NuGet Server 
previous_url: /aspnet-mvc/knowledge-base/docker-build-nuget
slug: docker-build-nuget
tags: docker, dockerfile, nuget, nuget-config, packages, dotnet, restore
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Telerik UI for ASP.NET Core Grid</td>
 </tr>
 <tr>
  <td>Progress Telerik UI for ASP.NET Core version</td>
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>

## Description

How do I build an application by using Telerik UI for ASP.NET Core NuGet packages in Docker?

## Solution

In order for the `dotnet restore` command to properly restore the Telerik NuGet packages inside a Docker container, you need to include a `nuget.config` file.

### Configuration

In the configuration, you need two things:

1. The `nuget.config` file that has the Telerik NuGet server listed in the `packageSources` section.
2. A `packageSourceCredentials` section to provide credentials for the Telerik account which has the product licenses.

>note The `packageSourceCredentials` section uses environment variables to protect your sensitive information. There are many ways to pass secrets to Docker containers. A simple and easy option is to have environment variables already set on the host machine (your PC or CI-CD runner), then use the `ARG` command in the `Dockerfile` to copy the host's values into the container. For examples, refer to the Dockerfile samples below.

Here is an example `nuget.config` file. 

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <!-- Use the Telerik NuGet server as a package source -->
  <packageSources>
    <clear/>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="TelerikServer" value="https://nuget.telerik.com/v3/index.json"  protocolVersion="3"/>
  </packageSources>

  <!-- Your Telerik account credentials or Telerik NuGet Key -->
  <packageSourceCredentials>
    <TelerikServer>
      <add key="Username" value="%TELERIK_USERNAME%" />
      <add key="ClearTextPassword" value="%TELERIK_PASSWORD%" />
    </TelerikServer>
  </packageSourceCredentials>

   <!-- ...other config settings, see reference links at bottom of article -->
</configuration>
```

### File Location

You'll want to place the `nuget.config` file inside the same directory that your `Dockerfile` is copying into the container so that the `dotnet restore` and `dotnet build` commands can use it when restoring packages.

#### Option 1: Project Directory

Put the `nuget.config` file in the same directory as the `csproj` file.

```bat
/MyApp/MyApp.csproj
/MyApp/nuget.config
/MyApp.sln
```
Here is an example `Dockerfile` with some comments to explain how the `nuget.config` is effective in Option 1

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
# Telerik NuGet Server Setup
# 1. Use ARG or ENV to set build-time variables (these %varibles% should already set on the host environment)
ARG TELERIK_USERNAME=%TELERIK_USERNAME%
ARG TELERIK_PASSWORD=%TELERIK_PASSWORD%
# Continue as usual
COPY ["MyApp/MyApp.csproj", "MyApp/"]
RUN dotnet restore "MyApp/MyApp.csproj"
# Because the nuget.config file is in the same directory, it will be copied over in this command
COPY . .
WORKDIR "/src/MyApp"
RUN dotnet build "MyApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

#### Option 2 - Alternate Location

For multi-project solutions, you can place the `nuget.config` file in the same folder as the `sln` file so that both projects share the same file.

```bat
/FirstProject/FirstProject.csproj
/SecondProject/SecondProject.csproj
/MyApp.sln
/nuget.config
```

Here is an example `Dockerfile` that has an extra `COPY` command to copy the `nuget.config` file from another location into the container.

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
# Telerik NuGet Server Setup
# 1. Use ARG to set build-time variables (these %varibles% should already set on the host environment)
ARG TELERIK_USERNAME=%TELERIK_USERNAME%
ARG TELERIK_PASSWORD=%TELERIK_PASSWORD%
# 2. Copy the nuget.config file into the work directory
COPY ["../NuGet.Config", "."]
# Continue as usual
COPY ["FirstProject/FirstProject.csproj", "FirstProject/"]
RUN dotnet restore "FirstProject/FirstProject.csproj"
COPY . .
WORKDIR "/src/FirstProject"
RUN dotnet build "FirstProject.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FirstProject.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FirstProject.dll"]
```

## Resources 

* Telerik Documentation: 
  * [Telerik UI for ASP.NET Core - Setting Up the nuget.config File](https://docs.telerik.com/aspnet-core/installation/nuget-install#setup-with-nugetconfig)
  * [Azure DevOps and Telerik NuGet](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
  * [Announcing NuGet Keys](https://www.telerik.com/blogs/announcing-nuget-keys)

* Microsoft Documentation: 
  * [nuget.config reference](https://docs.microsoft.com/en-us/nuget/reference/nuget-config-file?Wt.mc_id=DX_MVP5000553)
  * [Package source sections](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file?Wt.mc_id=DX_MVP5000553#package-source-sections)
  * [Consuming packages from authenticated feeds](https://docs.microsoft.com/en-us/nuget/consume-packages/consuming-packages-authenticated-feeds?Wt.mc_id=DX_MVP5000553)
  * [packageSourceCredentials](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#packagesourcecredentials)
  * [Package source mapping section](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file#package-source-mapping-section)
