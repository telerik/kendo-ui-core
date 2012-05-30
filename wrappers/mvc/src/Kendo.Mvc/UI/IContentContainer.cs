namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines whether one navigation item can have content output immediately
    /// </summary>
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