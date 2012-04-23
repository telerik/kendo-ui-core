// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines properties for a content pane.
    /// </summary>
    public class SplitterPane : IAsyncContentContainer, IHtmlAttributesContainer
    {
        public SplitterPane()
        {
            Scrollable = true;
            Resizable = true;

            HtmlAttributes = new RouteValueDictionary();

            Template = new HtmlTemplate();
        }

        /// <summary>
        /// Specifies the size of the pane
        /// </summary>
        public string Size
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the minimum size of the pane
        /// </summary>
        public string MinSize
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies the maximum size of the pane
        /// </summary>
        public string MaxSize
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies whether the pane is initially collapsed
        /// </summary>
        public bool Collapsed
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies whether the pane can be collapsed by the user
        /// </summary>
        public bool Collapsible
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies whether the pane can be resized by the user
        /// </summary>
        public bool Resizable
        {
            get;
            set;
        }

        /// <summary>
        /// Specifies whether the pane shows a scrollbar when its content overflows
        /// </summary>
        public bool Scrollable
        {
            get;
            set;
        }

        private string loadContentFromUrl;

        /// <summary>
        /// Specifies URL from which to load the pane content
        /// </summary>
        public string ContentUrl
        {
            get
            {
                return loadContentFromUrl;
            }

            set
            {
                Guard.IsNotNullOrEmpty(value, "value");

                loadContentFromUrl = value;
            }
        }

        /// <summary>
        /// Specifies HTML attributes for the pane
        /// </summary>
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        /// <summary>
        /// Specifies the pane contents
        /// </summary>
        public HtmlTemplate Template
        {
            get;
            set;
        }

        internal IDictionary<string, object> Serialize()
        {
            var result = new Dictionary<string, object>();

            FluentDictionary.For(result)
                .Add("scrollable", Scrollable, true)
                .Add("resizable", Resizable, true)
                .Add("collapsible", Collapsible, false)
                .Add("collapsed", Collapsed, false)
                .Add("size", Size, "*")
                .Add("minSize", MinSize, () => !string.IsNullOrEmpty(MinSize))
                .Add("maxSize", MaxSize, () => !string.IsNullOrEmpty(MaxSize))
                .Add("contentUrl", ContentUrl, () => !string.IsNullOrEmpty(ContentUrl));

            return result;
        }
    }
}