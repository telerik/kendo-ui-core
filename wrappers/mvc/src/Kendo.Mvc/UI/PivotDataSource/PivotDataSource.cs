namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public class PivotDataSource : JsonObject
    {
        public PivotDataSource()
            :base()
        {
            Transport = new PivotTransport();

            Rows = new List<PivotDataSourceRow>();
            Columns = new List<PivotDataSourceColumn>();
            Measure = new PivotDataSourceMeasure();
            Schema = new PivotDataSourceSchema();
            Events = new Dictionary<string, object>();
        }

        public IList<PivotDataSourceRow> Rows { get; set; }
        public IList<PivotDataSourceColumn> Columns { get; set; }
        public PivotDataSourceMeasure Measure { get; set; }
        public PivotDataSourceSchema Schema { get; private set; }

        public PivotTransport Transport
        {
            get;
            protected set;
        }

        public string CustomType { get; set; }
        public PivotDataSourceType? Type { get; set; }
        public IEnumerable Data { get; set; }
        public IDictionary<string, object> CustomTransport { get; set; }
        public IDictionary<string, object> Events { get; private set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Type != null)
            {
                if (Type == PivotDataSourceType.Xmla)
                {
                    json["type"] = Type.ToString().ToLower();
                }
                else if (Type == PivotDataSourceType.Ajax)
                {
                    json["type"] = new ClientHandlerDescriptor() { HandlerName = GenerateTypeFunction(true) };
                }
                else
                {
                    if (!string.IsNullOrEmpty(CustomType))
                    {
                        json["type"] = CustomType;
                    }
                }
            }

            if (CustomTransport != null)
            {
                json["transport"] = CustomTransport;
            }
            else
            {
                var transport = Transport.ToJson();

                if (transport.Keys.Any())
                {
                    json["transport"] = transport;
                }
            }

            if (Events.Keys.Any())
            {
                json.Merge(Events);
            }

            if (Rows.Any())
            {
                json["rows"] = Rows.ToJson();
            }

            if (Columns.Any())
            {
                json["columns"] = Columns.ToJson();
            }

            var measures = Measure.ToJson();
            if (measures.Keys.Any())
            {
                json["measures"] = measures;
            }

            var schema = Schema.ToJson();
            if (schema.Keys.Any())
            {
                json["schema"] = schema;
            }

            if (Data != null)
            {
                SerializeData(json, Data);
            }
        }

        private void SerializeData(IDictionary<string, object> json, IEnumerable data)
        {
            if (string.IsNullOrEmpty(Schema.Data))
            {
                json["data"] = Data;
            }
            else
            {
                json["data"] = new Dictionary<string, object>()
                    {
                        { Schema.Data,  Data },
                        { Schema.Total, Data.AsQueryable().Count() }
                    };
            }
        }

        public void ModelType(Type modelType)
        {
            Schema.Model = new ModelDescriptor(modelType);
        }

        private string GenerateTypeFunction(bool isAspNetMvc)
        {
            string baseFunction = "(function(){{if(kendo.data.transports['{0}{1}']){{return '{0}{1}';}}" +
                         " else{{throw new Error('The kendo.aspnetmvc.min.js script is not included.');}}}})()";

            return string.Format(baseFunction, "aspnetmvc-", Type.ToString().ToLower());
        }
    }
}