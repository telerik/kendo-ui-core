namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the error bars.
    /// </summary>
    public class ScatterErrorBarsBuilder :
        ErrorBarsBuilderBase<ScatterErrorBarsBuilder, ScatterErrorBars>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ScatterErrorBarsBuilder"/> class.
        /// </summary>
        /// <param name="errorBars">The error bars.</param>
        public ScatterErrorBarsBuilder(ScatterErrorBars errorBars)
            : base(errorBars)
        {
        }

        /// <summary>
        /// Sets the error bars x value.
        /// </summary>
        /// <param name="xValue">The error bars x value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(&quot;stderr&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(&quot;stderr&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XValue(string xValue)
        {
            errorBars.XValue = xValue;

            return this;
        }

        /// <summary>
        /// Sets the error bars difference from the point x value.
        /// </summary>
        /// <param name="xValue">The error bars difference from the point x value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(1))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(1))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XValue(double xValue)
        {
            errorBars.XValue = xValue;

            return this;
        }

        /// <summary>
        /// Sets the error bars low and high value difference from the point x value.
        /// </summary>
        /// <param name="xLowValue">The error bar low value difference from point x value.</param>
        /// <param name="xHighValue">The error bar high value difference from point x value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(1, 2))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(1, 2))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XValue(double xLowValue, double xHighValue)
        {
            errorBars.XValue = new double[] { xLowValue, xHighValue };

            return this;
        }

        /// <summary>
        /// Sets a handler function that returns the error bars x value.
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code that returns the error bars x value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(@&lt;text&gt;
        ///                                 function(data) {
        ///                                     var value = data.value.x,
        ///                                         lowPercentage = value * 0.05,
        ///                                         highPercentage = value * 0.1;                                    
        ///                                     return [lowPercentage, highPercentage];
        ///                                  }
        ///                  &lt;/text&gt;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XValue(o =>
        ///                        @&quot;function(data) {
        ///                            var value = data.value.x,
        ///                                lowPercentage = value * 0.05,
        ///                                highPercentage = value * 0.1;                                    
        ///                            return [lowPercentage, highPercentage];
        ///                          }&quot;
        ///                  ))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XValue(Func<object, object> inlineCodeBlock)
        {
            errorBars.XValue = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        /// Sets the error bars y value.
        /// </summary>
        /// <param name="yValue">The error bars y value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(&quot;stderr&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(&quot;stderr&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YValue(string yValue)
        {
            errorBars.YValue = yValue;

            return this;
        }

        /// <summary>
        /// Sets the error bars difference from the point y value.
        /// </summary>
        /// <param name="yValue">The error bars difference from the point y value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(1))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(1))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YValue(double yValue)
        {
            errorBars.YValue = yValue;

            return this;
        }

        /// <summary>
        /// Sets the error bars low and high value difference from the point y value.
        /// </summary>
        /// <param name="yLowValue">The error bar low value difference from point y value.</param>
        /// <param name="yHighValue">The error bar high value difference from point y value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(1, 2))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(1, 2))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YValue(double yLowValue, double yHighValue)
        {
            errorBars.YValue = new double[] { yLowValue, yHighValue };

            return this;
        }

        /// <summary>
        /// Sets a handler function that returns the error bars y value.
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code that returns the error bars y value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(@&lt;text&gt;
        ///                                 function(data) {
        ///                                     var value = data.value.y,
        ///                                         lowPercentage = value * 0.05,
        ///                                         highPercentage = value * 0.1;                                    
        ///                                     return [lowPercentage, highPercentage];
        ///                                  }
        ///                  &lt;/text&gt;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YValue(o =>
        ///                        @&quot;function(data) {
        ///                            var value = data.value.y,
        ///                                lowPercentage = value * 0.05,
        ///                                highPercentage = value * 0.1;                                    
        ///                            return [lowPercentage, highPercentage];
        ///                          }&quot;
        ///                  ))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YValue(Func<object, object> inlineCodeBlock)
        {
            errorBars.YValue = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        /// Sets the error bars x low field.
        /// </summary>
        /// <param name="xLowField">The error bars x low field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XLowField(&quot;Low&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XLowField(&quot;Low&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XLowField(string xLowField)
        {
            errorBars.XLowMember = xLowField;

            return this;
        }

        /// <summary>
        /// Sets the error bars x high field.
        /// </summary>
        /// <param name="xHighField">The error bars x high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XHighField(&quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XHighField(&quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XHighField(string xHighField)
        {
            errorBars.XHighMember = xHighField;

            return this;
        }

        /// <summary>
        /// Sets the error bars x low and high fields.
        /// </summary>
        /// <param name="xLowField">The error bars x low field.</param>
        /// <param name="xHighField">The error bars x high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XFields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.XFields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder XFields(string xLowField, string xHighField)
        {
            errorBars.XLowMember = xLowField;
            errorBars.XHighMember = xHighField;

            return this;
        }

        /// <summary>
        /// Sets the error bars y low field.
        /// </summary>
        /// <param name="yLowField">The error bars y low field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YLowField(&quot;Low&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YLowField(&quot;Low&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YLowField(string yLowField)
        {
            errorBars.YLowMember = yLowField;

            return this;
        }

        /// <summary>
        /// Sets the error bars y high field.
        /// </summary>
        /// <param name="yHighField">The error bars y high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YHighField(&quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YHighField(&quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YHighField(string yHighField)
        {
            errorBars.YHighMember = yHighField;

            return this;
        }

        /// <summary>
        /// Sets the error bars y low and high fields.
        /// </summary>
        /// <param name="yLowField">The error bars y low field.</param>
        /// <param name="yHighField">The error bars y high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YFields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Scatter(s =&gt; s.x, s =&gt; s.y)
        ///                 .ErrorBars(e =&gt; e.YFields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public ScatterErrorBarsBuilder YFields(string yLowField, string yHighField)
        {
            errorBars.YLowMember = yLowField;
            errorBars.YHighMember = yHighField;

            return this;
        }
    }
}

