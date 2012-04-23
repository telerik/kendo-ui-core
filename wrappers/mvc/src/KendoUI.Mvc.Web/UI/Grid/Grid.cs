// (c) Copyright 2002-2010 Telerik
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html.
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.Script.Serialization;
    using System.Web.UI;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.Resources;
    using KendoUI.Mvc.UI.Fluent;
    using KendoUI.Mvc.UI.Html;
    using System.Web;
#if MVC3
    using Infrastructure.Implementation;
#endif

    /// isummary>
    /// Telerik Grid for ASP.NET MVC is a view component for presenting tabular data.
    /// It supports the following features:
    /// <list type="bullet">
    ///     <item>Flexible databinding - server, ajax and web service</item>
    ///     <item>Paging, sorting and filtering</item>
    ///     <item>Light HTML and JavaScript footprint</item>
    /// </list>
    /// </summary>
    /// <typeparam name="T">The type of the data item which the grid is bound to.</typeparam>
    public class Grid<T> : ViewComponentBase, IGridColumnContainer<T>, IGrid where T : class
    {
        private readonly IGridHtmlBuilderFactory htmlBuilderFactory;

        private IGridUrlBuilder urlBuilder;

        private IGridDataKeyStore dataKeyStore;

        private string clientRowTemplate;

        /// <summary>
        /// Initializes a new instance of the <see cref="Grid{T}"/> class.
        /// </summary>
        /// <param name="viewContext">The view context.</param>
        /// <param name="clientSideObjectWriterFactory">The client side object writer factory.</param>
        /// <param name="urlGenerator">The URL generator.</param>
        /// <param name="builderFactory">The builder factory.</param>
        public Grid(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory, IUrlGenerator urlGenerator,
            ILocalizationService localizationService, IGridHtmlBuilderFactory htmlBuilderFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            this.htmlBuilderFactory = htmlBuilderFactory;

            UrlGenerator = urlGenerator;

            PrefixUrlParameters = true;
            RowTemplate = new HtmlTemplate<T>();
            DataProcessor = new GridDataProcessor(this);
            Columns = new List<GridColumnBase<T>>();
            DataKeys = new List<IGridDataKey<T>>();

            Paging = new GridPagingSettings(this);
            Sorting = new GridSortSettings(this);
            Scrolling = new GridScrollingSettings();
            KeyboardNavigation = new GridKeyboardNavigationSettings(this);
            ColumnContextMenu = new GridColumnContextMenuSettings(this);
            Filtering = new GridFilteringSettings();
            Editing = new GridEditingSettings<T>(this)
            {
                PopUp = new Window(viewContext, clientSideObjectWriterFactory, new WindowHtmlBuilderFactory())
                {
                    Modal = true,
                    Draggable = true
                }
            };

            Grouping = new GridGroupingSettings(this);
            Resizing = new GridResizingSettings();
            Reordering = new GridReorderingSettings();

            TableHtmlAttributes = new RouteValueDictionary();

            DataBinding = new GridDataBindingSettings(this);

            Footer = true;
            IsEmpty = true;

            ClientEvents = new GridClientEvents();
            Selection = new GridSelectionSettings();
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.grid.js" });

            ToolBar = new GridToolBarSettings<T>(this);
            Localization = new GridLocalization(localizationService, CultureInfo.CurrentUICulture);
            NoRecordsTemplate = new HtmlTemplate();

            ValidationMetadata = new Dictionary<string, object>();

            AutoGenerateColumns = true;
        }

        public IDictionary<string, object> ValidationMetadata
        {
            get;
            private set;
        }

        public IGridDetailView<T> DetailView
        {
            get;
            set;
        }

        public IDictionary<string, object> TableHtmlAttributes
        {
            get;
            private set;
        }

        public GridResizingSettings Resizing
        {
            get;
            private set;
        }

        public GridReorderingSettings Reordering
        {
            get;
            private set;
        }

        public bool Footer
        {
            get;
            set;
        }

        public GridLocalization Localization
        {
            get;
            set;
        }

        public GridToolBarSettings<T> ToolBar
        {
            get;
            private set;
        }

        public GridGroupingSettings Grouping
        {
            get;
            private set;
        }

        public GridEditingSettings<T> Editing
        {
            get;
            private set;
        }

        public GridDataBindingSettings DataBinding
        {
            get;
            internal set;
        }

        /// <summary>
        /// Gets the selection configuration
        /// </summary>
        public GridSelectionSettings Selection
        {
            get;
            private set;
        }

        public IList<IGridDataKey<T>> DataKeys
        {
            get;
            private set;
        }


        private object Button<TButton>(T dataItem, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
            where TButton : GridActionCommandBase, new()
        {
            var command = new TButton();

            command.ButtonType = buttonType;
            command.HtmlAttributes = htmlAttributes.ToDictionary();
            command.ImageHtmlAttributes = imageHtmlAttributes.ToDictionary();

            var buttons = command.CreateDisplayButtons(Localization, UrlBuilder, new GridHtmlHelper<T>(ViewContext, DataKeyStore));

            var fragment = new HtmlFragment();

            buttons.Each(button => button.Create(dataItem).AppendTo(fragment));

#if MVC3

            return MvcHtmlString.Create(fragment.ToString());
#else

            return fragment.ToString();
#endif
        }

        private object CustomButton<TButton>(
                   string name,
                   string text,
                   string url,
                   string actionName,
                   string controllerName,
                   string routeName,
                   object routeValues,
                   bool ajax,
                   GridButtonType buttonType,
                   object htmlAttributes,
                   object imageHtmlAttributes)

                   where TButton : GridCustomCommandBase, new()
        {
            var command = new TButton();

            command.ButtonType = buttonType;
            command.HtmlAttributes = htmlAttributes.ToDictionary();
            command.ImageHtmlAttributes = imageHtmlAttributes.ToDictionary();
            command.Text = text;
            command.Ajax = ajax;
            command.Name = name;
            
            if (url.HasValue())
            {
                command.Url(url);
            }

            if (actionName.HasValue())
            {
                command.Action(actionName, controllerName, routeValues);
                text = actionName;
            }

            if (routeName.HasValue())
            {
                command.Route(routeName, routeValues);
                text = routeName;
            }

            if (string.IsNullOrEmpty(command.Text))
            {
                command.Text = text;
            }

            var buttons = command.CreateDisplayButtons(Localization, UrlBuilder, new GridHtmlHelper<T>(ViewContext, DataKeyStore));
            var fragment = new HtmlFragment();
            buttons.Each(button => button.Create(null).AppendTo(fragment));

#if MVC3

            return MvcHtmlString.Create(fragment.ToString());
#else

            return fragment.ToString();
#endif
        }

        private object CustomCommandToolBarButton(
            string name,
            string text,
            string url,
            string actionName,
            string controllerName,
            string routeName,
            object routeValues,
            bool ajax,
            GridButtonType buttonType,
            object htmlAttributes,
            object imageHtmlAttributes)
        {
            return CustomButton<GridToolBarCustomCommand<T>>(name, text, url, actionName, controllerName, routeName, routeValues, ajax, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object CustomCommandToolBarButton(
            string name,
            string text,
            string actionName,
            string controllerName,
            object routeValues,
            bool ajax,
            GridButtonType buttonType,
            object htmlAttributes,
            object imageHtmlAttributes)
        {
            return CustomCommandToolBarButton(name, text, null, actionName, controllerName, null, routeValues, ajax, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object CustomCommandToolBarButton(string name, string text, string actionName, string controllerName, bool ajax, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            return CustomCommandToolBarButton(name, text, actionName, controllerName, null, ajax, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object CustomCommandToolBarButton(string name, string text, string actionName, string controllerName, object routeValues, bool ajax, GridButtonType buttonType)
        {
            return CustomCommandToolBarButton(name, text, null, actionName, controllerName, null, routeValues, ajax, buttonType, null, null);
        }

        public object CustomCommandToolBarButton(string name, string text, string actionName, string controllerName, object routeValues)
        {
            return CustomCommandToolBarButton(name, text, actionName, controllerName, routeValues, false, GridButtonType.Text);
        }


        public object CustomCommandToolBarButton(string name, string text, string routeName, RouteValueDictionary routeValues, bool ajax, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            return CustomCommandToolBarButton(name, text, null, null, null, routeName, routeValues, ajax, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object CustomCommandToolBarButton(string name, string text, string routeName, RouteValueDictionary routeValues, bool ajax, GridButtonType buttonType)
        {
            return CustomCommandToolBarButton(name, text, routeName, routeValues, ajax, buttonType, null, null);
        }

        public object CustomCommandToolBarButton(string name, string text, string routeName, RouteValueDictionary routeValues)
        {
            return CustomCommandToolBarButton(name, text, routeName, routeValues, false, GridButtonType.Text, null, null);
        }

        public object CustomCommandToolBarButton(string name, string text, string url, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            return CustomCommandToolBarButton(name, text, url, null, null, null, null, false, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object CustomCommandToolBarButton(string name, string text, string url, GridButtonType buttonType)
        {
            return CustomCommandToolBarButton(name, text, url, buttonType, null, null);
        }

        public object CustomCommandToolBarButton(string name, string text, string url)
        {
            return CustomCommandToolBarButton(name, text, url, GridButtonType.Text);
        }

        public object CustomCommandToolBarButton(string name, string text)
        {
            return CustomCommandToolBarButton(name, text, null, GridButtonType.Text);
        }

#if MVC2 || MVC3
        public object EditButton(T dataItem, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            Editing.Enabled = true;

            RegisterEditingScriptFiles();
            return Button<GridEditActionCommand>(dataItem, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object EditButton(T dataItem, GridButtonType buttonType, object htmlAttributes)
        {
            return EditButton(dataItem, buttonType, htmlAttributes, null);
        }

        public object EditButton(T dataItem, GridButtonType buttonType)
        {
            return EditButton(dataItem, buttonType, null);
        }

        public object EditButton(T dataItem)
        {
            return EditButton(dataItem, GridButtonType.Text);
        }

        public object DeleteButton(T dataItem, GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            Editing.Enabled = true;
            RegisterEditingScriptFiles();
            return Button<GridDeleteActionCommand>(dataItem, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object DeleteButton(T dataItem, GridButtonType buttonType, object htmlAttributes)
        {
            return DeleteButton(dataItem, buttonType, htmlAttributes, null);
        }

        public object DeleteButton(T dataItem, GridButtonType buttonType)
        {
            return DeleteButton(dataItem, buttonType, null);
        }

        public object DeleteButton(T dataItem)
        {
            return DeleteButton(dataItem, GridButtonType.Text);
        }

        public object InsertButton(GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            Editing.Enabled = true;
            RegisterEditingScriptFiles();
            InitializeEditors();
            return Button<GridToolBarInsertCommand<T>>(null, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object InsertButton(GridButtonType buttonType, object htmlAttributes)
        {
            return InsertButton(buttonType, htmlAttributes, null);
        }

        public object InsertButton(GridButtonType buttonType)
        {
            return InsertButton(buttonType, null);
        }

        public object InsertButton()
        {
            return InsertButton(GridButtonType.Text);
        }

        public object SubmitChangesButton(GridButtonType buttonType, object htmlAttributes, object imageHtmlAttributes)
        {
            Editing.Enabled = true;
            RegisterEditingScriptFiles();
            InitializeEditors();
            return Button<GridToolBarSubmitChangesCommand<T>>(null, buttonType, htmlAttributes, imageHtmlAttributes);
        }

        public object SubmitChangesButton(GridButtonType buttonType, object htmlAttributes)
        {
            return SubmitChangesButton(buttonType, htmlAttributes, null);
        }

        public object SubmitChangesButton(GridButtonType buttonType)
        {
            return SubmitChangesButton(buttonType, null);
        }

        public object SubmitChangesButton()
        {
            return SubmitChangesButton(GridButtonType.Text);
        }
#endif
        public string ClientRowTemplate
        {
            get
            {
                return clientRowTemplate;
            }
            set
            {
                clientRowTemplate = HttpUtility.HtmlDecode(value);
            }
        }

        IEnumerable<IGridDataKey> IGrid.DataKeys
        {
            get
            {
                return DataKeys.Cast<IGridDataKey>();
            }
        }

        /// <summary>
        /// Gets the template which the grid will use to render a row
        /// </summary>
        public HtmlTemplate<T> RowTemplate
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the client events of the grid.
        /// </summary>
        /// <value>The client events.</value>
        public GridClientEvents ClientEvents
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the filtering configuration.
        /// </summary>
        public GridFilteringSettings Filtering
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the web service configuration
        /// </summary>
        public GridBindingSettings WebService
        {
            get
            {
                return DataBinding.WebService;
            }
        }

        /// <summary>
        /// Gets the server binding configuration.
        /// </summary>
        public GridBindingSettings Server
        {
            get
            {
                return DataBinding.Server;
            }
        }

        /// <summary>
        /// Gets the scrolling configuration.
        /// </summary>
        public GridScrollingSettings Scrolling
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the keyboard navigation configuration.
        /// </summary>
        public GridKeyboardNavigationSettings KeyboardNavigation
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the column context menu configuration.
        /// </summary>
        public GridColumnContextMenuSettings ColumnContextMenu
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the ajax configuration.
        /// </summary>
        public GridBindingSettings Ajax
        {
            get
            {
                return DataBinding.Ajax;
            }
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public GridDataProcessor DataProcessor
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether custom binding is enabled.
        /// </summary>
        /// <value><c>true</c> if custom binding is enabled; otherwise, <c>false</c>. The default value is <c>false</c></value>
        public bool EnableCustomBinding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the paging configuration.
        /// </summary>
        public GridPagingSettings Paging
        {
            get;
            internal set;
        }

        /// <summary>
        /// Gets the columns of the grid.
        /// </summary>
        public IList<GridColumnBase<T>> Columns
        {
            get;
            private set;
        }

        IEnumerable<IGridColumn> IGrid.Columns
        {
            get
            {
                return Columns.Cast<IGridColumn>();
            }
        }

        public IList<GridColumnBase<T>> VisibleColumns
        {
            get
            {
                return Columns.Where(c => c.Visible).ToList();
            }
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

        int IGridBindingContext.Total
        {
            get
            {
                return Paging.Total;
            }
        }

        IEnumerable IGridBindingContext.DataSource
        {
            get
            {
                return DataSource;
            }
        }

        IList<SortDescriptor> IGridBindingContext.SortDescriptors
        {
            get
            {
                return Sorting.OrderBy;
            }
        }

        IList<GroupDescriptor> IGridBindingContext.GroupDescriptors
        {
            get
            {
                return Grouping.Groups;
            }
        }

        IList<CompositeFilterDescriptor> IGridBindingContext.FilterDescriptors
        {
            get
            {
                return Filtering.Filters;
            }
        }

        ControllerBase IGridBindingContext.Controller
        {
            get
            {
                return ViewContext.Controller;
            }
        }

        /// <summary>
        /// Gets the page size of the grid.
        /// </summary>
        public int PageSize
        {
            get
            {
                if (!Paging.Enabled)
                {
                    return 0;
                }

                return Paging.PageSize;
            }
        }

        public int CurrentPage
        {
            get
            {
                return Paging.CurrentPage;
            }
        }

        /// <summary>
        /// Gets the sorting configuration.
        /// </summary>
        /// <value>The sorting.</value>
        public GridSortSettings Sorting
        {
            get;
            internal set;
        }

        /// <summary>
        /// Gets or sets a value indicating whether to add the <see cref="Name"/> property of the grid as a prefix in url parameters.
        /// </summary>
        /// <value><c>true</c> if prefixing is enabled; otherwise, <c>false</c>. The default value is <c>true</c></value>
        public bool PrefixUrlParameters
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the action executed when rendering a row.
        /// </summary>
        public Action<GridRow<T>> RowAction
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the action executed when rendering a cell.
        /// </summary>
        public Action<GridCell<T>> CellAction
        {
            get;
            set;
        }

        public HtmlTemplate NoRecordsTemplate
        {
            get;
            private set;
        }

        public string Prefix(string parameter)
        {
            return PrefixUrlParameters ? Id + "-" + parameter : parameter;
        }

        public IEnumerable<AggregateDescriptor> Aggregates
        {
            get 
            {
                return VisibleColumns.OfType<IGridBoundColumn>().Select(c => 
                {
                    var descriptor = new AggregateDescriptor
                    {
                        Member = c.Member
                    };
                    
                    descriptor.Aggregates.AddRange(c.Aggregates);
                    
                    return descriptor;
                });
            }
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tGrid", writer);

            objectWriter.Start();

            new GridClientObjectSerializer<T>(this).Serialize(objectWriter);

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        internal int Colspan
        {
            get
            {
                int colspan = DataProcessor.GroupDescriptors.Count + VisibleColumns.Count;

                if (DetailView != null)
                {
                    colspan++;
                }

                return colspan;
            }
        }

        private string currentItemMode;

        private GridItemMode CurrentItemMode
        {
            get
            {
                if (currentItemMode == null)
                {
                    currentItemMode = this.GetGridParameter<string>(GridUrlParameters.Mode);
                }

                return currentItemMode.ToEnum(GridItemMode.Default);
            }
        }

        public void SerializeDataSource(IClientSideObjectWriter writer)
        {
            IEnumerable dataSource = DataSource;
            var dataTableEnumerable = DataSource as GridDataTableWrapper;

            var serverOperationMode = !DataBinding.IsClientOperationMode;

            if (serverOperationMode)
            {
                dataSource = DataProcessor.ProcessedDataSource;
            }

            if (dataTableEnumerable != null && dataTableEnumerable.Table != null)
            {
                dataSource = dataSource.SerializeToDictionary(dataTableEnumerable.Table);
            }
            else if (DataProcessor.ProcessedDataSource is IQueryable<AggregateFunctionsGroup>)
            {
                var grouppedDataSource = DataProcessor.ProcessedDataSource.Cast<IGroup>();

                if (serverOperationMode) {
                    dataSource = grouppedDataSource.Leaves();
                }
            }

            writer.AppendCollection("data", dataSource);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (!Columns.Any() && AutoGenerateColumns)
            {
                foreach (GridColumnBase<T> column in new GridColumnGenerator<T>(this).GetColumns())
                {
                    Columns.Add(column);
                }
            }

#if MVC2 || MVC3
            var orignalClientValidationEnabled = ViewContext.ClientValidationEnabled;
            var originalFormContext = ViewContext.FormContext;

            try
            {
                ViewContext.ClientValidationEnabled = true;
                ViewContext.FormContext = new FormContext
                {
                    FormId = Name + "form"
                };

                if (Editing.Enabled && IsClientBinding)
                {
                    InitializeEditors();
                }
#endif
                
#if MVC3
                AdjustColumnsTypesFromDynamic();
#endif
                RegisterScriptFiles();

                if (!HtmlAttributes.ContainsKey("id"))
                {
                    HtmlAttributes["id"] = Id;
                }

                var builder = htmlBuilderFactory.CreateBuilder(Scrolling.Enabled);

                var renderingData = CreateRenderingData();

                var functionalData = CreateFunctionalData();

                var container = builder.CreateGrid(HtmlAttributes, functionalData, renderingData);

                if (Editing.Mode == GridEditMode.PopUp && (CurrentItemMode == GridItemMode.Insert || CurrentItemMode == GridItemMode.Edit))
                {
                    AppendPopupEditor(container, renderingData);
                }

                container.WriteTo(writer);

#if MVC2 || MVC3
                if (ViewContext.FormContext != null)
                {
                    ValidationMetadata.Add("Fields", ProcessValidationMetadata());

                    ValidationMetadata.Add("FormId", ViewContext.FormContext.FormId);
                }
            }
            finally
            {
                ViewContext.FormContext = originalFormContext;
                ViewContext.ClientValidationEnabled = orignalClientValidationEnabled;
            }

#endif
            base.WriteHtml(writer);
        }

        private GridFunctionalData CreateFunctionalData()
        {
            return new GridFunctionalData
            {
                ShowTopPager = Paging.Enabled && (Paging.Position == GridPagerPosition.Top || Paging.Position == GridPagerPosition.Both),
                ShowBottomPager = Paging.Enabled && (Paging.Position == GridPagerPosition.Bottom || Paging.Position == GridPagerPosition.Both),
                ShowTopToolBar = ToolBar.Enabled && (ToolBar.Position == GridToolBarPosition.Top || ToolBar.Position == GridToolBarPosition.Both),
                ShowBottomToolBar = ToolBar.Enabled && (ToolBar.Position == GridToolBarPosition.Bottom || ToolBar.Position == GridToolBarPosition.Both),
                ShowGroupHeader = Grouping.Enabled && Grouping.Visible,
                PagerData = CreatePagerData(),
                GroupingData = CreateGroupingData(),
                ToolBarData = CreateToolbarData(),
                ShowFooter = Footer
            };
        }
        
        private GridToolBarData CreateToolbarData()
        {
            return new GridToolBarData
            {
                Commands = ToolBar.Commands.Cast<IGridActionCommand>(),
                UrlBuilder = UrlBuilder,
                Localization = Localization,
                Template = ToolBar.Template
            };
        }

        private GridGroupingData CreateGroupingData()
        {
            return new GridGroupingData
            {
                GetTitle = VisibleColumns.Cast<IGridColumn>().GroupTitleForMember,
                GroupDescriptors = DataProcessor.GroupDescriptors,
                Hint = Localization.GroupHint,
                UrlBuilder = UrlBuilder,
                SortedAscText = Localization.SortedAsc,
                SortedDescText = Localization.SortedDesc,
                UnGroupText = Localization.UnGroup
            };
        }

        private GridPagerData CreatePagerData()
        {
            return new GridPagerData
            {
                CurrentPage = DataProcessor.CurrentPage,
                PageCount = DataProcessor.PageCount,
                Style = Paging.Style,
                UrlBuilder = UrlBuilder,
                Total = DataProcessor.Total,
                PageOfText = Localization.PageOf,
                PageText = Localization.Page,
                Colspan = Colspan,
                DisplayingItemsText = Localization.DisplayingItems,
                PageSize = DataProcessor.PageSize,
                RefreshText = Localization.Refresh
            };
        }

        private void AppendPopupEditor(IHtmlNode container, GridRenderingData renderingData)
        {
            var popup = Editing.PopUp;
            var cancelUrl = renderingData.UrlBuilder.CancelUrl(null);

            new WindowBuilder(popup)
                .Content(renderingData.PopUpContainer.InnerHtml)
                .HtmlAttributes(new { style = "top:10%;left:50%;margin-left: -" + (popup.Width == 0 ? 360 : popup.Width) / 4 + "px" })                
                .Buttons(buttons => buttons
                    .Close(cancelUrl)
                );

            if (!IsClientBinding)
            {
                popup.ClientEvents.OnClose.InlineCodeBlock = obj => "function(e) { e.preventDefault();" + string.Format("window.location.href = \"{0}\";", cancelUrl) + "}";
            }
            
            if (!popup.Name.HasValue())
            {
                popup.Name = Name + "PopUp";
            }

            if (!popup.Title.HasValue())
            {
                popup.Title = CurrentItemMode == GridItemMode.Edit ? Localization.Edit : Localization.AddNew;
            }

            ScriptRegistrar.Current.Register(popup);

            new LiteralNode(popup.ToHtmlString()).AppendTo(container);
        }

        private GridRenderingData CreateRenderingData()
        {
            var renderingData = new GridRenderingData
            {
                TableHtmlAttributes = TableHtmlAttributes,
                DataKeyStore = DataKeyStore,
                HtmlHelper = new GridHtmlHelper<T>(ViewContext, DataKeyStore),
                UrlBuilder = UrlBuilder,
                DataSource = DataProcessor.ProcessedDataSource,
                Columns = VisibleColumns.Cast<IGridColumn>(),
                GroupMembers = DataProcessor.GroupDescriptors.Select(g => g.Member),
                Mode = CurrentItemMode,
                EditMode = Editing.Mode,
                HasDetailView = HasDetailView,
                Colspan = Colspan - Columns.Count(column => column.Hidden),
                DetailViewTemplate = MapDetailViewTemplate(HasDetailView ? DetailView.Template : null),
                NoRecordsTemplate = FormatNoRecordsTemplate(),
                Localization = Localization,
                ScrollingHeight = Scrolling.Height,
                EditFormHtmlAttributes = Editing.FormHtmlAttributes,
                ShowFooter = Footer && VisibleColumns.Any(c => c.FooterTemplate.HasValue() || c.ClientFooterTemplate.HasValue()),
                AggregateResults = DataProcessor.AggregatesResults,
                Aggregates = Aggregates.SelectMany(aggregate => aggregate.Aggregates),
                GroupsCount = DataProcessor.GroupDescriptors.Count,
                ShowGroupFooter = Aggregates.Any() && VisibleColumns.OfType<IGridBoundColumn>().Any(c => c.GroupFooterTemplate.HasValue()),
                PopUpContainer = new HtmlFragment(),
#if MVC2 || MVC3    
                CreateNewDataItem = () => Editing.DefaultDataItem(),
                InsertRowPosition = Editing.InsertRowPosition,
                EditTemplateName = Editing.TemplateName,
                AdditionalViewData = Editing.AdditionalViewData,
                FormId = ViewContext.FormContext.FormId,
#endif
                Callback = RowActionCallback
            };

            if (RowTemplate.HasValue())
            {
                renderingData.RowTemplate = (dataItem, container) => RowTemplate.Apply((T)dataItem, container);
            }

            return renderingData;
        }

        private void RowActionCallback(GridItem item)
        {
            IsEmpty = false;

            if (RowAction != null)
            {
                var row = new GridRow<T>(this, (T)item.DataItem, item.Index);
                if (HasDetailView)
                {
                    row.DetailRow = new GridDetailRow<T>
                    {
                        Html = item.DetailRowHtml
                    };
                }
#if MVC2 || MVC3
                row.InEditMode = item.Type == GridItemType.EditRow;
                row.InInsertMode = item.Type == GridItemType.InsertRow;
                row.Selected = (item.State & GridItemStates.Selected) == GridItemStates.Selected;
#endif
                RowAction(row);

                if (HasDetailView)
                {
                    item.Expanded = row.DetailRow.Expanded;
                    item.DetailRowHtml = row.DetailRow.Html;
                    item.DetailRowHtmlAttributes = row.DetailRow.HtmlAttributes;
                }

                if (row.Selected)
                {
                    item.State |= GridItemStates.Selected;
                }
#if MVC2 || MVC3
                if (row.InEditMode)
                {
                    item.Type = GridItemType.EditRow;
                }
                else if (row.InInsertMode)
                {
                    item.Type = GridItemType.InsertRow;
                }
                else
#endif
                {
                    item.Type = GridItemType.DataRow;
                }

                item.HtmlAttributes = row.HtmlAttributes;
            }
        }

        private Action<object, IHtmlNode> MapDetailViewTemplate(HtmlTemplate<T> detailViewTemplate)
        {
            return (dataItem, container) =>
            {
                if (detailViewTemplate != null && detailViewTemplate.HasValue())
                    detailViewTemplate.Apply((T)dataItem, container);
            };
        }

        private HtmlTemplate FormatNoRecordsTemplate()
        {
            if (!NoRecordsTemplate.HasValue())
                NoRecordsTemplate.Html = Localization.NoRecords;

            return NoRecordsTemplate;
        }

#if MVC2 || MVC3
        private IEnumerable<FieldValidationMetadata> ProcessValidationMetadata()
        {
            var validators = ViewContext.FormContext
                              .FieldValidators
                              .Values
                              .Where(IsBooleanField)
                              .ToArray();

            if (Name != null && Name.Contains("<#="))
            {
                validators = validators.Select((metadata) => EncodeRegularExpressionValidators(metadata)).ToArray();
            }
            
            return validators;
        }

        private static FieldValidationMetadata EncodeRegularExpressionValidators(FieldValidationMetadata metadata)
        {
            metadata.ValidationRules.Each(validationRule =>
            {
                if (validationRule.ValidationType == "regularExpression" || validationRule.ValidationType == "regex")
                {
                    if (validationRule.ValidationParameters.ContainsKey("pattern"))
                    {
                        validationRule.ValidationParameters["pattern"] =
                            new JavaScriptSerializer().Serialize(validationRule.ValidationParameters["pattern"]).Trim('"');
                    }
                }
            });
            return metadata;
        }

        private bool IsBooleanField(FieldValidationMetadata validationMetadata)
        {
            ModelMetadata modelMetadata = ModelMetadata.FromStringExpression(validationMetadata.FieldName, ViewContext.ViewData);

            return modelMetadata.ModelType != typeof(bool);
        }
#endif

#if MVC3
        private void AdjustColumnsTypesFromDynamic()
        {
            if (!typeof (T).IsDynamicObject() || DataProcessor.ProcessedDataSource == null ||
                !Columns.OfType<IGridBoundColumn>().Any(c => c.MemberType == null && c.Member.HasValue())
                ) 
                return;

            var processedDataSource = DataProcessor.ProcessedDataSource;
            var firstItem = GetFirstItemFromGroups(processedDataSource);
            if (firstItem != null)
            {
                Columns.OfType<IGridBoundColumn>().Where(
                    c => c.MemberType == null && c.Member.HasValue()).Each(
                        c => c.MemberType = BindingHelper.ExtractMemberTypeFromObject(firstItem, c.Member));
            }
        }

        private static object GetFirstItemFromGroups(IEnumerable dataSource)
        {
            var groupItem = dataSource.OfType<IGroup>().FirstOrDefault();
            if (groupItem != null)
            {
                return groupItem.Leaves().Cast<object>().FirstOrDefault();
            }
            return dataSource.OfType<object>().FirstOrDefault();
        }
#endif

#if MVC2 || MVC3

        internal bool OutputValidation
        {
            get
            {
                return (CurrentItemMode == GridItemMode.Insert || CurrentItemMode == GridItemMode.Edit || (Editing.Enabled && IsClientBinding))
#if MVC3
                       && !ViewContext.UnobtrusiveJavaScriptEnabled
#endif
                    ;
            }
        }

#endif

        private void RegisterEditingScriptFiles()
        {
            ScriptFileNames.Add(ScriptRegistrar.jQueryValidation);
            if (Editing.Mode == GridEditMode.PopUp)
            {
                ScriptFileNames.Add("telerik.draganddrop.js");
                ScriptFileNames.Add("telerik.window.js");
            }
            ScriptFileNames.Add("telerik.grid.editing.js");

            if (Editing.Mode != GridEditMode.InLine)
            {
                var properties = typeof(T).GetProperties();

                if (properties.Where(p => p.PropertyType.IsDateTime()).Any())
                {
                    ScriptFileNames.Insert(1, "telerik.calendar.js");
                    ScriptFileNames.Insert(2, "telerik.datepicker.js");
                }

                if (properties.Where(p => p.PropertyType.IsDateTime()).Any())
                {
                    ScriptFileNames.Insert(1, "telerik.calendar.js");
                    ScriptFileNames.Insert(2, "telerik.datepicker.js");
                }

                if (properties.Where(p => p.PropertyType.IsNumericType()).Any())
                {
                    ScriptFileNames.Insert(1, "telerik.textbox.js");
                }
            }
        }
        public void RegisterScriptFiles()
        {
            if (Filtering.Enabled)
            {
                ScriptFileNames.Add("telerik.grid.filtering.js");
            }

            if (Editing.Enabled)
            {
                RegisterEditingScriptFiles();
            }

            if (Grouping.Enabled)
            {
                ScriptFileNames.Add("telerik.draganddrop.js");
                ScriptFileNames.Add("telerik.grid.grouping.js");
            }

            if (Resizing.Enabled)
            {
                ScriptFileNames.Add("telerik.draganddrop.js");
                ScriptFileNames.Add("telerik.grid.resizing.js");
            }
            
            if (Reordering.Enabled)
            {
                ScriptFileNames.Add("telerik.draganddrop.js");
                ScriptFileNames.Add("telerik.grid.reordering.js");
            }

            var dateColumns = Columns.OfType<IGridBoundColumn>().Where(c => c.MemberType.IsDateTime());

            if (dateColumns.Any())
            {
                ScriptFileNames.Insert(1, "telerik.calendar.js");
                ScriptFileNames.Insert(2, "telerik.datepicker.js");
            }

            var numericColumns = Columns.OfType<IGridBoundColumn>().Where(c => c.MemberType.IsNumericType());

            if (numericColumns.Any())
            {
                ScriptFileNames.Insert(1, "telerik.textbox.js");
            }
        }

        public bool AutoGenerateColumns { get; set; }

        public bool IsEmpty
        {
            get;
            set;
        }

        public bool IsClientBinding
        {
            get
            {
                return Ajax.Enabled || WebService.Enabled;
            }
        }
        
        public override void VerifySettings()
        {
            base.VerifySettings();
            
            this.ThrowIfClassIsPresent("t-grid-rtl", TextResource.Rtl);

            if (Ajax.Enabled && WebService.Enabled)
            {
                throw new NotSupportedException(TextResource.CannotUseAjaxAndWebServiceAtTheSameTime);
            }

            if (IsClientBinding)
            {
                if (Columns.OfType<IGridTemplateColumn<T>>().Where(c => c.Template != null && string.IsNullOrEmpty(c.ClientTemplate)).Any())
                {
                    throw new NotSupportedException(TextResource.CannotUseTemplatesInAjaxOrWebService);
                }

                if (DetailView != null && DetailView.Template.HasValue() && !DetailView.ClientTemplate.HasValue())
                {
                    throw new NotSupportedException(TextResource.CannotUseTemplatesInAjaxOrWebService);
                }
            }

            if (Paging.PageOnScroll)
            {
                if (!Paging.Enabled)
                {
                    throw new NotSupportedException(TextResource.PagingMustBeEnabledToUsePageOnScroll);
                }

                if (!Scrolling.Enabled)
                {
                    throw new NotSupportedException(TextResource.ScrollingMustBeEnabledToUsePageOnScroll);
                }

                if (!IsClientBinding)
                {
                    throw new NotSupportedException(TextResource.CannotUsePageOnScrollWithServerBinding);
                }
            }           

            if (WebService.Enabled && string.IsNullOrEmpty(WebService.Select.Url))
            {
                throw new ArgumentException(TextResource.WebServiceUrlRequired);
            }

            if (!DataKeys.Any() && (Editing.Enabled || (Selection.Enabled && !IsClientBinding)))
            {
                throw new NotSupportedException(TextResource.DataKeysEmpty);
            }          

            if (Editing.Enabled)
            {
                if (HasCommandOfType<GridEditActionCommand>())
                {
                    if (!CurrrentBinding.Update.HasValue())
                    {
                        throw new NotSupportedException(TextResource.EditCommandRequiresUpdate);
                    }
                }

                if (HasCommandOfType<GridDeleteActionCommand>())
                {
                    if (!CurrrentBinding.Delete.HasValue() && Editing.Mode != GridEditMode.InCell)
                    {
                        throw new NotSupportedException(TextResource.DeleteCommandRequiresDelete);
                    }
                }

                if (HasCommandOfType<GridToolBarInsertCommand<T>>())
                {
                    if (!CurrrentBinding.Insert.HasValue() && Editing.Mode != GridEditMode.InCell)
                    {
                        throw new NotSupportedException(TextResource.InsertCommandRequiresInsert);
                    }
                }

                if (HasCommandOfType<GridToolBarSubmitChangesCommand<T>>())
                {
                    if (Editing.Mode != GridEditMode.InCell)
                    {
                        throw new NotSupportedException(TextResource.BatchUpdatesRequireInCellMode);
                    }

                    if (!CurrrentBinding.Update.HasValue())
                    {
                        throw new NotSupportedException(TextResource.BatchUpdatesRequireUpdate);
                    }
                }                

#if MVC2 || MVC3
                if (Editing.Mode == GridEditMode.InCell) 
                {
                    if (!Ajax.Enabled && !WebService.Enabled)
                    {
                        throw new NotSupportedException(TextResource.InCellModeNotSupportedInServerBinding);
                    }

                    if (ClientRowTemplate.HasValue() || RowTemplate.HasValue())
                    {
                        throw new NotSupportedException(TextResource.InCellModeNotSupportedWithRowTemplate);
                    }
                }

                if(typeof(T) == typeof(System.Data.DataRowView) && Editing.Mode == GridEditMode.InLine 
                    && Columns.OfType<IGridBoundColumn>().Where(c => c.EditorTemplateName.HasValue()).Any())
                {
                    throw new NotSupportedException(TextResource.DataTableInLineEditingWithCustomEditorTemplates);
                }
#endif
            }
        }

        private bool HasCommandOfType<TCommand>()
        {
            return Columns.OfType<GridActionColumn<T>>().SelectMany(c => c.Commands).OfType<TCommand>().Any() ||
                ToolBar.Commands.OfType<TCommand>().Any();
        }

        private GridBindingSettings CurrrentBinding
        {
            get
            {
                if (Ajax.Enabled)
                {
                    return Ajax;
                }

                if (WebService.Enabled)
                {
                    return WebService;
                }

                return Server;
            }
        }

#if MVC2 || MVC3
        private void InitializeEditors()
        {            
            var skip = ViewContext.HttpContext.Items["$SelfInitialize$"] != null && (bool)ViewContext.HttpContext.Items["$SelfInitialize$"] == true;

            ViewContext.HttpContext.Items["$SelfInitialize$"] = true;            
            
            var dataItem = Editing.DefaultDataItem();

            var htmlHelper = new GridHtmlHelper<T>(ViewContext, DataKeyStore);

            if (Editing.Mode != GridEditMode.InLine && Editing.Mode != GridEditMode.InCell)
            {
                var container = new HtmlElement("div").AddClass(UIPrimitives.Grid.InFormContainer);

                htmlHelper.EditorForModel(dataItem, Editing.TemplateName, Columns.OfType<IGridForeignKeyColumn>().Select(c => c.SerializeSelectList), Editing.AdditionalViewData).AppendTo(container);

                EditorHtml = container.InnerHtml;
            }
            else
            {
                var cellBuilderFactory = new GridCellBuilderFactory();

                
                VisibleColumns.Each(column =>
                {
                    var cellBuilder = cellBuilderFactory.CreateEditCellBuilder(column, htmlHelper);
                    
                    var editor = cellBuilder.CreateCell(dataItem);

                    column.EditorHtml = editor.InnerHtml;
                });
            }

            if (!skip)
            {
                ViewContext.HttpContext.Items.Remove("$SelfInitialize$");
            }
        }
#endif
        public string EditorHtml { get; set; }

        public bool HasDetailView
        {
            get
            {
                return DetailView != null;
            }
        }

        private IGridDataKeyStore DataKeyStore
        {
            get
            {
                if (dataKeyStore == null)
                {
                    var dataKeys = DataKeys.Cast<IGridDataKey>();
                    var currentKeyValues = DataKeys.Select(key => key.GetCurrentValue(ViewContext.Controller.ValueProvider)).ToArray();

                    dataKeyStore = new GridDataKeyStore(dataKeys, currentKeyValues);
                }
                return dataKeyStore;
            }
        }

        public IGridUrlBuilder UrlBuilder
        {
            get
            {
                if (urlBuilder == null)
                {
                    urlBuilder = new GridUrlBuilder(this, DataKeyStore);
                }

                return urlBuilder;   
            }
        }

        IGridEditingSettings IGrid.Editing
        {
            get
            {
                return this.Editing;
            }
        }
    }
}
