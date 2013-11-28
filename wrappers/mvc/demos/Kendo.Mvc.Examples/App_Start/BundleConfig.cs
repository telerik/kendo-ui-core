using System.Web;
using System.Web.Optimization;

namespace Kendo.Mvc.Examples
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo-web").Include(
                        "~/Scripts/kendo.web.min.js",
                        "~/Scripts/kendo.aspnetmvc.min.js",
                        "~/Scripts/kendo.timezones.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo-dataviz").Include(
                        "~/Scripts/kendo.all.min.js",
                        "~/Scripts/kendo.aspnetmvc.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo-mobile").Include(
                        "~/Scripts/kendo.all.min.js",
                        "~/Scripts/kendo.aspnetmvc.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/demo").Include(
                        "~/Scripts/console.min.js",
                        "~/Scripts/prettify.min.js"));

            bundles.Add(new StyleBundle("~/Content/web/css").Include(
                        "~/Content/web/kendo.common.min.css",
                        "~/Content/web/kendo.rtl.min.css",
                        "~/Content/web/kendo.default.min.css"));

            bundles.Add(new StyleBundle("~/Content/dataviz/css").Include(
                        "~/Content/dataviz/kendo.dataviz.min.css",
                        "~/Content/dataviz/kendo.dataviz.default.min.css"));

            bundles.Add(new StyleBundle("~/Content/mobile/css").Include(
                        "~/Content/mobile/kendo.mobile.all.min.css"));

            bundles.Add(new StyleBundle("~/Content/shared/css").Include(
                        "~/Content/shared/examples-offline.css"));

            bundles.IgnoreList.Clear();
        }
    }
}