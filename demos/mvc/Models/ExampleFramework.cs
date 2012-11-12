using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Models
{
    public class ExampleFramework
    {
        public string Name { get; set; }

        public IEnumerable<ExampleFile> Files { get; set; }
    }
}