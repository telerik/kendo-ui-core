using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Kendo.Models
{
    public class PhpDescription : IFrameworkDescription
    {
        private static readonly string [] Ignored = { "Autoload.php", "header.php", "footer.php" };

        public string Name
        {
            get
            {
                return "PHP";
            }
        }

        public IEnumerable<ExampleFile> GetFiles(HttpServerUtilityBase server, string example, string suite, string section)
        {
            var url = String.Format("~/src/php/{0}/{1}/{2}.php", suite, section, example); 

            yield return new ExampleFile
            {
                Name = example + ".php",
                Url = url
            };

            var path = server.MapPath(url);

            if (File.Exists(path))
            {
                var php = File.ReadAllText(path);

                foreach (Match match in Regex.Matches(php, @"require_once\s+['""](?<include>[^'""]+)"))
                {
                    var include = match.Groups["include"].Value;
                    var name = Path.GetFileName(include);

                    if (!Ignored.Contains(name))
                    {
                        yield return new ExampleFile
                        {
                            Name = name,
                            Url = VirtualPathUtility.Combine(url, include)
                        };
                    }
                }
            }
        }
    }
}