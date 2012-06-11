namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartLine"/>.
    /// </summary>
    public class ChartAxisLabelsDateFormatsBuilder
    {
        private readonly ChartAxisLabelsDateFormats dateFormats;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisLabelsDateFormatsBuilder" /> class.
        /// </summary>
        /// <param name="dateFormats">The date formats.</param>
        public ChartAxisLabelsDateFormatsBuilder(ChartAxisLabelsDateFormats dateFormats)
        {
            this.dateFormats = dateFormats;
        }

        /// <summary>
        /// Sets the date format when the base date unit is <see cref="ChartAxisBaseUnit.Hours"/>
        /// </summary>
        /// <param name="format">The date format.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Date()
        ///               .Labels(labels => labels
        ///                   .DateFormats(formats => formats
        ///                       .Hours("HH:mm")
        ///                   )
        ///               )
        ///            );
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisLabelsDateFormatsBuilder Hours(string format)
        {
            dateFormats.Hours = format;
            return this;
        }

        /// <summary>
        /// Sets the date format when the base date unit is <see cref="ChartAxisBaseUnit.Days"/>
        /// </summary>
        /// <param name="format">The date format.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Date()
        ///               .Labels(labels => labels
        ///                   .DateFormats(formats => formats
        ///                       .Days("HH:mm")
        ///                   )
        ///               )
        ///            );
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisLabelsDateFormatsBuilder Days(string format)
        {
            dateFormats.Days = format;
            return this;
        }

        /// <summary>
        /// Sets the date format when the base date unit is <see cref="ChartAxisBaseUnit.Months"/>
        /// </summary>
        /// <param name="format">The date format.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Date()
        ///               .Labels(labels => labels
        ///                   .DateFormats(formats => formats
        ///                       .Months("HH:mm")
        ///                   )
        ///               )
        ///            );
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisLabelsDateFormatsBuilder Months(string format)
        {
            dateFormats.Months = format;
            return this;
        }

        /// <summary>
        /// Sets the date format when the base date unit is <see cref="ChartAxisBaseUnit.Years"/>
        /// </summary>
        /// <param name="format">The date format.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis
        ///               .Date()
        ///               .Labels(labels => labels
        ///                   .DateFormats(formats => formats
        ///                       .Years("HH:mm")
        ///                   )
        ///               )
        ///            );
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisLabelsDateFormatsBuilder Years(string format)
        {
            dateFormats.Years = format;
            return this;
        }
    }
}