using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    internal class ChartPolarAreaLineSerializer : ChartLineBaseSerializer
    {
        private readonly ChartPolarAreaLine line;

        public ChartPolarAreaLineSerializer(ChartPolarAreaLine line): base(line)
        {
            this.line = line;
        }

        public override IDictionary<string, object> Serialize()
        {
            var result = base.Serialize();
            if (line.Style != ChartPolarAreaStyle.Normal)
            {
                result["style"] = line.Style.ToString().ToLowerInvariant();
            }

            return result;
        }
    }
}
