namespace Kendo.Mvc.UI
{
    using System;
    using System.Web.UI;
    using System.Web.Mvc;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;    

    public class ListView<T> : ViewComponentBase, IListView where T : class
    {        
        public ListView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            Paging = new ListViewPagingSettings();

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
            internal set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);
            var idPrefix = "#";

            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }            

            ProcessDataSource();

            if (!String.IsNullOrEmpty(ClientTemplateId))
            {
                options["template"] = new ClientEvent { HandlerName = String.Format("kendo.template($('{0}{1}').html())", idPrefix, ClientTemplateId) };
            }

            if (Paging.Enabled)
            {
                var paging = Paging.ToJson();
                paging.Add("pagerId", Id + "_pager");
                options["pageable"] = paging;
            }

            options["dataSource"] = DataSource.ToJson();

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
        }

        private void ProcessDataSource()
        {
            if (Paging.Enabled && DataSource.PageSize == 0)
            {
                DataSource.PageSize = 10;
            }

            var binder = new DataSourceRequestModelBinder();

            //if (this.PrefixUrlParameters)
            //{
            //    binder.Prefix = Name;

            //    if (DataSource.Type == DataSourceType.Server)
            //    {
            //        DataSource.Transport.Prefix = Name + "-";
            //    }
            //}

            var controller = ViewContext.Controller;
            var bindingContext = new ModelBindingContext() { ValueProvider = controller.ValueProvider };

            var request = (DataSourceRequest)binder.BindModel(controller.ControllerContext, bindingContext);

            DataSource.Process(request, true/*!EnableCustomBinding*/);

            //if (DataSource.Schema.Model.Id != null)
            //{
            //    DataKeys.Add(DataSource.Schema.Model.Id);
            //}
        }
    }
}
