namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="ChartAxisSelectionBuilder"/>.
    /// </summary>
    public class ChartAxisSelectionBuilder : IHideObjectMembers
    {
        private readonly ChartAxisSelection selection;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisSelectionBuilder" /> class.
        /// </summary>
        /// <param name="chartLegend">The chart legend.</param>
        public ChartAxisSelectionBuilder(ChartAxisSelection chartSelection)
        {
            selection = chartSelection;
        }

        /// <summary>
        /// Sets the selection lower boundary
        /// </summary>
        /// <param name="fromDate">The selection lower boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.Select(select =>
        ///               select.From(fromDate).To(toDate)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisSelectionBuilder From(DateTime fromDate)
        {
            selection.From = fromDate;
            return this;
        }

        /// <summary>
        /// Sets the selection lower boundary
        /// </summary>
        /// <param name="fromDate">The selection lower boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.Select(select =>
        ///               select.From(from).To(to)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisSelectionBuilder From(double from)
        {
            selection.From = from;
            return this;
        }

        /// <summary>
        /// Sets the selection upper boundary
        /// </summary>
        /// <param name="toDate">The selection upper boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.Select(select =>
        ///               select.To(toDate).To(toDate)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisSelectionBuilder To(DateTime toDate)
        {
            selection.To = toDate;
            return this;
        }

        /// <summary>
        /// Sets the selection upper boundary
        /// </summary>
        /// <param name="toDate">The selection upper boundary.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .CategoryAxis(axis => axis.Select(select =>
        ///               select.To(to).To(to)
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisSelectionBuilder To(double to)
        {
            selection.To = to;
            return this;
        }

        /// <summary>
        /// Configures the mousewheel zoom options
        /// </summary>
        /// <param name="configurator">The mousewheel zoom options</param>
        public ChartAxisSelectionBuilder Mousewheel(Action<ChartSelectionMousewheelBuilder> configurator)
        {
            configurator(new ChartSelectionMousewheelBuilder(selection.Mousewheel));
            return this;
        }
    }
}