// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Extensions;

    public class ContentNavigationItemBuilder<TItem, TBuilder> : NavigationItemBuilder<TItem, TBuilder>
        where TItem : NavigationItem<TItem>, IAsyncContentContainer
        where TBuilder : NavigationItemBuilder<TItem, TBuilder>, IHideObjectMembers
    {
        public ContentNavigationItemBuilder(TItem item, ViewContext viewContext)
            : base(item, viewContext)
        {
            ViewContext = viewContext;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PanelBar()
        ///         .Name("PanelBar")
        ///         .Items(parent => {
        ///
        ///              parent.Add()
        ///                    .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<TBuilder>(LoadContentFrom);
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PanelBar()
        ///         .Name("PanelBar")
        ///         .Items(parent => {
        ///
        ///              parent.Add()
        ///                    .Text("Completely Open Source")
        ///                    .LoadContentFrom("AjaxView_OpenSource", "PanelBar");
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string actionName, string controllerName)
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
        ///  &lt;%= Html.Telerik().PanelBar()
        ///         .Name("PanelBar")
        ///         .Items(parent => {
        ///
        ///              parent.Add()
        ///                    .Text("Completely Open Source")
        ///                    .LoadContentFrom("AjaxView_OpenSource", "PanelBar", new { id = 10});
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues));
        }

        public TBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(ViewContext.RequestContext);

            return LoadContentFrom(urlHelper.Action(actionName, controllerName, routeValues));
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="value">The url.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().PanelBar()
        ///         .Name("PanelBar")
        ///         .Items(parent => {
        ///
        ///              parent.Add()
        ///                    .Text("Completely Open Source")
        ///                    .LoadContentFrom(Url.Action("AjaxView_OpenSource", "PanelBar"));
        ///          })
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string value)
        {
            Item.ContentUrl = value;

            return this as TBuilder;
        }
    }
}
