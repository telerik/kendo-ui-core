namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttAssignmentsSettings : JsonObject
    {
        public GanttAssignmentsSettings()
        {
            DataSource = new DataSource();
            DataSource.Type = DataSourceType.Ajax;
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields

        public DataSource DataSource { get; set; }

        public string DataResourceIdField { get; set; }

        public string DataTaskIdField { get; set; }
        
        public string DataValueField { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization

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

            if (DataResourceIdField.HasValue())
            {
                json["dataResourceIdField"] = DataResourceIdField;
            }
            
            if (DataTaskIdField.HasValue())
            {
                json["dataTaskIdField"] = DataTaskIdField;
            }
            
            if (DataValueField.HasValue())
            {
                json["dataValueField"] = DataValueField;
            }
            
        //<< Serialization
        }
    }
}
