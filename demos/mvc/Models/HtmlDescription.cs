using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public class HtmlDescription : IFrameworkDescription
    {
        public string Name
        {
            get { throw new NotImplementedException(); }
        }

        public IEnumerable<ExampleFile> GetFiles(HttpServerUtilityBase server, string example, string section)
        {
            yield return new ExampleFile
            {
                Name = example + ".html",
                Url = string.Format("~/Views/demos/{0}/{1}.cshtml", section, example)
            };
        }
    }
}