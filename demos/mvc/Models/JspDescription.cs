using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public class JspDescription : IFrameworkDescription
    {
        public string Name
        {
            get
            {
                return "JSP";
            }
        }

        public IEnumerable<ExampleFile> GetFiles(HttpServerUtilityBase server, string example, string suite, string section)
        {
            yield return new ExampleFile
            {
                Name = example + ".jsp",
                Url = String.Format("~/src/jsp/views/{0}/{1}/{2}.jsp", suite, section, example)
            };

            var path = server.MapPath("~/src/jsp/controllers/");

            if (Directory.Exists(path))
            {
                var sections = Directory.GetDirectories(path);

                var directory = sections.FirstOrDefault(s => s.ToLower().EndsWith(section.Replace("-", "")));

                if (directory != null)
                {
                    var controllers = Directory.GetFiles(directory);

                    var controller = controllers.FirstOrDefault(c => Path.GetFileName(c).ToLower() == example.Replace("-", "") + "controller.java");

                    if (controller != null)
                    {
                        yield return new ExampleFile
                        {
                            Name = Path.GetFileName(controller),
                            Url = "~/src/jsp/controllers/" + Path.GetFileName(directory) + "/" + Path.GetFileName(controller)
                        };
                    }
                }
            }
        }
    }
}