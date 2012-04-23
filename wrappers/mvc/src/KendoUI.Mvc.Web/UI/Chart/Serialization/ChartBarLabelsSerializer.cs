// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;

    internal class ChartBarLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartBarLabels barLabels;

        public ChartBarLabelsSerializer(ChartBarLabels barLabels)
            : base(barLabels)
        {
            this.barLabels = barLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (barLabels.Position.HasValue)
            {
                FluentDictionary.For(result)
                    .Add("position", barLabels.Position.ToString().ToCamelCase());
            }

            return result;
        }
    }
}