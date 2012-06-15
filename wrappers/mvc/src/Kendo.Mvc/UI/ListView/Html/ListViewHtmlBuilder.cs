namespace Kendo.Mvc.UI
{    
    /// <summary>
    /// An HTML Builder for the ListView component
    /// </summary>
    public class ListViewHtmlBuilder<T> where T : class
    {
        private readonly ListView<T> listView;

        /// <summary>
        /// Initializes a new instance of the <see cref="ListViewHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The ListView component.</param>
        public ListViewHtmlBuilder(ListView<T> listView)
        {
            this.listView = listView;
        }

        /// <summary>
        /// Builds the ListView component markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {            
            var html = new HtmlElement("div");
                            
            html.Children.Add(new HtmlElement(listView.TagName).Attribute("id", listView.Id));

            if (listView.Paging.Enabled)
            {
                html.Children.Add(new HtmlElement("div").Attribute("id", listView.Id + "_pager"));
            }

            return html;            
        }
    }
}
