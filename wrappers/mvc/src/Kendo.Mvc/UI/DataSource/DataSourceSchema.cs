using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class DataSourceSchema : JsonObject
    {
        public string Data { get; set; }

        public string Total { get; set; }

        public string Errors { get; set; }

        public ModelDescriptor Model
        {
            get;
            set;
        }

        public DataSourceSchema()
        {
            Data = "Data";
            Total = "Total"; 
            Errors = "Errors";
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            json.Add("data", Data);
            json.Add("total", Total);
            json.Add("errors", Errors);

            if (Model != null)
            {
                json.Add("model", Model.ToJson());
            }
        }
    }
}
