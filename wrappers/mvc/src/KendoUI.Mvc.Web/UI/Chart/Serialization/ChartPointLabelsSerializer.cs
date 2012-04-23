// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    internal class ChartPointLabelsSerializer : ChartLabelsBase
    {
        private readonly ChartPointLabels lineLabels;

        public ChartPointLabelsSerializer(ChartPointLabels lineLabels)
            : base(lineLabels)
        {
            this.lineLabels = lineLabels;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            if (lineLabels.Position.HasValue)
            {
                FluentDictionary.For(result)
                    .Add("position", lineLabels.Position.ToString().ToCamelCase());
            }

            return result;
        }
    }
}