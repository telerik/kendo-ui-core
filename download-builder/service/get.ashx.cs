using System.Web;

namespace Download
{
    public class Get : ServiceBase
    {
        protected override void ProcessScripts(string combinedScript, bool minified, HttpResponse response)
        {
            var combinedName = "kendo.custom" + (minified ? ".min" : "") + ".js";
            response.ContentType = "text/plain";
            response.AddHeader("content-disposition", "attachment;filename=" + combinedName);
            response.Write(combinedScript);
        }
    }
}