---
title: CRUD operations
page_title: CRUD operations | Kendo UI Editor HtmlHelper for ASP.NET Core
description: "Learn how to Create, Read, Update and Delete (CRUD) with the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_editor_create_read_update_delete_crud_aspnetcore
position: 9
---

# CRUD operations

The below example demonstates how you can save, read, update and delete a text data content in a local database using the Editor component. 

A runnable project demonstrating the below described functionality could be found in [this repository](https://github.com/telerik/ui-for-aspnet-core-examples). The previoulsy linked example assumes you have a Telerik UI for ASP.NET Core and Entity framework installed and a local database setuped.

> Please note that the current project doesn't have any XSS attack preventions applied. It is a developer's responsibility to manage these security risks. For more information, please refer to this [Preventing Cross-Site Scripting](https://docs.telerik.com/kendo-ui/controls/editors/editor/preventing-xss) article. 

## Defining the Database model 

```
public class EditorDataContext : DbContext
{
    public EditorDataContext(DbContextOptions<EditorDataContext> options)
        : base(options)
    { }

    public DbSet<EditorData> EditorData { get; set; }
}

public class EditorData
{

    [Key]
    public int ContentId { get; set; }
    public string EditorContent { get; set; }

}
```
## Defining the Index page of your application 
```Razor
<h1>Index</h1>

<p>
    <a asp-action="Create" class="k-button">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.EditorContent)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model) {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.EditorContent)
            </td>
            <td>
                <a asp-action="Edit" asp-route-id="@item.ContentId" class="k-button k-primary">Edit</a> |
                <a asp-action="Details" asp-route-id="@item.ContentId" class="k-button">Details</a> |
                <a asp-action="Delete" asp-route-id="@item.ContentId" class="k-button">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>
```
```Controller
public async Task<IActionResult> Index()
{
    return View(await _context.EditorData.ToListAsync());
}
```

## Add Editor's content to Database 
```HTML-helper
<h1>Create</h1>

<h4>EditorData</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Create" id="EditorDataForm">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="EditorContent"></label>

                @Html.Kendo().EditorFor(m => m.EditorContent)
                
                <span asp-validation-for="EditorContent" class="text-danger k-invalid-msg" data-for="EditorContent"></span>
            </div>
<div class="form-group">
    <input type="submit" value="Create" class="k-button k-primary" />
</div>
</form>
</div>
</div>

<div>
    <a asp-action="Index" class="k-button">Back to List</a>
</div>

```
```Tag-helper
<h1>Create</h1>

<h4>EditorData</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Create" id="EditorDataForm">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="EditorContent"></label>

                <kendo-editor for="EditorContent">
                </kendo-editor>
                
                <span asp-validation-for="EditorContent" class="text-danger k-invalid-msg" data-for="EditorContent"></span>
            </div>
<div class="form-group">
    <input type="submit" value="Create" class="k-button k-primary" />
</div>
</form>
</div>
</div>

<div>
    <a asp-action="Index" class="k-button">Back to List</a>
</div>
```
```Controller
public IActionResult Create()
{
    return View();
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create([Bind("ContentId,EditorContent")] EditorData editorData)
{
    if (ModelState.IsValid)
    {
        _context.Add(editorData);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }
    return View(editorData);
}
```

## Read the stored in the Database data 
```Razor
<h1>Details</h1>

<div>
    <h4>EditorData</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.EditorContent)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.EditorContent)
        </dd>
    </dl>
</div>
<div>
    <a asp-action="Edit" asp-route-id="@Model.ContentId" class="k-button k-primary">Edit</a> |
    <a asp-action="Index" class="k-button">Back to List</a>
</div>
```
```Controller
public async Task<IActionResult> Details(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var editorData = await _context.EditorData
        .FirstOrDefaultAsync(m => m.ContentId == id);
    if (editorData == null)
    {
        return NotFound();
    }

    return View(editorData);
}
```

##Edit the stored data
```HTML-helper
<h1>Edit</h1>

<h4>EditorData</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Edit" id="EditorDataForm">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" asp-for="ContentId" />
            <div class="form-group">
                <label asp-for="EditorContent"></label>

                @Html.Kendo().EditorFor(m => m.EditorContent)

                <span asp-validation-for="EditorContent" class="text-danger k-invalid-msg" data-for="EditorContent"></span>
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
```Tag-helper
<h1>Edit</h1>

<h4>EditorData</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Edit" id="EditorDataForm">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" asp-for="ContentId" />
            <div class="form-group">
                <label asp-for="EditorContent"></label>

                <kendo-editor for="EditorContent">
                </kendo-editor>

                <span asp-validation-for="EditorContent" class="text-danger k-invalid-msg" data-for="EditorContent"></span>
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
public async Task<IActionResult> Edit(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var editorData = await _context.EditorData.FindAsync(id);
    if (editorData == null)
    {
        return NotFound();
    }
    return View(editorData);
}

[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Edit(int id, [Bind("ContentId,EditorContent")] EditorData editorData)
{
    if (id != editorData.ContentId)
    {
        return NotFound();
    }

    if (ModelState.IsValid)
    {
        try
        {
            _context.Update(editorData);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!EditorDataExists(editorData.ContentId))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return RedirectToAction(nameof(Index));
    }
    return View(editorData);
}
```

## Delete records from the Database 
```Controller
public async Task<IActionResult> Delete(int? id)
{
    if (id == null)
    {
        return NotFound();
    }

    var editorData = await _context.EditorData
        .FirstOrDefaultAsync(m => m.ContentId == id);
    if (editorData == null)
    {
        return NotFound();
    }

    return View(editorData);
}

[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]
public async Task<IActionResult> DeleteConfirmed(int id)
{
    var editorData = await _context.EditorData.FindAsync(id);
    _context.EditorData.Remove(editorData);
    await _context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
}
```

## See Also

* [Overview of the Editor HtmlHelper]({% slug htmlhelpers_editor_aspnetcore %})
* [Modes of Operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting Content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serialize / Deserialize Content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image Browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable Elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
