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
            Scripts = true;
        }

        public bool Entities { get; set; }
        public bool Scripts { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (!Entities)
            {
                json["entities"] = Entities;
            }

            if (!Scripts)
            {
                json["scripts"] = Scripts;
            }
        }
    }
}