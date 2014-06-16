using System.Web.Mvc;
using System.Web;

namespace Kendo.Mvc.UI
{
    public interface IFileBrowserController
    {
        JsonResult Read(string path);
        ActionResult Destroy(string path, FileBrowserEntry entry);
        ActionResult Create(string path, FileBrowserEntry entry);
        ActionResult Upload(string path, HttpPostedFileBase file);
    }
}
