namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class ChartTitleSerializer : IChartSerializer
    {
        private readonly ChartTitle title;

        public ChartTitleSerializer(ChartTitle title)
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
                .Add("align", title.Align.ToString().ToLowerInvariant(), () => title.Align.HasValue)
                .Add("margin", title.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("padding", title.Padding.CreateSerializer().Serialize(), ShouldSerializePadding)
                .Add("border", title.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("background", title.Background, () => title.Background.HasValue())
                .Add("visible", title.Visible, () => title.Visible.HasValue);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return  title.Margin.Top.HasValue ||
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