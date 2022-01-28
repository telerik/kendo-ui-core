---
title: Image Browser
page_title: Editor Image Browser
description: "Learn about the Image Browser component of the Telerik UI Editor HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/editor/image-browser
slug: htmlhelpers_editor_image_browser_aspnetcore
position: 6
---

# Image Browser

By default, the **Insert Image** tool opens a simple dialog that allows you to type in or paste the URL of an image and, optionally, specify a tooltip.

The Editor also supports another way of picking an image by browsing a list of predefined files and directories. Uploading new images is also supported. For a runnable example, refer to the [demo on file and image browser in the Editor](https://demos.telerik.com/{{ site.platform }}/editor/imagebrowser).

To retrieve and upload the files and directories, the image browser needs a server-side implementation. To configure the image browser tool, use the [`ImageBrowser()`](/api/Kendo.Mvc.UI.Fluent/EditorBuilder#imagebrowsersystemactionkendomvcuifluenteditorimagebrowsersettingsbuilder) method. 

The follwing example demonstrates how to set the ImageBrowser configuration of the Editor and a possible server-side implementation:

```Razor
@(Html.Kendo().Editor()
    .Name("editor")
    .ImageBrowser(imageBrowser => imageBrowser
        .Image("~/Content/UserFiles/Images/{0}")
        .Read("Read", "ImageBrowser")
        .Create("Create", "ImageBrowser")
        .Destroy("Destroy", "ImageBrowser")
        .Upload("Upload", "ImageBrowser")
        .Thumbnail("Thumbnail", "ImageBrowser")
    )
)
```
{% if site.core %}
```ImageBrowserController
    public class ImageBrowserController : EditorImageBrowserController
    {
        private const string contentFolderRoot = "shared/";
        private const string folderName = "Images/";
        private static readonly string[] foldersToCopy = new[] { "shared/images/employees" };
        
        /// <summary>
        /// Gets the base paths from which content will be served.
        /// </summary>
        public override string ContentPath
        {
            get
            {
                return CreateUserFolder();
            }
        }

        public ImageBrowserController(IHostingEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }

        private string CreateUserFolder()
        {
            var virtualPath = Path.Combine(contentFolderRoot, "UserFiles", folderName);
            var path = HostingEnvironment.WebRootFileProvider.GetFileInfo(virtualPath).PhysicalPath;

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                foreach (var sourceFolder in foldersToCopy)
                {
                    CopyFolder(HostingEnvironment.WebRootFileProvider.GetFileInfo(sourceFolder).PhysicalPath, path);
                }
            }
            return virtualPath;
        }

        private void CopyFolder(string source, string destination)
        {
            if (!Directory.Exists(destination))
            {
                Directory.CreateDirectory(destination);
            }

            foreach (var file in Directory.EnumerateFiles(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(file));
                System.IO.File.Copy(file, dest);
            }

            foreach (var folder in Directory.EnumerateDirectories(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(folder));
                CopyFolder(folder, dest);
            }
        }
    }
```
```EditorImageBrowserController
    public abstract class EditorImageBrowserController : BaseFileBrowserController, IImageBrowserController
    {
        protected EditorImageBrowserController(IHostingEnvironment hostingEnvironment)
            : this(DI.Current.Resolve<IDirectoryBrowser>(),
                  DI.Current.Resolve<IDirectoryPermission>(),
                  hostingEnvironment)
        {
        }

        protected EditorImageBrowserController(
            IDirectoryBrowser directoryBrowser,
            IDirectoryPermission permission,
            IHostingEnvironment hostingEnvironment)
             : base(directoryBrowser, permission, hostingEnvironment)
        {
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public override string Filter
        {
            get
            {
                return EditorImageBrowserSettings.DefaultFileTypes;
            }
        }

        public virtual bool AuthorizeThumbnail(string path)
        {
            return CanAccess(path);
        }

        /// <summary>
        /// You can use a third-party library to create thumbnails as System.Drawing is not curretnly part of ASP.NET Core https://blogs.msdn.microsoft.com/dotnet/2016/02/10/porting-to-net-core/
        /// </summary>
        public virtual IActionResult Thumbnail(string path)
        {
            return null;
        }
    }
```
```BaseFileBrowserController
    public abstract class BaseFileBrowserController : Controller, IFileBrowserController
    {
        private readonly IDirectoryBrowser directoryBrowser;
        private readonly IDirectoryPermission permission;

        protected readonly IHostingEnvironment HostingEnvironment;

        protected BaseFileBrowserController(IHostingEnvironment hostingEnvironment)
            : this(DI.Current.Resolve<IDirectoryBrowser>(),
                  DI.Current.Resolve<IDirectoryPermission>(),
                  hostingEnvironment)
        {
        }

        protected BaseFileBrowserController(
            IDirectoryBrowser directoryBrowser,
            IDirectoryPermission permission,
            IHostingEnvironment hostingEnvironment)
        {
            this.directoryBrowser = directoryBrowser;
            this.directoryBrowser.HostingEnvironment = hostingEnvironment;
            this.permission = permission;
            this.HostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// Gets the base path from which content will be served.
        /// </summary>
        public abstract string ContentPath
        {
            get;
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public virtual string Filter
        {
            get
            {
                return "*.*";
            }
        }

        /// <summary>
        /// Creates a folder with a given entry.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="Exception">Forbidden</exception>
        [AcceptVerbs("POST")]
        public virtual ActionResult Create(string path, FileBrowserEntry entry)
        {
            var fullPath = NormalizePath(path);
            var name = entry.Name;

            if (name.HasValue() && AuthorizeCreateDirectory(fullPath, name))
            {
                var physicalPath = Path.Combine(fullPath, name);

                if (!Directory.Exists(physicalPath))
                {
                    Directory.CreateDirectory(physicalPath);
                }

                return Json(entry);
            }

            throw new Exception("Forbidden");
        }

        /// <summary>
        /// Determines if a folder can be created.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="name">Name of the folder.</param>
        /// <returns>true if folder can be created, otherwise false.</returns>
        public virtual bool AuthorizeCreateDirectory(string path, string name)
        {
            return CanAccess(path);
        }

        public virtual JsonResult Read(string path)
        {
            var fullPath = NormalizePath(path);

            if (AuthorizeRead(fullPath))
            {
                try
                {
                    var files = directoryBrowser.GetFiles(fullPath, Filter);
                    var directories = directoryBrowser.GetDirectories(fullPath);
                    var result = files.Concat(directories);

                    return Json(result.ToArray());
                }
                catch (DirectoryNotFoundException)
                {
                    throw new Exception("File Not Found");
                }
            }

            throw new Exception("Forbidden");
        }

        /// <summary>
        /// Determines if content of a given path can be browsed.
        /// </summary>
        /// <param name="path">The path which will be browsed.</param>
        /// <returns>true if browsing is allowed, otherwise false.</returns>
        public virtual bool AuthorizeRead(string path)
        {
            return CanAccess(path);
        }

        protected virtual bool CanAccess(string path)
        {
            var rootPath = Path.GetFullPath(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath));

            return permission.CanAccess(rootPath, path);
        }

        protected string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return Path.GetFullPath(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath));
            }
            else
            {
                return Path.GetFullPath(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath, path));
            }
        }

        /// <summary>
        /// Deletes a entry.
        /// </summary>
        /// <param name="path">The path to the entry.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="Exception">File Not Found</exception>
        [AcceptVerbs("POST")]
        public virtual ActionResult Destroy(string path, FileBrowserEntry entry)
        {
            var fullPath = NormalizePath(path);

            if (entry != null)
            {
                fullPath = Path.Combine(fullPath, entry.Name);

                if (entry.EntryType == FileBrowserEntryType.File)
                {
                    DeleteFile(fullPath);
                }
                else
                {
                    DeleteDirectory(fullPath);
                }

                return Json(new object[0]);
            }

            throw new Exception("File Not Found");
        }

        /// <summary>
        /// Determines if a file can be deleted.
        /// </summary>
        /// <param name="path">The path to the file.</param>
        /// <returns>true if file can be deleted, otherwise false.</returns>
        public virtual bool AuthorizeDeleteFile(string path)
        {
            return CanAccess(path);
        }

        /// <summary>
        /// Determines if a folder can be deleted.
        /// </summary>
        /// <param name="path">The path to the folder.</param>
        /// <returns>true if folder can be deleted, otherwise false.</returns>
        public virtual bool AuthorizeDeleteDirectory(string path)
        {
            return CanAccess(path);
        }

        protected virtual void DeleteFile(string path)
        {
            if (!AuthorizeDeleteFile(path))
            {
                throw new Exception("Forbidden");
            }

            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }

        protected virtual void DeleteDirectory(string path)
        {
            if (!AuthorizeDeleteDirectory(path))
            {
                throw new Exception("Forbidden");
            }

            if (Directory.Exists(path))
            {
                Directory.Delete(path, true);
            }
        }


        /// <summary>
        /// Uploads a file to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>A <see cref="JsonResult"/> containing the uploaded file's size and name.</returns>
        /// <exception cref="Exception">Forbidden</exception>
        [AcceptVerbs("POST")]
        public virtual ActionResult Upload(string path, IFormFile file)
        {
            var fullPath = NormalizePath(path);

            if (AuthorizeUpload(fullPath, file))
            {
                SaveFile(file, fullPath);

                var result = new FileBrowserEntry
                {
                    Size = file.Length,
                    Name = GetFileName(file)
                };

                return Json(result);
            }

            throw new Exception("Forbidden");
        }

        protected virtual void SaveFile(IFormFile file, string pathToSave)
        {
            try
            {
                var path = Path.Combine(pathToSave, GetFileName(file));
                using (var stream = System.IO.File.Create(path))
                {
                    file.CopyTo(stream);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public virtual bool AuthorizeUpload(string path, IFormFile file)
        {
            return CanAccess(path) && IsValidFile(GetFileName(file));
        }

        private bool IsValidFile(string fileName)
        {
            var extension = Path.GetExtension(fileName);
            var allowedExtensions = Filter.Split(',');

            return allowedExtensions.Any(e => e.Equals("*.*") || e.EndsWith(extension, StringComparison.OrdinalIgnoreCase));
        }

        public virtual string GetFileName(IFormFile file)
        {
            var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
            return Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
        }
    }
```
{% else %}
```ImageBrowserController
    public class ImageBrowserController : EditorImageBrowserController
    {
        private const string contentFolderRoot = "~/Content/";
        private const string prettyName = "Images/";
        private static readonly string[] foldersToCopy = new[] { "~/Content/shared/" };


        /// <summary>
        /// Gets the base paths from which content will be served.
        /// </summary>
        public override string ContentPath
        {
            get
            {
                return CreateUserFolder();
            }
        }

        private string CreateUserFolder()
        {
            var virtualPath = Path.Combine(contentFolderRoot, "UserFiles", prettyName);

            var path = Server.MapPath(virtualPath);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                foreach (var sourceFolder in foldersToCopy)
                {
                    CopyFolder(Server.MapPath(sourceFolder), path);
                }
            }
            return virtualPath;
        }

        private void CopyFolder(string source, string destination)
        {
            if (!Directory.Exists(destination))
            {
                Directory.CreateDirectory(destination);
            }

            foreach (var file in Directory.EnumerateFiles(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(file));
                System.IO.File.Copy(file, dest);
            }

            foreach (var folder in Directory.EnumerateDirectories(source))
            {
                var dest = Path.Combine(destination, Path.GetFileName(folder));
                CopyFolder(folder, dest);
            }
        }
    }
```
```EditorImageBrowserController
    public abstract class EditorImageBrowserController : BaseFileBrowserController, IImageBrowserController
    {
        private readonly IThumbnailCreator thumbnailCreator;

        private const int ThumbnailHeight = 80;
        private const int ThumbnailWidth = 80;

        protected EditorImageBrowserController()
            : this(DI.Current.Resolve<IDirectoryBrowser>(),
                   DI.Current.Resolve<IDirectoryPermission>(),
                   DI.Current.Resolve<IVirtualPathProvider>(),
                   DI.Current.Resolve<IThumbnailCreator>())
        {
        }

        protected EditorImageBrowserController(IDirectoryBrowser directoryBrowser,
            IDirectoryPermission permission,
            IVirtualPathProvider pathProvider,
            IThumbnailCreator thumbnailCreator)
            : base(directoryBrowser, permission, pathProvider)
        {
            this.thumbnailCreator = thumbnailCreator;
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public override string Filter
        {
            get
            {
                return EditorImageBrowserSettings.DefaultFileTypes;
            }
        }

        public virtual bool AuthorizeThumbnail(string path)
        {
            return CanAccess(path);
        }

        /// <summary>
        /// Serves an image's thumbnail by given path.
        /// </summary>
        /// <param name="path">The path to the image.</param>
        /// <returns>Thumbnail of an image.</returns>
        /// <exception cref="HttpException">Throws 403 Forbidden if the <paramref name="path"/> is outside of the valid paths.</exception>
        /// <exception cref="HttpException">Throws 404 File Not Found if the <paramref name="path"/> refers to a non existant image.</exception>
        [OutputCache(Duration = 3600, VaryByParam = "path")]
        public virtual ActionResult Thumbnail(string path)
        {
            path = NormalizePath(path);

            if (AuthorizeThumbnail(path))
            {
                var physicalPath = Server.MapPath(path);

                if (System.IO.File.Exists(physicalPath))
                {
                    Response.AddFileDependency(physicalPath);

                    return CreateThumbnail(physicalPath);
                }
                else
                {
                    throw new HttpException(404, "File Not Found");
                }
            }
            else
            {
                throw new HttpException(403, "Forbidden");
            }
        }

        private FileContentResult CreateThumbnail(string physicalPath)
        {
            using (var fileStream = System.IO.File.OpenRead(physicalPath))
            {
                var desiredSize = new ImageSize
                {
                    Width = ThumbnailWidth,
                    Height = ThumbnailHeight
                };

                const string contentType = "image/png";

                return File(thumbnailCreator.Create(fileStream, desiredSize, contentType), contentType);
            }
        }
    }
```
```BaseFileBrowserController
    public abstract class BaseFileBrowserController : Controller, IFileBrowserController
    {
        private readonly IDirectoryBrowser directoryBrowser;
        private readonly IDirectoryPermission permission;
        private readonly IVirtualPathProvider pathProvider;

        protected BaseFileBrowserController()
            : this(DI.Current.Resolve<IDirectoryBrowser>(),
                   DI.Current.Resolve<IDirectoryPermission>(),
                   DI.Current.Resolve<IVirtualPathProvider>())
        {
        }

        protected BaseFileBrowserController(IDirectoryBrowser directoryBrowser,
            IDirectoryPermission permission,
            IVirtualPathProvider pathProvider)
        {
            this.directoryBrowser = directoryBrowser;
            this.permission = permission;
            this.pathProvider = pathProvider;
        }

        /// <summary>
        /// Gets the base path from which content will be served.
        /// </summary>
        public abstract string ContentPath
        {
            get;
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public virtual string Filter
        {
            get
            {
                return "*.*";
            }
        }

        /// <summary>
        /// Determines if content of a given path can be browsed.
        /// </summary>
        /// <param name="path">The path which will be browsed.</param>
        /// <returns>true if browsing is allowed, otherwise false.</returns>
        public virtual bool AuthorizeRead(string path)
        {
            return CanAccess(path);
        }

        protected virtual bool CanAccess(string path)
        {
            return permission.CanAccess(pathProvider.ToAbsolute(ContentPath), path);
        }

        protected string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return pathProvider.ToAbsolute(ContentPath);
            }

            return pathProvider.CombinePaths(pathProvider.ToAbsolute(ContentPath), path);
        }

        public virtual JsonResult Read(string path)
        {
            path = NormalizePath(path);

            if (AuthorizeRead(path))
            {
                try
                {
                    directoryBrowser.Server = Server;

                    var result = directoryBrowser.GetFiles(path, Filter)
                        .Concat(directoryBrowser.GetDirectories(path));

                    return Json(result);
                }
                catch (DirectoryNotFoundException)
                {
                    throw new HttpException(404, "File Not Found");
                }
            }

            throw new HttpException(403, "Forbidden");
        }

        /// <summary>
        /// Deletes a entry.
        /// </summary>
        /// <param name="path">The path to the entry.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public virtual ActionResult Destroy(string path, FileBrowserEntry entry)
        {
            path = NormalizePath(path);

            if (entry != null)
            {
                path = pathProvider.CombinePaths(path, entry.Name);
                if (entry.EntryType == FileBrowserEntryType.File)
                {
                    DeleteFile(path);
                }
                else
                {
                    DeleteDirectory(path);
                }

                return Json(new object[0]);
            }
            throw new HttpException(404, "File Not Found");
        }

        /// <summary>
        /// Determines if a file can be deleted.
        /// </summary>
        /// <param name="path">The path to the file.</param>
        /// <returns>true if file can be deleted, otherwise false.</returns>
        public virtual bool AuthorizeDeleteFile(string path)
        {
            return CanAccess(path);
        }

        /// <summary>
        /// Determines if a folder can be deleted.
        /// </summary>
        /// <param name="path">The path to the folder.</param>
        /// <returns>true if folder can be deleted, otherwise false.</returns>
        public virtual bool AuthorizeDeleteDirectory(string path)
        {
            return CanAccess(path);
        }

        protected virtual void DeleteFile(string path)
        {
            if (!AuthorizeDeleteFile(path))
            {
                throw new HttpException(403, "Forbidden");
            }

            var physicalPath = Server.MapPath(path);

            if (System.IO.File.Exists(physicalPath))
            {
                System.IO.File.Delete(physicalPath);
            }
        }

        protected virtual void DeleteDirectory(string path)
        {
            if (!AuthorizeDeleteDirectory(path))
            {
                throw new HttpException(403, "Forbidden");
            }

            var physicalPath = Server.MapPath(path);

            if (Directory.Exists(physicalPath))
            {
                Directory.Delete(physicalPath, true);
            }
        }

        /// <summary>
        /// Determines if a folder can be created.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="name">Name of the folder.</param>
        /// <returns>true if folder can be created, otherwise false.</returns>
        public virtual bool AuthorizeCreateDirectory(string path, string name)
        {
            return CanAccess(path);
        }

        /// <summary>
        /// Creates a folder with a given entry.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public virtual ActionResult Create(string path, FileBrowserEntry entry)
        {
            path = NormalizePath(path);
            var name = entry.Name;

            if (name.HasValue() && AuthorizeCreateDirectory(path, name))
            {
                var physicalPath = Path.Combine(Server.MapPath(path), name);

                if (!Directory.Exists(physicalPath))
                {
                    Directory.CreateDirectory(physicalPath);
                }

                return Json(entry);
            }

            throw new HttpException(403, "Forbidden");
        }

        /// <summary>
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public virtual bool AuthorizeUpload(string path, HttpPostedFileBase file)
        {
            return CanAccess(path) && IsValidFile(file.FileName);
        }

        private bool IsValidFile(string fileName)
        {
            var extension = Path.GetExtension(fileName);
            var allowedExtensions = Filter.Split(',');

            return allowedExtensions.Any(e => e.Equals("*.*") || e.EndsWith(extension, StringComparison.InvariantCultureIgnoreCase));
        }

        /// <summary>
        /// Uploads a file to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>A <see cref="JsonResult"/> containing the uploaded file's size and name.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public virtual ActionResult Upload(string path, HttpPostedFileBase file)
        {
            path = NormalizePath(path);
            var fileName = Path.GetFileName(file.FileName);

            if (AuthorizeUpload(path, file))
            {
                file.SaveAs(Path.Combine(Server.MapPath(path), fileName));

                return Json(new FileBrowserEntry
                {
                    Size = file.ContentLength,
                    Name = fileName
                }, "text/plain");
            }

            throw new HttpException(403, "Forbidden");
        }
    }
```
{% endif %}
```IImageBrowserController
    public interface IImageBrowserController : IFileBrowserController
    {
        IActionResult Thumbnail(string path);
    }
```
```IFileBrowserController
    public interface IFileBrowserController
    {
        JsonResult Read(string path);

        ActionResult Destroy(string path, FileBrowserEntry entry);

        ActionResult Create(string path, FileBrowserEntry entry);

        ActionResult Upload(string path, IFormFile file);
    }
```

The following list provides information about the default requests and responses for the `Create()`, `Read()`, `Destroy()`, and `Upload()` operations.

- `Create()`&mdash;Makes a `POST` request for the creation of a directory with the following parameters and does not expect a response.

        { "name": "New folder name", "type": "d", "path": "foo/" }

- `Read()`&mdash;Makes a `POST` request that contains the `path` parameter which specifies the path that is browsed and expects a file listing in the following format.

    ```
    [
        { "name": "foo.png", "type": "f", "size": 73289 },
        { "name": "bar.jpg", "type": "f", "size": 15289 },
        ...
    ]
    ```

    `name` from the previous example is the name of the file or directory, `type` is either an `f` for a file or a `d` for a directory, and `size` is the file size (optional).

- `Destroy()`&mdash;Makes a `POST` request with the following parameters and expects an empty ContentResult as a response:

    | Parameter | Description |
    |---|---|
    |`name` | The file or the directory that will be deleted.|
    |`path` | The directory in which the file or the directory resides.|
    |`type` | The file or the directory that will be deleted (an `f` or a `d`).|
    |`size` | (Optional) The file size, as provided by the `Read()` response.|

- `Upload()`&mdash;Makes a `POST` request. The request includes `FormData` which contains the upload path and the file name and type. Its payload consists of the uploaded file. The expected response is a `file` object in the following format:

    ```
    { "name": "foo.png", "type": "f", "size": 12345 }
    ```
{% if site.mvc %}
- `Thumbnail()`&mdash;Makes a `GET` request for each individual image to display its thumbnail in the explorer window. The single request parameter is the `path` to the image. The service is expected to respond with the image file for the thumbnail.
{% endif %}
- `Image()`&mdash;Used by the Editor to generate the `src` attribute of the original image when the image is inserted. It results in a `GET` request generated by the browser for each inserted image. The URL can point to a file system or to a service and is parameterized&mdash;the `{0}` placeholder denotes the `path` and `fileName` as received from the `Read()` service.

You can update all of these requests and responses through the [`ImageBrowser()`](/api/Kendo.Mvc.UI.Fluent/EditorBuilder#imagebrowsersystemactionkendomvcuifluenteditorimagebrowsersettingsbuilder) configuration. Each of them exposes more options that you can tweak.

{% if site.core %}
## ImageBrowser in Razor Page scenario

In order to set up the ImageBrowser of the Telerik UI Editor HtmlHelper for {{ site.framework }} component in Razor page scenario, you need to configure the `Read` , `Create`, `Update` and `Destroy` methods of the ImageBrowser `Transport` configuration. The URL in these methods should refer the name of the handler in the PageModel. See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
    @(Html.Kendo().Editor()
            .Name("editor")
            .ImageBrowser(imageBrowser => imageBrowser
                .Transport(transport => {
                    transport.Read(r => r.Url("/Editor/ImageBrowser?handler=Read"));
                    transport.Create(c => c.Url("/Editor/ImageBrowser?handler=Create"));
                    transport.Destroy(d => d.Url("/Editor/ImageBrowser?handler=Destroy"));
                    transport.UploadUrl("/Editor/ImageBrowser?handler=Upload");
                    transport.ImageUrl("/Images/{0}");
                    
                })
                .Schema(schema => schema.Model(
                    model => model.Fields(fields => fields
                        .Name(name => name.Field("Name"))
                        .Size(size => size.Field("Size"))
                        .Type(type => type.Field("EntryType"))
                        )
                    )
                )
            )
        )
```
```tab-PageModel(cshtml.cs)
    public JsonResult OnPostRead(string path)
    {
        var fullPath = NormalizePath(path);

        if (AuthorizeRead(fullPath))
        {
            try
            {
                var files = directoryBrowser.GetFiles(fullPath, Filter);
                var directories = directoryBrowser.GetDirectories(fullPath);
                var result = files.Concat(directories);

                return new JsonResult(result.ToArray());
            }
            catch (DirectoryNotFoundException)
            {
                throw new Exception("File Not Found");
            }
        }

        throw new Exception("Forbidden");
    }

    public JsonResult OnPostCreate(string path, FileBrowserEntry entry)
    {
        var fullPath = NormalizePath(path);
        var name = entry.Name;

        if (name.HasValue() && AuthorizeCreateDirectory(fullPath, name))
        {
            var physicalPath = Path.Combine(fullPath, name);

            if (!Directory.Exists(physicalPath))
            {
                Directory.CreateDirectory(physicalPath);
            }

            return new JsonResult(entry);
        }

        throw new Exception("Forbidden");
    }

    public JsonResult OnPostDestroy(string path, FileBrowserEntry entry)
    {
        var fullPath = NormalizePath(path);

        if (entry != null)
        {
            fullPath = Path.Combine(fullPath, entry.Name);

            if (entry.EntryType == "f")
            {
                DeleteFile(fullPath);
            }
            else
            {
                DeleteDirectory(fullPath);
            }

            return new JsonResult(new object[0]);
        }

        throw new Exception("File Not Found");
    }

    public virtual ActionResult OnPostUpload(string path, IFormFile file)
    {
        var fullPath = NormalizePath(path);

        if (AuthorizeUpload(fullPath, file))
        {
            SaveFile(file, fullPath);

            var result = new FileBrowserEntry
            {
                Size = file.Length,
                Name = GetFileName(file)
            };

            return new JsonResult(result);
        }

        throw new Exception("Forbidden");
    }
```

{% endif %}
## See Also

* [File and Image Browser by the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/imagebrowser)
* [Server-Side API](/api/editor)
