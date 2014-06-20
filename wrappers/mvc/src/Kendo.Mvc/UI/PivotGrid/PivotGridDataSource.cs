namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class PivotGridDataSource : DataSource
    {
        public PivotGridDataSource()
            :base()
        {
            base.Transport = new PivotGridTransport();

            Rows = new List<PivotGridDataSourceRow>();
            Columns = new List<PivotGridDataSourceColumn>();
            Measure = new PivotGridDataSourceMeasure();
        }

        public IList<PivotGridDataSourceRow> Rows { get; set; }
        public IList<PivotGridDataSourceColumn> Columns { get; set; }
        public PivotGridDataSourceMeasure Measure { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);

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
        }
    }
}