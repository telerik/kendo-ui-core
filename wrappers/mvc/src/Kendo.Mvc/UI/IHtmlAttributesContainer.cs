namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines whether one navigation item can have content output immediately
    /// </summary>
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