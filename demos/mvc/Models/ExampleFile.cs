using System;
using System.IO;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public class ExampleFile
    {
        public string Name { get; set; }
        public string Url { get; set; }

        public bool Exists(HttpServerUtilityBase server)
        {
            NormalizeUrl(server);

            return File.Exists(server.MapPath(Url));
        }

        private void NormalizeUrl(HttpServerUtilityBase server)
        {
            var normalized = Url.Replace("-", "_");

            if (File.Exists(server.MapPath(normalized)))
            {
                Url = normalized;
                Name = Name.Replace("-", "_");
            }
        }
    }
}