// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.Infrastructure;

    public class WindowBuilder : ViewComponentBuilderBase<Window, WindowBuilder>, IHideObjectMembers
    {
        public WindowBuilder(Window component)
            : base(component)
        {

        }

        /// <summary>
        /// Sets path to the icon.
        /// </summary>
        /// <param name="icon">Path to the icon.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Icon(Url.Content("~/Content/Icons/WindowIcon.png"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Icon(string iconUrl)
        {
            Guard.IsNotNullOrEmpty(iconUrl, "iconUrl");

            Component.IconUrl = iconUrl;

            return this;
        }

        /// <summary>
        /// Sets path and alternative text to the icon.
        /// </summary>
        /// <param name="icon">Path to the icon.</param>
        /// <param name="iconAlternativeText">Alternative text to the icon.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Icon(Url.Content("~/Content/Icons/WindowIcon.png"), "icon")
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Icon(string iconUrl, string iconAlternativeText)
        {
            Guard.IsNotNullOrEmpty(iconUrl, "iconUrl");
            Guard.IsNotNullOrEmpty(iconAlternativeText, "iconAlternativeText");

            Component.IconUrl = iconUrl;
            Component.IconAlternativeText = iconAlternativeText;

            return this;
        }

        /// <summary>
        /// Sets title, which appears in the header of the window.
        /// </summary>
        public WindowBuilder Title(string title)
        {
            Guard.IsNotNullOrEmpty(title, "title");

            Component.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the window should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Telerik().Window()
        ///            .Name("Window")
        ///            .Content(() => 
        ///            { 
        ///               %&gt;
        ///                     &lt;strong&gt; First Item Content&lt;/strong&gt;
        ///               &lt;% 
        ///            })
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Content(Action value)
        {
            Guard.IsNotNull(value, "value");

            Component.Template.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the window should display
        /// </summary>
        /// <param name="value">The Razor inline template</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Telerik().Window()
        ///            .Name("Window")
        ///            .Content(@&lt;strong&gt; Hello World!!!&lt;/strong&gt;))
        /// </code>        
        /// </example>
        /// <returns></returns>
        public WindowBuilder Content(Func<object, object> value)
        {
            Guard.IsNotNull(value, "value");

            Component.Template.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Content("&lt;strong&gt; First Item Content&lt;/strong&gt;")
        /// %&gt;
        /// </code>        
        public WindowBuilder Content(string value)
        {
            Guard.IsNotNull(value, "value");

            Component.Template.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML attributes of the content element of the item.
        /// </summary>
        /// <param name="attributes">The attributes.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Content(() => { %&gt; &lt;strong&gt;First Item Content&lt;/strong&gt; &lt;% })
        ///             .ContentHtmlAttributes(new {@class="first-item-content"})
        /// %&gt;
        /// </code>
        /// </example>        
        public WindowBuilder ContentHtmlAttributes(object attributes)
        {
            return ContentHtmlAttributes(attributes.ToDictionary());
        }        
        
        /// <summary>
        /// Sets the HTML attributes of the content element of the item.
        /// </summary>
        /// <param name="attributes">The attributes.</param>    
        public WindowBuilder ContentHtmlAttributes(IDictionary<string, object> attributes)
        {
            Guard.IsNotNull(attributes, "attributes");

            Component.ContentHtmlAttributes.Clear();
            Component.ContentHtmlAttributes.Merge(attributes);

            return this;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///         .Name("Window")
        ///         .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<WindowBuilder>(LoadContentFrom);
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Window")
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder LoadContentFrom(string actionName, string controllerName)
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
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Window", new { id = 10})
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues));
        }

        public WindowBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(Component.ViewContext.RequestContext);

            return LoadContentFrom(urlHelper.Action(actionName, controllerName, routeValues));
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="value">The url.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Window"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder LoadContentFrom(string value)
        {
            Component.ContentUrl = value;

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events =>
        ///                 events.OnOpen("onOpen").OnClose("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder ClientEvents(Action<WindowClientEventsBuilder> clientEventsAction)
        {
            Guard.IsNotNull(clientEventsAction, "clientEventsAction");

            clientEventsAction(new WindowClientEventsBuilder(Component.ClientEvents, Component.ViewContext));

            return this;
        }

        /// <summary>
        /// Enables windows resizing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Resizable()
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Resizable()
        {
            Component.ResizingSettings.Enabled = true;

            return this;
        }

        /// <summary>
        /// Configures the resizing ability of the window.
        /// </summary>
        /// <param name="resizingSettingsAction">Resizing settings action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .Resizable(settings =>
        ///                 settings.Enabled(true).MaxHeight(500).MaxWidth(500)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Resizable(Action<WindowResizingSettingsBuilder> resizingSettingsAction)
        {
            Guard.IsNotNull(resizingSettingsAction, "resizingSettingsAction");

            Component.ResizingSettings.Enabled = true;

            resizingSettingsAction(new WindowResizingSettingsBuilder(Component.ResizingSettings));

            return this;
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="clientEventsAction">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events =>
        ///                 events.OnOpen("onOpen").OnClose("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Buttons(Action<WindowButtonsBuilder> buttonsBuilderAction)
        {
            Guard.IsNotNull(buttonsBuilderAction, "buttonsBuilderAction");

            Component.Buttons.Container.Clear();

            buttonsBuilderAction(new WindowButtonsBuilder(Component.Buttons));

            return this;
        }

        /// <summary>
        /// Sets the width of the window.
        /// </summary>
        public WindowBuilder Width(int width)
        {
            Guard.IsNotNull(width, "width");
            Guard.IsNotNegative(width, "width");

            Component.Width = width;

            return this;
        }


        /// <summary>
        /// Sets the height of the window.
        /// </summary>
        public WindowBuilder Height(int height)
        {
            Guard.IsNotNull(height, "height");
            Guard.IsNotNegative(height, "height");

            Component.Height = height;

            return this;
        }

        /// <summary>
        /// Sets whether the window should be rendered visible.
        /// </summary>
        public WindowBuilder Visible(bool visible)
        {
            Guard.IsNotNull(visible, "visible");

            Component.Visible = visible;

            return this;
        }



        /// <summary>
        /// Sets whether the window should have scrollbars.
        /// </summary>
        public WindowBuilder Scrollable(bool scrollable)
        {
            Guard.IsNotNull(scrollable, "scrollable");

            Component.Scrollable = scrollable;

            return this;
        }

        /// <summary>
        /// Configures the effects of the window.
        /// </summary>
        /// <param name="effectsAction">The action which configures the effects.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Telerik().Window()
        ///	           .Name("Window")
        ///	           .Effects(fx =>
        ///	           {
        ///		            fx.Zoom()
        ///			          .Opacity()
        ///					  .OpenDuration(AnimationDuration.Fast)
        ///					  .CloseDuration(AnimationDuration.Fast);
        ///	           })
        /// </code>
        /// </example>
        public WindowBuilder Effects(Action<WindowEffectsBuilder> addEffects)
        {
            Guard.IsNotNull(addEffects, "addAction");

            addEffects(new WindowEffectsBuilder(Component.Effects));

            return this;
        }

        /// <summary>
        /// Sets whether the window should be modal or not.
        /// </summary>
        public WindowBuilder Modal(bool modal)
        {
            Guard.IsNotNull(modal, "modal");

            Component.Modal = modal;

            return this;
        }

        /// <summary>
        /// Sets whether the window can be moved.
        /// </summary>
        public WindowBuilder Draggable(bool value)
        {
            Guard.IsNotNull(value, "value");

            Component.Draggable = value;

            return this;
        }
    }
}
