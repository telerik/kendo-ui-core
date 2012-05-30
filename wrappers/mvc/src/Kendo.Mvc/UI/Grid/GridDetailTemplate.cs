namespace Kendo.Mvc.UI
{
    using System.Web;

    public class GridDetailTemplate<TModel> : IGridDetailTemplate<TModel>
        where TModel : class
    {
        public GridDetailTemplate()
        {
            Template = new HtmlTemplate<TModel>();
        }

        private string clientTemplate;

        public string ClientTemplate
        {
            get
            {
                return clientTemplate;
            }
            set
            {
                clientTemplate = HttpUtility.HtmlDecode(value);
            }
        }

        public HtmlTemplate<TModel> Template
        {
            get;
            private set;
        }
    }
}
