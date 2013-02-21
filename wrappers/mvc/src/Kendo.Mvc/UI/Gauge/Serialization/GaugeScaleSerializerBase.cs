namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class GaugeScaleSerializerBase : IChartSerializer
    {
        private readonly IGaugeScale scale;

        public GaugeScaleSerializerBase(IGaugeScale scale)
        {
            this.scale = scale;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("majorUnit", scale.MajorUnit, () => scale.MajorUnit.HasValue)
                .Add("minorUnit", scale.MinorUnit, () => scale.MinorUnit.HasValue)
                .Add("min", scale.Min, () => scale.Min.HasValue)
                .Add("max", scale.Max, () => scale.Max.HasValue)
                .Add("reverse", scale.Reverse, () => scale.Reverse.HasValue);

            if (scale.Ranges.Count > 0)
            {
                var ranges = new List<IDictionary<string, object>>();

                foreach (var item in scale.Ranges)
                {
                    ranges.Add(item.CreateSerializer().Serialize());
                }

                result.Add("ranges", ranges);
            }

            var majorTicks = scale.MajorTicks.CreateSerializer().Serialize();
            if (majorTicks.Count > 0)
            {
                result.Add("majorTicks", majorTicks);
            }

            var minorTicks = scale.MinorTicks.CreateSerializer().Serialize();
            if (minorTicks.Count > 0)
            {
                result.Add("minorTicks", minorTicks);
            }

            var line = scale.Line.CreateSerializer().Serialize();

            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            return result;
        }
    }
}