---
title: Removing the Trial Version Message
description: I switched from a Trial to Commercial license, but I still see the Trial message. How to remove the trial version message?
type: troubleshooting
page_title: Removing the Trial Version Message
slug: troubleshooting_trial_message
tags: trial, troubleshooting, commercial, license
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

I switched from a Trial to Commercial license, but I still see the Trial message.

## Solution

There are several common reasons for the observed behavior:

* The build is not updated.

    Try clearing the build folders and then building the project/solution once again. If the application has been compiled with the trial version and not recompiled with the commercial version, the trial message might still be displayed.

* A reference to the trial package has remained in the `.csproj` file.

    Inspect the `.csproj` file of the application and make sure that it doesn't contain a reference to the trial version of the {{site.product}} package:

        ```
        <ItemGroup>
            <PackageReference Include="Telerik.UI.for.AspNet.Core.Trial" Version="2021.3.914" />
        </ItemGroup>
        ```

* A reference to the Trial package has been pushed to source control.

    In case you have configured any build/release pipelines while testing the {{site.product}} Trial package, it is possible that a reference to the component library has been pushed to source control and is being used for rebuilding the project.

## See Also

* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_project_template %})
* [First steps on Visual Studio for Mac (online guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})


