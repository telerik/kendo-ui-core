using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class DebugController : BaseController
    {
        //
        // GET: /src/(js|styles)/file

        public ActionResult Resource(string assetType, string file)
        {
            var root = Server.MapPath("~/");
            var path = Path.Combine(root, "..", "..", AssetRoots[assetType], file);

            return StaticContent(path);
        }
    }
}
