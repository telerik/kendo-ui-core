namespace Kendo.Mvc.UI
{
    using System.Web;
    using System.Web.Mvc;

    public interface IImageBrowserController
    {
        JsonResult Browse(string path);
        ActionResult Thumbnail(string path);
        ActionResult DeleteFile(string path);
        ActionResult DeleteDirectory(string path);
        ActionResult CreateDirectory(string path, string name);
        ActionResult Upload(string path, HttpPostedFileBase file);
    }
}