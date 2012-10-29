using System.Web.Mvc;
using System.Web;

namespace Kendo.Mvc.UI
{
    public interface IImageBrowserController
    {
        JsonResult Read(string path);
        ActionResult Thumbnail(string path);        
        ActionResult Destroy(string path, ImageBrowserEntry entry);
        ActionResult Create(string path, ImageBrowserEntry entry);
        ActionResult Upload(string path, HttpPostedFileBase file);
    }
}
