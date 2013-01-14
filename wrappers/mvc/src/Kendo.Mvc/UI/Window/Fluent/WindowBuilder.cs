namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Window"/> component.
    /// </summary>
    public class WindowBuilder : WidgetBuilderBase<Window, WindowBuilder>, IHideObjectMembers
    {
        public WindowBuilder(Window component)
            : base(component)
        {

        }

        /// <summary>
        /// Allows title to be shown / hidden
        /// </summary>
        /// <param name="show">Whether the window title will be visible</param>
        public WindowBuilder Title(bool show)
        {
            Component.Title = show;

            return this;
        }

        /// <summary>
        /// Sets title, which appears in the header of the window.
        /// </summary>
        public WindowBuilder Title(string title)
        {

            Component.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the window should display.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().Window()
        ///            .Name("Window")
        ///            .Content(() => 
        ///            { 
        ///               %&gt;
        ///                     &lt;strong&gt;Window content&lt;/strong&gt;
        ///               &lt;% 
        ///            })
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Content(Action value)
        {

            Component.Template.Content = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the window should display
        /// </summary>
        /// <param name="value">The Razor inline template</param>
        /// <example>
        /// <code lang="CS">
        ///  @(Html.Kendo().Window()
        ///            .Name("Window")
        ///            .Content(@&lt;strong&gt; Hello World!&lt;/strong&gt;))
        /// </code>        
        /// </example>
        /// <returns></returns>
        public WindowBuilder Content(Func<object, object> value)
        {

            Component.Template.InlineTemplate = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the item should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Content("&lt;strong&gt; First Item Content&lt;/strong&gt;")
        /// %&gt;
        /// </code>        
        public WindowBuilder Content(string value)
        {

            Component.Template.Html = value;

            return this;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
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
        ///  &lt;%= Html.Kendo().Window()
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
        ///  &lt;%= Html.Kendo().Window()
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
        ///  &lt;%= Html.Kendo().Window()
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
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events =>
        ///                 events.Open("onOpen").Close("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Events(Action<WindowEventBuilder> clientEventsAction)
        {

            clientEventsAction(new WindowEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Enables windows resizing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
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
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(settings =>
        ///                 settings.Enabled(true).MaxHeight(500).MaxWidth(500)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Resizable(Action<WindowResizingSettingsBuilder> resizingSettingsAction)
        {

            Component.ResizingSettings.Enabled = true;

            resizingSettingsAction(new WindowResizingSettingsBuilder(Component.ResizingSettings));

            return this;
        }

        /// <summary>
        /// Configures the window buttons.
        /// </summary>
        /// <param name="clientEventsAction">The buttons configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Actions(actions =>
        ///                 actions.
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public WindowBuilder Actions(Action<WindowActionsBuilder> actionsBuilderAction)
        {

            Component.Actions.Container.Clear();

            actionsBuilderAction(new WindowActionsBuilder(Component.Actions));

            return this;
        }

        /// <summary>
        /// Sets the width of the window.
        /// </summary>
        public WindowBuilder Width(int width)
        {

            Component.Width = width;

            return this;
        }


        /// <summary>
        /// Sets the height of the window.
        /// </summary>
        public WindowBuilder Height(int height)
        {

            Component.Height = height;

            return this;
        }

        /// <summary>
        /// Sets whether the window should be rendered visible.
        /// </summary>
        public WindowBuilder Visible(bool visible)
        {

            Component.Visible = visible;

            return this;
        }



        /// <summary>
        /// Sets whether the window should have scrollbars.
        /// </summary>
        public WindowBuilder Scrollable(bool scrollable)
        {

            Component.Scrollable = scrollable;

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the window.
        /// </summary>
        /// <param name="enable">Whether the component animation is enabled.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Animation(false)
        /// </code>
        /// </example>
        public WindowBuilder Animation(bool enable)
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
        /// &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Animation(animation => animation.Expand)
        /// </code>
        /// </example>
        public WindowBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>
        /// Sets whether the window should be modal or not.
        /// </summary>
        public WindowBuilder Modal(bool modal)
        {

            Component.Modal = modal;

            return this;
        }

        /// <summary>
        /// Sets whether the window can be moved.
        /// </summary>
        public WindowBuilder Draggable()
        {
            return Draggable(true);
        }

        /// <summary>
        /// Sets whether the window can be moved.
        /// </summary>
        public WindowBuilder Draggable(bool value)
        {

            Component.Draggable = value;

            return this;
        }

        /// <summary>
        /// Explicitly specifies whether the loaded window content will be rendered as an iframe or in-line
        /// </summary>
        public WindowBuilder Iframe(bool value)
        {
            Component.Iframe = value;

            return this;
        }
    }
}
