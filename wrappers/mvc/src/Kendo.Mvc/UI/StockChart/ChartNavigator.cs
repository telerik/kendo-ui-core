namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;

    public class ChartNavigator<T> : ISeriesContainer where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNavigator{T}" /> class.
        /// </summary>
        public ChartNavigator(ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            Series = new List<IChartSeries>();
            Select = new ChartDateSelection();
            Hint = new ChartNavigatorHint();
            UrlGenerator = urlGenerator;
            ViewContext = viewContext;
            DataSource = new DataSource();
            DataSource.Schema.Data = "";
            DataSource.Schema.Total = "";
            DataSource.Schema.Errors = "";
            DataSource.ModelType(typeof(T));
        }

        /// <summary>
        /// Gets the navigator series.
        /// </summary>
        public IList<IChartSeries> Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the navigator is visible.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the navigator selection.
        /// </summary>
        public ChartDateSelection Select
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the navigator hint.
        /// </summary>
        public ChartNavigatorHint Hint
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the view context to rendering a view.
        /// </summary>
        /// <value>The view context.</value>
        public ViewContext ViewContext
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the URL generator.
        /// </summary>
        /// <value>The URL generator.</value>
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the data source configuration.
        /// </summary>
        public DataSource DataSource
        {
            get;
            private set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartNavigatorSerializer<T>(this);
        }
    }
}