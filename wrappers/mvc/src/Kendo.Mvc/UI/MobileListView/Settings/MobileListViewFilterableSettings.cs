namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class MobileListViewFilterableSettings : JsonObject
    {
        public MobileListViewFilterableSettings()
        {            
        }

        public bool Enabled { get; set; }

        public string Placeholder { get; set; }
        
        public bool AutoFilter { get; set; }
        
        public string Field { get; set; }
        
        public bool IgnoreCase { get; set; }
        
        public string Operator { get; set; }                

        protected override void Serialize(IDictionary<string, object> json)
        {
                    
            if (Placeholder.HasValue())
            {
                json["placeholder"] = Placeholder;
            }
            
            json["autoFilter"] = AutoFilter;
                
            if (Field.HasValue())
            {
                json["field"] = Field;
            }
            
            json["ignoreCase"] = IgnoreCase;
                
            if (Operator.HasValue())
            {
                json["operator"] = Operator;
            }
                    
        }
    }
}
