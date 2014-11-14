using Kendo.Mvc.Extensions;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{    
    public class PDFSettings : JsonObject
    {
        public string ProxyURL { get; set; }

        public object PaperSize { get; set; }

        public string FileName { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Subject { get; set; }

        public string Keywords { get; set; }

        public string Creator { get; set; }

        public DateTime? Date { get; set; }

        public bool Landscape { get; set; }

        public IDictionary<string, object> Margin { get; set; }

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

            if (PaperSize != null)
            {
                json["paperSize"] = PaperSize;
            }

            if (Landscape)
            {
                json["lanscape"] = Landscape;
            }

            if (Margin != null && Margin.Any())
            {
                json["margin"] = Margin;
            }

            if (Title.HasValue())
            {
                json["title"] = Title;
            }

            if (Author.HasValue())
            {
                json["author"] = Author;
            }

            if (Subject.HasValue())
            {
                json["subject"] = Subject;
            }

            if (Keywords.HasValue())
            {
                json["keywords"] = Keywords;
            }

            if (Creator.HasValue())
            {
                json["creator"] = Creator;
            }

            if (Date != null)
            {
                json["date"] = Date;
            }

            if (ForceProxy)
            {
                json["forceProxy"] = true;
            }
        }
    }
}