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
    using Kendo.Mvc.UI.Html;
    using System.Text.RegularExpressions;
    using System.Web.Mvc.Html;

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
                
            Editable = new TreeListEditableSettings<T>();
                
            Filterable = new TreeListFilterableSettings();
                
            Sortable = new TreeListSortableSettings();
                
            Toolbar = new List<TreeListToolbar>();
                
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
        
        public List<TreeListToolbar> Toolbar
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
        
        public TreeListEditableSettings<T> Editable
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            json["dataSource"] = (Dictionary<string, object>)DataSource.ToJson();

            Editable.InitializeEditor(ViewContext, ViewData);

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
            } else if (Sortable.Enabled != false) {
                json["sortable"] = Sortable.Enabled;
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
            } else if (Filterable.Enabled != false) {
                json["filterable"] = Filterable.Enabled;
            }

            var editable = Editable.ToJson();
            if (editable.Any())
            {
                json["editable"] = editable;
            } else if (Editable.Enabled != false) {
                json["editable"] = Editable.Enabled;
            }

        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "TreeList", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (Editable.Enabled)
            {
                InitializeEditors();
            }

            var html = new TreeListHtmlBuilder<T>(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }

        private HtmlHelper<T> CreateHtmlHelper(object model)
        {
            return new HtmlHelper<T>(ViewContext, new GridViewDataContainer<T>((T)model, ViewContext.ViewData));
        }

        private void InitializeEditors()
        {
            var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);

            var dataItem = Editable.DefaultDataItem();

            var htmlHelper = CreateHtmlHelper(dataItem);

            if (Editable.Enabled && Editable.Mode != "popup")
            {
                Columns.Each(column =>
                {
                    if (!column.Field.HasValue())
                    {
                        return;
                    }

                    string editorHtml;

                    //if (column.TemplateName.HasValue())
                    //{
                    //    editorHtml = htmlHelper.EditorFor(expression, column.TemplateName).ToHtmlString();
                    //}
                    //else
                    //{
                        editorHtml = htmlHelper.Editor(column.Field).ToHtmlString();
                    //}

                    if (IsInClientTemplate)
                    {
                        editorHtml = popupSlashes.Replace(editorHtml, match =>
                        {
                            return match.Groups[0].Value.Replace("\\", "\\\\");
                        });
                    }

                    column.Editor = editorHtml;
                });
            }
        }
    }
}

