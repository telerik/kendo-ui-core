namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class GaugeScaleLabelsSerializer : IChartSerializer
    {
        private readonly GaugeScaleLabels labels;

        public GaugeScaleLabelsSerializer(GaugeScaleLabels labels)
        {
            this.labels = labels;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("margin", labels.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("border", labels.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", labels.Color, () => labels.Color.HasValue())
                .Add("background", labels.Background, () => labels.Background.HasValue())
                .Add("font", labels.Font, () => labels.Font.HasValue())
                .Add("format", labels.Format, () => labels.Format.HasValue())
                .Add("padding", labels.Padding.CreateSerializer().Serialize(), ShouldSerializePadding)
                .Add("template", labels.Template, () => labels.Template.HasValue())
                .Add("visible", labels.Visible, () => labels.Visible.HasValue)
                .Add("opacity", labels.Opacity, () => labels.Opacity.HasValue);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return labels.Margin.Top.HasValue ||
                   labels.Margin.Right.HasValue ||
                   labels.Margin.Bottom.HasValue ||
                   labels.Margin.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return labels.Border.Color.HasValue() ||
                   labels.Border.Width.HasValue ||
                   labels.Border.DashType.HasValue;
        }

        private bool ShouldSerializePadding()
        {
            return labels.Padding.Top.HasValue ||
                   labels.Padding.Right.HasValue ||
                   labels.Padding.Bottom.HasValue ||
                   labels.Padding.Left.HasValue;
        }
    }
}