// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Extensions;

    internal class ChartPieConnectorsSerializer : IChartSerializer
    {
        private readonly ChartPieConnectors pieConnectors;

        public ChartPieConnectorsSerializer(ChartPieConnectors pieConnectors)
        {
            this.pieConnectors = pieConnectors;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("width", pieConnectors.Width, () => pieConnectors.Width.HasValue)
                .Add("color", pieConnectors.Color, () => pieConnectors.Color.HasValue())
                .Add("padding", pieConnectors.Padding, () => pieConnectors.Padding.HasValue);

            return result;
        }
    }
}