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
    public class TooltipBuilder : IHtmlString, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TooltipBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TooltipBuilder(Tooltip component)            
        {
            Component = component;
        }

        protected internal Tooltip Component
        {
            get;
            set;
        }

        /// <summary>
        /// The selector which to match the DOM element to which the Tooltip widget will be instantiated
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual TooltipBuilder For(string selector)
        {
            Component.Container = selector;
            return this;
        }

        /// <summary>
        /// The selector which to match target child elements for which the Tooltip will be shown
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual TooltipBuilder Filter(string selector)
        {
            Component.Filter = selector;
            return this;
        }

        /// <summary>
        /// The position (relative to the target) at which the Tooltip will be shown
        /// </summary>
        /// <param name="position">The position</param>
        /// <returns></returns>
        public virtual TooltipBuilder Position(TooltipPosition position)
        {
            Component.Position = position;
            return this;
        }

        /// <summary>
        /// The inverval in milliseconds, after which the Tooltip will be shown
        /// </summary>
        /// <param name="milliseconds"></param>
        /// <returns></returns>
        public virtual TooltipBuilder ShowAfter(int milliseconds)
        {                       
            Component.ShowAfter = milliseconds;
            return this;
        }

        /// <summary>
        /// Determines if callout should be visible
        /// </summary>
        /// <param name="show"></param>
        /// <returns></returns>
        public virtual TooltipBuilder Callout(bool show)
        {
            Component.Callout = show;
            return this;
        }

        public virtual TooltipBuilder ShowOn(TooltipShowOnEvent eventName)
        {
            Component.ShowOn = eventName;                
            return this;
        }

        /// <summary>
        /// Determines if tooltip should be automatically hidden, or a close button should be present
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public virtual TooltipBuilder AutoHide(bool value)
        {
            Component.AutoHide = value;
            return this;
        }

        public TooltipBuilder Events(Action<TooltipEventBuilder> clientEventsAction)
        {
            clientEventsAction(new TooltipEventBuilder(Component.Events));

            return this;
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
        public TooltipBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<TooltipBuilder>(LoadContentFrom);
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
        public TooltipBuilder LoadContentFrom(string actionName, string controllerName)
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
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Tooltip", new { id = 10})
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues));
        }

        public TooltipBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
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
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Tooltip"))
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(string value)
        {
            Component.ContentUrl = value;

            return this;
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
        public TooltipBuilder Content(string value)
        {
            Component.Content = value;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>                
        public TooltipBuilder ContentHandler(Func<object, object> handler)
        {
            Component.ContentHandler.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public TooltipBuilder ContentHandler(string handler)
        {
            Component.ContentHandler.HandlerName = handler;

            return this;
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
        public TooltipBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
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
        public TooltipBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Sets the width of the tooltip.
        /// </summary>
        public TooltipBuilder Width(int width)
        {

            Component.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the height of the tooltip.
        /// </summary>
        public TooltipBuilder Height(int height)
        {

            Component.Height = height;

            return this;
        }

        /// <summary>
        /// Suppress initialization script rendering. Note that this options should be used in conjunction with <see cref="WidgetFactory.DeferredScripts"/>
        /// </summary>        
        /// <returns></returns>
        public virtual TooltipBuilder Deferred()
        {
            Component.HasDeferredInitialization = true;

            return this;
        }

        public static implicit operator Tooltip(TooltipBuilder builder)
        {

            return builder.ToComponent();
        }

        /// <summary>
        /// Returns the internal view component.
        /// </summary>
        /// <returns></returns>
        public Tooltip ToComponent()
        {
            return Component;
        }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public virtual void Render()
        {
            Component.Render();
        }

        public string ToHtmlString()
        {
            return ToComponent().ToHtmlString();
        }

        public MvcHtmlString ToClientTemplate()
        {
            return ToComponent().ToClientTemplate();
        }

        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}