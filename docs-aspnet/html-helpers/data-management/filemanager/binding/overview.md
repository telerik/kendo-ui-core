---
title: Overview
page_title: Data Binding Overview
description: "Learn about the different types of data binding when working with the Telerik UI FileManager HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_filemanager_aspnetcore_binding_overview
position: 0
---

# DataBiding Overview

Depending on the configuration of its [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}), the {{ site.product_short }} FileManager provides different types of data binding.


## Remote Binding

To bind the FileManager to remote data, configure the `DataSource` option and set the endpoints for the `Read`, `Create`, `Update` and `Destroy` operations. The following example demonstrates a possible remote end-point implementation that will provide the data to the {{ site.product }} FileManager.

```Razor
   @(Html.Kendo().FileManager()
    .Name("filemanager")
    .DataSource(ds =>
        {
            ds.Read(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Read", "FileManagerData")
        );
        ds.Destroy(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Destroy", "FileManagerData")
        );
        ds.Create(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Create", "FileManagerData")
        );
        ds.Update(operation => operation
            .Type(HttpVerbs.Post)
            .Action("Update", "FileManagerData")
        );
    })
    .UploadUrl("Upload", "FileManagerData")   
)
```
{% if site.core %}
```Controller
    public class FileManagerDataController : Controller
    {
        protected readonly IHostingEnvironment HostingEnvironment;
        private readonly FileContentBrowser directoryBrowser;
        //
        // GET: /FileManager/
        private const string contentFolderRoot = "shared";
        private const string prettyName = "Folders";
        private static readonly string[] foldersToCopy = new[] { "shared/filemanager" };


        /// <summary>
        /// Gets the base paths from which content will be served.
        /// </summary>
        public string ContentPath
        {
            get
            {
                return CreateUserFolder();
            }
        }

        public FileManagerDataController(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
            directoryBrowser = new FileContentBrowser();
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public string Filter
        {
            get
            {
                return "*.*";
            }
        }

        private string CreateUserFolder()
        {
            var virtualPath = Path.Combine(contentFolderRoot, "UserFiles", prettyName);
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

        /// <summary>
        /// Determines if content of a given path can be browsed.
        /// </summary>
        /// <param name="path">The path which will be browsed.</param>
        /// <returns>true if browsing is allowed, otherwise false.</returns>
        public virtual bool Authorize(string path)
        {
            return CanAccess(path);
        }

        protected virtual bool CanAccess(string path)
        {
            var rootPath = Path.GetFullPath(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath));
            return path.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase);
        }

        protected virtual string NormalizePath(string path)
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

        protected virtual FileManagerEntry VirtualizePath(FileManagerEntry entry)
        {
            entry.Path = entry.Path.Replace(Path.Combine(this.HostingEnvironment.WebRootPath, ContentPath), "").Replace(@"\", "/").TrimStart('/');
            return entry;
        }

        public virtual ActionResult Create(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;

            if (!Authorize(NormalizePath(target)))
            {
                throw new Exception("Forbidden");
            }


            if (String.IsNullOrEmpty(entry.Path))
            {
                newEntry = CreateNewFolder(target, entry);
            }
            else
            {
                newEntry = CopyEntry(target, entry);
            }

            return Json(VirtualizePath(newEntry));
        }

        protected virtual FileManagerEntry CopyEntry(string target, FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            var physicalPath = path;
            var physicalTarget = EnsureUniqueName(NormalizePath(target), entry);

            FileManagerEntry newEntry;

            if (entry.IsDirectory)
            {
                CopyDirectory(new DirectoryInfo(physicalPath), Directory.CreateDirectory(physicalTarget));
                newEntry = directoryBrowser.GetDirectory(physicalTarget);
            }
            else
            {
                System.IO.File.Copy(physicalPath, physicalTarget);
                newEntry = directoryBrowser.GetFile(physicalTarget);
            }

            return newEntry;
        }

        protected virtual void CopyDirectory(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (FileInfo fi in source.GetFiles())
            {
                Console.WriteLine(@"Copying {0}\{1}", target.FullName, fi.Name);
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyDirectory(diSourceSubDir, nextTargetSubDir);
            }
        }

        protected virtual FileManagerEntry CreateNewFolder(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;
            var path = NormalizePath(target);
            string physicalPath = EnsureUniqueName(path, entry);

            Directory.CreateDirectory(physicalPath);

            newEntry = directoryBrowser.GetDirectory(physicalPath);

            return newEntry;
        }

        protected virtual string EnsureUniqueName(string target, FileManagerEntry entry)
        {
            var tempName = entry.Name + entry.Extension;
            int sequence = 0;
            var physicalTarget = Path.Combine(NormalizePath(target), tempName);

            if (!Authorize(NormalizePath(physicalTarget)))
            {
                throw new Exception("Forbidden");
            }

            if (entry.IsDirectory)
            {
                while (Directory.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence);
                    physicalTarget = Path.Combine(NormalizePath(target), tempName);
                }
            }
            else
            {
                while (System.IO.File.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence) + entry.Extension;
                    physicalTarget = Path.Combine(NormalizePath(target), tempName);
                }
            }

            return physicalTarget;
        }

        public virtual ActionResult Destroy(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);



            if (!string.IsNullOrEmpty(path))
            {
                if (entry.IsDirectory)
                {
                    DeleteDirectory(path);
                }
                else
                {
                    DeleteFile(path);
                }

                return Json(new object[0]);
            }
            throw new Exception("File Not Found");
        }

        protected virtual void DeleteFile(string path)
        {
            if (!Authorize(path))
            {
                throw new Exception("Forbidden");
            }

            var physicalPath = NormalizePath(path);

            if (System.IO.File.Exists(physicalPath))
            {
                System.IO.File.Delete(physicalPath);
            }
        }

        protected virtual void DeleteDirectory(string path)
        {
            if (!Authorize(path))
            {
                throw new Exception("Forbidden");
            }

            var physicalPath = NormalizePath(path);

            if (Directory.Exists(physicalPath))
            {
                Directory.Delete(physicalPath, true);
            }
        }

        public virtual JsonResult Read(string target)
        {
            var path = NormalizePath(target);

            if (Authorize(path))
            {
                try
                {
                    var files = directoryBrowser.GetFiles(path, Filter);
                    var directories = directoryBrowser.GetDirectories(path);
                    var result = files.Concat(directories).Select(VirtualizePath);

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
        /// Updates an entry with a given entry.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        public virtual ActionResult Update(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;

            if (!Authorize(NormalizePath(entry.Path)) && !Authorize(NormalizePath(target)))
            {
                throw new Exception("Forbidden");
            }

            newEntry = RenameEntry(entry);

            return Json(VirtualizePath(newEntry));
        }

        protected virtual FileManagerEntry RenameEntry(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            var physicalPath = path;
            var physicalTarget = EnsureUniqueName(Path.GetDirectoryName(path), entry);
            FileManagerEntry newEntry;

            if (entry.IsDirectory)
            {
                Directory.Move(physicalPath, physicalTarget);
                newEntry = directoryBrowser.GetDirectory(physicalTarget);
            }
            else
            {
                var file = new FileInfo(physicalPath);
                System.IO.File.Move(file.FullName, physicalTarget);
                newEntry = directoryBrowser.GetFile(physicalTarget);
            }

            return newEntry;
        }

        /// <summary>
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public virtual bool AuthorizeUpload(string path, IFormFile file)
        {
            if (!CanAccess(path))
            {
                throw new DirectoryNotFoundException(String.Format("The specified path cannot be found - {0}", path));
            }

            if (!IsValidFile(GetFileName(file)))
            {
                throw new InvalidDataException(String.Format("The type of file is not allowed. Only {0} extensions are allowed.", Filter));
            }

            return true;
        }

        private bool IsValidFile(string fileName)
        {
            var extension = Path.GetExtension(fileName);
            var allowedExtensions = Filter.Split(',');

            return allowedExtensions.Any(e => e.Equals("*.*") || e.EndsWith(extension, StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Uploads a file to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>A <see cref="JsonResult"/> containing the uploaded file's size and name.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs("POST")]
        public virtual ActionResult Upload(string path, IFormFile file)
        {
            FileManagerEntry newEntry;
            path = NormalizePath(path);
            var fileName = Path.GetFileName(file.FileName);

            if (AuthorizeUpload(path, file))
            {
                SaveFile(file, path);
                newEntry = directoryBrowser.GetFile(Path.Combine(path, fileName));

                return Json(VirtualizePath(newEntry));
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

        public virtual string GetFileName(IFormFile file)
        {
            var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
            return Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
        }
    }

    public class FileContentBrowser
    {
        public virtual IHostingEnvironment HostingEnvironment { get; set; }
        public IEnumerable<FileManagerEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(path);

            var extensions = (filter ?? "*").Split(new string[] { ", ", ",", "; ", ";" }, System.StringSplitOptions.RemoveEmptyEntries);

            return extensions.SelectMany(directory.GetFiles)
                .Select(file => new FileManagerEntry
                {
                    Name = Path.GetFileNameWithoutExtension(file.Name),
                    Size = file.Length,
                    Path = file.FullName,
                    Extension = file.Extension,
                    IsDirectory = false,
                    HasDirectories = false,
                    Created = file.CreationTime,
                    CreatedUtc = file.CreationTimeUtc,
                    Modified = file.LastWriteTime,
                    ModifiedUtc = file.LastWriteTimeUtc
                });
        }

        public IEnumerable<FileManagerEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(path);

            return directory.GetDirectories()
                .Select(subDirectory => new FileManagerEntry
                {
                    Name = subDirectory.Name,
                    Path = subDirectory.FullName,
                    Extension = subDirectory.Extension,
                    IsDirectory = true,
                    HasDirectories = subDirectory.GetDirectories().Length > 0,
                    Created = subDirectory.CreationTime,
                    CreatedUtc = subDirectory.CreationTimeUtc,
                    Modified = subDirectory.LastWriteTime,
                    ModifiedUtc = subDirectory.LastWriteTimeUtc
                });
        }

        public FileManagerEntry GetDirectory(string path)
        {
            var directory = new DirectoryInfo(path);

            return new FileManagerEntry
            {
                Name = directory.Name,
                Path = directory.FullName,
                Extension = directory.Extension,
                IsDirectory = true,
                HasDirectories = directory.GetDirectories().Length > 0,
                Created = directory.CreationTime,
                CreatedUtc = directory.CreationTimeUtc,
                Modified = directory.LastWriteTime,
                ModifiedUtc = directory.LastWriteTimeUtc
            };
        }

        public FileManagerEntry GetFile(string path)
        {
            var file = new FileInfo(path);

            return new FileManagerEntry
            {
                Name = Path.GetFileNameWithoutExtension(file.Name),
                Path = file.FullName,
                Size = file.Length,
                Extension = file.Extension,
                IsDirectory = false,
                HasDirectories = false,
                Created = file.CreationTime,
                CreatedUtc = file.CreationTimeUtc,
                Modified = file.LastWriteTime,
                ModifiedUtc = file.LastWriteTimeUtc
            };
        }
    }
```
{% else %}
```Controller
    public class FileManagerDataController : Controller
    {
        private readonly FileContentBrowser directoryBrowser;
        //
        // GET: /FileManager/
        private const string contentFolderRoot = "~/Content/";
        private const string prettyName = "Folders/";
        private static readonly string[] foldersToCopy = new[] { "~/Content/shared/filemanager" };

        public FileManagerDataController()
        {
            // Helper utility for the FileManager controller
            directoryBrowser = new FileContentBrowser();
        }


        /// <summary>
        /// Gets the base paths from which content will be served.
        /// </summary>
        public string ContentPath
        {
            get
            {
                return CreateUserFolder();
            }
        }

        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public string Filter
        {
            get
            {
                return "*.*";
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

        /// <summary>
        /// Determines if content of a given path can be browsed.
        /// </summary>
        /// <param name="path">The path which will be browsed.</param>
        /// <returns>true if browsing is allowed, otherwise false.</returns>
        public bool Authorize(string path)
        {
            return CanAccess(path);
        }

        public bool CanAccess(string path)
        {
            return path.StartsWith(ToAbsolute(ContentPath), StringComparison.OrdinalIgnoreCase);
        }

        private string ToAbsolute(string virtualPath)
        {
            return VirtualPathUtility.ToAbsolute(virtualPath);
        }

        private string CombinePaths(string basePath, string relativePath)
        {
            return VirtualPathUtility.Combine(VirtualPathUtility.AppendTrailingSlash(basePath), relativePath);
        }

        public string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return ToAbsolute(ContentPath);
            }

            return CombinePaths(ToAbsolute(ContentPath), path);
        }

        public FileManagerEntry VirtualizePath(FileManagerEntry entry)
        {
            entry.Path = entry.Path.Replace(Server.MapPath(ContentPath), "").Replace(@"\", "/");
            return entry;
        }

        public ActionResult Create(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;

            if (!Authorize(NormalizePath(target)))
            {
                throw new HttpException(403, "Forbidden");
            }


            if (String.IsNullOrEmpty(entry.Path))
            {
                newEntry = CreateNewFolder(target, entry);
            }
            else
            {
                newEntry = CopyEntry(target, entry);
            }

            return Json(VirtualizePath(newEntry));
        }

        public FileManagerEntry CopyEntry(string target, FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            var physicalPath = Server.MapPath(path);
            var physicalTarget = EnsureUniqueName(NormalizePath(target), entry);

            FileManagerEntry newEntry;

            if (entry.IsDirectory)
            {
                CopyDirectory(new DirectoryInfo(physicalPath), Directory.CreateDirectory(physicalTarget));
                newEntry = directoryBrowser.GetDirectory(physicalTarget);
            }
            else
            {
                System.IO.File.Copy(physicalPath, physicalTarget);
                newEntry = directoryBrowser.GetFile(physicalTarget);
            }

            return newEntry;
        }

        public void CopyDirectory(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (FileInfo fi in source.GetFiles())
            {
                Console.WriteLine(@"Copying {0}\{1}", target.FullName, fi.Name);
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyDirectory(diSourceSubDir, nextTargetSubDir);
            }
        }

        public FileManagerEntry CreateNewFolder(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;
            var path = NormalizePath(target);
            string physicalPath = EnsureUniqueName(path, entry);

            Directory.CreateDirectory(physicalPath);

            newEntry = directoryBrowser.GetDirectory(physicalPath);

            return newEntry;
        }

        public string EnsureUniqueName(string target, FileManagerEntry entry)
        {
            var tempName = entry.Name + entry.Extension;
            int sequence = 0;
            var physicalTarget = NormalizePath(Path.Combine(target, tempName));

            if (!Authorize(physicalTarget))
            {
                throw new HttpException(403, "Forbidden");
            }

            physicalTarget = Server.MapPath(physicalTarget);

            if (entry.IsDirectory)
            {
                while (Directory.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence);
                    physicalTarget = Path.Combine(Server.MapPath(target), tempName);
                }
            }
            else
            {
                while (System.IO.File.Exists(physicalTarget))
                {
                    tempName = entry.Name + String.Format("({0})", ++sequence) + entry.Extension;
                    physicalTarget = Path.Combine(Server.MapPath(target), tempName);
                }
            }

            return physicalTarget;
        }

        public ActionResult Destroy(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);

            if (!string.IsNullOrEmpty(path))
            {
                if (entry.IsDirectory)
                {
                    DeleteDirectory(path);
                }
                else
                {
                    DeleteFile(path);
                }

                return Json(new object[0]);
            }
            throw new HttpException(404, "File Not Found");
        }

        public void DeleteFile(string path)
        {
            if (!Authorize(path))
            {
                throw new HttpException(403, "Forbidden");
            }

            var physicalPath = Server.MapPath(path);

            if (System.IO.File.Exists(physicalPath))
            {
                System.IO.File.Delete(physicalPath);
            }
        }

        public void DeleteDirectory(string path)
        {
            if (!Authorize(path))
            {
                throw new HttpException(403, "Forbidden");
            }

            var physicalPath = Server.MapPath(path);

            if (Directory.Exists(physicalPath))
            {
                Directory.Delete(physicalPath, true);
            }
        }

        public JsonResult Read(string target)
        {
            var path = NormalizePath(target);

            if (Authorize(path))
            {
                try
                {
                    directoryBrowser.Server = Server;

                    var result = directoryBrowser.GetFiles(path, Filter)
                        .Concat(directoryBrowser.GetDirectories(path)).Select(VirtualizePath);

                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                catch (DirectoryNotFoundException)
                {
                    throw new HttpException(404, "File Not Found");
                }
            }

            throw new HttpException(403, "Forbidden");
        }

        /// <summary>
        /// Updates an entry with a given entry.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="entry">The entry.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        public ActionResult Update(string target, FileManagerEntry entry)
        {
            FileManagerEntry newEntry;

            if (!Authorize(NormalizePath(entry.Path)) && !Authorize(NormalizePath(target)))
            {
                throw new HttpException(403, "Forbidden");
            }

            newEntry = RenameEntry(entry);

            return Json(VirtualizePath(newEntry));
        }

        public FileManagerEntry RenameEntry(FileManagerEntry entry)
        {
            var path = NormalizePath(entry.Path);
            var physicalPath = Server.MapPath(path);
            var physicalTarget = EnsureUniqueName(Path.GetDirectoryName(path), entry);
            FileManagerEntry newEntry;

            if (entry.IsDirectory)
            {
                Directory.Move(physicalPath, physicalTarget);
                newEntry = directoryBrowser.GetDirectory(physicalTarget);
            }
            else
            {
                var file = new FileInfo(physicalPath);
                System.IO.File.Move(file.FullName, physicalTarget);
                newEntry = directoryBrowser.GetFile(physicalTarget);
            }

            return newEntry;
        }

        /// <summary>
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public bool AuthorizeUpload(string path, HttpPostedFileBase file)
        {
            if (!CanAccess(path))
            {
                throw new DirectoryNotFoundException(String.Format("The specified path cannot be found - {0}", path));
            }

            if (!IsValidFile(file.FileName))
            {
                throw new InvalidDataException(String.Format("The type of file is not allowed. Only {0} extensions are allowed.", Filter));
            }

            return true;
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
        public ActionResult Upload(string path, HttpPostedFileBase file)
        {
            FileManagerEntry newEntry;
            path = NormalizePath(path);
            var fileName = Path.GetFileName(file.FileName);

            if (AuthorizeUpload(path, file))
            {
                file.SaveAs(Path.Combine(Server.MapPath(path), fileName));
                newEntry = directoryBrowser.GetFile(Path.Combine(Server.MapPath(path), fileName));

                return Json(VirtualizePath(newEntry), "text/plain");
            }

            throw new HttpException(403, "Forbidden");
        }
    }

    public class FileContentBrowser
    {
        public virtual IHostingEnvironment HostingEnvironment { get; set; }
        public IEnumerable<FileManagerEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(path);

            var extensions = (filter ?? "*").Split(new string[] { ", ", ",", "; ", ";" }, System.StringSplitOptions.RemoveEmptyEntries);

            return extensions.SelectMany(directory.GetFiles)
                .Select(file => new FileManagerEntry
                {
                    Name = Path.GetFileNameWithoutExtension(file.Name),
                    Size = file.Length,
                    Path = file.FullName,
                    Extension = file.Extension,
                    IsDirectory = false,
                    HasDirectories = false,
                    Created = file.CreationTime,
                    CreatedUtc = file.CreationTimeUtc,
                    Modified = file.LastWriteTime,
                    ModifiedUtc = file.LastWriteTimeUtc
                });
        }

        public IEnumerable<FileManagerEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(path);

            return directory.GetDirectories()
                .Select(subDirectory => new FileManagerEntry
                {
                    Name = subDirectory.Name,
                    Path = subDirectory.FullName,
                    Extension = subDirectory.Extension,
                    IsDirectory = true,
                    HasDirectories = subDirectory.GetDirectories().Length > 0,
                    Created = subDirectory.CreationTime,
                    CreatedUtc = subDirectory.CreationTimeUtc,
                    Modified = subDirectory.LastWriteTime,
                    ModifiedUtc = subDirectory.LastWriteTimeUtc
                });
        }

        public FileManagerEntry GetDirectory(string path)
        {
            var directory = new DirectoryInfo(path);

            return new FileManagerEntry
            {
                Name = directory.Name,
                Path = directory.FullName,
                Extension = directory.Extension,
                IsDirectory = true,
                HasDirectories = directory.GetDirectories().Length > 0,
                Created = directory.CreationTime,
                CreatedUtc = directory.CreationTimeUtc,
                Modified = directory.LastWriteTime,
                ModifiedUtc = directory.LastWriteTimeUtc
            };
        }

        public FileManagerEntry GetFile(string path)
        {
            var file = new FileInfo(path);

            return new FileManagerEntry
            {
                Name = Path.GetFileNameWithoutExtension(file.Name),
                Path = file.FullName,
                Size = file.Length,
                Extension = file.Extension,
                IsDirectory = false,
                HasDirectories = false,
                Created = file.CreationTime,
                CreatedUtc = file.CreationTimeUtc,
                Modified = file.LastWriteTime,
                ModifiedUtc = file.LastWriteTimeUtc
            };
        }
    }
```
{% endif %}

The following list provides information about the default requests and responses for the `Create`, `Read`, `Update` and `Destroy` operations:

- `Create`&mdash;Makes a `POST` request for the creation of a directory with the following parameters:

```
    {"Name":"...","Size":0,"Path":"...","Extension":".txt","IsDirectory":...,"HasDirectories":...,"Created":"...","CreatedUtc":"...","Modified":"...","ModifiedUtc":"..."}
```

- `Read`&mdash;Makes a `POST` request that contains the `path` parameter to specify the path which is browsed and expects a file listing in the following format:

```
    [
        {"Name":"Documents","Size":0,"Path":"Documents","Extension":"","IsDirectory":true,"HasDirectories":false,"Created":"\/Date(1578897289317)\/","CreatedUtc":"\/Date(1578897289317)\/","Modified":"\/Date(1578897289332)\/","ModifiedUtc":"\/Date(1578897289332)\/"},
        ...
    ]
```

- `Destroy`&mdash;Makes a `POST` request containing `FormData` with the following parameters:

    | Parameter | Details |
    |--- | --- |
    |`Name`|The file or directory to be deleted.|
    |`Path`|The directory in which the file or the directory resides.|
    |`Extension`| The extension of the deleted file. No extension in the data, if a folder is deleted.|
    |`Size`| The file size, as provided by the `read` response.|
    |`IsDirectory`| Boolean, specifying if the deleted is a file or not.|
    |`HasDirectories`| Boolean, specifying if the deleted contains folders.|
    |`Created`| Created Date of the deleted item.|
    |`CreatedUtc`| Created Date in UTC format of the deleted item.|
    |`Modified`| Modified Date of the deleted item.|
    |`ModifiedUtc`| Created Date in UTC formats of the deleted item.|

- `Update`&mdash;Makes a `POST` request, containing the `FileEntry` object. The expected response is a `file` object in the following format:

```

    {"Name":"...","Size":0,"Path":"...","Extension":".txt","IsDirectory":...,"HasDirectories":...,"Created":"...","CreatedUtc":"...","Modified":"...","ModifiedUtc":"..."}
```

## See Also
* [Overview of {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_overview %})
* [Navigation in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_navigation %})
* [Preview Panes in {{ site.product }} FileManager]({% slug htmlhelpers_filemanager_aspnetcore_previewpane %})

​​​​​​​ 
