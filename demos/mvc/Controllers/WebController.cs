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
            ViewBag.Section = section;
            ViewBag.Example = example;
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
>>>>>>> Add source controller
