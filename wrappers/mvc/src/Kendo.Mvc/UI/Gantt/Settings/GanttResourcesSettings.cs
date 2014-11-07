namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttResourcesSettings : JsonObject
    {
        public GanttResourcesSettings()
        {
            DataSource = new DataSource();
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string DataFormatField { get; set; }

        public string DataColorField { get; set; }

        public DataSource DataSource { get; set; }

        public string DataTextField { get; set; }
        
        public string Field { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (DataFormatField.HasValue())
            {
                json["dataFormatField"] = DataFormatField;
            }
            
            if (DataColorField.HasValue())
            {
                json["dataColorField"] = DataColorField;
            }

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url) ||
                !string.IsNullOrEmpty(DataSource.Transport.FunctionRead.HandlerName) ||
                DataSource.Transport.CustomRead != null || 
                DataSource.Type == DataSourceType.Custom)
            {
                json["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                json["dataSource"] = DataSource.Data;
            }

            if (DataTextField.HasValue())
            {
                json["dataTextField"] = DataTextField;
            }
            
            if (Field.HasValue())
            {
                json["field"] = Field;
            }
            
        //<< Serialization
        }
    }
}
