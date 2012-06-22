namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartClientEvents"/>.
    /// </summary>
    public class ChartEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartEventBuilder" /> class.
        /// </summary>
        /// <param name="events">The client events.</param>
        public ChartEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        /// Defines the inline handler of the DataBound client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.DataBound(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DataBound(Func<object, object> inlineCodeBlock)
        {
            Handler("dataBound", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DataBound client-side event.
        /// </summary>
        /// <param name="onDataBoundHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.DataBound("onDataBound"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DataBound(string onDataBoundHandlerName)
        {
            Handler("dataBound", onDataBoundHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the DataBinding client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.DataBinding(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DataBinding(Func<object, object> inlineCodeBlock)
        {
            Handler("dataBinding", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DataBinding client-side event.
        /// </summary>
        /// <param name="onDataBindingHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.DataBinding("onDataBinding"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DataBinding(string onDataBindingHandlerName)
        {
            Handler("dataBinding", onDataBindingHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the SeriesClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.SeriesClick(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SeriesClick(Func<object, object> inlineCodeBlock)
        {
            Handler("seriesClick", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the SeriesClick client-side event.
        /// </summary>
        /// <param name="onSeriesClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.SeriesClick("onSeriesClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SeriesClick(string onSeriesClickHandlerName)
        {
            Handler("seriesClick", onSeriesClickHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the SeriesHover client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.SeriesHover(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SeriesHover(Func<object, object> inlineCodeBlock)
        {
            Handler("seriesHover", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the SeriesHover client-side event.
        /// </summary>
        /// <param name="onSeriesClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.SeriesHover("onSeriesHover"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SeriesHover(string onSeriesHoverHandlerName)
        {
            Handler("seriesHover", onSeriesHoverHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the AxisLabelClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.AxisLabelClick(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder AxisLabelClick(Func<object, object> inlineCodeBlock)
        {
            Handler("axisLabelClick", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the AxisLabelClick client-side event.
        /// </summary>
        /// <param name="onSeriesClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.AxisLabelClick("onAxisLabelClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder AxisLabelClick(string onAxisLabelClickHandlerName)
        {
            Handler("axisLabelClick", onAxisLabelClickHandlerName);

            return this;
        }
    }
}
