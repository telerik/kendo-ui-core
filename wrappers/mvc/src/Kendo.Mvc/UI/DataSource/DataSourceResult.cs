using System;
using System.Collections;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class DataSourceResult
    {
        public IEnumerable Data { get; set; }
        public int Total { get; set; }
    }
}
