namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using KendoUI.Mvc.Infrastructure;

    internal class ChartAxisSerializerBase : IChartSerializer
    {
        private readonly IChartAxis axis;

        public ChartAxisSerializerBase(IChartAxis axis)
        {
            this.axis = axis;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("minorTickSize", axis.MinorTickSize, () => axis.MinorTickSize.HasValue)
                .Add("majorTickSize", axis.MajorTickSize, () => axis.MajorTickSize.HasValue)
                .Add("majorTickType", axis.MajorTickType.ToString(), () => axis.MajorTickType.HasValue)
                .Add("minorTickType", axis.MinorTickType.ToString(), () => axis.MinorTickType.HasValue)
                .Add("axisCrossingValue", axis.AxisCrossingValues, () => axis.AxisCrossingValues.Count() > 0)
                .Add("name", axis.Name, string.Empty)
                .Add("color", axis.Color, string.Empty)
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

            return result;
        }
    }
}