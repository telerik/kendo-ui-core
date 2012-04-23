// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI.Html;

    /// <summary>
    /// Telerik Chart for ASP.NET MVC is a view component for rendering charts.
    /// Features:
    /// <list type="bullet">
    ///     <item>Bar Chart</item>
    ///     <item>Column Chart</item>
    /// </list>
    /// For more information, see the online documentation.
    /// </summary>
    public class Chart<T> : ViewComponentBase, IChart where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Chart{T}" /> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL Generator.</param>
        public Chart(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.chart.js" });

            ClientEvents = new ChartClientEvents();
            UrlGenerator = urlGenerator;
            Title = new ChartTitle();
            ChartArea = new ChartArea();
            PlotArea = new PlotArea();
            Legend = new ChartLegend();
            Series = new List<ChartSeriesBase<T>>();
            CategoryAxis = new ChartCategoryAxis<T>(this);
            ValueAxes = new List<IChartValueAxis>();
            XAxes = new List<IChartValueAxis>();
            YAxes = new List<IChartValueAxis>();
            DataBinding = new ChartDataBindingSettings(this);
            SeriesDefaults = new ChartSeriesDefaults<T>(this);
            AxisDefaults = new ChartAxisDefaults<T>(this);
            Tooltip = new ChartTooltip();
            Transitions = true;
        }

        /// <summary>
        /// Gets or sets the data source.
        /// </summary>
        /// <value>The data source.</value>
        public IEnumerable<T> DataSource
        {
            get;
            set;
        }

        /// <summary>
        /// Represents the client-side event handlers for the component
        /// </summary>
        public ChartClientEvents ClientEvents
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
        /// Gets or sets the Chart area.
        /// </summary>
        /// <value>
        /// The Chart area.
        /// </value>
        public ChartArea ChartArea
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Plot area.
        /// </summary>
        /// <value>
        /// The Plot area.
        /// </value>
        public PlotArea PlotArea
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Chart theme.
        /// </summary>
        /// <value>
        /// The Chart theme.
        /// </value>
        public string Theme
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Chart title.
        /// </summary>
        /// <value>
        /// The Chart title.
        /// </value>
        public ChartTitle Title
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Chart legend.
        /// </summary>
        /// <value>
        /// The Chart legend.
        /// </value>
        public ChartLegend Legend
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the Chart transitions.
        /// </summary>
        /// <value>
        /// The Chart Transitions.
        /// </value>
        public bool Transitions
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the chart series.
        /// </summary>
        public IList<ChartSeriesBase<T>> Series
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the default settings for all series.
        /// </summary>
        public ChartSeriesDefaults<T> SeriesDefaults
        {
            get;
            private set;
        }

        /// <summary>
        /// Configuration for the default category axis (if any)
        /// </summary>
        public IChartCategoryAxis CategoryAxis
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for all value axes
        /// </summary>
        public IList<IChartValueAxis> ValueAxes
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for all X axes in scatter charts
        /// </summary>
        public IList<IChartValueAxis> XAxes
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for all Y axes in scatter charts
        /// </summary>
        public IList<IChartValueAxis> YAxes
        {
            get;
            set;
        }

        /// <summary>
        /// Configuration for the default axis 
        /// </summary>
        public IChartAxisDefaults AxisDefaults
        {
            get;
            set;
        }
        
        /// <summary>
        /// Gets the data binding configuration.
        /// </summary>
        public ChartDataBindingSettings DataBinding
        {
            get;
            internal set;
        }

        /// <summary>
        /// Gets or sets the series colors.
        /// </summary>
        public IEnumerable<string> SeriesColors
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the data point tooltip options
        /// </summary>
        public ChartTooltip Tooltip
        {
            get;
            set;
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public override void WriteInitializationScript(TextWriter writer)
        {
            var objectWriter = ClientSideObjectWriterFactory.Create(Id, "tChart", writer);

            objectWriter.Start();

            SerializeData("chartArea", ChartArea.CreateSerializer().Serialize(), objectWriter);
            SerializeData("plotArea", PlotArea.CreateSerializer().Serialize(), objectWriter);

            SerializeTheme(objectWriter);

            SerializeData("title", Title.CreateSerializer().Serialize(), objectWriter);

            SerializeData("legend", Legend.CreateSerializer().Serialize(), objectWriter);

            SerializeSeries(objectWriter);

            SerializeData("seriesDefaults", SeriesDefaults.CreateSerializer().Serialize(), objectWriter);

            SerializeData("axisDefaults", AxisDefaults.CreateSerializer().Serialize(), objectWriter);

            SerializeData("categoryAxis", CategoryAxis.CreateSerializer().Serialize(), objectWriter);

            SerializeAxes("valueAxis", ValueAxes, objectWriter);

            SerializeAxes("xAxis", XAxes, objectWriter);

            SerializeAxes("yAxis", YAxes, objectWriter);

            SerializeTransitions(objectWriter);

            SerializeDataSource(objectWriter);

            SerializeSeriesColors(objectWriter);

            SerializeData("tooltip", Tooltip.CreateSerializer().Serialize(), objectWriter);

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        private void SerializeData(string key, IDictionary<string, object> data, IClientSideObjectWriter objectWriter)
        {
            if (data.Count > 0)
            {
                objectWriter.AppendObject(key, data);
            }
        }

        private void SerializeTheme(IClientSideObjectWriter objectWriter)
        {
            if (Theme.HasValue())
            {
                objectWriter.Append("theme", Theme);
            }
        }

        private void SerializeSeries(IClientSideObjectWriter objectWriter)
        {
            if (Series.Count > 0)
            {
                var serializedSeries = new List<IDictionary<string, object>>();
                foreach (var s in Series)
                {
                    serializedSeries.Add(s.CreateSerializer().Serialize());
                }

                objectWriter.AppendCollection("series", serializedSeries);
            }
        }

        private void SerializeDataSource(IClientSideObjectWriter objectWriter)
        {
            if (DataBinding.Ajax.Enabled)
            {
                DataBinding.Ajax.SerializeTo("dataSource", objectWriter);
            }
            else if (DataSource != null)
            {
                objectWriter.AppendObject("dataSource", new { data = DataSource });
            }
        }

        private void SerializeSeriesColors(IClientSideObjectWriter objectWriter)
        {
            if (SeriesColors != null)
            {
                objectWriter.AppendCollection("seriesColors", SeriesColors);
            }
        }

        private void SerializeTransitions(IClientSideObjectWriter objectWriter)
        {
            if (!Transitions)
            {
                objectWriter.Append("transitions", Transitions);
            }
        }

        private void SerializeAxes<TAxis>(string key, IList<TAxis> axes, IClientSideObjectWriter objectWriter)
            where TAxis : IChartAxis
        {
            if (axes.Count > 0)
            {
                var serializedAxes = new List<IDictionary<string, object>>();
                var shouldSerialize = false;

                for (var i = 0; i < axes.Count; i++)
                {
                    var a = axes[i];
                    var data = a.CreateSerializer().Serialize();
                    var isPrimary = i == 0 && axes.Count > 1;

                    if (data.Count > 0 || isPrimary)
                    {
                        serializedAxes.Add(data);
                        shouldSerialize = true;
                    }
                }

                if (shouldSerialize)
                {
                    objectWriter.AppendCollection(key, serializedAxes);
                }
            }
        }

        /// <summary>
        /// Writes the Chart HTML.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (!HtmlAttributes.ContainsKey("id"))
            {
                HtmlAttributes["id"] = Id;
            }

            new ChartHtmlBuilder<T>(this)
                .Build()
                .WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}