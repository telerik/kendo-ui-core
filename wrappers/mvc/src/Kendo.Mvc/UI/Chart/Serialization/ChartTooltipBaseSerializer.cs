namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartTooltipBaseSerializer : IChartSerializer
    {
        private readonly ChartTooltipBase chartTooltip;

        public ChartTooltipBaseSerializer(ChartTooltipBase chartTooltip)
        {
            this.chartTooltip = chartTooltip;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("font", chartTooltip.Font, () => chartTooltip.Font.HasValue())
                .Add("padding", chartTooltip.Padding.CreateSerializer().Serialize(), ShouldSerializePadding)
                .Add("border", chartTooltip.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", chartTooltip.Color, () => chartTooltip.Color.HasValue())
                .Add("background", chartTooltip.Background, () => chartTooltip.Background.HasValue())
                .Add("format", chartTooltip.Format, () => chartTooltip.Format.HasValue())
                .Add("template", chartTooltip.Template, () => chartTooltip.Template.HasValue())
                .Add("opacity", chartTooltip.Opacity, () => chartTooltip.Opacity.HasValue)
                .Add("visible", chartTooltip.Visible, () => chartTooltip.Visible.HasValue);

            return result;
        }

        private bool ShouldSerializePadding()
        {
            return chartTooltip.Padding.Top.HasValue ||
                   chartTooltip.Padding.Right.HasValue ||
                   chartTooltip.Padding.Bottom.HasValue ||
                   chartTooltip.Padding.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return chartTooltip.Border.Color.HasValue() ||
                   chartTooltip.Border.Width.HasValue ||
                   chartTooltip.Border.DashType.HasValue;
        }
    }
}