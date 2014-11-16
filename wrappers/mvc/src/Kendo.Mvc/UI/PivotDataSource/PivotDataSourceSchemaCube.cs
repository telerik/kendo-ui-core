namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Infrastructure;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;

    public class PivotDataSourceSchemaCube : JsonObject
    {
        public PivotDataSourceSchemaCube()
        {
            Measures = new List<PivotDataSourceSchemaMeasureDescriptor>();
            Dimensions = new List<PivotDataSourceSchemaDimensionDescriptor>();
        }

        public IList<PivotDataSourceSchemaMeasureDescriptor> Measures { get; set; }
        public IList<PivotDataSourceSchemaDimensionDescriptor> Dimensions { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Measures.Count > 0)
            {
                var measures = new Dictionary<string, object>();
                json["measures"] = measures;

                Measures.Each(prop =>
                {
                    var measure = new Dictionary<string, object>();
                    measures[prop.Measure] = measure;

                    if (!string.IsNullOrEmpty(prop.Caption))
                    {
                        measure["caption"] = prop.Caption;
                    }

                    if (!string.IsNullOrEmpty(prop.Field))
                    {
                        measure["field"] = prop.Field;
                    }

                    if (prop.AggregateName.HasValue())
                    {
                        measure["aggregate"] = prop.AggregateName;
                    } 
                    else if (prop.Aggregate.HasValue())
                    {
                        measure["aggregate"] = prop.Aggregate;
                    }

                    if (prop.Result.HasValue())
                    {
                        measure["result"] = prop.Result;
                    }

                    if (!string.IsNullOrEmpty(prop.Format))
                    {
                        measure["format"] = prop.Format;
                    }
                });
            }

            if (Dimensions.Count > 0)
            {
                var dimensions = new Dictionary<string, object>();
                json["dimensions"] = dimensions;

                Dimensions.Each(prop =>
                {
                    var dimension = new Dictionary<string, object>();
                    dimensions[prop.Member] = dimension;

                    if (!string.IsNullOrEmpty(prop.Caption))
                    {
                        dimension["caption"] = prop.Caption;
                    }
                });
            }
        }
    }
}
