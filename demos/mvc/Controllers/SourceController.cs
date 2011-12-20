using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using HtmlAgilityPack;
using Fizzler.Systems.HtmlAgilityPack;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public class SourceController : BaseController
    {
        //
        // GET: /Web/

        public ActionResult Index(string section, string example)
        {
            return Content(RenderView(section + "/" + example, "SourceLayout"), "text/plain");
        }

        public string RenderView(string viewName, string template)
        {
            using (var writer = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindView(ControllerContext, viewName, template);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);
                viewResult.View.Render(viewContext, writer);

                return writer.GetStringBuilder().ToString();
            }
        }
    }
}
