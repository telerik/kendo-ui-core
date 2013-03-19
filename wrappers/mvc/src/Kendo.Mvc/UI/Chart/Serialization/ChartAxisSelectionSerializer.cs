namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    internal class ChartAxisSelectionSerializer : IChartSerializer
    {
        private readonly ChartAxisSelection selection;

        public ChartAxisSelectionSerializer(ChartAxisSelection selection)
        {
            this.selection = selection;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            var fromDate = selection.From as DateTime?;
            var toDate = selection.To as DateTime?;

            if (fromDate != null)
            {
                result.Add("from", fromDate.ToJavaScriptString());
            }
            else if (selection.From != null)
            {
                result.Add("from", selection.From);
            }

            if (toDate != null)
            {
                result.Add("to", toDate.ToJavaScriptString());
            }
            else if (selection.To != null)
            {
                result.Add("to", selection.To);
            }

            var mwData = selection.Mousewheel.CreateSerializer().Serialize();
            if (mwData.Count > 0)
            {
                result.Add("mousewheel", mwData);
            }

            return result;
        }
    }
}