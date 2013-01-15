namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;

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

            FluentDictionary.For(result)
                .Add("autoBind", navigator.AutoBind, () => navigator.AutoBind.HasValue)
                .Add("dateField", navigator.DateField, () => navigator.DateField.HasValue())
                .Add("visible", navigator.Visible, () => navigator.Visible.HasValue);

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
                result.Add("select", selectData);
            }

            var hint = navigator.Hint.CreateSerializer().Serialize();
            if (hint.Count > 0)
            {
                result.Add("hint", hint);
            }

            var dataSource = navigator.DataSource;
            if (!string.IsNullOrEmpty(dataSource.Transport.Read.Url))
            {
                if (!dataSource.Transport.Read.Type.HasValue())
                {
                    dataSource.Transport.Read.Type = "POST";
                }

                dataSource.Type = DataSourceType.Ajax;
                result.Add("dataSource", dataSource.ToJson());
            }

            return result;
        }
    }
}