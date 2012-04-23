// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;

    public class SplitterPaneBuilder : IHideObjectMembers
    {
        private readonly SplitterPane pane;
        private readonly ViewContext viewContext;

        public SplitterPaneBuilder(SplitterPane pane, ViewContext viewContext)
        {
            this.pane = pane;
            this.viewContext = viewContext;
        }

        private Regex sizeValueRegex = new Regex(@"^\d+(px|%)$", RegexOptions.IgnoreCase);

        /// <summary>
        /// Sets the pane size.
        /// </summary>
        /// <param name="value">The desired size. Only sizes in pixels and percentages are allowed.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().Size("220px");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder Size(string size)
        {
            Guard.IsNotNullOrEmpty(size, "size");

            if (!sizeValueRegex.IsMatch(size))
            {
                throw new ArgumentException("Size should be in pixels or percentages", "size");
            }

            pane.Size = size;

            return this;
        }

        /// <summary>
        /// Sets the minimum pane size.
        /// </summary>
        /// <param name="value">The desired minimum size. Only sizes in pixels and percentages are allowed.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().MinSize("220px");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder MinSize(string size)
        {
            Guard.IsNotNullOrEmpty(size, "size");

            if (!sizeValueRegex.IsMatch(size))
            {
                throw new ArgumentException("MinSize should be in pixels or percentages", "size");
            }

            pane.MinSize = size;

            return this;
        }

        /// <summary>
        /// Sets the maximum pane size.
        /// </summary>
        /// <param name="value">The desired maximum size. Only sizes in pixels and percentages are allowed.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().MaxSize("220px");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder MaxSize(string size)
        {
            Guard.IsNotNullOrEmpty(size, "size");

            if (!sizeValueRegex.IsMatch(size))
            {
                throw new ArgumentException("MaxSize should be in pixels or percentages", "size");
            }

            pane.MaxSize = size;

            return this;
        }

        /// <summary>
        /// Sets whether the pane shows a scrollbar when its content overflows.
        /// </summary>
        /// <param name="isScrollable">Whether the pane will be scrollable.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().Scrollable(false);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder Scrollable(bool isScrollable)
        {
            pane.Scrollable = isScrollable;

            return this;
        }

        /// <summary>
        /// Sets whether the pane can be resized by the user.
        /// </summary>
        /// <param name="isResizable">Whether the pane will be resizable.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().Resizable(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder Resizable(bool isResizable)
        {
            pane.Resizable = isResizable;

            return this;
        }

        /// <summary>
        /// Sets whether the pane is initially collapsed.
        /// </summary>
        /// <param name="isCollapsed">Whether the pane will be initially collapsed.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().Collapsed(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder Collapsed(bool isCollapsed)
        {
            pane.Collapsed = isCollapsed;

            return this;
        }

        /// <summary>
        /// Sets whether the pane can be collapsed by the user.
        /// </summary>
        /// <param name="isCollapsible">Whether the pane can be collapsed by the user.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().Collapsible(true);
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder Collapsible(bool isCollapsible)
        {
            pane.Collapsible = isCollapsible;

            return this;
        }

        /// <summary>
        /// Sets the HTML attributes applied to the outer HTML element rendered for the item
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add().HtmlAttributes(new { style = "background: red" });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes applied to the outer HTML element rendered for the item
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        public SplitterPaneBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            pane.HtmlAttributes.Clear();
            pane.HtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the HTML content of the pane.
        /// </summary>
        /// <param name="value">The action which renders the HTML content.</param>
        /// <code lang="CS">
        ///  &lt;%  Html.Telerik().Splitter()
        ///             .Name("Splitter")
        ///             .Panes(panes =>
        ///             {
        ///                 panes.Add()
        ///                     .Content(() =&gt; { &gt;%
        ///                         &lt;p&gt;Content&lt;/p&gt;
        ///                     %&lt;});
        ///             })
        ///             .Render();
        /// %&gt;
        /// </code>        
        public SplitterPaneBuilder Content(Action content)
        {
            Guard.IsNotNull(content, "content");

            pane.Template.Content = content;

            return this;
        }

        /// <summary>
        /// Sets the HTML content of the pane.
        /// </summary>
        /// <param name="value">The Razor template for the HTML content.</param>
        /// <code lang="CS">
        ///  @(Html.Telerik().Splitter()
        ///        .Name("Splitter")
        ///        .Panes(panes =>
        ///        {
        ///            panes.Add()
        ///                 .Content(@&lt;p&gt;Content&lt;/p&gt;);
        ///        })
        ///        .Render();)
        /// </code>        
        public SplitterPaneBuilder Content(Func<object, object> content)
        {
            Guard.IsNotNull(content, "content");

            pane.Template.InlineTemplate = content;

            return this;
        }

        /// <summary>
        /// Sets the HTML content of the pane.
        /// </summary>
        /// <param name="value">The HTML content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///          .Name("Splitter")
        ///          .Panes(panes =>
        ///          {
        ///              panes.Add()
        ///                   .Content("&lt;p&gt;Content&lt;/p&gt;");
        ///          })
        /// %&gt;
        /// </code>        
        public SplitterPaneBuilder Content(string content)
        {
            Guard.IsNotNull(content, "content");

            pane.Template.Html = content;

            return this;
        }

        /// <summary>
        /// Sets the Url which will be requested to return the pane content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///          .Name("Splitter")
        ///          .Panes(panes => {
        ///               panes.Add()
        ///                     .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<SplitterPaneBuilder>(LoadContentFrom);
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the pane content. 
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///          .Name("Splitter")
        ///          .Panes(panes => {
        ///               panes.Add()
        ///                    .LoadContentFrom("AjaxView_OpenSource", "Splitter");
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder LoadContentFrom(string actionName, string controllerName)
        {
            return LoadContentFrom(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <param name="routeValues">Route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///          .Name("Splitter")
        ///          .Panes(panes => {
        ///               panes.Add()
        ///                    .LoadContentFrom("AjaxView_OpenSource", "Splitter", new { id = 10 });
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues));
        }

        public SplitterPaneBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(viewContext.RequestContext);

            return LoadContentFrom(urlHelper.Action(actionName, controllerName, routeValues));
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the pane content.
        /// </summary>
        /// <param name="value">The url.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Splitter()
        ///          .Name("Splitter")
        ///          .Panes(panes => {
        ///               panes.Add()
        ///                    .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Splitter"));
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public SplitterPaneBuilder LoadContentFrom(string value)
        {
            pane.ContentUrl = value;

            return this;
        }
    }
}