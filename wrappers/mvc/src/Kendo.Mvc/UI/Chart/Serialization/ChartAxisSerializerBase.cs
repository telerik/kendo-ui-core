namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartAxisSerializerBase<TValue> : IChartSerializer
        where TValue : struct
    {
        private readonly IChartAxis<TValue> axis;

        public ChartAxisSerializerBase(IChartAxis<TValue> axis)
        {
            this.axis = axis;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("name", axis.Name, string.Empty)
                .Add("pane", axis.Pane, string.Empty)
                .Add("color", axis.Color, string.Empty)
                .Add("visible", axis.Visible, () => axis.Visible.HasValue)
                .Add("narrowRange", axis.NarrowRange, () => axis.NarrowRange.HasValue)
                .Add("reverse", axis.Reverse, () => axis.Reverse.HasValue);

            var labelsData = axis.Labels.CreateSerializer().Serialize();
            if (labelsData.Count > 0)
            {
                result.Add("labels", labelsData);
            }

            var majorGridLines = axis.MajorGridLines.CreateSerializer().Serialize();
            if (majorGridLines.Count > 0)
            {
                result.Add("majorGridLines", majorGridLines);
            }

            var minorGridLines = axis.MinorGridLines.CreateSerializer().Serialize();
            if (minorGridLines.Count > 0)
            {
                result.Add("minorGridLines", minorGridLines);
            }

            var line = axis.Line.CreateSerializer().Serialize();
            if (line.Count > 0)
            {
                result.Add("line", line);
            }

            if (axis.PlotBands.Count > 0)
            {
                var dataList = new List<IDictionary<string, object>>();

                foreach (var item in axis.PlotBands)
                {
                    dataList.Add(item.CreateSerializer().Serialize());
                }

                result.Add("plotBands", dataList);
            }

            var title = axis.Title.CreateSerializer().Serialize();
            if (title.Count > 0)
            {
                result.Add("title", title);
            }

            var majorTicks = axis.MajorTicks.CreateSerializer().Serialize();
            if (majorTicks.Count > 0)
            {
                result.Add("majorTicks", majorTicks);
            }

            var minorTicks = axis.MinorTicks.CreateSerializer().Serialize();
            if (minorTicks.Count > 0)
            {
                result.Add("minorTicks", minorTicks);
            }

            return result;
        }
    }
}