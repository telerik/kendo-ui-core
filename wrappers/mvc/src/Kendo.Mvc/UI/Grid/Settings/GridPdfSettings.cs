using Kendo.Mvc.Extensions;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{    
    public class GridPdfSettings : JsonObject
    {
        public string ProxyUrl
        {
            get;
            set;
        }


        public string PaperSize
        {
            get;
            set;
        }

        public string FileName
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (ProxyUrl.HasValue())
            {
                json["proxyURL"] = ProxyUrl;
            }

            if (FileName.HasValue())
            {
                json["fileName"] = FileName;
            }

            if (PaperSize.HasValue())
            {
                json["paperSize"] = PaperSize;
            }
        }
    }
}