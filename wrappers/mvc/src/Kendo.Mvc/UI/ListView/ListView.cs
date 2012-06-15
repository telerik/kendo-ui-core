namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.UI;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using System.IO;    

    public class ListView<T> : ViewComponentBase, IListView where T : class
    {
        private readonly ListViewSettingsSerializer<T> settingsSerializer;

        public ListView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            Paging = new ListViewPagingSettings();

            Selection = new ListViewSelectionSettings();

            Editing = new ListViewEditingSettings<T>();

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
        
        public ListViewPagingSettings Paging
        {
            get;
            private set;
        }

        public bool Navigatable
        {
            get;
            set;
        }

        public ListViewSelectionSettings Selection
        {
            get;
            private set;
        }

        public string EditorHtml
        {
            get;
            set;
        }

        public ListViewEditingSettings<T> Editing
        {
            get;
            private set;
        }

        IListViewEditingSettings IListView.Editing
        {
            get 
            {
                return Editing;
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
                throw new NotSupportedException("ClientTemplateId cannot be blank.");
            }

            if (string.IsNullOrEmpty(TagName))
            {
                throw new NotSupportedException("Tag name cannot be null or an empty string.");
            }

            if (Editing.Enabled && DataSource.Schema.Model.Id == null)
            {
                throw new NotSupportedException("Model Id cannot be blank when editing is enabled.");
            }
        }

        private void ProcessDataSource()
        {
            if (Paging.Enabled && DataSource.PageSize == 0)
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
            if (Editing.Enabled)
            {
                var helper = new HtmlHelper<T>(ViewContext, new ListViewViewDataContainer<T>(Editing.DefaultDataItem(), ViewData));

                EditorHtml = helper.EditorForModel().ToHtmlString();
            }
        }
    }
}
