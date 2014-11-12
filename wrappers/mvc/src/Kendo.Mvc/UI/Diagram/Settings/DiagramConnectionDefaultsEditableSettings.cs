namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramConnectionDefaultsEditableSettings : JsonObject
    {
        public DiagramConnectionDefaultsEditableSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
            Tools = new List<DiagramConnectionDefaultsEditableSettingsTool>();
                
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public List<DiagramConnectionDefaultsEditableSettingsTool> Tools
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var tools = Tools.ToJson();
            if (tools.Any())
            {
                json["tools"] = tools;
            }
        //<< Serialization
        }
    }
}
