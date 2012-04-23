// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Extensions;

    internal class ChartPlotBandsSerializer : IChartSerializer
    {
        private readonly ChartPlotBand plotBands;

        public ChartPlotBandsSerializer(ChartPlotBand plotBands)
        {
            this.plotBands = plotBands;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
                
            FluentDictionary.For(result)
                .Add("from", plotBands.From, () => plotBands.From.HasValue)
                .Add("to", plotBands.To, () => plotBands.To.HasValue)
                .Add("color", plotBands.Color, () => plotBands.Color.HasValue())
                .Add("opacity", plotBands.Opacity, () => plotBands.Opacity.HasValue);

            return result;
        }
    }
}