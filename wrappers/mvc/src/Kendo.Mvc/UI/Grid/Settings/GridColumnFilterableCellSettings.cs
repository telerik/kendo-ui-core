using System;
using System.Collections;

namespace Kendo.Mvc.UI
{
    public class GridColumnFilterableCellSettings : JsonObject
    {
        public GridColumnFilterableCellSettings()
        {
            Enabled = true;
            ShowOperators = true;
            Delay = 200;
            Operator = "eq";
            Template = new ClientHandlerDescriptor();
            DataSource = new DataSource();

            DataSource.Transport.SerializeEmptyPrefix = false;
            DataSource.Schema.Data = "";
            DataSource.Schema.Total = "";
            DataSource.Schema.Errors = "";
        }

        public string Operator { get; set; }
        public double Delay { get; set; }
        public string DataTextField { get; set; }
        public bool Enabled { get; set; }
        public bool ShowOperators { get; set; }
        public ClientHandlerDescriptor Template { get; set; }


        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {            
            if (!Enabled)
            {
                json["enabled"] = Enabled;                
            }
            if (Template.HasValue())
            {
                json["template"] = Template;
            }
            if (!ShowOperators)
            {
                json["showOperators"] = ShowOperators;
            }
            if (Delay != 200)
            {
                json["delay"] = Delay;
            }
            if (Operator != "eq")
            {
                json["operator"] = Operator;
            }
            if (DataTextField != null)
            {
                json["dataTextField"] = DataTextField;
            }
            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url))
            {
                json["dataSource"] = DataSource.ToJson();
            } else if (DataSource.Data != null)
            {
                json["dataSource"] = DataSource.Data;
            }
        }

        public DataSource DataSource { get; set; }
    }
}