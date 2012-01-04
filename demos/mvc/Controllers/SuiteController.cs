using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using Kendo.Models;
using IOFile = System.IO.File;

namespace Kendo.Controllers
{
    public class SuiteController : BaseController
    {
        //
        // GET: /Web/
        public ActionResult Index(string suite, string section, string example)
        {
            ViewBag.ShowCodeStrip = true;
            ViewBag.Suite = suite;
            ViewBag.Section = section;
            ViewBag.Example = example;
            ViewBag.Description = LoadDescription(suite, section);
            ViewBag.ConfigurationDocPath = DocPath(suite, section, "configuration");
            ViewBag.MethodsDocPath = DocPath(suite, section, "methods");
            ViewBag.EventsDocPath = DocPath(suite, section, "events");

            LoadNavigation(suite);

            FindCurrentExample();

            if (suite == "mobile") {
                ViewBag.scripts = Kendo.Models.ScriptGroups.Mobile;
            } else {
                ViewBag.scripts = Kendo.Models.ScriptGroups.All;
            }

            return View(
                string.Format("~/Views/{0}/{1}/{2}.cshtml", suite, section, example)
            );
        }

        public ActionResult SectionIndex(string suite, string section)
        {
            var isMobileDevice = Regex.IsMatch(Request.UserAgent, "(android|iphone|ipad|ipod)", RegexOptions.IgnoreCase);
            var redirect = RedirectPermanent(Url.Action("Index", new { suite = suite, section = section, example = "index" }));

            if (suite == "mobile" && isMobileDevice)
            {
                redirect = RedirectPermanent(Url.RouteUrl("MobileDeviceIndex"));
            }

            return redirect;
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

        protected string LoadDescription(string suite, string section) {
            var path = DocPath(suite, section, "description");
            var description = "";

            if (path != null) {
                description = IOFile.ReadAllText(Server.MapPath(path));
            }

            return description;
        }

        private string DocPath(string suite, string section, string topic)
        {
            var component = section;

            switch(suite) {
                case "dataviz":
                    component = "ui.chart";
                    break;
                case "mobile":
                    component = "mobile.ui." + component;
                    break;
                case "web":
                    component = "ui." + component;
                    break;
            }

            var path = string.Format(
                "~/content/docs/kendo.{0}.{1}.html", component, topic
            );

            if (IOFile.Exists(Server.MapPath(path)))
            {
                return path;
            }
            else
            {
                return null;
            }
        }
    }
}
