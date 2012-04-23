// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;

    internal class ChartCategoryAxisSerializer : ChartAxisSerializerBase
    {
        private readonly IChartCategoryAxis axis;

        public ChartCategoryAxisSerializer(IChartCategoryAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            FluentDictionary.For(result)
                .Add("categories", axis.Categories, () => axis.Categories != null )
                .Add("field", axis.Member, () => axis.Categories == null && axis.Member != null);

            return result;
        }
    }
}
