using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    internal class ChartRadarAreaLineSerializer : ChartLineBaseSerializer
    {
        private readonly ChartRadarAreaLine line;

        public ChartRadarAreaLineSerializer(ChartRadarAreaLine line)
            : base(line)
        {
            this.line = line;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("style", line.Style.ToString().ToLowerInvariant(), ChartRadarAreaStyle.Normal.ToString().ToLowerInvariant());

            return result;
        }
    }
}
