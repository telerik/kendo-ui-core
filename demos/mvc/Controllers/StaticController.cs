using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class StaticController : BaseController
    {
        //
        // GET: /Source/

        public ActionResult Resource(string assetGroup, string assetType, string file)
        {
            var root = Server.MapPath("~/");
            var path = Path.Combine(root, "..", "..", AssetRoots[assetGroup + "/" + assetType], file);

            return StaticContent(path);
        }
    }
}
