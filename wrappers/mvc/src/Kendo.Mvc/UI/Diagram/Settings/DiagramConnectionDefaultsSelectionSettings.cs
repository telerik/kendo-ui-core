namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnectionDefaultsSelectionSettings : JsonObject
    {
        public DiagramConnectionDefaultsSelectionSettings()
        {
            //>> Initialization
        
            Handles = new DiagramConnectionDefaultsSelectionHandlesSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public DiagramConnectionDefaultsSelectionHandlesSettings Handles
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var handles = Handles.ToJson();
            if (handles.Any())
            {
                json["handles"] = handles;
            }
        //<< Serialization
        }
    }
}
