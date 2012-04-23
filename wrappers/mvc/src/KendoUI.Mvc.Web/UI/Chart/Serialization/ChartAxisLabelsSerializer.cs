// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;

    internal class ChartAxisLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartAxisLabels axisLabels;

        public ChartAxisLabelsSerializer(ChartAxisLabels axisLabels)
            : base(axisLabels)
        {
            this.axisLabels = axisLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("mirror", axisLabels.Mirror, () => axisLabels.Mirror.HasValue)
                .Add("step", axisLabels.Step, () => axisLabels.Step.HasValue);

            return result;
        }
    }
}