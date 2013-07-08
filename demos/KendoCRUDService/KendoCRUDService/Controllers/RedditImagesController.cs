using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KendoCRUDService.Models;
using System.Net;
using System.IO;

namespace KendoCRUDService.Controllers
{
    public class RedditImagesController : Controller
    {
        private const string contentFolderRoot = "~/Content/reddit";
        private const string prettyName = "Images/";
        private static readonly string[] foldersToCopy = new[] { "~/Content/reddit/" };

        private readonly DirectoryBrowser directoryBrowser;
        private readonly ContentInitializer contentInitializer;
        private readonly ThumbnailCreator thumbnailCreator;

        public RedditImagesController()
        {
            directoryBrowser = new DirectoryBrowser();
            contentInitializer = new ContentInitializer(contentFolderRoot, foldersToCopy, prettyName);
            thumbnailCreator = new ThumbnailCreator();
        }

        [OutputCache(Duration = 3600, VaryByParam = "*")]
        public virtual ActionResult Index(string url, int width, int height)
        {
            string path = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString("n"));

            try
            {  
                HttpWebRequest webRequest = (HttpWebRequest) WebRequest.Create(new Uri(url));
                HttpWebResponse webResponse = (HttpWebResponse) webRequest.GetResponse();

                if (webResponse.ContentLength < 1024 * 1024 * 5)
                {
                    Directory.CreateDirectory(path);

                    string physicalPath = Path.Combine(path, Guid.NewGuid().ToString("n"));

                    WebClient imageReader = new WebClient();
                    imageReader.DownloadFile(url, physicalPath);

                    return CreateThumbnail(physicalPath, width, height);
                }
                else
                {
                    throw new HttpException(403, "Forbidden");
                }
            }
            finally
            {
               Directory.Delete(path, true);
            }
        }

        private FileContentResult CreateThumbnail(string physicalPath, int width, int height)
        {
            using (var fileStream = System.IO.File.OpenRead(physicalPath))
            {
                var desiredSize = new ImageSize
                {
                    Width = width,
                    Height = height
                };

                const string contentType = "image/png";

                return File(thumbnailCreator.CreateFill(fileStream, desiredSize, contentType), contentType);
            }
        }
    }
}
