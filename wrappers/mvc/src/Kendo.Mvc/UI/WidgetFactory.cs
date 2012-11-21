namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Data;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using Kendo.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Html;

    /// <summary>
    /// Creates the fluent API builders of the Kendo UI widgets
    /// </summary>
    public class WidgetFactory : IHideObjectMembers
    {
        public WidgetFactory(HtmlHelper htmlHelper)
        {

            HtmlHelper = htmlHelper;
            Initializer = DI.Current.Resolve<IJavaScriptInitializer>();
            UrlGenerator = DI.Current.Resolve<IUrlGenerator>();
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public IJavaScriptInitializer Initializer
        {
            get;
            private set;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public HtmlHelper HtmlHelper
        {
            get;
            set;
        }

        private ViewContext ViewContext
        {
            get
            {
                return HtmlHelper.ViewContext;
            }
        }

        private ViewDataDictionary ViewData
        {
            get
            {
                return HtmlHelper.ViewData;
            }
        }

        /// <summary>
        /// Creates a <see cref="Menu"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Menu()
        ///             .Name("Menu")
        ///             .Items(items => { /* add items here */ });
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuBuilder Menu()
        {
            return new MenuBuilder(new Menu(ViewContext, Initializer, UrlGenerator, DI.Current.Resolve<INavigationItemAuthorization>()));
        }

        /// <summary>
        /// Creates a <see cref="Editor"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor");
        /// %&gt;
        /// </code>
        /// </example>
        public virtual EditorBuilder Editor()
        {
            return new EditorBuilder(new Editor(ViewContext,
                Initializer, 
                UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Grid{T}"/> bound to the specified data item type.
        /// </summary>
        /// <example>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;()
        ///             .Name("Grid")
        ///             .BindTo(Model)
        /// %&gt;
        /// </code>
        /// </example>      
        public virtual GridBuilder<T> Grid<T>() where T : class
        {
            return new GridBuilder<T>(new Grid<T>(ViewContext,
                Initializer,
                UrlGenerator,
                DI.Current.Resolve<IGridHtmlBuilderFactory>()));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Grid{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridBuilder<T> Grid<T>(IEnumerable<T> dataSource) where T : class
        {
            GridBuilder<T> builder = Grid<T>();

            builder.Component.DataSource.Data = dataSource;

            return builder;
        }        

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Grid{T}"/> bound to a DataTable.
        /// </summary>
        /// <param name="dataSource">DataTable from which the grid instance will be bound</param>
        public virtual GridBuilder<DataRowView> Grid(DataTable dataSource)
        {
            GridBuilder<DataRowView> builder = Grid<DataRowView>();
            
            builder.Component.DataSource.Data = dataSource.WrapAsEnumerable();

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Grid{T}"/> bound to a DataView.
        /// </summary>
        /// <param name="dataSource">DataView from which the grid instance will be bound</param>
        public virtual GridBuilder<DataRowView> Grid(DataView dataSource)
        {
            GridBuilder<DataRowView> builder = Grid<DataRowView>();

            builder.Component.DataSource.Data = dataSource.Table.WrapAsEnumerable();

            return builder;
        }   

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Grid{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid&lt;Order&gt;("orders")
        ///             .Name("Grid")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridBuilder<T> Grid<T>(string dataSourceViewDataKey) where T : class
        {
            GridBuilder<T> builder = Grid<T>();

            builder.Component.DataSource.Data = ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="UI.ListView{T}"/> bound to the specified data item type.
        /// </summary>
        /// <example>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView&lt;Order&gt;()
        ///             .Name("ListView")
        ///             .BindTo(Model)
        /// %&gt;
        /// </code>
        /// </example>        
        public virtual ListViewBuilder<T> ListView<T>() where T : class
        {
            return new ListViewBuilder<T>(new ListView<T>(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="ListView{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView(Model)
        ///             .Name("ListView")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ListViewBuilder<T> ListView<T>(IEnumerable<T> dataSource) where T : class
        {
            ListViewBuilder<T> builder = ListView<T>();

            builder.Component.DataSource.Data = dataSource;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="ListView{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ListView&lt;Order&gt;("orders")
        ///             .Name("ListView")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ListViewBuilder<T> ListView<T>(string dataSourceViewDataKey) where T : class
        {
            ListViewBuilder<T> builder = ListView<T>();

            builder.Component.DataSource.Data = ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a <see cref="Splitter"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Splitter()
        ///             .Name("Splitter");
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SplitterBuilder Splitter()
        {
            return new SplitterBuilder(new Splitter(ViewContext, Initializer));
        }

        /// <summary>
        /// Creates a new <see cref="TabStrip"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TabStrip()
        ///             .Name("TabStrip")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First");
        ///                 items.Add().Text("Second");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TabStripBuilder TabStrip()
        {
            return new TabStripBuilder(new TabStrip(ViewContext, Initializer, UrlGenerator, DI.Current.Resolve<INavigationItemAuthorization>()));
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePicker()
        {
            return new DateTimePickerBuilder(new DateTimePicker(ViewContext, Initializer, ViewData));
        }


        /// <summary>
        /// Creates a new <see cref="DatePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DatePicker()
        ///             .Name("DatePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePicker()
        {
            return new DatePickerBuilder(new DatePicker(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePicker()
        ///             .Name("TimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePicker()
        {
            return new TimePickerBuilder(new TimePicker(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="Calendar"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("Calendar")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual CalendarBuilder Calendar()
        {
            return new CalendarBuilder(new Calendar(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="PanelBar"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PanelBar()
        ///             .Name("PanelBar")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First");
        ///                 items.Add().Text("Second");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual PanelBarBuilder PanelBar()
        {
            return new PanelBarBuilder(new PanelBar(ViewContext, Initializer, UrlGenerator, DI.Current.Resolve<INavigationItemAuthorization>()));
        }

        /// <summary>
        /// Creates a <see cref="TreeView"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items => { /* add items here */ });
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TreeViewBuilder TreeView()
        {
            return new TreeViewBuilder(new TreeView(ViewContext, Initializer, UrlGenerator, DI.Current.Resolve<INavigationItemAuthorization>()));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox()
        ///             .Name("NumericTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<double> NumericTextBox()
        {
            return new NumericTextBoxBuilder<double>(new NumericTextBox<double>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBox&lt;double&gt;()
        ///             .Name("NumericTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<T> NumericTextBox<T>() where T: struct
        {
            return new NumericTextBoxBuilder<T>(new NumericTextBox<T>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="CurrencyTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().CurrencyTextBox()
        ///             .Name("CurrencyTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<decimal> CurrencyTextBox()
        {
            return NumericTextBox<decimal>().Format("c");
        }

        /// <summary>
        /// Creates a new <see cref="PercentTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PercentTextBox()
        ///             .Name("PercentTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<double> PercentTextBox()
        {
            return NumericTextBox().Format("p");
        }

        /// <summary>
        /// Creates a new <see cref="IntegerTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().IntegerTextBox()
        ///             .Name("IntegerTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<int> IntegerTextBox()
        {
            return NumericTextBox<int>().Format("n0").Decimals(0);
        }

        /// <summary>
        /// Creates a new <see cref="Window"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual WindowBuilder Window()
        {
            return new WindowBuilder(new Window(ViewContext, Initializer));
        }

        /// <summary>
        /// Creates a new <see cref="LinearGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().LinearGauge()
        ///            .Name("linearGauge")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual LinearGaugeBuilder LinearGauge()
        {
            return new LinearGaugeBuilder(new LinearGauge(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="RadialGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual RadialGaugeBuilder RadialGauge()
        {
            return new RadialGaugeBuilder(new RadialGauge(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="DropDownList"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownList()
        ///             .Name("DropDownList")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DropDownListBuilder DropDownList()
        {
            return new DropDownListBuilder(new DropDownList(ViewContext, Initializer, ViewData, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="ComboBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBox()
        ///             .Name("ComboBox")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ComboBoxBuilder ComboBox()
        {
            return new ComboBoxBuilder(new ComboBox(ViewContext, Initializer, ViewData, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="AutoComplete"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoComplete()
        ///             .Name("AutoComplete")
        ///             .Items(items =>
        ///             {
        ///                 items.Add().Text("First Item");
        ///                 items.Add().Text("Second Item");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual AutoCompleteBuilder AutoComplete()
        {
            return new AutoCompleteBuilder(new AutoComplete(ViewContext, Initializer, ViewData, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="Slider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Slider()
        ///             .Name("Slider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<T> Slider<T>() where T: struct, IComparable
        {
            return new SliderBuilder<T>(new Slider<T>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="Slider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Slider()
        ///             .Name("Slider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<double> Slider()
        {
            return new SliderBuilder<double>(new Slider<double>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="RangeSlider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RangeSlider()
        ///             .Name("RangeSlider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<T> RangeSlider<T>() where T : struct, IComparable
        {
            return new RangeSliderBuilder<T>(new RangeSlider<T>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a new <see cref="RangeSlider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RangeSlider()
        ///             .Name("RangeSlider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<double> RangeSlider()
        {
            return new RangeSliderBuilder<double>(new RangeSlider<double>(ViewContext, Initializer, ViewData));
        }

        /// <summary>
        /// Creates a <see cref="Upload"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("ProcessAttachments", "Home")
        ///                 .Remove("RemoveAttachment", "Home")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public virtual UploadBuilder Upload()
        {
            return new UploadBuilder(
                new Upload(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a <see cref="Kendo.Mvc.UI.Chart{T}"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>() where T : class
        {
            return new ChartBuilder<T>(new Chart<T>(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Chart{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="data">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart(Model)
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>(IEnumerable<T> data) where T : class
        {
            ChartBuilder<T> builder = Chart<T>();

            builder.Component.Data = data;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.Chart{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Chart&lt;SalesData&gt;("sales")
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>(string dataViewDataKey) where T : class
        {
            ChartBuilder<T> builder = Chart<T>();

            builder.Component.Data = ViewContext.ViewData.Eval(dataViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a new unbound <see cref="Chart"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///             .Name("Chart")
        ///             .Series(series => {
        ///                 series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<object> Chart()
        {
            ChartBuilder<object> builder = Chart<object>();

            return builder;
        }

        /// <summary>
        /// Creates a <see cref="Kendo.Mvc.UI.StockChart{T}"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart()
        ///             .Name("StockChart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StockChartBuilder<T> StockChart<T>() where T : class
        {
            return new StockChartBuilder<T>(new StockChart<T>(ViewContext, Initializer, UrlGenerator));
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.StockChart{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="data">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart(Model)
        ///             .Name("StockChart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StockChartBuilder<T> StockChart<T>(IEnumerable<T> data) where T : class
        {
            StockChartBuilder<T> builder = StockChart<T>();

            builder.Component.Data = data;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Kendo.Mvc.UI.StockChart{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().StockChart&lt;SalesData&gt;("sales")
        ///             .Name("StockChart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StockChartBuilder<T> StockChart<T>(string dataViewDataKey) where T : class
        {
            StockChartBuilder<T> builder = StockChart<T>();

            builder.Component.Data = ViewContext.ViewData.Eval(dataViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a new unbound <see cref="StockChart"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().StockChart()
        ///             .Name("StockChart")
        ///             .Series(series => {
        ///                 series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual StockChartBuilder<object> StockChart()
        {
            StockChartBuilder<object> builder = StockChart<object>();

            return builder;
        }
    }

    public class WidgetFactory<TModel> : WidgetFactory
    {
        private readonly string minimumValidator;
        private readonly string maximumValidator;

        public WidgetFactory(HtmlHelper<TModel> htmlHelper)
            : base(htmlHelper)
        {
            this.HtmlHelper = htmlHelper;


            minimumValidator = "min";
            maximumValidator = "max";
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public new HtmlHelper<TModel> HtmlHelper
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a new <see cref="Editor" /> UI component.
        /// </summary>
        public virtual EditorBuilder EditorFor(Expression<Func<TModel, string>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);

            return Editor()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value((string)metadata.Model);
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<TValue> NumericTextBoxFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return NumericTextBox<TValue>()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value((Nullable<TValue>)metadata.Model)
                    .Min(GetRangeValidationParameter<TValue>(validators, minimumValidator))
                    .Max(GetRangeValidationParameter<TValue>(validators, maximumValidator));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().NumericTextBoxFor(m=>m.NullableProperty) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<TValue> NumericTextBoxFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return NumericTextBox<TValue>()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value((Nullable<TValue>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(GetRangeValidationParameter<TValue>(validators, minimumValidator))
                    .Max(GetRangeValidationParameter<TValue>(validators, maximumValidator));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().IntegerTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<int> IntegerTextBoxFor(Expression<Func<TModel, Nullable<int>>> expression)
        {
            return NumericTextBoxFor<int>(expression).Format("n0").Decimals(0);
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().IntegerTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<int> IntegerTextBoxFor(Expression<Func<TModel, int>> expression)
        {
            return NumericTextBoxFor<int>(expression).Format("n0").Decimals(0);
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().CurrencyTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<decimal> CurrencyTextBoxFor(Expression<Func<TModel, Nullable<decimal>>> expression)
        {
            return NumericTextBoxFor<decimal>(expression).Format("c");
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().CurrencyTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<decimal> CurrencyTextBoxFor(Expression<Func<TModel, decimal>> expression)
        {
            return NumericTextBoxFor<decimal>(expression).Format("c");
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PercentTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<double> PercentTextBoxFor(Expression<Func<TModel, Nullable<double>>> expression)
        {
            return NumericTextBoxFor<double>(expression).Format("p");
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().PercentTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<double> PercentTextBoxFor(Expression<Func<TModel, double>> expression)
        {
            return NumericTextBoxFor<double>(expression).Format("p");
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DateTimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DateTimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DateTimePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DatePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DatePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DatePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DatePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DatePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DatePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DatePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DatePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Kendo.Mvc.UI.DatePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Kendo.Mvc.UI.DatePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return TimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? DateTime.Today)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return TimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as DateTime?)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? DateTime.Today)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="UI.TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<TimeSpan>>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TimeSpan? minimum = GetRangeValidationParameter<TimeSpan>(validators, minimumValidator);
            TimeSpan? maximum = GetRangeValidationParameter<TimeSpan>(validators, maximumValidator);

            return TimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as TimeSpan?)
                    .Min(minimum.HasValue ? new DateTime(minimum.Value.Ticks) : DateTime.Today)
                    .Max(maximum.HasValue ? new DateTime(maximum.Value.Ticks) : DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="UI.TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, TimeSpan>> expression)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TimeSpan? minimum = GetRangeValidationParameter<TimeSpan>(validators, minimumValidator);
            TimeSpan? maximum = GetRangeValidationParameter<TimeSpan>(validators, maximumValidator);

            return TimePicker()
                    .Name(GetName(expression))
                    .ModelMetadata(metadata)
                    .Value(metadata.Model as TimeSpan?)
                    .Min(minimum.HasValue ? new DateTime(minimum.Value.Ticks) : DateTime.Today)
                    .Max(maximum.HasValue ? new DateTime(maximum.Value.Ticks) : DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="DropDownList"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DropDownListFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DropDownListBuilder DropDownListFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            return DropDownList().Name(GetName(expression))
                                 .ModelMetadata(ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData))
                                 .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="ComboBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ComboBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual ComboBoxBuilder ComboBoxFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            return ComboBox().Name(GetName(expression))
                             .ModelMetadata(ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData))
                             .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="AutoComplete"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().AutoCompleteFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual AutoCompleteBuilder AutoCompleteFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            return AutoComplete().Name(GetName(expression))
                                 .ModelMetadata(ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData))
                                 .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="UI.Slider{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().SliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<TValue> SliderFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct, IComparable
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            var slider = Slider<TValue>()
                            .Name(GetName(expression))
                            .ModelMetadata(metadata)
                            .Value((Nullable<TValue>)metadata.Model);

            if (minimum.HasValue)
            {
                slider.Min(minimum.Value);
            }

            if (maximum.HasValue)
            {
                slider.Max(maximum.Value);
            }

            return slider;
        }

        /// <summary>
        /// Creates a new <see cref="SliderFor"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().SliderFor(m=>m.NullableProperty) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<TValue> SliderFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct, IComparable
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            var slider = Slider<TValue>()
                            .Name(GetName(expression))
                            .ModelMetadata(metadata)
                            .Value((Nullable<TValue>)metadata.Model);

            if (minimum.HasValue)
            {
                slider.Min(minimum.Value);
            }

            if (maximum.HasValue)
            {
                slider.Max(maximum.Value);
            }

            return slider;
        }

        /// <summary>
        /// Creates a new <see cref="SliderFor{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().SliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<double> SliderFor(Expression<Func<TModel, double>> expression)
        {
            return SliderFor<double>(expression);
        }

        /// <summary>
        /// Creates a new <see cref="SliderFor{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().SliderFor(m=>m.NullableProperty) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<double> SliderFor(Expression<Func<TModel, Nullable<double>>> expression)
        {
            return SliderFor<double>(expression);
        }

        /// <summary>
        /// Creates a new <see cref="RangeSliderFor{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RangeSliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<TValue> RangeSliderFor<TValue>(Expression<Func<TModel, TValue[]>> expression)
            where TValue : struct, IComparable
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData);
            IEnumerable<ModelValidator> validators = metadata.GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            var rangeSlider = RangeSlider<TValue>()
                                .Name(GetName(expression))
                                .ModelMetadata(metadata)
                                .Values((TValue[])metadata.Model);

            if (minimum.HasValue)
            {
                rangeSlider.Min(minimum.Value);
            }

            if (maximum.HasValue)
            {
                rangeSlider.Max(maximum.Value);
            }

            return rangeSlider;
        }

        /// <summary>
        /// Creates a new <see cref="RangeSliderFor{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RangeSliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<double> RangeSliderFor(Expression<Func<TModel, double[]>> expression)
        {
            return RangeSliderFor<double>(expression);
        }

        /// <summary>
        /// Creates a new <see cref="LinearGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().LinearGaugeFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual LinearGaugeBuilder LinearGaugeFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct, IComparable
        {
            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return LinearGauge()
                    .Name(GetName(expression))
                    .Pointer(pointer => pointer.Value(
                        Convert.ToDouble(value)
                    ));
        }

        /// <summary>
        /// Creates a new <see cref="LinearGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().LinearGaugeFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual LinearGaugeBuilder LinearGaugeFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct, IComparable
        {
            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return LinearGauge()
                    .Name(GetName(expression))
                    .Pointer(pointer => pointer.Value(
                        Convert.ToDouble(value)
                    ));
        }

        /// <summary>
        /// Creates a new <see cref="RadialGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RadialGaugeFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual RadialGaugeBuilder RadialGaugeFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct, IComparable
        {
            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return RadialGauge()
                    .Name(GetName(expression))
                    .Pointer(pointer => pointer.Value(
                        Convert.ToDouble(value)
                    ));
        }

        /// <summary>
        /// Creates a new <see cref="RadialGauge"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().RadialGaugeFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual RadialGaugeBuilder RadialGaugeFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct, IComparable
        {
            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return RadialGauge()
                    .Name(GetName(expression))
                    .Pointer(pointer => pointer.Value(
                        Convert.ToDouble(value)
                    ));
        }

        private string GetName(LambdaExpression expression)
        {
            return HtmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(ExpressionHelper.GetExpressionText(expression));
        }

        private string GetValue<TValue>(Expression<Func<TModel, TValue>> expression) 
        {
            object model = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;
            return model != null && model.GetType().IsPredefinedType() ? Convert.ToString(model) : string.Empty;
        }

        private Nullable<TValue> GetRangeValidationParameter<TValue>(IEnumerable<ModelValidator> validators, string parameter) where TValue : struct
        {
            var rangeValidators = validators.OfType<RangeAttributeAdapter>().Cast<RangeAttributeAdapter>();

            object value = null;

            if (rangeValidators.Any())
            {
                var clientValidationsRules = rangeValidators.First()
                                                            .GetClientValidationRules()
                                                            .OfType<ModelClientValidationRangeRule>()
                                                            .Cast<ModelClientValidationRangeRule>();

                if (clientValidationsRules.Any() && clientValidationsRules.First().ValidationParameters.TryGetValue(parameter, out value))
                {
                    return (TValue)Convert.ChangeType(value, typeof(TValue));
                }
            }
            return null;
        }
    }
}
