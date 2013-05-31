namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class MobileListView<T> : WidgetBase where T : class
    {        
        public MobileListView(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;
        
            Filterable = new MobileListViewFilterableSettings();

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
        
        public bool AppendOnRefresh { get; set; }
        
        public bool? AutoBind { get; set; }               
        
        public bool EndlessScroll { get; set; }
        
        public string EndlessScrollParameters { get; set; }
        
        public bool FixedHeaders { get; set; }
        
        public string HeaderTemplate { get; set; }
        
        public bool LoadMore { get; set; }
        
        public string LoadMoreText { get; set; }
        
        public string LoadMoreParameters { get; set; }
        
        public string PullTemplate { get; set; }
        
        public bool PullToRefresh { get; set; }
        
        public string PullParameters { get; set; }
        
        public string RefreshTemplate { get; set; }
        
        public string ReleaseTemplate { get; set; }
        
        public string ScrollTreshold { get; set; }
        
        public string Style { get; set; }
        
        public string Template { get; set; }
        
        public string Type { get; set; }
        
        public MobileListViewFilterableSettings Filterable
        {
            get;
            private set;
        }                

        public override void WriteInitializationScript(TextWriter writer)
        {
            //no initializtion scripts for mobile widgets
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            ProcessDataSource();

            var html = new MobileListViewHtmlBuilder<T>(this).Build();

            html.WriteTo(writer);
            

            base.WriteHtml(writer);
        }

        private void ProcessDataSource()
        {
            var binder = new DataSourceRequestModelBinder();

            var controller = ViewContext.Controller;
            var bindingContext = new ModelBindingContext() { ValueProvider = controller.ValueProvider };

            var request = (DataSourceRequest)binder.BindModel(controller.ControllerContext, bindingContext);

            DataSource.Process(request, true/*!EnableCustomBinding*/);
        }
    }
}

