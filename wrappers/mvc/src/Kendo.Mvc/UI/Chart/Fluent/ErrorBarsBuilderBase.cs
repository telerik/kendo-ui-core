namespace Kendo.Mvc.UI.Fluent
{
    using System;

    public abstract class ErrorBarsBuilderBase<TBuilder, TErrorBars> : IHideObjectMembers
        where TBuilder : ErrorBarsBuilderBase<TBuilder, TErrorBars>
        where TErrorBars: ErrorBarsBase        
    {
        protected readonly TErrorBars errorBars;

        /// <summary>
        /// Initializes a new instance of the <see cref="ErrorBarsBuilderBase{TBuilder}" /> class.
        /// </summary>
        /// <param name="errorBars">The error bars configuration.</param>
        public ErrorBarsBuilderBase(TErrorBars errorBars)
        {
            this.errorBars = errorBars;
        }

        /// <summary>
        /// Sets the error bars color.
        /// </summary>
        /// <param name="color">The error bars color.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Color(&quot;red&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Color(&quot;red&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Color(string color)
        {
            errorBars.Color = color;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets a value indicating if the end caps should be shown.
        /// </summary>
        /// <param name="endCaps">A value indicating if the end caps should be shown.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.EndCaps(&quot;false&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.EndCaps(&quot;false&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder EndCaps(bool endCaps)
        {
            errorBars.EndCaps = endCaps;

            return this as TBuilder;
        }

        /// <summary>
        /// Configures the error bars lines.
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <param name="color">The line color.</param>
        /// <param name="dashType">The line dash type.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Line(2, &quot;red&quot;, ChartDashType.Dot))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Line(2, &quot;red&quot;, ChartDashType.Dot))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Line(int width, string color, ChartDashType dashType)
        {
            errorBars.Line.Width = width;
            errorBars.Line.Color = color;
            errorBars.Line.DashType = dashType;

            return this as TBuilder;
        }

        /// <summary>
        /// Configures the error bars lines.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Line(l =&gt; l.Width(2)))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Line(l =&gt; l.Width(2)))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Line(Action<ChartLineBuilderBase> configurator)
        {
            configurator(new ChartLineBuilderBase(errorBars.Line));

            return this as TBuilder;
        }
    }
}
