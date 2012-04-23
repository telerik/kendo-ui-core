// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Extensions;

    internal class ChartLineMarkersSerializer : IChartSerializer
    {
        private readonly ChartMarkers lineMarker;

        public ChartLineMarkersSerializer(ChartMarkers chartLineMarker)
        {
            this.lineMarker = chartLineMarker;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            
            FluentDictionary.For(result)
                .Add("visible", lineMarker.Visible, () => lineMarker.Visible.HasValue)
                .Add("border", lineMarker.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("type", lineMarker.Type.ToString().ToLowerInvariant(), () => lineMarker.Type.HasValue)
                .Add("background", lineMarker.Background, () => lineMarker.Background.HasValue())
                .Add("size", lineMarker.Size, () => lineMarker.Size.HasValue);

            return result;
        }

        private bool ShouldSerializeBorder()
        {
            return lineMarker.Border.Color.HasValue() ||
                   lineMarker.Border.Width.HasValue ||
                   lineMarker.Border.DashType.HasValue;
        }
    }
}