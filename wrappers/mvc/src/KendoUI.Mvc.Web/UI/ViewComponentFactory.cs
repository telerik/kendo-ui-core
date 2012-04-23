// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Data;
    using System.Globalization;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using Telerik.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI.Fluent;
    using Telerik.Web.Mvc.UI.Html;

    /// <summary>
    /// Provides the factory methods for creating Telerik View Components.
    /// </summary>
    public class ViewComponentFactory : IHideObjectMembers
    {
        private readonly StyleSheetRegistrarBuilder styleSheetRegistrarBuilder;
        private readonly ScriptRegistrarBuilder scriptRegistrarBuilder;

        public ViewComponentFactory(HtmlHelper htmlHelper, IClientSideObjectWriterFactory clientSideObjectWriterFactory, StyleSheetRegistrarBuilder styleSheetRegistrar, ScriptRegistrarBuilder scriptRegistrar)
        {
            Guard.IsNotNull(htmlHelper, "htmlHelper");
            Guard.IsNotNull(clientSideObjectWriterFactory, "clientSideObjectWriterFactory");
            Guard.IsNotNull(styleSheetRegistrar, "styleSheetRegistrar");
            Guard.IsNotNull(scriptRegistrar, "scriptRegistrar");

            HtmlHelper = htmlHelper;
            ClientSideObjectWriterFactory = clientSideObjectWriterFactory;

            styleSheetRegistrarBuilder = styleSheetRegistrar;
            scriptRegistrarBuilder = scriptRegistrar;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public HtmlHelper HtmlHelper
        {
            get;
            set;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public IClientSideObjectWriterFactory ClientSideObjectWriterFactory
        {
            get;
            private set;
        }

        private ViewContext ViewContext
        {
            get
            {
                return HtmlHelper.ViewContext;
            }
        }

        /// <summary>
        /// Creates a <see cref="StyleSheetRegistrar"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().StyleSheetRegistrar()
        ///             .DefaultGroup(group => group
        ///                   group.Add("Site.css")
        ///                        .Add("telerik.common.css")
        ///                        .Add("telerik.vista.css")
        ///                        .Compressed(true)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public StyleSheetRegistrarBuilder StyleSheetRegistrar()
        {
            return styleSheetRegistrarBuilder;
        }

        /// <summary>
        /// Creates a <see cref="ScriptRegistrar"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ScriptRegistrar()
        /// %&gt;
        /// </code>
        /// </example>
        public ScriptRegistrarBuilder ScriptRegistrar()
        {
            return scriptRegistrarBuilder;
        }

        /// <summary>
        /// Creates a <see cref="Menu"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => { /* add items here */ });
        /// %&gt;
        /// </code>
        /// </example>
        public virtual MenuBuilder Menu()
        {
            return MenuBuilder.Create(Register(() => new Menu(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(), DI.Current.Resolve<INavigationItemAuthorization>(), DI.Current.Resolve<INavigationComponentHtmlBuilderFactory<Menu, MenuItem>>())));
        }

        /// <summary>
        /// Creates a <see cref="Editor"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Editor()
        ///             .Name("Editor");
        /// %&gt;
        /// </code>
        /// </example>
        public virtual EditorBuilder Editor()
        {
            return EditorBuilder.Create(Register(() => new Editor(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IWebAssetCollectionResolver>(),
                DI.Current.Resolve<ILocalizationServiceFactory>().Create("EditorLocalization", CultureInfo.CurrentUICulture),
                DI.Current.Resolve<IUrlGenerator>())));
        }

        /// <summary>
        /// Creates a new <see cref="Grid&lt;T&gt;"/> bound to the specified data item type.
        /// </summary>
        /// <example>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Grid")
        ///             .BindTo(Model)
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// Do not forget to bind the grid using the <see cref="GridBuilder{T}.BindTo(System.String)" /> method when using this overload.
        /// </remarks>
        public virtual GridBuilder<T> Grid<T>() where T : class
        {
            return GridBuilder<T>.Create(Register(() => new Grid<T>(ViewContext, 
                        ClientSideObjectWriterFactory, 
                        DI.Current.Resolve<IUrlGenerator>(),
                        DI.Current.Resolve<ILocalizationServiceFactory>().Create("GridLocalization", CultureInfo.CurrentUICulture), 
                        DI.Current.Resolve<IGridHtmlBuilderFactory>()
                    )
                )
            );
        }

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.UI.Grid&lt;T&gt;"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridBuilder<T> Grid<T>(IEnumerable<T> dataSource) where T : class
        {
            GridBuilder<T> builder = Grid<T>();

            builder.Component.DataSource = dataSource;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.UI.Grid&lt;T&gt;"/> bound to a DataTable.
        /// </summary>
        /// <param name="dataSource">DataTable from which the grid instance will be bound</param>
        public virtual GridBuilder<DataRowView> Grid(DataTable dataSource)
        {
            GridBuilder<DataRowView> builder = Grid<DataRowView>();
            
            builder.Component.DataSource = dataSource.WrapAsEnumerable();

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.UI.Grid&lt;T&gt;"/> bound to a DataView.
        /// </summary>
        /// <param name="dataSource">DataView from which the grid instance will be bound</param>
        public virtual GridBuilder<DataRowView> Grid(DataView dataSource)
        {
            Guard.IsNotNull(dataSource, "dataSource");

            GridBuilder<DataRowView> builder = Grid<DataRowView>();

            builder.Component.DataSource = dataSource.Table.WrapAsEnumerable();

            return builder;
        }   

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.UI.Grid&lt;T&gt;"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;("orders")
        ///             .Name("Grid")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridBuilder<T> Grid<T>(string dataSourceViewDataKey) where T : class
        {
            GridBuilder<T> builder = Grid<T>();

            builder.Component.DataSource = ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a <see cref="Splitter"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter");
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SplitterBuilder Splitter()
        {
            return SplitterBuilder.Create(Register(() => new Splitter(ViewContext, ClientSideObjectWriterFactory)));
        }

        /// <summary>
        /// Creates a new <see cref="TabStrip"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TabStrip()
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
            return TabStripBuilder.Create(Register(() => new TabStrip(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(), DI.Current.Resolve<INavigationItemAuthorization>(), DI.Current.Resolve<ITabStripHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DateTimePicker()
        ///             .Name("DateTimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePicker()
        {
            return DateTimePickerBuilder.Create(Register(() => new DateTimePicker(ViewContext, ClientSideObjectWriterFactory)));
        }


        /// <summary>
        /// Creates a new <see cref="DatePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePicker()
        ///             .Name("DatePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePicker()
        {
            return DatePickerBuilder.Create(Register(() => new DatePicker(ViewContext, ClientSideObjectWriterFactory)));
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePicker()
        ///             .Name("TimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePicker()
        {
            return TimePickerBuilder.Create(Register(() => new TimePicker(ViewContext, ClientSideObjectWriterFactory)));
        }

        /// <summary>
        /// Creates a new <see cref="Calendar"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Calendar()
        ///             .Name("Calendar")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual CalendarBuilder Calendar()
        {
            return CalendarBuilder.Create(Register(() => new Calendar(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(), DI.Current.Resolve<ICalendarHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a new <see cref="PanelBar"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PanelBar()
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
            return PanelBarBuilder.Create(Register(() => new PanelBar(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(), DI.Current.Resolve<INavigationItemAuthorization>(), DI.Current.Resolve<INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem>>())));
        }

        /// <summary>
        /// Creates a <see cref="TreeView"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .Items(items => { /* add items here */ });
        /// %&gt;
        /// </code>
        /// </example>
        public virtual TreeViewBuilder TreeView()
        {
            return TreeViewBuilder.Create(Register(() => new TreeView(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(), DI.Current.Resolve<INavigationItemAuthorization>(), DI.Current.Resolve<ITreeViewHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBox()
        ///             .Name("NumericTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        /// <returns>Returns <see cref="NumericTextBoxBuilder{double}"/>.</returns>
        public virtual NumericTextBoxBuilder<double> NumericTextBox()
        {
            return NumericTextBoxBuilder<double>.Create(Register(() => new NumericTextBox<double>(ViewContext, ClientSideObjectWriterFactory, new TextBoxBaseHtmlBuilderFactory<double>())));
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{T}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBox<double>()
        ///             .Name("NumericTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<T> NumericTextBox<T>() where T: struct
        {
            return NumericTextBoxBuilder<T>.Create(Register(() => new NumericTextBox<T>(ViewContext, ClientSideObjectWriterFactory, new TextBoxBaseHtmlBuilderFactory<T>())));
        }

        /// <summary>
        /// Creates a new <see cref="CurrencyTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().CurrencyTextBox()
        ///             .Name("CurrencyTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual CurrencyTextBoxBuilder CurrencyTextBox()
        {
            return CurrencyTextBoxBuilder.Create(Register(() => new CurrencyTextBox(ViewContext, ClientSideObjectWriterFactory, new TextBoxBaseHtmlBuilderFactory<decimal>())));
        }

        /// <summary>
        /// Creates a new <see cref="PercentTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PercentTextBox()
        ///             .Name("PercentTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual PercentTextBoxBuilder PercentTextBox()
        {
            return PercentTextBoxBuilder.Create(Register(() => new PercentTextBox(ViewContext, ClientSideObjectWriterFactory, new TextBoxBaseHtmlBuilderFactory<double>())));
        }

        /// <summary>
        /// Creates a new <see cref="IntegerTextBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().IntegerTextBox()
        ///             .Name("IntegerTextBox")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual IntegerTextBoxBuilder IntegerTextBox()
        {
            return IntegerTextBoxBuilder.Create(Register(() => new IntegerTextBox(ViewContext, ClientSideObjectWriterFactory, new TextBoxBaseHtmlBuilderFactory<int>())));
        }

        /// <summary>
        /// Creates a new <see cref="Window"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual WindowBuilder Window()
        {
            return WindowBuilder.Create(Register(() => new Window(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IWindowHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a new <see cref="DropDownList"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownList()
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
            return DropDownListBuilder.Create(Register(() => new DropDownList(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>())));
        }

        /// <summary>
        /// Creates a new <see cref="ComboBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
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
            return ComboBoxBuilder.Create(Register(() => new ComboBox(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>())));
        }

        /// <summary>
        /// Creates a new <see cref="AutoComplete"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoComplete()
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
            return AutoCompleteBuilder.Create(Register(() => new AutoComplete(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>())));
        }

        /// <summary>
        /// Creates a new <see cref="Slider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Slider()
        ///             .Name("Slider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<T> Slider<T>() where T: struct, IComparable
        {
            return SliderBuilder<T>.Create(Register(() => new Slider<T>(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<ISliderHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a new <see cref="RangeSlider"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSlider()
        ///             .Name("RangeSlider")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<T> RangeSlider<T>() where T : struct, IComparable
        {
            return RangeSliderBuilder<T>.Create(Register(() => new RangeSlider<T>(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IRangeSliderHtmlBuilderFactory>())));
        }

        /// <summary>
        /// Creates a <see cref="Upload"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
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
            return UploadBuilder.Create(Register(() => 
                new Upload(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>(),
                            DI.Current.Resolve<ILocalizationServiceFactory>().Create("UploadLocalization", CultureInfo.CurrentUICulture))));
        }

        /// <summary>
        /// Creates a <see cref="Telerik.Web.Mvc.UI.Chart{T}"/>
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>() where T : class
        {
            return ChartBuilder<T>.Create(Register(() =>
                new Chart<T>(ViewContext, ClientSideObjectWriterFactory, DI.Current.Resolve<IUrlGenerator>())));
        }

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.Mvc.UI.Chart{T}"/> bound to the specified data source.
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart(Model)
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>(IEnumerable<T> dataSource) where T : class
        {
            ChartBuilder<T> builder = Chart<T>();

            builder.Component.DataSource = dataSource;

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="Telerik.Web.Mvc.UI.Chart{T}"/> bound an item in ViewData.
        /// </summary>
        /// <typeparam name="T">Type of the data item</typeparam>
        /// <param name="dataSourceViewDataKey">The data source view data key.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart&lt;SalesData&gt;("sales")
        ///             .Name("Chart")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBuilder<T> Chart<T>(string dataSourceViewDataKey) where T : class
        {
            ChartBuilder<T> builder = Chart<T>();

            builder.Component.DataSource = ViewContext.ViewData.Eval(dataSourceViewDataKey) as IEnumerable<T>;

            return builder;
        }

        /// <summary>
        /// Creates a new unbound <see cref="Chart"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Chart("sales")
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

        [EditorBrowsable(EditorBrowsableState.Never)]
        public TViewComponent Register<TViewComponent>(Func<TViewComponent> factory) where TViewComponent : ViewComponentBase
        {
            var component = factory();

            scriptRegistrarBuilder.ToRegistrar().Register(component);

            return component;
        }
    }
#if MVC2 || MVC3
    public class ViewComponentFactory<TModel> : ViewComponentFactory
    {
        private string minimumValidator;
        private string maximumValidator;

        public ViewComponentFactory(HtmlHelper<TModel> htmlHelper, IClientSideObjectWriterFactory clientSideObjectWriterFactory, StyleSheetRegistrarBuilder styleSheetRegistrar, ScriptRegistrarBuilder scriptRegistrar)
            : base(htmlHelper, clientSideObjectWriterFactory, styleSheetRegistrar, scriptRegistrar)
        {
            this.HtmlHelper = htmlHelper;


#if MVC3
            minimumValidator = "min";
            maximumValidator = "max";
#else
            minimumValidator = "minimum";
            maximumValidator = "maximum";
#endif
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
            Guard.IsNotNull(expression, "expression");
            return Editor()
                    .Name(GetName(expression))
                    .Value((string)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model);
        }
        /// <summary>
        /// Creates a new <see cref="NumericTextBox{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<TValue> NumericTextBoxFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct
        {
            Guard.IsNotNull(expression, "expression");

            var validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);
            
            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            var builder = NumericTextBox<TValue>()
                        .Name(GetName(expression))
                        .Value(value == null ? default(TValue) : (TValue)value);

            var min = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            var max = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            if(min != null)
                builder.MinValue(min);
            
            if(max != null)
                builder.MaxValue(max);

            return builder;
                
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{Nullable{TValue}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().NumericTextBoxFor(m=>m.NullableProperty) %&gt;
        /// </code>
        /// </example>
        public virtual NumericTextBoxBuilder<TValue> NumericTextBoxFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var builder = NumericTextBox<TValue>()
                        .Name(GetName(expression))
                        .Value((Nullable<TValue>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model);

            var min = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            var max = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            if (min != null)
                builder.MinValue(min);

            if (max != null)
                builder.MaxValue(max);

            return builder;
        }

        /// <summary>
        /// Creates a new <see cref="IntegerTextBox{Nullable{int}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().IntegerTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual IntegerTextBoxBuilder IntegerTextBoxFor(Expression<Func<TModel, Nullable<int>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return IntegerTextBox()
                    .Name(GetName(expression))
                    .Value((Nullable<int>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .MinValue(GetRangeValidationParameter<int>(validators, minimumValidator) ?? int.MinValue)
                    .MaxValue(GetRangeValidationParameter<int>(validators, maximumValidator) ?? int.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="IntegerTextBox{int}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().IntegerTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual IntegerTextBoxBuilder IntegerTextBoxFor(Expression<Func<TModel, int>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return IntegerTextBox()
                    .Name(GetName(expression))
                    .Value(value == null ? default(int) : (int)value)
                    .MinValue(GetRangeValidationParameter<int>(validators, minimumValidator) ?? int.MinValue)
                    .MaxValue(GetRangeValidationParameter<int>(validators, maximumValidator) ?? int.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="CurrencyTextBox{Nullable{decimal}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().CurrencyTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual CurrencyTextBoxBuilder CurrencyTextBoxFor(Expression<Func<TModel, Nullable<decimal>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return CurrencyTextBox()
                    .Name(GetName(expression))
                    .Value((Nullable<decimal>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .MinValue(GetRangeValidationParameter<decimal>(validators, minimumValidator) ?? decimal.MinValue)
                    .MaxValue(GetRangeValidationParameter<decimal>(validators, maximumValidator) ?? decimal.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="CurrencyTextBox{decimal}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().CurrencyTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual CurrencyTextBoxBuilder CurrencyTextBoxFor(Expression<Func<TModel, decimal>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return CurrencyTextBox()
                    .Name(GetName(expression))
                    .Value(value == null ? default(decimal) : (decimal)value)
                    .MinValue(GetRangeValidationParameter<decimal>(validators, minimumValidator) ?? decimal.MinValue)
                    .MaxValue(GetRangeValidationParameter<decimal>(validators, maximumValidator) ?? decimal.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="PercentTextBox{Nullable{double}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PercentTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual PercentTextBoxBuilder PercentTextBoxFor(Expression<Func<TModel, Nullable<double>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return PercentTextBox()
                    .Name(GetName(expression))
                    .Value((Nullable<double>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .MinValue(GetRangeValidationParameter<double>(validators, minimumValidator) ?? double.MinValue)
                    .MaxValue(GetRangeValidationParameter<double>(validators, maximumValidator) ?? double.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="PercentTextBox{double}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PercentTextBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual PercentTextBoxBuilder PercentTextBoxFor(Expression<Func<TModel, double>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return PercentTextBox()
                    .Name(GetName(expression))
                    .Value(value == null ? default(double) : (double)value)
                    .MinValue(GetRangeValidationParameter<double>(validators, minimumValidator) ?? double.MinValue)
                    .MaxValue(GetRangeValidationParameter<double>(validators, maximumValidator) ?? double.MaxValue);
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker{Nullable{DateTime}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DateTimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DateTimePicker()
                    .Name(GetName(expression))
                    .Value((Nullable<DateTime>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Telerik.Web.Mvc.UI.DateTimePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Telerik.Web.Mvc.UI.DateTimePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker{DateTime}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DateTimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return DateTimePicker()
                    .Name(GetName(expression))
                    .Value(value == null ? default(DateTime) : (DateTime)value)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Telerik.Web.Mvc.UI.DateTimePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Telerik.Web.Mvc.UI.DateTimePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DatePicker{Nullable{DateTime}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return DatePicker()
                    .Name(GetName(expression))
                    .Value((Nullable<DateTime>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Telerik.Web.Mvc.UI.DatePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Telerik.Web.Mvc.UI.DatePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="DatePicker{DateTime}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DatePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DatePickerBuilder DatePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return DatePicker()
                    .Name(GetName(expression))
                    .Value(value == null ? default(DateTime) : (DateTime)value)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? Telerik.Web.Mvc.UI.DatePicker.defaultMinDate)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? Telerik.Web.Mvc.UI.DatePicker.defaultMaxDate);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker{Nullable{DateTime}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<DateTime>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            return TimePicker()
                    .Name(GetName(expression))
                    .Value((Nullable<DateTime>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? DateTime.Today)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker{DateTime}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, DateTime>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return TimePicker()
                    .Name(GetName(expression))
                    .Value(value == null ? default(DateTime) : (DateTime)value)
                    .Min(GetRangeValidationParameter<DateTime>(validators, minimumValidator) ?? DateTime.Today)
                    .Max(GetRangeValidationParameter<DateTime>(validators, maximumValidator) ?? DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker{Nullable{TimeSpan}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, Nullable<TimeSpan>>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TimeSpan? minimum = GetRangeValidationParameter<TimeSpan>(validators, minimumValidator);
            TimeSpan? maximum = GetRangeValidationParameter<TimeSpan>(validators, maximumValidator);

            return TimePicker()
                    .Name(GetName(expression))
                    .Value((Nullable<TimeSpan>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(minimum.HasValue ? new DateTime(minimum.Value.Ticks) : DateTime.Today)
                    .Max(maximum.HasValue ? new DateTime(maximum.Value.Ticks) : DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="TimePicker{TimeSpan}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TimePickerFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual TimePickerBuilder TimePickerFor(Expression<Func<TModel, TimeSpan>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TimeSpan? minimum = GetRangeValidationParameter<TimeSpan>(validators, minimumValidator);
            TimeSpan? maximum = GetRangeValidationParameter<TimeSpan>(validators, maximumValidator);

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            return TimePicker()
                    .Name(GetName(expression))
                    .Value(value == null ? default(TimeSpan) : (TimeSpan)value)
                    .Min(minimum.HasValue ? new DateTime(minimum.Value.Ticks) : DateTime.Today)
                    .Max(maximum.HasValue ? new DateTime(maximum.Value.Ticks) : DateTime.Today);
        }

        /// <summary>
        /// Creates a new <see cref="DropDownList"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().DropDownListFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual DropDownListBuilder DropDownListFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            return DropDownList().Name(GetName(expression))
                                 .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="ComboBox"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBoxFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual ComboBoxBuilder ComboBoxFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            Guard.IsNotNull(expression, "expression");

            return ComboBox().Name(GetName(expression))
                             .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="AutoComplete"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().AutoCompleteFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual AutoCompleteBuilder AutoCompleteFor<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            Guard.IsNotNull(expression, "expression");
            
            return AutoComplete().Name(GetName(expression))
                                 .Value(GetValue(expression));
        }

        /// <summary>
        /// Creates a new <see cref="SliderFor{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().SliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<TValue> SliderFor<TValue>(Expression<Func<TModel, TValue>> expression)
            where TValue : struct, IComparable
        {
            Guard.IsNotNull(expression, "expression");

            var value = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            minimum = minimum.HasValue ? minimum : (TValue)Convert.ChangeType(0, typeof(TValue));
            maximum = maximum.HasValue ? maximum : (TValue)Convert.ChangeType(10, typeof(TValue));

            return Slider<TValue>()
                    .Name(GetName(expression))
                    .Value(value == null ? minimum : (TValue)value)
                    .Min(minimum.Value)
                    .Max(maximum.Value);
        }

        /// <summary>
        /// Creates a new <see cref="NumericTextBox{Nullable{TValue}}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().SliderFor(m=>m.NullableProperty) %&gt;
        /// </code>
        /// </example>
        public virtual SliderBuilder<TValue> SliderFor<TValue>(Expression<Func<TModel, Nullable<TValue>>> expression)
            where TValue : struct, IComparable
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            var value = (Nullable<TValue>)ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model;

            minimum = minimum.HasValue ? minimum : (TValue)Convert.ChangeType(0, typeof(TValue));
            maximum = maximum.HasValue ? maximum : (TValue)Convert.ChangeType(10, typeof(TValue));

            return Slider<TValue>()
                    .Name(GetName(expression))
                    .Value(value.HasValue ? value.Value : minimum)
                    .Min(minimum.Value)
                    .Max(maximum.Value);
        }

        /// <summary>
        /// Creates a new <see cref="RangeSliderFor{TValue}"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().RangeSliderFor(m=>m.Property) %&gt;
        /// </code>
        /// </example>
        public virtual RangeSliderBuilder<TValue> RangeSliderFor<TValue>(Expression<Func<TModel, TValue[]>> expression)
            where TValue : struct, IComparable
        {
            Guard.IsNotNull(expression, "expression");

            IEnumerable<ModelValidator> validators = ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).GetValidators(HtmlHelper.ViewContext.Controller.ControllerContext);

            TValue? minimum = GetRangeValidationParameter<TValue>(validators, minimumValidator);
            TValue? maximum = GetRangeValidationParameter<TValue>(validators, maximumValidator);

            minimum = minimum.HasValue ? minimum : (TValue)Convert.ChangeType(0, typeof(TValue));
            maximum = maximum.HasValue ? maximum : (TValue)Convert.ChangeType(10, typeof(TValue));

            return RangeSlider<TValue>()
                    .Name(GetName(expression))
                    .Values((TValue[])ModelMetadata.FromLambdaExpression(expression, HtmlHelper.ViewData).Model)
                    .Min(minimum.Value)
                    .Max(maximum.Value);
        }

        private string GetName(LambdaExpression expression)
        {
            string name = ExpressionHelper.GetExpressionText(expression);
            return HtmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(name);
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
                    return (TValue)Convert.ChangeType(value, typeof(TValue));
            }
            return null;
        }
    }
#endif
}
