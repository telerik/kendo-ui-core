namespace Kendo.Mvc.UI
{
    using System;
    using System.IO;    
    using System.Web.UI;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;
    using System.Text.RegularExpressions;    

    public class ListView<T> : WidgetBase, IListView where T : class
    {
        private readonly ListViewSettingsSerializer<T> settingsSerializer;

        public ListView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            Pageable = new PageableSettings();

            Selectable = new ListViewSelectionSettings();

            Editable = new ListViewEditingSettings<T>();

            settingsSerializer = new ListViewSettingsSerializer<T>(this);

            DataSource = new DataSource()
            {
                Type = DataSourceType.Ajax,
                ServerAggregates = true,
                ServerFiltering = true,
                ServerGrouping = true,
                ServerPaging = true,
                ServerSorting = true
            };

            DataSource.ModelType(typeof(T));            
        }

        public bool? AutoBind 
        { 
            get; 
            set; 
        }

        public string TagName
        {
            get;
            set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public string ClientTemplateId
        {
            get;
            set;
        }
        
        public PageableSettings Pageable
        {
            get;
            private set;
        }

        public bool Navigatable
        {
            get;
            set;
        }

        public ListViewSelectionSettings Selectable
        {
            get;
            private set;
        }

        public string EditorHtml
        {
            get;
            set;
        }

        public ListViewEditingSettings<T> Editable
        {
            get;
            private set;
        }

        IListViewEditingSettings IListView.Editable
        {
            get 
            {
                return Editable;
            }
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            var orignalClientValidationEnabled = ViewContext.ClientValidationEnabled;
            var originalFormContext = ViewContext.FormContext;

            ViewContext.ClientValidationEnabled = true;
            ViewContext.FormContext = new FormContext
            {
                FormId = Name + "form"
            };
                   
            ProcessDataSource();

            InitializeEditor();

            settingsSerializer.Serialize(options);

            ViewContext.FormContext = originalFormContext;
            ViewContext.ClientValidationEnabled = orignalClientValidationEnabled;
            
            writer.Write(Initializer.Initialize(Selector, "ListView", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {                        
            var html = new ListViewHtmlBuilder<T>(this).Build();
            writer.Write(html.InnerHtml);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();
            
            if (string.IsNullOrEmpty(ClientTemplateId))
            {               
                throw new NotSupportedException(string.Format(Exceptions.CannotBeNullOrEmpty, "ClientTemplateId"));
            }

            if (string.IsNullOrEmpty(TagName))
            {                
                throw new NotSupportedException(string.Format(Exceptions.CannotBeNullOrEmpty, "TagName"));
            }

            if (Editable.Enabled && DataSource.Schema.Model.Id == null)
            {
                throw new NotSupportedException(Exceptions.DataKeysEmpty);
            }

            if (AutoBind.HasValue)
            {
                if (DataSource.Type != DataSourceType.Ajax || (DataSource.Type == DataSourceType.Ajax && DataSource.Data != null))
                {
                    throw new NotSupportedException(Exceptions.CannotSetAutoBindIfBoundDuringInitialization);
                }
            }
        }

        private void ProcessDataSource()
        {
            if (Pageable.Enabled && DataSource.PageSize == 0)
            {
                DataSource.PageSize = 10;
            }

            var binder = new DataSourceRequestModelBinder();            

            var controller = ViewContext.Controller;
            var bindingContext = new ModelBindingContext() { ValueProvider = controller.ValueProvider };

            var request = (DataSourceRequest)binder.BindModel(controller.ControllerContext, bindingContext);

            DataSource.Process(request, true/*!EnableCustomBinding*/);
        }

        private void InitializeEditor()
        {
            if (Editable.Enabled)
            {
                var popupSlashes = new Regex("(?<=data-val-regex-pattern=\")([^\"]*)", RegexOptions.Multiline);
                var helper = new HtmlHelper<T>(ViewContext, new ListViewViewDataContainer<T>(Editable.DefaultDataItem(), ViewData));

                if (Editable.TemplateName.HasValue())
                {
                    EditorHtml = helper.EditorForModel(Editable.TemplateName).ToHtmlString();
                }
                else
                {
                    EditorHtml = helper.EditorForModel().ToHtmlString();
                }

                EditorHtml = popupSlashes.Replace(EditorHtml, match =>
                {
                    return match.Groups[0].Value.Replace("\\", IsInClientTemplate ? "\\\\\\\\" : "\\\\");
                });
            }
        }
    }
}
