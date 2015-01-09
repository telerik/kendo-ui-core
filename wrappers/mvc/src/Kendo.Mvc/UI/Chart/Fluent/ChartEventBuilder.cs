namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartEventBuilder"/>.
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
        /// <param name="onSeriesHoverHandlerName">The name of the JavaScript function that will handle the event.</param>
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
        /// <param name="onAxisLabelClickHandlerName">The name of the JavaScript function that will handle the event.</param>
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

        /// <summary>
        /// Defines the inline handler of the LegendItemClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.LegendItemClick(
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
        public ChartEventBuilder LegendItemClick(Func<object, object> inlineCodeBlock)
        {
            Handler("legendItemClick", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the LegendItemClick client-side event.
        /// </summary>
        /// <param name="onLegendLabelClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.LegendItemClick("onLegendItemClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder LegendItemClick(string onLegendItemClickHandlerName)
        {
            Handler("legendItemClick", onLegendItemClickHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the LegendItemHover client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.LegendItemHover(
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
        public ChartEventBuilder LegendItemHover(Func<object, object> inlineCodeBlock)
        {
            Handler("legendItemHover", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the LegendItemHover client-side event.
        /// </summary>
        /// <param name="onLegendItemHoverHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.LegendItemHover("onLegendItemHover"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder LegendItemHover(string onLegendItemHoverHandlerName)
        {
            Handler("legendItemHover", onLegendItemHoverHandlerName);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="onDragStartHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.DragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DragStart(string onDragStartHandlerName)
        {
            Handler("dragStart", onDragStartHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the DragStart client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.DragStart(
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
        public ChartEventBuilder DragStart(Func<object, object> inlineCodeBlock)
        {
            Handler("dragStart", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Drag client-side event.
        /// </summary>
        /// <param name="onDragHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.Drag("onDrag"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder Drag(string onDragHandlerName)
        {
            Handler("drag", onDragHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Drag client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.Drag(
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
        public ChartEventBuilder Drag(Func<object, object> inlineCodeBlock)
        {
            Handler("drag", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="onDragEndHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.DragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder DragEnd(string onDragEndHandlerName)
        {
            Handler("dragEnd", onDragEndHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the DragEnd client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.DragEnd(
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
        public ChartEventBuilder DragEnd(Func<object, object> inlineCodeBlock)
        {
            Handler("dragEnd", inlineCodeBlock);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the PlotAreaClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.PlotAreaClick(
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
        public ChartEventBuilder PlotAreaClick(Func<object, object> inlineCodeBlock)
        {
            Handler("plotAreaClick", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the PlotAreaClick client-side event.
        /// </summary>
        /// <param name="onPlotAreaClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.PlotAreaClick("onPlotAreaClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder PlotAreaClick(string onPlotAreaClickHandlerName)
        {
            Handler("plotAreaClick", onPlotAreaClickHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Render client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.Render(
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
        public ChartEventBuilder Render(Func<object, object> inlineCodeBlock)
        {
            Handler("render", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Render client-side event.
        /// </summary>
        /// <param name="onPlotAreaClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.Render("onRender"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder Render(string onRenderHandlerName)
        {
            Handler("render", onRenderHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the ZoomStart client-side event.
        /// </summary>
        /// <param name="onZoomStartHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.ZoomStart("onZoomStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder ZoomStart(string onZoomStartHandlerName)
        {
            Handler("zoomStart", onZoomStartHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the ZoomStart client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.ZoomStart(
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
        public ChartEventBuilder ZoomStart(Func<object, object> inlineCodeBlock)
        {
            Handler("zoomStart", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Zoom client-side event.
        /// </summary>
        /// <param name="onZoomHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.Zoom("onZoom"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder Zoom(string onZoomHandlerName)
        {
            Handler("zoom", onZoomHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Zoom client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.Zoom(
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
        public ChartEventBuilder Zoom(Func<object, object> inlineCodeBlock)
        {
            Handler("zoom", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the ZoomEnd client-side event.
        /// </summary>
        /// <param name="onZoomEndHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.ZoomEnd("onZoomEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder ZoomEnd(string onZoomEndHandlerName)
        {
            Handler("zoomEnd", onZoomEndHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the ZoomEnd client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.ZoomEnd(
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
        public ChartEventBuilder ZoomEnd(Func<object, object> inlineCodeBlock)
        {
            Handler("zoomEnd", inlineCodeBlock);

            return this;
        }

        /// <summary>
        /// Defines the name of the JavaScript function that will handle the the SelectStart client-side event.
        /// </summary>
        /// <param name="onSelectStartHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.SelectStart("onSelectStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SelectStart(string onSelectStartHandlerName)
        {
            Handler("selectStart", onSelectStartHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the SelectStart client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.SelectStart(
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
        public ChartEventBuilder SelectStart(Func<object, object> inlineCodeBlock)
        {
            Handler("selectStart", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.Select("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder Select(string onSelectHandlerName)
        {
            Handler("select", onSelectHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.Select(
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
        public ChartEventBuilder Select(Func<object, object> inlineCodeBlock)
        {
            Handler("select", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the SelectEnd client-side event.
        /// </summary>
        /// <param name="onSelectEndHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.SelectEnd("onSelectEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder SelectEnd(string onSelectEndHandlerName)
        {
            Handler("selectEnd", onSelectEndHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the SelectEnd client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.SelectEnd(
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
        public ChartEventBuilder SelectEnd(Func<object, object> inlineCodeBlock)
        {
            Handler("selectEnd", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the NoteClick client-side event.
        /// </summary>
        /// <param name="onNoteClickHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.NoteClick("onNoteClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder NoteClick(string onNoteClickHandlerName)
        {
            Handler("noteClick", onNoteClickHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the NoteClick client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.NoteClick(
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
        public ChartEventBuilder NoteClick(Func<object, object> inlineCodeBlock)
        {
            Handler("noteClick", inlineCodeBlock);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the NoteHover client-side event.
        /// </summary>
        /// <param name="onNoteHoverHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .Events(events => events.NoteHover("onNoteHover"))
        /// %&gt;
        /// </code>
        /// </example>
        public ChartEventBuilder NoteHover(string onNoteHoverHandlerName)
        {
            Handler("noteHover", onNoteHoverHandlerName);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the NoteHover client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Events(events => events.NoteHover(
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
        public ChartEventBuilder NoteHover(Func<object, object> inlineCodeBlock)
        {
            Handler("noteHover", inlineCodeBlock);

            return this;
        }
    }
}
