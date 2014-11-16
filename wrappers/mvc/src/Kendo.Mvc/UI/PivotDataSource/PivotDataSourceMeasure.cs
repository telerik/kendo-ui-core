namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class PivotDataSourceMeasure : JsonObject
    {
        public PivotDataSourceMeasure()
        {
            Axis = PivotDataSourceMeasureAxis.Columns;
        }

        public IEnumerable<PivotDataSourceMeasureDescriptor> Values { get; set; }
        public PivotDataSourceMeasureAxis Axis { get; set; }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Values != null && Values.Any())
            {
                json["values"] = Values.ToJson();
            }
            if (Axis != PivotDataSourceMeasureAxis.Columns)
            {
                json["axis"] = Axis.ToString();
            }
        }
    }
}