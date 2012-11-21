namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    internal class ChartAxisBaseUnitStepsSerializer : IChartSerializer
    {
        private readonly ChartAxisBaseUnitSteps baseUnits;

        public ChartAxisBaseUnitStepsSerializer(ChartAxisBaseUnitSteps baseUnits)
        {
            this.baseUnits = baseUnits;
        }

        public IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("minutes", baseUnits.Minutes, () => baseUnits.Minutes != null)
                .Add("hours", baseUnits.Hours, () => baseUnits.Hours != null)
                .Add("days", baseUnits.Days, () => baseUnits.Days != null)
                .Add("weeks", baseUnits.Weeks, () => baseUnits.Weeks != null)
                .Add("months", baseUnits.Months, () => baseUnits.Months != null)
                .Add("years", baseUnits.Years, () => baseUnits.Years != null);

            return result;
        }
    }
}