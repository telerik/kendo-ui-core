using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public abstract class EditorFileBrowserController : Controller, IImageBrowserController
    {
        private readonly IDirectoryBrowser directoryBrowser;
        private readonly IDirectoryPermission permission;
        private readonly IVirtualPathProvider pathProvider;
        private readonly IThumbnailCreator thumbnailCreator;

        private const int ThumbnailHeight = 80;
        private const int ThumbnailWidth = 80;

        protected EditorFileBrowserController()
            : this(DI.Current.Resolve<IDirectoryBrowser>(),
                   DI.Current.Resolve<IDirectoryPermission>(),
                   DI.Current.Resolve<IVirtualPathProvider>(),
                   DI.Current.Resolve<IThumbnailCreator>())
        {
        }

        protected EditorFileBrowserController(IDirectoryBrowser directoryBrowser,
            IDirectoryPermission permission,
            IVirtualPathProvider pathProvider,
            IThumbnailCreator thumbnailCreator)
        {
            this.directoryBrowser = directoryBrowser;
            this.permission = permission;
            this.pathProvider = pathProvider;
            this.thumbnailCreator = thumbnailCreator;
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
                return EditorFileBrowserSettings.DefaultFilter;
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

        private string NormalizePath(string path)
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

                return Content("");
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

                return Content("");
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

            return allowedExtensions.Any(e => e.EndsWith(extension, StringComparison.InvariantCultureIgnoreCase));
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
}
