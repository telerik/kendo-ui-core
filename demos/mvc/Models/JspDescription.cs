using System;
using System.Collections.Generic;
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
        }
    }
}