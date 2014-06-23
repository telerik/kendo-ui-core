namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;

    public class PivotGridDataSource : JsonObject
    {
        public PivotGridDataSource()
            :base()
        {
            Transport = new PivotGridTransport();

            Rows = new List<PivotGridDataSourceRow>();
            Columns = new List<PivotGridDataSourceColumn>();
            Measure = new PivotGridDataSourceMeasure();
            Schema = new PivotGridDataSourceSchema();
            Events = new Dictionary<string, object>();
        }

        public IList<PivotGridDataSourceRow> Rows { get; set; }
        public IList<PivotGridDataSourceColumn> Columns { get; set; }
        public PivotGridDataSourceMeasure Measure { get; set; }
        public PivotGridDataSourceSchema Schema { get; private set; }

        public PivotGridTransport Transport
        {
            get;
            protected set;
        }

        public PivotGridDataSourceType? Type
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
                if (Type == PivotGridDataSourceType.Xmla)
                {
                    json["type"] = Type.ToString().ToLower();
                }
                else if (Type == PivotGridDataSourceType.Custom)
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