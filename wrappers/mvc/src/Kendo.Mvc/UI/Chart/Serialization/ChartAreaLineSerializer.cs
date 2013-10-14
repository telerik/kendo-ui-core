using Kendo.Mvc.Infrastructure;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    internal class ChartAreaLineSerializer : ChartLineBaseSerializer
    {
        private readonly ChartAreaLine line;

        public ChartAreaLineSerializer(ChartAreaLine line)
            : base(line)
        {
            this.line = line;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();

            FluentDictionary.For(result)
                .Add("style", line.Style.ToString().ToLowerInvariant(), ChartAreaStyle.Normal.ToString().ToLowerInvariant());

            return result;
        }
    }
}