using System.IO;
using System.Web;
using System.Text.RegularExpressions;

namespace Download
{
    public abstract class ServiceBase : IHttpHandler
    {
        const string COMPONENTS_KEY = "c";
        const string VERSION_KEY = "v";
        const string MIN_KEY = "min";
        readonly Regex CommentRegex = new Regex("/\\*(?:.|[\\n\\r])*?\\*/", RegexOptions.Compiled);

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            var components = (context.Request[COMPONENTS_KEY] ?? "").Split(new char[] { ',' });
            var version = context.Request[VERSION_KEY];
            var minified = context.Request[MIN_KEY] == "1";

            var versionRoot = MapPath("~/App_Data/" + version);
            var jsRoot = Path.Combine(versionRoot, minified ? "js" : "source/js");
            var suffix = (minified ? ".min" : "") + ".js";

            var combinedScript = "";
            string scriptContent;
            var index = 0;
            foreach (var name in components)
            {
                if (!string.IsNullOrWhiteSpace(name))
                {
                    var fullName = Path.Combine(jsRoot, "kendo." + name + suffix);
                    if (Path.GetDirectoryName(fullName) == jsRoot)
                    {
                        scriptContent = System.IO.File.ReadAllText(fullName);
                        if (index++ > 0)
                        {
                            // Strip license from all files, except the first
                            scriptContent = CommentRegex.Replace(scriptContent, "");
                        }

                        combinedScript += scriptContent + ";";
                    }
                }
            }

            ProcessScripts(combinedScript, minified, context.Response);
        }

        protected abstract void ProcessScripts(string combinedScript, bool minified, HttpResponse response);

        private string MapPath(string path)
        {
            return HttpContext.Current.Server.MapPath(path);
        }
    }
}