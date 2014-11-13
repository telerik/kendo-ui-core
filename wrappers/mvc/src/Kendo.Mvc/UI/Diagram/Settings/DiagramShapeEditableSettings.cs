namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DiagramShapeEditableSettings : JsonObject
    {
        public DiagramShapeEditableSettings()
        {
            Enabled = true;
            //>> Initialization
        
            Tools = new List<DiagramShapeEditableSettingsTool>();
                
        //<< Initialization
        }

        //>> Fields
        
        public bool? Connect { get; set; }
        
        public List<DiagramShapeEditableSettingsTool> Tools
        {
            get;
            set;
        }
        
        //<< Fields

        public bool Enabled { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Enabled)
            {
                //>> Serialization
        
            if (Connect.HasValue)
            {
                json["connect"] = Connect;
            }
                
            var tools = Tools.ToJson();
            if (tools.Any())
            {
                json["tools"] = tools;
            }
        //<< Serialization
            }
        }
    }
}
