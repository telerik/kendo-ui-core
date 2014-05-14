using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class MonthTemplate : JsonObject
    {
        public string IdPrefix { get; set; }

        public string Content { get; set; }
        public string Empty { get; set; }

        public string ContentId { get; set; }
        public string EmptyId { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {         
            if (ContentId.HasValue())
            {
                json["content"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", IdPrefix, ContentId) };
            }
            else if (Content.HasValue())
            {
                json["content"] = Content;
            }

            if (EmptyId.HasValue())
            {
                json["empty"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", IdPrefix, EmptyId) };
            }
            else if (Empty.HasValue())
            {
                json["empty"] = Empty;
            }
        }
    }
}
