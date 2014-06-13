using System.Web.Mvc;
using System.Web;

namespace Kendo.Mvc.UI
{
    public interface IImageBrowserController : IFileBrowserController
    {
        ActionResult Thumbnail(string path);
    }
}
