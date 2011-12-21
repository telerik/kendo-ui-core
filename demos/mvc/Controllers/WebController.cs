<<<<<<< HEAD
using System;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using HtmlAgilityPack;
using Fizzler.Systems.HtmlAgilityPack;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public class WebController : BaseController
    {
        //
        // GET: /Web/

        public ActionResult Index(string section, string example)
        {
            ViewBag.Description = LoadDescription(section);

            return View(section + "/" + example);
        }

        protected string LoadDescription(string section) {
            var path = Server.MapPath(string.Format(
                "~/content/docs/kendo.ui.{0}.description.html", section)
            );

            if (IOFile.Exists(path)) {
                return IOFile.ReadAllText(path);
            }

            return "";
        }
    }
}
=======
﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Kendo.Models;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public class WebController : BaseController
    {
        //
        // GET: /Web/

        public ActionResult Index(string section, string example)
        {
            ViewBag.Suite = "web";
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.Description = LoadDescription(section);
            ViewBag.HasConfiguration = IsDocumented(section, "configuration");
            ViewBag.HasMethods = IsDocumented(section, "methods");
            ViewBag.HasEvents = IsDocumented(section, "events");
            
            var jss = new JavaScriptSerializer();
            ViewBag.Navigation = jss.Deserialize<IDictionary<string, NavigationWidget[]>>(IOFile.ReadAllText(Server.MapPath("~/App_Data/web.nav.json")));

            FindCurrentExample();

            return View(section + "/" + example);
        }

        protected void FindCurrentExample()
        {
            foreach (string category in ViewBag.Navigation.Keys)
            {
                foreach (NavigationWidget widget in ViewBag.Navigation[category])
                {
                    foreach (NavigationExample example in widget.Items)
                    {
                        if (Request.Path.EndsWith(example.Url))
                        {
                            ViewBag.CurrentWidget = widget;
                            ViewBag.CurrentExample = example;
                            ViewBag.Title = example.Text;

                            return;
                        }
                    }
                }
            }
        }

        public ActionResult Source(string section, string example)
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

                return "<pre id='code' class='prettyprint'>" + HttpUtility.HtmlEncode(writer.GetStringBuilder().ToString()) + "</pre>";
            }
        }

        private bool IsDocumented(string section, string topic){
            return IOFile.Exists(Server.MapPath(string.Format("~/content/docs/kendo.ui.{0}.{1}.html", section, topic)));
        }

        protected string LoadDescription(string section) {
            var path = Server.MapPath(string.Format(
                "~/content/docs/kendo.ui.{0}.description.html", section)
            );

            if (IOFile.Exists(path)) {
                return IOFile.ReadAllText(path);
            }

            return "";
        }
    }
}
>>>>>>> Add source controller
