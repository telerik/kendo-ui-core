// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring navigation items
    /// </summary>
    /// <typeparam name="TItem">The type of the item.</typeparam>
    /// <typeparam name="TBuilder">The type of the builder.</typeparam>
    public abstract class NavigationItemBuilder<TItem, TBuilder> where TItem : NavigationItem<TItem> where TBuilder : NavigationItemBuilder<TItem, TBuilder>, IHideObjectMembers
    {
        private readonly NavigationItem<TItem> item;

        /// <summary>
        /// Initializes a new instance of the <see cref="NavigationItemBuilder&lt;TItem, TBuilder&gt;"/> class.
        /// </summary>
        /// <param name="item">The item.</param>
        protected NavigationItemBuilder(NavigationItem<TItem> item, ViewContext viewContext)
        {
            this.item = item;
            this.ViewContext = viewContext;
        }

        public ViewContext ViewContext
        {
            get;
            set;
        }

        protected TItem Item
        {
            get
            {
                return item as TItem;
            }
        }

        /// <summary>
        /// Returns the inner navigation item
        /// </summary>
        /// <returns></returns>
        public TItem ToItem()
        {
            return item as TItem;
        }

        /// <summary>
        /// Sets the HTML attributes applied to the outer HTML element rendered for the item
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Attributes(new {@class="first-item"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes applied to the outer HTML element rendered for the item
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        public TBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            item.HtmlAttributes.Clear();
            item.HtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }

        public TBuilder LinkHtmlAttributes(object attributes)
        {
            return LinkHtmlAttributes(attributes.ToDictionary());
        }

        public TBuilder LinkHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            item.LinkHtmlAttributes.Clear();
            item.LinkHtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the text displayed by the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Text(string value)
        {
            item.Text = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Makes the item visible or not. Invisible items are not rendered in the output HTML.
        /// </summary>
        /// <summary>
        /// Sets the text displayed by the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Visible((bool)ViewData["visible"])
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Visible(bool value)
        {
            item.Visible = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Enables or disables the item. Disabled item cannot be clicked, expanded or open (depending on the item type - menu, tabstrip, panelbar).
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Enabled((bool)ViewData["enabled"])
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Enabled(bool value)
        {
            item.Enabled = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Selects or unselects the item. By default items are not selected.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Selected(true))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Selected(bool value)
        {
            item.Selected = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the route to which the item should navigate.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Route("Default", new RouteValueDictionary{{"id", 1}}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            item.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the route to which the item should navigate.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Route("Default", new {id, 1}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Route(string routeName, object routeValues)
        {
            item.Route(routeName, routeValues);

            SetTextIfEmpty(routeName);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the route to which the item should navigate.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").Route("Default"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Route(string routeName)
        {
            return Route(routeName, (object)null);
        }

        /// <summary>
        /// Sets the action to which the item should navigate
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("Index").Action(MVC.Home.Index(3).GetRouteValueDictionary()))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Action(RouteValueDictionary routeValues)
        {
            item.Action(routeValues);

            if (item.ActionName.HasValue())
            {
                SetTextIfEmpty(item.ActionName);
            }

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the action to which the item should navigate
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("Index").Action("Index", "Home", new RouteValueDictionary{{"id", 1}}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            item.Action(actionName, controllerName, routeValues);

            SetTextIfEmpty(actionName);
            return this as TBuilder;
        }

        /// <summary>
        /// Sets the action to which the item should navigate
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("Index").Action("Index", "Home", new {id, 1}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Action(string actionName, string controllerName, object routeValues)
        {
            item.Action(actionName, controllerName, routeValues);
            SetTextIfEmpty(actionName);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the action to which the item should navigate
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("Index").Action("Index", "Home"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the URL to which the item should navigate
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("www.example.com").Url("http://www.example.com"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Url(string value)
        {
            item.Url(value);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the URL of the image that should be displayed by the item.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("First Item").ImageUrl("~/Content/first.png"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder ImageUrl(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            item.ImageUrl = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes for the item image.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items
        ///                    .Add().Text("First Item")
        ///                    .ImageUrl("~/Content/first.png")
        ///                    .ImageHtmlAttributes(new {@class="first-item-image"}))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder ImageHtmlAttributes(object attributes)
        {
            return ImageHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes for the item image.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        public TBuilder ImageHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            item.ImageHtmlAttributes.Clear();
            item.ImageHtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the sprite CSS class names.
        /// </summary>
        /// <param name="cssClasses">The CSS classes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items
        ///                    .Add().Text("First Item")
        ///                    .SpriteCssClasses("icon", "first-item")
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder SpriteCssClasses(params string[] cssClasses)
        {
            Item.SpriteCssClasses = String.Join(" ", cssClasses);

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML content which the item should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Menu()
        ///            .Name("Menu")
        ///            .Items(items => items
        ///                     .Add()
        ///                     .Text("First Item")
        ///                     .Content(() => 
        ///                     { 
        ///                         %&gt;
        ///                             &lt;strong&gt; First Item Content&lt;/strong&gt;
        ///                         &lt;% 
        ///                     });)
        ///            .Render();
        /// %&gt;
        /// </code>        
        public TBuilder Content(Action value)
        {
            Guard.IsNotNull(value, "value");

            Item.Template.Content = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML content which the item should display.
        /// </summary>
        /// <param name="value">The content wrapped in a regular HTML tag or text tag (Razor syntax).</param>
        /// <code lang="CS">
        ///  @(Html.Telerik().Menu()
        ///       .Name("Menu")
        ///       .Items(items => items
        ///                .Add()
        ///                .Text("First Item")
        ///                .Content(
        ///                     @&lt;text&gt;
        ///                             Some text
        ///                             &lt;strong&gt; First Item Content&lt;/strong&gt;
        ///                     &lt;/text&gt;
        ///                );
        ///       )
        ///  )
        /// </code>  
        public TBuilder Content(Func<object,object> value)
        {
            Guard.IsNotNull(value, "value");

            Item.Template.InlineTemplate = value;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Menu()
        ///            .Name("Menu")
        ///            .Items(items => items
        ///                     .Add()
        ///                     .Text("First Item")
        ///                     .Content("&lt;strong&gt; First Item Content&lt;/strong&gt;");
        ///                  )
        ///            .Render();
        /// %&gt;
        /// </code>        
        public TBuilder Content(string value)
        {
            Guard.IsNotNull(value, "value");

            Item.Template.Html = value;

            return this as TBuilder;
        }
                
        /// <summary>
        /// Sets the HTML attributes of the content element of the item.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items
        ///                    .Add().Text("First Item")
        ///                    .Content(() => { %&gt; &lt;strong&gt;First Item Content&lt;/strong&gt; &lt;% })
        ///                    .ContentHtmlAttributes(new {@class="first-item-content"})
        /// %&gt;
        /// </code>
        /// </example>        
        public TBuilder ContentHtmlAttributes(object attributes)
        {
            return ContentHtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes of the content element of the item.
        /// </summary>
        /// <param name="attributes">The attributes.</param>     
        public TBuilder ContentHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            item.ContentHtmlAttributes.Clear();
            item.ContentHtmlAttributes.Merge(attributes);

            return this as TBuilder;
        }        

        /// <summary>
        /// Makes the item navigate to the specified controllerAction method.
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items
        ///                    .Add().Text("First Item")
        ///                    .Action&lt;HomeController&gt;(controller => controller.Index()))
        ///                    
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            item.Action(controllerAction);
            return this as TBuilder;
        }

        /// <summary>
        /// Sets whether the Text property should be encoded when the item is rendered.
        /// </summary>
        /// <param name="isEncoded">Whether the property should be encoded. Default: true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Menu()
        ///             .Name("Menu")
        ///             .Items(items => items.Add().Text("&lt;strong&gt;First Item&lt;/strong&gt;").Encoded(false))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder Encoded(bool isEncoded)
        {
            item.Encoded = isEncoded;

            return this as TBuilder;
        }

        private void SetTextIfEmpty(string value)
        {
            if (string.IsNullOrEmpty(item.Text))
            {
                item.Text = value;
            }
        }
    }
}