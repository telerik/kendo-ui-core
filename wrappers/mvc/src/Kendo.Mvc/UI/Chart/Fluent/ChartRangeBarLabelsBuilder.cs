namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring the chart range bar labels.
    /// </summary>
    public class ChartRangeBarLabelsBuilder : ChartLabelsBuilderBase<ChartRangeBarLabelsBuilder>
    {
        private readonly ChartRangeBarLabels rangeBarLabels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartRangeBarLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartRangeBarLabels">The labels configuration.</param>
        public ChartRangeBarLabelsBuilder(ChartRangeBarLabels chartRangeBarLabels)
            : base(chartRangeBarLabels)
        {
            rangeBarLabels = chartRangeBarLabels;
        }

        /// <summary>
        /// Sets the from label visibility
        /// </summary>
        /// <param name="visible">Boolean parameter to configure the visibility</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RangeBar(m => m.WiFiFrom, m => m.WiFiTo)
        ///               .Labels(labels => labels.From(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </example>
        public ChartRangeBarLabelsBuilder From(bool visible)
        {
            rangeBarLabels.From.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the from label
        /// </summary>
        /// <param name="configurator">The from label configuration</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RangeBar(m => m.WiFiFrom, m => m.WiFiTo)
        ///               .Labels(labels => labels.From(f => f.Visible(true))
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </example>
        public ChartRangeBarLabelsBuilder From(Action<ChartBarLabelsBuilder> configurator)
        {
            configurator(new ChartBarLabelsBuilder(rangeBarLabels.From));

            return this;
        }

        /// <summary>
        /// Sets the to label visibility
        /// </summary>
        /// <param name="visible">Boolean parameter to configure the visibility</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RangeBar(m => m.WiFiFrom, m => m.WiFiTo)
        ///               .Labels(labels => labels.To(true)
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </example>
        public ChartRangeBarLabelsBuilder To(bool visible)
        {
            rangeBarLabels.To.Visible = visible;

            return this;
        }

        /// <summary>
        /// Configures the to label
        /// </summary>
        /// <param name="configurator">The to label configuration</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .RangeBar(m => m.WiFiFrom, m => m.WiFiTo)
        ///               .Labels(labels => labels.To(t => t.Visible(true))
        ///               );
        ///            )
        ///           .Render();
        /// %&gt;
        /// </example>
        public ChartRangeBarLabelsBuilder To(Action<ChartBarLabelsBuilder> configurator)
        {
            configurator(new ChartBarLabelsBuilder(rangeBarLabels.To));

            return this;
        }
    }
}
