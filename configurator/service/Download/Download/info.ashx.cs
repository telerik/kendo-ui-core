using System.Web;
using Ionic.Zlib;

namespace Download
{
    public class Info : ServiceBase
    {
        protected override void ProcessScripts(string combinedScript, bool minified, HttpResponse response)
        {
            var compressed = GZipStream.CompressString(combinedScript);

            response.ContentType = "application/json";
            response.Write(string.Format(
                "{{ \"size\": {0}, \"compressedSize\": {1} }}",
                    combinedScript.Length, compressed.LongLength
             ));
        }
    }
}