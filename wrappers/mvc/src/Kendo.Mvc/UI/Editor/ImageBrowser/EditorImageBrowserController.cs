using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public abstract class EditorImageBrowserController : FileBrowserController, IImageBrowserController
    {
        private readonly IDirectoryBrowser directoryBrowser;
        private readonly IDirectoryPermission permission;
        private readonly IVirtualPathProvider pathProvider;
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
        {
            this.directoryBrowser = directoryBrowser;
            this.permission = permission;
            this.pathProvider = pathProvider;
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
}
