namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Infrastructure;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI.Html;
    using System.Web;
    using System.Web.Util;

    /// <summary>
    /// The base class for all columns in Kendo Grid for ASP.NET MVC.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public abstract class GridColumnBase<T> : JsonObject, IGridColumn where T : class
    {
        public string Format
        {
            get
            {
                return Settings.Format;
            }
            set
            {
                Settings.Format = value;
            }
        }
        
        public string EditorHtml
        {
            get;
            set;
        }

        protected GridColumnBase(Grid<T> grid)
        {
            Grid = grid;
            Settings = new GridColumnSettings();            
            Visible = true;
            HeaderTemplate = new HtmlTemplate();
            FooterTemplate = new HtmlTemplate<GridAggregateResult>();            
        }

        /// <summary>
        /// Gets or sets the grid.
        /// </summary>
        /// <value>The grid.</value>
        public Grid<T> Grid
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets the member of the column.
        /// </summary>
        /// <value>The member.</value>
        public string Member
        {
            get
            {
                return Settings.Member;
            }
            
            set
            {
                Settings.Member = value;
            }
        }

        /// <summary>
        /// Gets the template of the column.
        /// </summary>
        public virtual Action<T> Template
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Title.HasValue())
            {
                json["title"] = Title;
            }

            if (HtmlAttributes.Any())
            {
                var attributes = new Dictionary<string, object>();

                var hasAntiXss = HttpEncoder.Current != null && HttpEncoder.Current.GetType().ToString().Contains("AntiXssEncoder");

                HtmlAttributes.Each(attr => {
                    var value = HttpUtility.HtmlAttributeEncode(attr.Value.ToString());
                    if (hasAntiXss)
                    {
                        value = value.Replace("&#32;", " ");
                    }
                    attributes[HttpUtility.HtmlAttributeEncode(attr.Key)] = value;
                });

                json["attributes"] = attributes;
            }

            if (FooterHtmlAttributes.Any())
            {
                var attributes = new Dictionary<string, object>();

                FooterHtmlAttributes.Each(attr =>
                {
                    attributes[HttpUtility.HtmlAttributeEncode(attr.Key)] = HttpUtility.HtmlAttributeEncode(attr.Value.ToString());
                });

                json["footerAttributes"] = attributes;
            }

            if (Hidden)
            {
                json["hidden"] = true;
            }

            if (!IncludeInMenu)
            {
                json["menu"] = false;
            }

            if (Width.HasValue())
            {
                json["width"] = Width;
            }

            if (ClientTemplate.HasValue())                  
            {
                json["template"] = HttpUtility.UrlDecode(ClientTemplate);
            }
            
            if (ClientFooterTemplate.HasValue())
            {
                json["footerTemplate"] = HttpUtility.UrlDecode(ClientFooterTemplate);
            }

            if (ClientGroupFooterTemplate.HasValue())
            {
                json["groupFooterTemplate"] = ClientGroupFooterTemplate;
            }

            if (!Encoded)
            {
                json["encoded"] = Encoded;
            }

            if (Locked)
            {
                json["locked"] = Locked;
            }

            if (!Lockable)
            {
                json["lockable"] = Lockable;
            }
        }       
        
        /// <summary>
        /// Gets the header template of the column.
        /// </summary>
        public HtmlTemplate HeaderTemplate
        {
            get;
            set;
        }        

        /// <summary>
        /// Gets the footer template of the column.
        /// </summary>
        public HtmlTemplate<GridAggregateResult> FooterTemplate
        {
            get; 
            set;
        }

        public virtual Func<T, object> InlineTemplate
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the title of the column.
        /// </summary>
        /// <value>The title.</value>
        public virtual string Title
        {
            get
            {
                return Settings.Title;
            }
            set
            {
                Settings.Title = value;
            }
        }

        /// <summary>
        /// Gets or sets the width of the column.
        /// </summary>
        /// <value>The width.</value>
        public string Width
        {
            get
            {
                return Settings.Width;
            }
            set
            {
                Settings.Width = value;
            }
        }

        public string ClientTemplate
        {
            get
            {
                return Settings.ClientTemplate;
            }
            set
            {
                Settings.ClientTemplate = value;
            }
        }

        public string ClientFooterTemplate
        {
            get
            {
                return Settings.ClientFooterTemplate;
            }
            set
            {
                Settings.ClientFooterTemplate = value;
            }
        }

        public string ClientGroupFooterTemplate
        {
            get
            {
                return Settings.ClientGroupFooterTemplate;
            }
            set
            {
                Settings.ClientGroupFooterTemplate = value;
            }
        }
        
        /// <summary>
        /// Gets or sets a value indicating whether this column is hidden.
        /// </summary>
        /// <value><c>true</c> if hidden; otherwise, <c>false</c>.</value>
        /// <remarks>
        /// Hidden columns are output as HTML but are not visible by the end-user.
        /// </remarks>
        public virtual bool Hidden
        {
            get
            {
                return Settings.Hidden || Grid.Columns.ColumnParents(this).Any(c => c.Hidden);
            }
            set
            {                
                Settings.Hidden = value;
            }
        }        
  
        public virtual bool IncludeInMenu
        {
            get
            {
                return Settings.IncludeInMenu;
            }
            set
            {
                Settings.IncludeInMenu = value;
            }
        }
   
        public virtual bool Locked
        {
            get
            {
                return Settings.Locked;
            }
            
            set
            {
                Settings.Locked = value;
            }
        }

        public virtual bool Lockable
        {
            get
            {
                return Settings.Lockable;
            }

            set
            {
                Settings.Lockable = value;
            }
        }

        public virtual bool Encoded
        {
            get
            {
                return Settings.Encoded;
            }
            
            set
            {
                Settings.Encoded = value;
            }
        }

        /// <summary>
        /// Gets the header HTML attributes.
        /// </summary>
        /// <value>The header HTML attributes.</value>
        public IDictionary<string, object> HeaderHtmlAttributes
        {
            get
            {
                return Settings.HeaderHtmlAttributes;
            }
        }        
        /// <summary>
        /// Gets the footer HTML attributes.
        /// </summary>
        /// <value>The footer HTML attributes.</value>
        public IDictionary<string, object> FooterHtmlAttributes
        {
            get
            {
                return Settings.FooterHtmlAttributes;
            }
        }
        
        /// <summary>
        /// Gets or sets a value indicating whether this column is visible.
        /// </summary>
        /// <value><c>true</c> if visible; otherwise, <c>false</c>. The default value is <c>true</c>.</value>
        /// <remarks>
        /// Invisible columns are not output in the HTML.
        /// </remarks>
        public virtual bool Visible
        {
            get
            {
                return Settings.Visible;
            }
            set
            {
                Settings.Visible = value;
            }
        }        
        
        /// <summary>
        /// Gets the HTML attributes of the cell rendered for the column
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> HtmlAttributes
        {
            get
            {
                return Settings.HtmlAttributes;
            }
        }
        
        IGrid IGridColumn.Grid
        {
            get
            {
                return Grid;
            }
        }

        public bool IsLast
        {
            get
            {                
                return Grid.VisibleColumns.Where(c => !c.Hidden).LastOrDefault() == this;
            }
        }

        internal GridColumnSettings Settings
        {
            get;
            set;
        }

        private int HeaderLevel
        {
            get
            {
                return Grid.Columns.ColumnLevel(this);
            }
        }

        private int HeaderDataIndex
        {
            get
            {
                return Grid.Columns.LeafColumns().Where(c => c.Visible).OrderByDescending(c => c.Locked).IndexOf(this);
            }
        }

        protected void Decorate(IGridDecoratableCellBuilder cellBuilder)
        {            
            if (Hidden)
            {
                cellBuilder.Decorators.Add(new GridHiddenCellBuilderDecorator());
            }

            if (cellBuilder is GridHeaderCellBuilder && !(this is IGridColumnGroup))
            {
                cellBuilder.Decorators.Add(new GridHeaderCellBuilderDecorator((Grid.Columns.HeaderRowsCount() - HeaderLevel) + 1, HeaderDataIndex));
            }
        }

        private Action<object> CreateCallback(IGridDataCellBuilder builder, bool insert, bool edit)
        {
            return (dataItem) =>
            {
                if (Grid.CellAction != null)
                {
                    var cell = new GridCell<T>(this, (T)dataItem);
                    cell.InEditMode = edit;
                    cell.InInsertMode = insert;
                    if (Template != null)
                    {
                        cell.Template.CodeBlockTemplate = Template;
                    }

                    if (InlineTemplate != null)
                    {
                        cell.Template.InlineTemplate = InlineTemplate;
                    }

                    Grid.CellAction(cell);

                    var formatableBuilder = builder as IGridFormatableCellBuilder;
                    if (formatableBuilder != null)
                    {
                        formatableBuilder.Format = Format;
                        formatableBuilder.Encoded = Encoded;
                    }
                    
                    builder.HtmlAttributes.Merge(cell.HtmlAttributes);
                    
                    builder.Html = cell.Text;
                }
            };
        }

        public virtual IGridDataCellBuilder CreateDisplayBuilder(IGridHtmlHelper htmlHelper)
        {
            var builder = CreateDisplayBuilderCore(htmlHelper);
            
            Decorate(builder);

            builder.Callback = CreateCallback(builder, false, false);
            
            return builder;
        }

        protected virtual IGridDataCellBuilder CreateDisplayBuilderCore(IGridHtmlHelper htmlHelper)
        {
            var template = new HtmlTemplate<T>();

            if (Template != null)
            {
                template.CodeBlockTemplate = Template;
            }

            if (InlineTemplate != null)
            {
                template.InlineTemplate = InlineTemplate;
            }

            var builder = new GridTemplateCellBuilder<T>(template);            
            builder.HtmlAttributes.Merge(HtmlAttributes);
            return builder;
        }

        public IGridDataCellBuilder CreateEditBuilder(IGridHtmlHelper htmlHelper)
        {
            var builder = CreateEditBuilderCore(htmlHelper);

            Decorate(builder);

            builder.Callback = CreateCallback(builder, false, true);

            return builder;
        }

        protected abstract IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper);
        
        protected abstract IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper);

        public IGridDataCellBuilder CreateInsertBuilder(IGridHtmlHelper htmlHelper)
        {
            var builder = CreateInsertBuilderCore(htmlHelper);

            Decorate(builder);

            builder.Callback = CreateCallback(builder, true, false);

            return builder;
        }
        
        public IGridCellBuilder CreateHeaderBuilder()
        {
            var builder = CreateHeaderBuilderCore();
            
            Decorate(builder);

            return builder;
        }

        protected virtual IGridCellBuilder CreateHeaderBuilderCore()
        {
            return new GridHeaderCellBuilder(HeaderHtmlAttributes, AppendHeaderContent, HeaderTemplate.HasValue());
        }

        public IGridCellBuilder CreateFooterBuilder(IEnumerable<AggregateResult> aggregateResults)
        {
            var builder = CreateFooterBuilderCore(aggregateResults);
            
            Decorate(builder);

            return builder;
        }
        
        public IGridCellBuilder CreateGroupFooterBuilder(IEnumerable<AggregateResult> aggregateResults)
        {
            var builder = CreateGroupFooterBuilderCore(aggregateResults);

            Decorate(builder);

            return builder;
        }

        protected virtual IGridCellBuilder CreateFooterBuilderCore(IEnumerable<AggregateResult> aggregateResults)
        {            
            return new GridFooterCellBuilder(FooterHtmlAttributes, FooterTemplate);
        }
        
        protected virtual IGridCellBuilder CreateGroupFooterBuilderCore(IEnumerable<AggregateResult> aggregateResults)
        {            
            return new GridFooterCellBuilder(FooterHtmlAttributes, FooterTemplate);
        }

        protected void AppendHeaderContent(IHtmlNode container)
        {   
            if (HeaderTemplate != null && HeaderTemplate.HasValue())
            {
                HeaderTemplate.Apply(container);
            }
            else
            {
                container.Html(Title.HasValue() ? Title : "&nbsp;");
            }
        }
    }
}
