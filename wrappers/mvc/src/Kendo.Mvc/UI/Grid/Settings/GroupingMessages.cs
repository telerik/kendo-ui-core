using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class GroupingMessages : JsonObject
    {
        public GroupingMessages()
        {
            this.Empty = Messages.Group_Empty;
        }

        public string Empty { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Empty != DefaultEmpty)
            {
                json["empty"] = Empty;
            }
        }

        private const string DefaultEmpty = "Drag a column header and drop it here to group by that column";
    }
}
