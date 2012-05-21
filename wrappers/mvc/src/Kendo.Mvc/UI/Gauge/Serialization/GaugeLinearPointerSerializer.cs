namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    internal class GaugeLinearPointerSerializer : IChartSerializer
    {
        private readonly GaugeLinearPointer pointer;

        public GaugeLinearPointerSerializer(GaugeLinearPointer pointer)
        {
            this.pointer = pointer;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("margin", pointer.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("border", pointer.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", pointer.Color, () => pointer.Color.HasValue())
                .Add("size", pointer.Size, () => pointer.Size.HasValue)
                .Add("opacity", pointer.Opacity, () => pointer.Opacity.HasValue)
                .Add("value", pointer.Value, () => pointer.Value.HasValue)
                .Add("shape", pointer.Shape.ToString().ToLowerInvariant(), () => pointer.Shape.HasValue);

            var track = pointer.Track.CreateSerializer().Serialize();
            if (track.Count > 0)
            {
                result.Add("track", track);
            }

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return pointer.Margin.Top.HasValue ||
                   pointer.Margin.Right.HasValue ||
                   pointer.Margin.Bottom.HasValue ||
                   pointer.Margin.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return pointer.Border.Color.HasValue() ||
                   pointer.Border.Width.HasValue ||
                   pointer.Border.DashType.HasValue;
        }
    }
}