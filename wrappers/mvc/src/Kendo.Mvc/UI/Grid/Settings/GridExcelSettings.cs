using Kendo.Mvc.Extensions;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{    
    public class GridExcelSettings : JsonObject
    {
        public string ProxyURL
        {
            get;
            set;
        }

        public bool AllPages
        {
            get;
            set;
        }

        public bool Filterable
        {
            get;
            set;
        }

        public string FileName
        {
            get;
            set;
        }

        public bool ForceProxy
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (ProxyURL.HasValue())
            {
                json["proxyURL"] = ProxyURL;
            }

            if (FileName.HasValue())
            {
                json["fileName"] = FileName;
            }

            if (AllPages)
            {
                json["allPages"] = true;
            }

            if (Filterable)
            {
                json["filterable"] = true;
            }

            if (ForceProxy)
            {
                json["forceProxy"] = true;
            }
        }
    }
}