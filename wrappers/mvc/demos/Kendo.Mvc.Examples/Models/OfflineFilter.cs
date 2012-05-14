using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Kendo.Mvc.Examples.Models
{
    public class OfflineFilter
    {
        public bool SkipAlways { get; set; }
        public bool SkipHtml { get; set; }
        public bool SkipMvc { get; set; }
    }
}