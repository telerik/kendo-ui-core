namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartAxisTitleSerializer : IChartSerializer
    {
        private readonly ChartAxisTitle title;

        public ChartAxisTitleSerializer(ChartAxisTitle title)
        {
            this.title = title;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("text", title.Text, () => title.Text.HasValue())
                .Add("font", title.Font, () => title.Font.HasValue())
                .Add("position", title.Position.ToString().ToLowerInvariant(), () => title.Position.HasValue)
                .Add("margin", title.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("padding", title.Padding.CreateSerializer().Serialize(), ShouldSerializePadding)
                .Add("border", title.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("background", title.Background, () => title.Background.HasValue())
                .Add("color", title.Color, () => title.Color.HasValue())
                .Add("opacity", title.Opacity, () => title.Opacity.HasValue)
                .Add("rotation", title.Rotation, () => title.Rotation.HasValue);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return title.Margin.Top.HasValue ||
                    title.Margin.Right.HasValue ||
                    title.Margin.Bottom.HasValue ||
                    title.Margin.Left.HasValue;
        }

        private bool ShouldSerializePadding()
        {
            return title.Padding.Top.HasValue ||
                   title.Padding.Right.HasValue ||
                   title.Padding.Bottom.HasValue ||
                   title.Padding.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return title.Border.Color.HasValue() ||
                   title.Border.Width.HasValue ||
                   title.Border.DashType.HasValue;
        }
    }
}