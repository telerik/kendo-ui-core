namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Window.ClientEvents"/>.
    /// </summary>
    public class WindowClientEventsBuilder : EventBuilder
    {
        public WindowClientEventsBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Open("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Open(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("open", handler);            

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Open("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Open(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("open", handler);

            return this;
        } 

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Activate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Activate(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("activate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Activate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Activate(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("activate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Deactivate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Deactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Deactivate(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("deactivate", handler);
           
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Deactivate client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Deactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Deactivate(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("deactivate", handler);

            return this;
        }    

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Close("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Close(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("close", handler);
            
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Close("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Close(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("close", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.DragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder DragStart(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("dragstart", handler);            

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.DragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder DragStart(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("dragstart", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.DragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder DragEnd(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("dragend", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.DragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder DragEnd(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("dragend", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Resize client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Resize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Resize(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("resize", handler);
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Resize client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Resize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Resize(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("resize", handler);
            return this;
        }  

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Refresh client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Refresh("onRefresh"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Refresh(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Refresh client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Refresh("onRefresh"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Refresh(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Error(string handler)
        {
            Guard.IsNotNullOrEmpty(handler, "handler");

            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="handlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Window()
        ///             .Name("Window")
        ///             .ClientEvents(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowClientEventsBuilder Error(Func<object, object> handler)
        {
            Guard.IsNotNull(handler, "handler");

            Handler("refresh", handler);

            return this;
        }
    }
}