namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Extensions;

    internal class LinearGaugeTrackSerializer : IChartSerializer
    {
        private readonly LinearGaugeTrack track;

        public LinearGaugeTrackSerializer(LinearGaugeTrack track)
        {
            this.track = track;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("border", track.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("color", track.Color, () => track.Color.HasValue())
                .Add("visible", track.Visible, () => track.Visible.HasValue)
                .Add("size", track.Size, () => track.Size.HasValue)
                .Add("opacity", track.Opacity, () => track.Opacity.HasValue);

            return result;
        }

        private bool ShouldSerializeBorder()
        {
            return track.Border.Color.HasValue() ||
                   track.Border.Width.HasValue ||
                   track.Border.DashType.HasValue;
        }
    }
}