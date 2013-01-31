using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public class PhpDescription : IFrameworkDescription
    {
        private static readonly IDictionary<string, string> RelatedFiles = new Dictionary<string, string> {
            { "DataSourceResult.php", "~/src/php/lib/DataSourceResult.php" }
        };

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

                foreach (var keyValuePair in RelatedFiles)
                {
                    if (php.Contains(keyValuePair.Key))
                    {
                        yield return new ExampleFile
                        {
                            Name = keyValuePair.Key,
                            Url = keyValuePair.Value
                        };
                    }
                }
            }
        }
    }
}