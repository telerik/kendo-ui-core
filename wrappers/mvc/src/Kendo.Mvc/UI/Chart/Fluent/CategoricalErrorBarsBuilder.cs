namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the error bars.
    /// </summary>
    public class CategoricalErrorBarsBuilder : 
        ErrorBarsBuilderBase<CategoricalErrorBarsBuilder, CategoricalErrorBars>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CategoricalErrorBarsBuilder"/> class.
        /// </summary>
        /// <param name="errorBars">The error bars.</param>
        public CategoricalErrorBarsBuilder(CategoricalErrorBars errorBars)
            : base(errorBars)
        {
        }

        /// <summary>
        /// Sets the error bars value.
        /// </summary>
        /// <param name="value">The error bars value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(&quot;stderr&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(&quot;stderr&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder Value(string value)
        {            
            errorBars.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the error bars difference from the point value.
        /// </summary>
        /// <param name="value">The error bars difference from the point value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(1))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(1))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder Value(double value)
        {
            errorBars.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the error bars low and high value difference from the point value.
        /// </summary>
        /// <param name="lowValue">The error bar low value difference from point value.</param>
        /// <param name="highValue">The error bar high value difference from point value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(1, 2))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(1, 2))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder Value(double lowValue, double highValue)
        {
            errorBars.Value = new double[] { lowValue, highValue };

            return this;
        }


        /// <summary>
        /// Sets a handler function  that returns the error bars value.
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code that returns the error bars value.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(@&lt;text&gt;
        ///                                 function(data) {
        ///                                     var value = data.value,
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
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Value(o =>
        ///                        @&quot;function(data) {
        ///                            var value = data.value,
        ///                                lowPercentage = value * 0.05,
        ///                                highPercentage = value * 0.1;                                    
        ///                            return [lowPercentage, highPercentage];
        ///                          }&quot;
        ///                  ))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder Value(Func<object, object> inlineCodeBlock)
        {
            errorBars.Value = new ClientHandlerDescriptor { TemplateDelegate = inlineCodeBlock };

            return this;
        }

        /// <summary>
        /// Sets the error bars low field.
        /// </summary>
        /// <param name="lowField">The error bars low field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.LowField(&quot;Low&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.LowField(&quot;Low&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder LowField(string lowField)
        {
            errorBars.LowMember = lowField;

            return this;
        }

        /// <summary>
        /// Sets the error bars high field.
        /// </summary>
        /// <param name="highField">The error bars high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.HighField(&quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.HighField(&quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder HighField(string highField)
        {
            errorBars.HighMember = highField;

            return this;
        }

        /// <summary>
        /// Sets the error bars low and high fields.
        /// </summary>
        /// <param name="lowField">The error bars low field.</param>
        /// <param name="highField">The error bars high field.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Fields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// )
        /// </code>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("chart")
        ///             .Series(series =&gt; series
        ///                 .Bar(s =&gt; s.Sales)
        ///                 .ErrorBars(e =&gt; e.Fields(&quot;Low&quot;, &quot;High&quot;))
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public CategoricalErrorBarsBuilder Fields(string lowField, string highField)
        {
            errorBars.LowMember = lowField;
            errorBars.HighMember = highField;

            return this;
        }
    }
}
