namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Resources;

    public class EditorSerializationOptions : JsonObject
    {
        public EditorSerializationOptions()
        {
            Entities = true;
        }

        public bool Entities { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!Entities)
            {
                json["entities"] = Entities;
            }
        }
    }
}