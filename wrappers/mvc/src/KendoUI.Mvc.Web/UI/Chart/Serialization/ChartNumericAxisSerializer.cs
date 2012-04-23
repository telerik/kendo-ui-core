// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;

    internal class ChartNumericAxisSerializer : ChartAxisSerializerBase
    {
        private readonly IChartNumericAxis axis;

        public ChartNumericAxisSerializer(IChartNumericAxis axis)
            : base(axis)
        {
            this.axis = axis;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("min", axis.Min, () => axis.Min.HasValue)
                .Add("max", axis.Max, () => axis.Max.HasValue)
                .Add("majorUnit", axis.MajorUnit, () => axis.MajorUnit.HasValue);

            return result;
        }
    }
}