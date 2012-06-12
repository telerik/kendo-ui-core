using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;

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

        public JsonpResult Docs(string suite, string widget)
        {
            var root = Server.MapPath("~/");
            var path = Path.Combine(root, "..", "..", "docs", "api", suite, widget + ".md");

            if (!IOFile.Exists(path))
            {
                throw new HttpException(404, "File Not Found");
            }
            var content = "{\"data\":{\"content\": \"" + Convert.ToBase64String(IOFile.ReadAllBytes(path)) +"\"}}";

            return new JsonpResult { Data = content };
        }
    }

    public class JsonpResult : JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            HttpResponseBase response = context.HttpContext.Response;

            if (!String.IsNullOrEmpty(ContentType))
            {
                response.ContentType = ContentType;
            }
            else
            {
                response.ContentType = "application/javascript";
            }
            if (ContentEncoding != null)
            {
                response.ContentEncoding = ContentEncoding;
            }
            if (Data != null)
            {
                var callback = context.HttpContext.Request.Params["callback"] ?? "callback";

                response.Write(callback + "(" + Data + ")");
            }
        }
    }
}
