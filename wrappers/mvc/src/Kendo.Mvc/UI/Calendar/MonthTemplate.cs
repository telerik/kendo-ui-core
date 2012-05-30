using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class MonthTemplate : JsonObject
    {
        public string Content { get; set; }
        public string Empty { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Content.HasValue())
            {
                json["content"] = Content;
            }

            if (Empty.HasValue())
            {
                json["empty"] = Empty;
            }
        }
    }
}
