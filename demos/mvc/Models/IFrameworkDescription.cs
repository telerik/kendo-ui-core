using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Models
{
    public interface IFrameworkDescription
    {
        string Name { get; }

        IEnumerable<ExampleFile> GetFiles(HttpServerUtilityBase server, string example, string suite, string section);
    }
}
