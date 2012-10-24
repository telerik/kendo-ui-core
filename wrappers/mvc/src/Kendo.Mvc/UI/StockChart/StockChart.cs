namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    public class StockChart<T> : Chart<T> where T : class
    {
        public StockChart(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer, urlGenerator)
        {
            Navigator = new ChartNavigator<T>();
        }

        /// <summary>
        /// Gets or sets the stock chart navigator settings.
        /// </summary>
        /// <value>
        /// The Stock Chart navigator settings.
        /// </value>
        public ChartNavigator<T> Navigator
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the date field.
        /// </summary>
        /// <value>
        /// The date field.
        /// </value>
        public string DateField
        {
            get;
            set;
        }

        protected override string WidgetName {
            get
            {
                return "StockChart";
            }
        }

        protected override void Serialize(IDictionary<string, object> options)
        {
            base.Serialize(options);

            SerializeData("navigator", Navigator.CreateSerializer().Serialize(), options);
            options.Add("dateField", DateField);
        }
    }
}