---
title: Scaffolding
page_title: Scaffolding | Progress Telerik UI for ASP.NET Core
description: "Learn how to use the Kendo UI Scaffolder extensions."
slug: scaffolding_aspnetcore
position: 4
---

# Scaffolding

As of the R1 2019 release, Telerik UI for ASP.NET Core provides Scaffolding templates.

They allow you to use the standard scaffolding to generate MVC-helper declarations for editors that use the Telerik UI for ASP.NET Core components instead of standard inputs. 

You can use them in both MVC views and Razor Pages. 

Depending on the type of field, the following editors will be generated:

* `String`: `input` element with Kendo styles
* `String` (multiline): `textarea` element with Kendo styles
* `Number`: `kendo-numerictextbox` tag helper
* `DateTime`: `kendo-datetimepicker` tag helper
* `Boolean`: `Html.Kendo().CheckBoxFor` helper

The scaffolding logic and tools are the same as with the ordinary .NET Core web applications. The main repository and logic for the scaffolding provided by Microsoft is  [https://github.com/aspnet/Scaffolding](https://github.com/aspnet/Scaffolding). The original template files are located in its: [https://github.com/aspnet/Scaffolding/tree/master/src/VS.Web.CG.Mvc/Templates](https://github.com/aspnet/Scaffolding/tree/master/src/VS.Web.CG.Mvc/Templates) folder.

In order to use the scaffolding provided by Microsoft you can follow these resources:

- [Add a model to an ASP.NET Core MVC app](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-2.1)
- [Add a model to a Razor Pages app in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-2.1)


>tip The Scaffolding features allow you to generate templates based on classes and are different than the editor templates used by widgets like the grid for editing records. If you are looking for the editor templates, you can find them in your installation folder under `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <your version>\wrappers\aspnetcore\EditorTemplates`.

## Getting Started


### Requirements

Make sure that Telerik UI for ASP.NET Core is installed and set up in your project. There are two ways to do that:

 * [Use Visual Studio](https://docs.telerik.com/aspnet-core/getting-started/getting-started)
 * [Use the CLI](https://docs.telerik.com/aspnet-core/getting-started/getting-started-cli)

### Installation

To install the UI for ASP.NET Core Scaffolding templates and extensions in your project:

1. Clone or Download the [https://github.com/telerik/scaffold-templates-core](https://github.com/telerik/scaffold-templates-core) repository.

1. Copy the `Templates` folder from the repo above to the **root** of your project.

1. Exclude it from the project to make sure it will not be compiled when building. There are two ways to do that:

    * add the following to the project file directly:
    
        ```.csproj
          <ItemGroup>
            <Compile Remove="Templates\**" />
            <Content Remove="Templates\**" />
            <EmbeddedResource Remove="Templates\**" />
            <None Remove="Templates\**" />
          </ItemGroup>
        ```
    
    * OR, use the GUI in Visual Studio:
    
        **Figure 1. Exclude the Templates folder from compilation**
    
        ![Exclude Templatse folder](images/exclude-templates-from-project-GUI.png)


### Use With Visual Studio

The Kendo UI Scaffolding Templates pertain to cshtml generation, so you must  first create the appropriate model and controller as per your applicaiton needs. You can use the standard Scaffolding, or code you already have. 

If you don't have a model and controller already, below the list you can find a sample set so you can follow this example.

To add a View that will use a Kendo scaffolded template:

1. Select **Add** > **New Scaffolded Item...** from the context menu of the desired location.

    **Figure 2. Add Scaffolded Item**

    ![Add Scaffolded Item](images/add-scaffolded-item.png)

1. Choose item type (for example, **MVC View**) and click **Add**

     **Figure 3. Add Scaffolded View**

    ![Add Scaffolded View](images/add-scaffolded-view.png)

1. Set the View properties (name, template and model to match the code you already have) and click **Add**. For example, an `Edit` view for the `SampleScaffoldingData` model.

     **Figure 3. Set View Properties**

    ![Set View Properties](images/set-scaffolded-view-properties.png)
    
After following the steps, you should have something similar to the following in your project. You can also use the sample class and controller to test the behavior with dummy data instead of actual models.

```Model
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SampleCoreApp.Models
{
	public class SampleScaffoldingData
	{
		public string SingleLineString { get; set; }
		[DataType(DataType.MultilineText)]
		public string MultiLineString { get; set; }
		public int SomeNumber { get; set; }
		public DateTime SomeDate { get; set; }
		public bool SomeBoolean { get; set; }
	}
}
```
```View
@model SampleCoreApp.Models.SampleScaffoldingData

@{
    ViewData["Title"] = "Edit";
}

<h1>Edit</h1>

<h4>SampleScaffoldingData</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Edit" id="SampleScaffoldingDataForm">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="SingleLineString"></label>
                <input asp-for="SingleLineString" class="k-textbox" />
                <span asp-validation-for="SingleLineString" class="text-danger k-invalid-msg" data-for="SingleLineString"></span>
            </div>
            <div class="form-group">
                <label asp-for="MultiLineString"></label>
                <textarea asp-for="MultiLineString" class="k-textbox"></textarea>
                <span asp-validation-for="MultiLineString" class="text-danger k-invalid-msg" data-for="MultiLineString"></span>
            </div>
            <div class="form-group">
                <label asp-for="SomeNumber"></label>
                <kendo-numerictextbox for="SomeNumber" />
                <span asp-validation-for="SomeNumber" class="text-danger k-invalid-msg" data-for="SomeNumber"></span>
            </div>
            <div class="form-group">
                <label asp-for="SomeDate"></label>
                <kendo-datetimepicker for="SomeDate" />
                <span asp-validation-for="SomeDate" class="text-danger k-invalid-msg" data-for="SomeDate"></span>
             </div>
            <div class="form-group">
                @Html.Kendo().CheckBoxFor(m => m.SomeBoolean)
                <label asp-for="SomeBoolean"></label>
                <span asp-validation-for="SomeBoolean" class="text-danger k-invalid-msg" data-for="SomeBoolean"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Save" class="k-button k-primary" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-action="Index" class="k-button">Back to List</a>
</div>
```
```Controller
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SampleCoreApp.Models;

namespace SampleCoreApp.Controllers
{
    public class TestScaffoldingController : Controller
    {
		//the rest of the controller is omitted for brevity

        // GET: TestScaffolding/Edit/5
        public ActionResult Edit(int id)
        {
			SampleScaffoldingData sampleData = new SampleScaffoldingData() {
				MultiLineString = string.Format("{0}\n{1}", id, id + 1),
				SingleLineString = id.ToString(),
				SomeBoolean = id % 3 == 0,
				SomeDate = DateTime.Now,
				SomeNumber = id
			};

			return View(sampleData);
        }
    }
}
```


## See Also

* [Add the Kendo components to Your Project with VS 2017](https://docs.telerik.com/aspnet-core/getting-started/getting-started)
* [Add the Kendo components to Your Project with the CLI](https://docs.telerik.com/aspnet-core/getting-started/getting-started-cli)
* [ASP.NET Scaffolding](https://github.com/aspnet/Scaffolding)
* [Default ASP.NET Scaffolding Templates](https://github.com/aspnet/Scaffolding/tree/master/src/VS.Web.CG.Mvc/Templates)
* [UI for ASP.NET Core Scaffolding Templates](https://github.com/telerik/scaffold-templates-core)
* [Tutorial: How to add a model to an ASP.NET Core MVC app](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-2.1)
* [Tutorial: How to add a model to a Razor Pages app in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-2.1)
