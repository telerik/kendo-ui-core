namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class TreeList<T> : WidgetBase where T : class
    {
        public IUrlGenerator urlGenerator;

        public TreeList(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;

            DataSource = new DataSource();
            DataSource.Type = DataSourceType.Ajax;
            DataSource.Schema.Model = new TreeListModelDescriptor(typeof(T));

//>> Initialization
        
            Columns = new List<TreeListColumn>();
                
            Editable = new TreeListEditableSettings();
                
            Filterable = new TreeListFilterableSettings();
                
            Sortable = new TreeListSortableSettings();
                
            Toolbar = new List<TreeListToolba>();
                
        //<< Initialization
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

//>> Fields
        
        public List<TreeListColumn> Columns
        {
            get;
            set;
        }
        
        public bool? AutoBind { get; set; }
        
        public bool? Scrollable { get; set; }
        
        public bool? Selectable { get; set; }
        
        public TreeListSortableSettings Sortable
        {
            get;
            set;
        }
        
        public List<TreeListToolba> Toolbar
        {
            get;
            set;
        }
        
        public double? Height { get; set; }
        
        public TreeListFilterableSettings Filterable
        {
            get;
            set;
        }
        
        public TreeListEditableSettings Editable
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            json["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

//>> Serialization
        
            var columns = Columns.ToJson();
            if (columns.Any())
            {
                json["columns"] = columns;
            }
                
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (Scrollable.HasValue)
            {
                json["scrollable"] = Scrollable;
            }
                
            if (Selectable.HasValue)
            {
                json["selectable"] = Selectable;
            }
                
            var sortable = Sortable.ToJson();
            if (sortable.Any())
            {
                json["sortable"] = sortable;
            }
                
            var toolbar = Toolbar.ToJson();
            if (toolbar.Any())
            {
                json["toolbar"] = toolbar;
            }
                
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            var filterable = Filterable.ToJson();
            if (filterable.Any())
            {
                json["filterable"] = filterable;
            }
                
            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "TreeList", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new TreeListHtmlBuilder<T>(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

