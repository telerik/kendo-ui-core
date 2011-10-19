using System;
using System.IO;
using System.Linq;
using System.Web;

namespace Download
{
    /// <summary>
    /// Summary description for info
    /// </summary>
    public class Info : IHttpHandler
    {
        const string COMPONENTS_KEY = "c";
        const string VERSION_KEY = "v";
        const string MIN_KEY = "min";

        public void ProcessRequest(HttpContext context)
        {
            var components = context.Request[COMPONENTS_KEY];
            var version = context.Request[VERSION_KEY];
            var minified = context.Request[MIN_KEY];

            var combinedScript = "";
            var compressed = new byte[] { };

            if (!string.IsNullOrEmpty(components) && !string.IsNullOrEmpty(version))
            {
                var componentNames = components.Split(new char[] { ',' });
                var jsRoot = new DirectoryInfo(
                    HttpContext.Current.Server.MapPath(string.Format("~/App_Data/{0}/js", version))
                );
                var jsFiles = jsRoot.GetFiles("*.js");
                foreach (var name in componentNames)
                {
                    var fileName = "kendo." + name + (minified == "1" ? ".min" : "") + ".js";
                    combinedScript += System.IO.File.ReadAllText(
                        jsFiles.First(f => f.Name.ToLowerInvariant() == fileName).FullName
                    );
                }

                compressed = Ionic.Zlib.GZipStream.CompressString(combinedScript);
            }

            context.Response.ContentType = "application/json";
            context.Response.Write(string.Format(
                "{{ \"size\": {0}, \"compressedSize\": {1} }}",
                    combinedScript.Length, compressed.LongLength
             ));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}