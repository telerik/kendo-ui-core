namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Globalization;

    /// <summary>
    /// Defines the fluent interface for configuring the chart labels.
    /// </summary>
    public class ChartDateAxisLabelsBuilder : ChartAxisLabelsBuilder
    {
        private readonly ChartAxisLabels labels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDateAxisLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartLabels">The labels configuration.</param>
        public ChartDateAxisLabelsBuilder(ChartAxisLabels chartLabels)
            : base(chartLabels)
        {
            labels = chartLabels;
        }

        /// <summary>
        /// Culture to use for formatting the dates.
        /// </summary>
        /// <param name="culture">Culture to use for formatting the dates.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Date()
        ///                .Categories(sale => sale.Date)
        ///                .Labels(labels => labels.Culture(new CultureInfo("es-ES")))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisLabelsBuilder Culture(CultureInfo culture)
        {
            labels.Culture = culture;

            return this;
        }

        /// <summary>
        /// Culture to use for formatting the dates.
        /// See <a href="http://docs.telerik.com/kendo-ui/getting-started/framework/globalization/overview">Globalization</a>
        /// for more information.
        /// </summary>
        /// <param name="configurator">Culture to use for formatting the dates.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Date()
        ///                .Categories(sale => sale.Date)
        ///                .Labels(labels => labels.Culture(new CultureInfo("es-ES")))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartDateAxisLabelsBuilder DateFormats(Action<ChartAxisLabelsDateFormatsBuilder> configurator)
        {
            configurator(new ChartAxisLabelsDateFormatsBuilder(labels.DateFormats));

            return this;
        }
    }
}
