using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class CrudOperation : JsonObject
    {
        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Url.HasValue())
            {
                json["url"] = Url;

                if (DataType.HasValue())
                {
                    json["dataType"] = DataType;
                }
            }
        }

        public string Url { get; set; }

        public string DataType { get; set; }
    }
}