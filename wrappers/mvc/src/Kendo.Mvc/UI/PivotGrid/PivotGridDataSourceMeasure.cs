namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class PivotGridDataSourceMeasure : JsonObject
    {
        public PivotGridDataSourceMeasure()
        {
            Axis = PivotGridDataSourceMeasureAxis.Columns;
        }

        public IEnumerable<string> Values { get; set; }
        public PivotGridDataSourceMeasureAxis Axis { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Values != null && Values.Any())
            {
                json["values"] = Values;
            }
            if (Axis != PivotGridDataSourceMeasureAxis.Columns)
            {
                json["axis"] = Axis.ToString();
            }
        }
    }
}