---
title: CRUD Operations
page_title: CRUD Operations
description: "Learn how to use the create, read, update, and delete CRUD operations with the Telerik UI Editor component for {{ site.framework }}."
components: ["editor"]
slug: htmlhelpers_crud_editor_aspnetcore
position: 9
---

# CRUD Operations

The following example demonstrates how to save, read, update, and delete text content in a local database using the Editor component.

For a runnable project, refer to [this GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples). The previously linked example assumes you have Telerik UI for ASP.NET Core and Entity framework installed and a local database set up.


> This code has no applied XSS attack prevention and it is the responsibility of the developer to manage these security risks. For more information, refer to the article on [preventing cross-site scripting](https://docs.telerik.com/kendo-ui/controls/editor/preventing-xss).

{% if site.core %}
The following Core example demonstrates how to define the database model.

```C#
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

The following example demonstrates how to define the **Index** page of your application.

```HtmlHelper
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

The following example demonstrates how to add the content of the Editor to the database.

```HtmlHelper
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
```TagHelper
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

The following example demonstrates how to read the stored data in the database.

```HtmlHelper
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

The following example demonstrates how to edit the stored data.

```HtmlHelper
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
```TagHelper
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

The following example demonstrates how to delete records from the database.

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

{% else %}
The following examples demonstrate the equivalent CRUD workflow for ASP.NET MVC.

```C# Model
public class EditorDataContext : DbContext
{
    public DbSet<EditorData> EditorData { get; set; }
}

public class EditorData
{
    [Key]
    public int ContentId { get; set; }
    public string EditorContent { get; set; }
}
```

```C# Controller
public class EditorController : Controller
{
    private EditorDataContext db = new EditorDataContext();

    public ActionResult Index()
    {
        return View(db.EditorData.ToList());
    }

    public ActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Create(EditorData editorData)
    {
        if (ModelState.IsValid)
        {
            db.EditorData.Add(editorData);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        return View(editorData);
    }

    public ActionResult Details(int id)
    {
        return View(db.EditorData.Find(id));
    }

    public ActionResult Edit(int id)
    {
        return View(db.EditorData.Find(id));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Edit(EditorData editorData)
    {
        if (ModelState.IsValid)
        {
            db.Entry(editorData).State = EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        return View(editorData);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Delete(int id)
    {
        var editorData = db.EditorData.Find(id);
        if (editorData != null)
        {
            db.EditorData.Remove(editorData);
            db.SaveChanges();
        }

        return RedirectToAction("Index");
    }
}
```

```Razor Index.cshtml
@model IEnumerable<EditorData>

<p>@Html.ActionLink("Create New", "Create", null, new { @class = "k-button" })</p>
<table class="table">
    @foreach (var item in Model)
    {
        <tr>
            <td>@Html.DisplayFor(modelItem => item.EditorContent)</td>
            <td>
                @Html.ActionLink("Edit", "Edit", new { id = item.ContentId }, new { @class = "k-button k-primary" }) |
                @Html.ActionLink("Details", "Details", new { id = item.ContentId }, new { @class = "k-button" })
            </td>
        </tr>
    }
</table>
```

```Razor Create.cshtml
@model EditorData

@using (Html.BeginForm())
{
    @Html.AntiForgeryToken()
    @Html.LabelFor(model => model.EditorContent)
    @(Html.Kendo().EditorFor(model => model.EditorContent))
    <input type="submit" value="Create" class="k-button k-primary" />
}
```

Use the same form pattern for `Edit.cshtml`, replacing the submit text with `Save` and adding `@Html.HiddenFor(model => model.ContentId)`.
{% endif %}

## See Also

* [Server-Side API](/api/editor)
