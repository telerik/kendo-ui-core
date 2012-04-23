// (c) Copyright 2002-2010 Telerik
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html.
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Globalization;
    using Extensions;
    using Infrastructure;
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}"/> component.
    /// </summary>
    public class GridBuilder<T> : ViewComponentBuilderBase<Grid<T>, GridBuilder<T>> where T : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridBuilder{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GridBuilder(Grid<T> component)
            : base(component)
        {
        }

        public GridBuilder<T> TableHtmlAttributes(object attributes)
        {
            return TableHtmlAttributes(attributes.ToDictionary());
        }

        public GridBuilder<T> TableHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.TableHtmlAttributes.Clear();
            Component.TableHtmlAttributes.Merge(attributes);

            return this;
        }

        public GridBuilder<T> DetailView(Action<GridDetailViewBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Component.DetailView = new GridDetailView<T>();

            configurator(new GridDetailViewBuilder<T>(Component.DetailView));

            return this;
        }

        /// <summary>
        /// Sets the row template of the grid
        /// </summary>
        /// <param name="codeBlockTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///     .RowTemplate(o =>
        ///     {
        ///        %&gt;
        ///           &lt;%= o.Name %&gt;
        ///           &lt;%= o.Age %&gt;
        ///        &lt;%
        ///     })
        ///  %&gt;
        /// </code> 
        /// </example>
        public GridBuilder<T> RowTemplate(Action<T, Grid<T>> codeBlockTemplate)
        {
            Guard.IsNotNull(codeBlockTemplate, "codeBlockTemplate");

            Component.RowTemplate.CodeBlockTemplate = (dataItem) => codeBlockTemplate(dataItem, Component);
            
            return this;
        }
        /// <summary>
        /// Sets the row template of the grid
        /// </summary>
        /// <param name="codeBlockTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///     .RowTemplate(o =>
        ///     {
        ///        %&gt;
        ///           &lt;%= o.Name %&gt;
        ///           &lt;%= o.Age %&gt;
        ///        &lt;%
        ///     })
        ///  %&gt;
        /// </code> 
        /// </example>
        public GridBuilder<T> RowTemplate(Action<T> codeBlockTemplate)
        {
            Guard.IsNotNull(codeBlockTemplate, "codeBlockTemplate");

            Component.RowTemplate.CodeBlockTemplate = codeBlockTemplate;

            return this;
        }

        /// <summary>
        /// Sets the row template of the grid using Razor syntax
        /// </summary>
        /// <param name="inlineTemplate">The template</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///     .RowTemplate(@&lt;text&gt;
        ///           @item.Name
        ///           @item.Age
        ///     &lt;/text&gt;)
        ///  %&gt;
        /// </code> 
        /// </example>
        public GridBuilder<T> RowTemplate(Func<T, object> inlineTemplate)
        {
            Guard.IsNotNull(inlineTemplate, "inlineTemplate");

            Component.RowTemplate.InlineTemplate = inlineTemplate;

            return this;
        }

        public GridBuilder<T> RowTemplate(Func<Grid<T>, Func<T, object>> inlineTemplate)
        {
            Guard.IsNotNull(inlineTemplate, "inlineTemplate");

            Component.RowTemplate.InlineTemplate = (dataItem)  => inlineTemplate(Component)(dataItem);

            return this;
        }

        public GridBuilder<T> ClientRowTemplate(string template)
        {
            Component.ClientRowTemplate = template;
            return this;
        }

        public GridBuilder<T> ClientRowTemplate(Func<Grid<T>, string> template)
        {
            Component.ClientRowTemplate = template(Component);

            return this;
        }

        /// <summary>
        /// Configures the grid resizing settings
        /// </summary>
        /// <param name="configurator">Resizing settings configurator method</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Resizable(resizing => resizing.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Resizable(Action<GridResizingSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridResizingSettingsBuilder(Component.Resizing));

            return this;
        }
        /// <summary>
        /// Configures the grid reordering settings
        /// </summary>
        /// <param name="configurator">Resizing settings configurator method</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Reorderable(reordering => reordering.Columns(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Reorderable(Action<GridReorderingSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridReorderingSettingsBuilder(Component.Reordering));

            return this;
        }

        /// <summary>
        /// Sets the localization culture of the grid.
        /// </summary>
        /// <param name="culture">The culture.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Localizable("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Localizable(string culture)
        {
            var localizationServiceFactory = DI.Current.Resolve<ILocalizationServiceFactory>();
            var cultureInfo = new CultureInfo(culture);

            Component.Localization = new GridLocalization(localizationServiceFactory.Create("GridLocalization", cultureInfo), cultureInfo);

            return this;
        }

#if MVC2 || MVC3
        /// <summary>
        /// Configures the grid editing settings.
        /// </summary>
        /// <param name="configurator">Configurator for the edit settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Editable(settings => settings.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Editable(Action<GridEditingSettingsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridEditingSettingsBuilder<T>(Component.Editing));

            return this;
        }
#endif

        /// <summary>
        /// Configures the toolbar of the grid.
        /// </summary>
        /// <param name="configurator">ToolBar configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .ToolBar(commands => commands.Insert())
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ToolBar(Action<GridToolBarCommandFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridToolBarCommandFactory<T>(Component.ToolBar));

            return this;
        }

        /// <summary>
        /// Defines a list of the private keys.
        /// </summary>
        /// <param name="configurator">DataKeys configurator.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .DataKeys(keys =>
        ///             {
        ///                 keys.Add(c => c.CustomerID);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> DataKeys(Action<GridDataKeyFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridDataKeyFactory<T>(Component.DataKeys, false));

            return this;
        }

        /// <summary>
        /// Configure when to show footer of the grid.
        /// </summary>
        /// <param name="visible">If it is true, the feature is visible.</param>
        public GridBuilder<T> Footer(bool visible)
        {
            Component.Footer = visible;
            return this;
        }

        /// <summary>
        /// Binds the grid to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid&lt;Order&gt;()
        ///             .Name("Orders")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource = dataSource;

            return this;
        }

        public GridBuilder<T> BindTo(IEnumerable dataSource)
        {           
            Component.DataSource = new GridCustomGroupingWrapper<T>(dataSource);
            return this;
        }        

        /// <summary>
        /// Callback for each row.
        /// </summary>
        /// <param name="configurator">Action, which will be executed for each row.
        /// You can format the entire row</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .RowAction(row =>
        ///             {
        ///                 // "DataItem" is the Order object to which the current row is bound to
        ///                 if (row.DataItem.Freight > 10)
        ///                 {
        ///                     //Set the background of the entire row
        ///                     row.HtmlAttributes["style"] = "background:red;";
        ///                 }
        ///             });
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> RowAction(Action<GridRow<T>> configurator)
        {
            Guard.IsNotNull(configurator, "callback");

            Component.RowAction = configurator;

            return this;
        }

        /// <summary>
        /// Callback for each cell.
        /// </summary>
        /// <param name="configurator">Action, which will be executed for each cell.
        /// You can format a concrete cell.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .CellAction(cell =>
        ///             {
        ///                if (cell.Column.Name == "Freight")
        ///                {
        ///                    if (cell.DataItem.Freight > 10)
        ///                    {
        ///                        //Set the background of this cell only
        ///                        cell.HtmlAttributes["style"] = "background:red;";
        ///                    }
        ///                }
        ///             });
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> CellAction(Action<GridCell<T>> configurator)
        {
            Guard.IsNotNull(configurator, "callback");

            Component.CellAction = configurator;

            return this;
        }

        /// <summary>
        /// Enables or disables the custom binding of the grid.
        /// </summary>
        /// <param name="value">If true enables custom binding.</param>
        /// <returns></returns>
        public GridBuilder<T> EnableCustomBinding(bool value)
        {
            Component.EnableCustomBinding = value;

            return this;
        }

        /// <summary>
        /// Defines the columns of the grid.
        /// </summary>
        /// <param name="configurator">The add action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Columns(Action<GridColumnFactory<T>> configurator)
        {
            Guard.IsNotNull(configurator, "addAction");

            GridColumnFactory<T> factory = new GridColumnFactory<T>(Component);

            configurator(factory);

            return this;
        }
        
        /// <summary>
        /// Allows sorting of the columns.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable()
        {
            Component.Sorting.Enabled = true;

            return this;
        }

        /// <summary>
        /// Allows sorting of the columns.
        /// </summary>
        /// <param name="configurator">Use builder to define sort settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Sortable(sorting => sorting.SortMode(GridSortMode.MultipleColumn)
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Sortable(Action<GridSortSettingsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Component.Sorting.Enabled = true;

            configurator(new GridSortSettingsBuilder<T>(Component.Sorting));

            return this;
        }

        /// <summary>
        /// Enables row selection.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Selectable()
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable()
        {
            Component.Selection.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables row selection.
        /// </summary>
        /// <param name="selectionAction">Use builder to define the selection settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Selectable(selection => selection.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Selectable(Action<GridSelectionSettingsBuilder> selectionAction)
        {
            Guard.IsNotNull(selectionAction, "selectionAction");

            Selectable();

            selectionAction(new GridSelectionSettingsBuilder(Component.Selection));

            return this;
        }

        /// <summary>
        /// Put grid name as a prefix.
        /// </summary>
        public GridBuilder<T> PrefixUrlParameters(bool prefix)
        {
            Component.PrefixUrlParameters = prefix;

            return this;
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Pageable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable()
        {
            return Pageable(delegate { });
        }

        /// <summary>
        /// Allows paging of the data.
        /// </summary>
        /// <param name="pagerAction">Use builder to define paging settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Pageable(paging =>
        ///                        paging.PageSize(20)
        ///                              .Style(GridPagerStyles.NextPreviousAndNumeric)
        ///                              .Position(GridPagerPosition.Bottom)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Pageable(Action<GridPagerSettingsBuilder> pagerAction)
        {
            Guard.IsNotNull(pagerAction, "pagerAction");

            Component.Paging.Enabled = true;
            pagerAction(new GridPagerSettingsBuilder(Component.Paging));

            return this;
        }

        /// <summary>
        /// Use it to configure Server binding.
        /// </summary>
        /// <param name="operationSettingsAction">Use builder to set different server binding settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .ServerBinding(serverBinding => serverBinding
        ///                 .Action("Index", "Home", new {id = (string)ViewData["id"]})
        ///             )
        ///             .Pagealbe()
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        [Obsolete("Use DataBinding(dataBinding => dataBinding.Server().Select()) instead")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public GridBuilder<T> ServerBinding(Action<GridRequestSettingsBuilder> operationSettingsAction)
        {
            Guard.IsNotNull(operationSettingsAction, "operationSettingsAction");

            operationSettingsAction(new GridRequestSettingsBuilder(Component.Server.Select));

            return this;
        }

        /// <summary>
        /// Use it to configure binding option when performing data operations - paging, sorting and filtering.
        /// </summary>
        /// <param name="configurator">Use builder to set different data binding options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .DataBinding(dataBinding =>
        ///             {
        ///                 dataBinding.Server().Select("FirstLook", "Grid"});
        ///                 dataBinding.Ajax().Select("_FirstLook", "Grid").Enabled((bool)ViewData["ajax"]);
        ///             })
        ///             .Pagealbe()
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> DataBinding(Action<GridDataBindingConfigurationBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridDataBindingConfigurationBuilder(Component.DataBinding));

            return this;
        }

        /// <summary>
        /// Use it to configure Ajax binding.
        /// </summary>
        /// <param name="configurator">Use builder to set different ajax binding settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_AjaxBinding", "Home"))
        ///             .Pagealbe()
        ///             .Sortable();
        /// %&gt;
        /// </code>
        /// </example>
        [Obsolete("Use DataBinding(dataBinding => dataBinding.Ajax().Select()) instead")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public GridBuilder<T> Ajax(Action<GridAjaxSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Component.Ajax.Enabled = true;

            configurator(new GridAjaxSettingsBuilder(Component.Ajax));

            return this;
        }

        /// <summary>
        /// Allows filtering of the columns.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Filterable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable()
        {
            Component.Filtering.Enabled = true;
            return this;
        }

        /// <summary>
        /// Allows filtering of the columns.
        /// </summary>
        /// <param name="configurator">Use builder to define filtering settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Filterable(filtering => filtering.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Filterable(Action<GridFilteringSettingsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Component.Filtering.Enabled = true;

            configurator(new GridFilteringSettingsBuilder<T>(Component.Filtering));

            return this;
        }

        /// <summary>
        /// Show scrollbar if there are many items.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Scrollable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable()
        {
            Component.Scrolling.Enabled = true;

            return this;
        }

        /// <summary>
        /// Show scrollbar if there are many items.
        /// </summary>
        /// <param name="configurator">Use builder to define scrolling settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Scrollable(scrolling => scrolling.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Scrollable(Action<GridScrollSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Scrollable();

            configurator(new GridScrollSettingsBuilder(Component.Scrolling));

            return this;
        }

        /// <summary>
        /// Enables keyboard navigation.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .KeyboardNavigation();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> KeyboardNavigation()
        {
            Component.KeyboardNavigation.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables keyboard navigation.
        /// </summary>
        /// <param name="configurator">Use builder to define keyboard navigation settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .KeyboardNavigation(navigation => navigation.Enabled(true));
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> KeyboardNavigation(Action<GridKeyboardNavigationSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            KeyboardNavigation();

            configurator(new GridKeyboardNavigationSettingsBuilder(Component.KeyboardNavigation));

            return this;
        }

        /// <summary>
        /// Enables column context menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .ColumnContextMenu();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnContextMenu()
        {
            Component.ColumnContextMenu.Enabled = true;

            return this;
        }

        /// <summary>
        /// Enables column context menu.
        /// </summary>
        /// <param name="configurator">Use builder to column context menu settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .ColumnContextMenu(navigation => navigation.Enabled(true));
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ColumnContextMenu(Action<GridColumnContextMenuSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            ColumnContextMenu();

            configurator(new GridColumnContextMenuSettingsBuilder(Component.ColumnContextMenu));

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .ClientEvents(events => events
        ///                 .OnDataBinding("onDataBinding")
        ///                 .OnRowDataBound("onRowDataBound")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> ClientEvents(Action<GridClientEventsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new GridClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        /// <summary>
        /// Use it to configure grouping.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Groupable(grouping => grouping.Enabled(true);
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable(Action<GridGroupingSettingsBuilder<T>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            Component.Grouping.Enabled = true;
            configurator(new GridGroupingSettingsBuilder<T>(Component.Grouping));

            return this;
        }

        /// <summary>
        /// Allows grouping.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Action("_RelatedGrids_Orders", "Grid", new { customerID = "ALFKI" }))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"])
        ///             .Groupable();
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> Groupable()
        {
            return Groupable(delegate { });
        }

        /// <summary>
        /// Use it to configure web service binding.
        /// </summary>
        /// <param name="configurator">Use builder to set different web service binding settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .WebService(webService => webService.Url("~/Models/Orders.asmx/GetOrders"))
        ///             .Columns(columns=>
        ///             {
        ///                 columns.Add(c => c.OrderID).Width(100);
        ///                 columns.Add(c => c.OrderDate).Width(200).Format("{0:dd/MM/yyyy}");
        ///                 columns.Add(c => c.ShipAddress);
        ///                 columns.Add(c => c.ShipCity).Width(200);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        [Obsolete("Use DataBinding(dataBinding => dataBinding.WebService().Select()) instead")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        public GridBuilder<T> WebService(Action<GridWebServiceSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "webServiceAction");

            Component.WebService.Enabled = true;

            configurator(new GridWebServiceSettingsBuilder(Component.WebService));

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the grid should display.
        /// </summary>
        /// <param name="value">The action which renders the message when grid has no data.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Grid()
        ///            .Name("Grid")
        ///            .NoRecordsTemplate(() => 
        ///            { 
        ///               %&gt;
        ///                     &lt;strong&gt; Hello World!!!;/strong&gt;
        ///               &lt;% 
        ///            })
        /// %&gt;
        /// </code>
        /// </example>
        public GridBuilder<T> NoRecordsTemplate(Action value)
        {
            Guard.IsNotNull(value, "value");

            Component.NoRecordsTemplate.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the empty message template which will be display if the grid has no data.
        /// </summary>
        /// <param name="value">The Razor inline message.</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Telerik().Grid()
        ///            .Name("Grid")
        ///            .NoRecordsTemplate(@&lt;strong&gt; Hello World!!!&lt;/strong&gt;))
        /// </code>        
        /// </example>
        /// <returns></returns>
        public GridBuilder<T> NoRecordsTemplate(Func<object, object> value)
        {
            Guard.IsNotNull(value, "value");

            Component.NoRecordsTemplate.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the empty message template which will be display if the grid has no data.
        /// </summary>
        /// <param name="value">The action which renders the message when grid has no data.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid()
        ///             .Name("Grid")
        ///             .NoRecordsTemplate("&lt;strong&gt; Hello World!!!&lt;/strong&gt;")
        /// %&gt;
        /// </code>        
        public GridBuilder<T> NoRecordsTemplate(string value)
        {
            Guard.IsNotNull(value, "value");

            Component.NoRecordsTemplate.Html = value;

            return this;
        }
    }
}
