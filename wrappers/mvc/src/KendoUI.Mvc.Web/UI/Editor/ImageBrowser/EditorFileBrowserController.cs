// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;

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
        /// Gets the base paths from which content will be served.
        /// </summary>
        public abstract string[] ContentPaths
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
        public virtual bool AuthorizeBrowse(string path)
        {
            return CanAccess(path);
        }

        protected virtual bool CanAccess(string path)
        {
            return ContentPaths.Any(contentPath => permission.CanAccess(pathProvider.ToAbsolute(contentPath), path));
        }

        /// <summary>
        /// Retrieves the content of a given folder.
        /// </summary>
        /// <param name="path">The folder's path, which content will be served.</param>
        /// <returns>A <see cref="JsonResult"/> containing folder's files and child folders.</returns>
        /// <exception cref="HttpException">Throws 403 Forbidden if the supplied <paramref name="path"/> is outside of the valid paths.</exception>
        /// <exception cref="HttpException">Throws 404 File Not Found if refered folder does not exist.</exception>
        public virtual JsonResult Browse(string path)
        {
            path = NormalizePath(path);
            
            if (AuthorizeBrowse(path))
            {
                try
                {
                    directoryBrowser.Server = Server;

                    var result = new BrowseResult
                    {
                        Files = directoryBrowser.GetFiles(path, Filter),
                        Directories = directoryBrowser.GetDirectories(path),
                        Path = pathProvider.AppendTrailingSlash(path),
                        ContentPaths = ContentPaths.Select(root => pathProvider.ToAbsolute(root)).ToArray()
                    };

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
        /// Determines if a file can be uploaded to a given path.
        /// </summary>
        /// <param name="path">The path to which the file should be uploaded.</param>
        /// <param name="file">The file which should be uploaded.</param>
        /// <returns>true if the upload is allowed, otherwise false.</returns>
        public virtual bool AuthorizeUpload(string path, HttpPostedFileBase file)
        {
            return CanAccess(path) && IsValidFile(file.FileName);
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
            Guard.IsNotNull(file, "file");

            path = NormalizePath(path);
            var fileName = Path.GetFileName(file.FileName);

            if (AuthorizeUpload(path, file))
            {
                file.SaveAs(Path.Combine(Server.MapPath(path), fileName));
                return Json(new FileEntry
                {
                    Size = file.ContentLength,
                    Name = fileName
                }, "text/plain");
            }

            throw new HttpException(403, "Forbidden");
        }

        private bool IsValidFile(string fileName)
        {
            var extension = Path.GetExtension(fileName);
            var allowedExtensions = Filter.Split(',');

            return allowedExtensions.Any(e => e.EndsWith(extension, StringComparison.InvariantCultureIgnoreCase));
        }

        /// <summary>
        /// Determines if an image's thumbnail should be served.
        /// </summary>
        /// <param name="path">The path to image's thumbnail.</param>
        /// <returns>true if image's thumbnail should be served, otherwise false.</returns>
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
        [OutputCache(Duration=3600, VaryByParam="path")]
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

        private string NormalizePath(string path)
        {
            if (string.IsNullOrEmpty(path))
            {
                return pathProvider.ToAbsolute(ContentPaths.First());
            }
            return path;
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
        /// Deletes a file.
        /// </summary>
        /// <param name="path">The path to the file.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteFile(string path)
        {
            path = NormalizePath(path);

            if (AuthorizeDeleteFile(path))
            {
                var physicalPath = Server.MapPath(path);

                if (System.IO.File.Exists(physicalPath))
                {
                    System.IO.File.Delete(physicalPath);
                }

                return Content("");
            }
            
            throw new HttpException(403, "Forbidden");
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

        /// <summary>
        /// Deletes a folder.
        /// </summary>
        /// <param name="path">The path to the folder.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteDirectory(string path)
        {
            path = NormalizePath(path);

            if (AuthorizeDeleteDirectory(path))
            {
                var physicalPath = Server.MapPath(path);

                if (Directory.Exists(physicalPath))
                {
                    Directory.Delete(physicalPath, true);
                }

                return Content("");
            }

            throw new HttpException(403, "Forbidden");
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
        /// Creates a folder with a given name.
        /// </summary>
        /// <param name="path">The path to the parent folder in which the folder should be created.</param>
        /// <param name="name">Name of the folder.</param>
        /// <returns>An empty <see cref="ContentResult"/>.</returns>
        /// <exception cref="HttpException">Forbidden</exception>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult CreateDirectory(string path, string name)
        {
            path = NormalizePath(path);

            if (AuthorizeCreateDirectory(path, name))
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
    }
}