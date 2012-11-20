namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartDateAxisSerializer : ChartAxisSerializerBase<DateTime>
    {
        private readonly IChartDateAxis axis;

        public ChartDateAxisSerializer(IChartDateAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("min", axis.Min, () => axis.Min.HasValue)
                .Add("max", axis.Max, () => axis.Max.HasValue)
                .Add("majorUnit", axis.MajorUnit, () => axis.MajorUnit.HasValue)
                .Add("minorUnit", axis.MinorUnit, () => axis.MinorUnit.HasValue);

            if (axis.BaseUnit != null)
            {
                result.Add("baseUnit", axis.BaseUnit.ToString().ToLowerInvariant());
            }

            if (axis.AxisCrossingValues.Count() > 0)
            {
                var crossingValues =
                    from ac in axis.AxisCrossingValues.AsQueryable()
                    select ac.ToJavaScriptString();

                result.Add("axisCrossingValue", crossingValues.ToArray());
            }

            return result;
        }
    }
}