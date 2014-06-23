namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;

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

        public PivotDataSourceType? Type
        {
            get;
            set;
        }

        public string CustomType
        {
            get;
            set;
        }

        public IDictionary<string, object> CustomTransport
        {
            get;
            set;
        }

        public IDictionary<string, object> Events { get; private set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Type != null)
            {
                if (Type == PivotDataSourceType.Xmla)
                {
                    json["type"] = Type.ToString().ToLower();
                }
                else if (Type == PivotDataSourceType.Custom)
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

        }
    }
}