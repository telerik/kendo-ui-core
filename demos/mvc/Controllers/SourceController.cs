using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class SourceController : BaseController
    {
        //
        // GET: /suite/section/example.src.html

        public ActionResult Index(string suite, string section, string example)
        {
            var source = RenderView(
                string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example),
                "SourceLayout"
            );

            return Content(source, "text/plain");
        }

        private string RenderView(string viewName, string template)
        {
            using (var writer = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindView(ControllerContext, viewName, template);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);
                viewResult.View.Render(viewContext, writer);

                return "<pre id='code' class='prettyprint'>" + HttpUtility.HtmlEncode(writer.GetStringBuilder().ToString()) + "</pre>";
            }
        }
    }
}
