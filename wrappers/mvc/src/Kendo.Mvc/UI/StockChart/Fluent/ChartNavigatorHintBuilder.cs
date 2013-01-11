namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="ChartNavigatorhintBuilder"/>.
    /// </summary>
    public class ChartNavigatorHintBuilder : IHideObjectMembers
    {
        private readonly ChartNavigatorHint hint;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigatorHint" /> class.
        /// </summary>
        /// <param name="navigatorHint">The navigator hint.</param>
        public ChartNavigatorHintBuilder(ChartNavigatorHint navigatorHint)
        {
            hint = navigatorHint;
        }

        /// <summary>
        /// Sets the border color.
        /// </summary>
        /// <param name="color">The border color (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///            .Name("Chart")
        ///            .Navigator(nav => nav
        ///                 .Series(series =>
        ///                 {
        ///                    series.Bar(s => s.SalesAmount);
        ///                 })
        ///                 .Hint(hint => hint
        ///                     .Format("{0:d} | {1:d}")
        ///                 )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNavigatorHintBuilder Format(string format)
        {
            hint.Format = format;
            return this;
        }

        /// <summary>
        /// Sets the border opacity
        /// </summary>
        /// <param name="opacity">The border opacity (CSS format).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///            .Name("Chart")
        ///            .Navigator(nav => nav
        ///                 .Series(series =>
        ///                 {
        ///                    series.Bar(s => s.SalesAmount);
        ///                 })
        ///                 .Hint(hint => hint
        ///                     .Template("From: #= from # To: #= to #")
        ///                 )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNavigatorHintBuilder Template(string template)
        {
            hint.Template = template;
            return this;
        }

        /// <summary>
        /// Sets the hint visibility.
        /// </summary>
        /// <param name="visible">The hint visibility.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart(Model)
        ///            .Name("Chart")
        ///            .Navigator(nav => nav
        ///                 .Series(series =>
        ///                 {
        ///                    series.Bar(s => s.SalesAmount);
        ///                 })
        ///                 .Hint(hint => hint
        ///                     .Visible(false)
        ///                 )
        ///            )
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNavigatorHintBuilder Visible(bool visible)
        {
            hint.Visible = visible;
            return this;
        }
    }
}