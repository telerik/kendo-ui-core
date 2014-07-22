namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;

    public class GridColumnFilterableCellSettingsBuilder : IHideObjectMembers        
    {
        private readonly GridColumnFilterableCellSettings settings;
        private System.Web.Mvc.ViewContext viewContext;
        private IUrlGenerator urlGenerator;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnFilterableCellSettings"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridColumnFilterableCellSettingsBuilder(GridColumnFilterableCellSettings settings, System.Web.Mvc.ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.settings = settings;
        }

        public GridColumnFilterableCellSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }

        public GridColumnFilterableCellSettingsBuilder Operator(string defaultOperator)
        {
            settings.Operator = defaultOperator;

            return this;
        }

        public GridColumnFilterableCellSettingsBuilder ShowOperators(bool showOperators)
        {
            settings.ShowOperators = showOperators;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to modify the UI of the filter input.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns =>
        ///                 columns.Bound(o => o.OrderDate)
        ///                        .Filterable(filterable =>
        ///                             filterable.Cell(cell =>
        ///                                     cell.Template(@&lt;text&gt;
        ///                                     JavaScript function goes here
        ///                                     &lt;/text&gt;)
        ///                                 )
        ///                         )
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnFilterableCellSettingsBuilder Template(Func<object, object> handler)
        {
            settings.Template.TemplateDelegate = handler;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to modify the filter input used for Row filtering.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder Template(string handler)
        {
            settings.Template.HandlerName = handler;
            return this;
        }

        /// <summary>
        /// Specifies the delay of the AutoComplete suggestions when the column is of type string.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder Delay(double delay)
        {
            settings.Delay = delay;
            return this;
        }

        /// <summary>
        /// Specifies the MinLength option of the AutoComplete suggestions when the column is of type string.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder MinLength(int minLength)
        {
            settings.MinLength = minLength;
            return this;
        }

        /// <summary>
        /// Specifies the filter option of the AutoComplete suggestions when the column is of type string.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder SuggestionOperator(FilterType filterType)
        {
            settings.SuggestionOperator = filterType;
            return this;
        }

        /// <summary>
        /// Specifies the width of the input before it is turned into a widget.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder InputWidth(int inputWidth)
        {
            settings.InputWidth = inputWidth;
            return this;
        }

        /// <summary>
        /// Specifies the name of the field which will be used to show the suggestions when using Custom DataSource.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>
        public GridColumnFilterableCellSettingsBuilder DataTextField(string dataTextField)
        {
            settings.DataTextField = dataTextField;
            return this;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Grid(Model)
        ///             .Name("Grid")
        ///             .Columns(columns =>
        ///                 columns.Bound(o => o.OrderDate)
        ///                        .Filterable(filterable =>
        ///                             filterable.Cell(cell =>
        ///                                     cell.DataSource(ds =>
        ///                                         ds.Read("someAction", "someController")
        ///                                     )
        ///                                 )
        ///                         )
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridColumnFilterableCellSettingsBuilder DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(settings.DataSource, this.viewContext, this.urlGenerator));

            return this;
        }

        public GridColumnFilterableCellSettingsBuilder BindTo(IEnumerable dataSource)
        {
            settings.DataSource.Data = dataSource;            

            return this;
        }
    }    
}