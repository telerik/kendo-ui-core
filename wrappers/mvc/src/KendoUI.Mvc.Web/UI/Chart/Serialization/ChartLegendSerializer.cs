// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Extensions;

    internal class ChartLegendSerializer : IChartSerializer
    {
        private readonly ChartLegend legend;

        public ChartLegendSerializer(ChartLegend legend)
        {
            this.legend = legend;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            var legendLabelOptions = new Dictionary<string, object>();

            FluentDictionary.For(legendLabelOptions)
                .Add("font", legend.Font, () => legend.Font.HasValue())
                .Add("color", legend.Color, () => legend.Color.HasValue());

            FluentDictionary.For(result)
                .Add("labels", legendLabelOptions, () => { return legendLabelOptions.Count != 0; })
                .Add("position", legend.Position.ToString().ToLowerInvariant(), () => legend.Position.HasValue)
                .Add("offsetX", legend.OffsetX, () => legend.OffsetX.HasValue)
                .Add("offsetY", legend.OffsetY, () => legend.OffsetY.HasValue)
                .Add("margin", legend.Margin.CreateSerializer().Serialize(), ShouldSerializeMargin)
                .Add("padding", legend.Padding.CreateSerializer().Serialize(), ShouldSerializePadding)
                .Add("border", legend.Border.CreateSerializer().Serialize(), ShouldSerializeBorder)
                .Add("background", legend.Background, () => legend.Background.HasValue())
                .Add("visible", legend.Visible, () => legend.Visible.HasValue);

            return result;
        }

        private bool ShouldSerializeMargin()
        {
            return  legend.Margin.Top.HasValue ||
                    legend.Margin.Right.HasValue ||
                    legend.Margin.Bottom.HasValue ||
                    legend.Margin.Left.HasValue;
        }

        private bool ShouldSerializePadding()
        {
            return legend.Padding.Top.HasValue ||
                   legend.Padding.Right.HasValue ||
                   legend.Padding.Bottom.HasValue ||
                   legend.Padding.Left.HasValue;
        }

        private bool ShouldSerializeBorder()
        {
            return legend.Border.Color.HasValue() ||
                   legend.Border.Width.HasValue ||
                   legend.Border.DashType.HasValue;
        }
    }
}