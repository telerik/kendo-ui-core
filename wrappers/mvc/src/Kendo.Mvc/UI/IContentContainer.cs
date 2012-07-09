namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    public interface IContentContainer
    {
        /// <summary>
        /// The HtmlAttributes which will be added to the wrapper of the content.
        /// </summary>
        IDictionary<string, object> ContentHtmlAttributes
        {
            get;
        }

        /// <summary>
        /// The action which will output the content.
        /// </summary>
        Action Content
        {
            get;
            set;
        }
    }
}