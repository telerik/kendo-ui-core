namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IHtmlAttributesContainer
    {
        /// <summary>
        /// The HtmlAttributes applied to objects which can have child items
        /// </summary>
        IDictionary<string, object> HtmlAttributes
        {
            get;
        }
    }
}