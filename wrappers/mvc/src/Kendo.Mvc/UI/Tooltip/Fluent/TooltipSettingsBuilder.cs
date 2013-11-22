namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Tooltip"/> component.
    /// </summary>
    public class TooltipSettingsBuilder<TBuilder> : IHideObjectMembers
        where TBuilder : TooltipSettingsBuilder<TBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TooltipSettingsBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TooltipSettingsBuilder(Tooltip component)            
        {
            Component = component;
        }

        protected internal Tooltip Component
        {
            get;
            set;
        }

        /// <summary>
        /// The position (relative to the target) at which the Tooltip will be shown
        /// </summary>
        /// <param name="position">The position</param>
        /// <returns></returns>
        public virtual TBuilder Position(TooltipPosition position)
        {
            Component.Position = position;
            return this as TBuilder;
        }

        /// <summary>
        /// The inverval in milliseconds, after which the Tooltip will be shown
        /// </summary>
        /// <param name="milliseconds"></param>
        /// <returns></returns>
        public virtual TBuilder ShowAfter(int milliseconds)
        {                       
            Component.ShowAfter = milliseconds;
            return this as TBuilder;
        }

        /// <summary>
        /// Determines if callout should be visible
        /// </summary>
        /// <param name="show"></param>
        /// <returns></returns>
        public virtual TBuilder Callout(bool show)
        {
            Component.Callout = show;
            return this as TBuilder;
        }

        public virtual TBuilder ShowOn(TooltipShowOnEvent eventName)
        {
            Component.ShowOn = eventName;                
            return this as TBuilder;
        }

        /// <summary>
        /// Determines if tooltip should be automatically hidden, or a close button should be present
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual TBuilder AutoHide(bool value)
        {
            Component.AutoHide = value;
            return this as TBuilder;
        }

        public TBuilder Events(Action<TooltipEventBuilder> clientEventsAction)
        {
            clientEventsAction(new TooltipEventBuilder(Component.Events));

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///         .For("#element")
        ///         .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<TBuilder>(LoadContentFrom) as TBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Tooltip")
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string actionName, string controllerName)
        {
            return LoadContentFrom(actionName, controllerName, (object)null) as TBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <param name="routeValues">Route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Tooltip", new { id = 10})
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues)) as TBuilder;
        }

        public TBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            UrlHelper urlHelper = new UrlHelper(Component.ViewContext.RequestContext);

            return LoadContentFrom(urlHelper.Action(actionName, controllerName, routeValues)) as TBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="value">The url.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Tooltip"))
        /// %&gt;
        /// </code>
        /// </example>
        public TBuilder LoadContentFrom(string value)
        {
            Component.ContentUrl = value;

            return this as TBuilder;
        }       

        /// <summary>
        /// Sets the HTML content which the tooltip should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Content("&lt;strong&gt; First Item Content&lt;/strong&gt;")
        /// %&gt;
        /// </code>        
        public TBuilder Content(string value)
        {
            Component.Content = value;
            return this as TBuilder;
        }

        /// <summary>
        /// Sets the id of kendo template which will be used as tooltip content.
        /// </summary>
        /// <param name="value">The id of the template</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Content("template")
        /// %&gt;
        /// </code>        
        public TBuilder ContentTemplateId(string value)
        {
            Component.ContentTemplateId = value;
            return this as TBuilder;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>                
        public TBuilder ContentHandler(Func<object, object> handler)
        {
            Component.ContentHandler.TemplateDelegate = handler;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public TBuilder ContentHandler(string handler)
        {
            Component.ContentHandler.HandlerName = handler;

            return this as TBuilder;
        }

        /// <summary>
        /// Configures the animation effects of the window.
        /// </summary>
        /// <param name="enable">Whether the component animation is enabled.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Animation(false)
        /// </code>
        /// </example>
        public TBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this as TBuilder;
        }

        /// <summary>
        /// Configures the animation effects of the panelbar.
        /// </summary>
        /// <param name="animationAction">The action that configures the animation.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Animation(animation => animation.Expand)
        /// </code>
        /// </example>
        public TBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the width of the tooltip.
        /// </summary>
        public TBuilder Width(int width)
        {

            Component.Width = width;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the height of the tooltip.
        /// </summary>
        public TBuilder Height(int height)
        {

            Component.Height = height;

            return this as TBuilder;
        }
    }
}