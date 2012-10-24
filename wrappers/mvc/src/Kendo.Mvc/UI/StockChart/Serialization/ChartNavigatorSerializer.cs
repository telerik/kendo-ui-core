namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    internal class ChartNavigatorSerializer<T> : IChartSerializer where T : class
    {
        private readonly ChartNavigator<T> navigator;

        public ChartNavigatorSerializer(ChartNavigator<T> navigator)
        {
            this.navigator = navigator;
        }

        public virtual IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();
            var series = navigator.Series;

            if (series.Count > 0)
            {
                var serializedSeries = new List<IDictionary<string, object>>();
                foreach (var s in series)
                {
                    serializedSeries.Add(s.CreateSerializer().Serialize());
                }

                result.Add("series", serializedSeries);
            }

            var selectData = navigator.Select.CreateSerializer().Serialize();
            if (selectData.Count > 0)
            {
                selectData.Add("range", selectData);
            }

            return result;
        }
    }
}