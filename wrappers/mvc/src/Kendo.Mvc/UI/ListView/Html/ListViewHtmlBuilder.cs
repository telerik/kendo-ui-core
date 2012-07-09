namespace Kendo.Mvc.UI
{    
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

            var tagName = listView.TagName;
            if (string.IsNullOrEmpty(tagName))
            {
                tagName = "div";
            }

            html.Children.Add(new HtmlElement(tagName).Attribute("id", listView.Id));

            if (listView.Pageable.Enabled)
            {
                var pagerWrapper = new HtmlElement("div").Attribute("id", listView.Id + "_pager").AddClass("k-pager-wrap");
                html.Children.Add(pagerWrapper);
            }

            return html;            
        }
    }
}
