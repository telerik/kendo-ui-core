namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    /// <summary>
    /// Defines the fluent interface for configuring the Window events.
    /// </summary>
    public class WindowEventBuilder : EventBuilder
    {
        public WindowEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Open("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Open(string handler)
        {
            Handler("open", handler);            

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Open client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Open("onOpen"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Open(Func<object, object> handler)
        {
            Handler("open", handler);

            return this;
        } 

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Activate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Activate(string handler)
        {
            Handler("activate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Activate client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Activate("onActivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Activate(Func<object, object> handler)
        {
            Handler("activate", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Deactivate client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Deactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Deactivate(string handler)
        {
            Handler("deactivate", handler);
           
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Deactivate client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Deactivate("onDeactivate"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Deactivate(Func<object, object> handler)
        {
            Handler("deactivate", handler);

            return this;
        }    

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Close("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Close(string handler)
        {
            Handler("close", handler);
            
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Close client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Close("onClose"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Close(Func<object, object> handler)
        {
            Handler("close", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.DragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder DragStart(string handler)
        {
            Handler("dragstart", handler);            

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragStart client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.DragStart("onDragStart"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder DragStart(Func<object, object> handler)
        {
            Handler("dragstart", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.DragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder DragEnd(string handler)
        {
            Handler("dragend", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the DragEnd client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.DragEnd("onDragEnd"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder DragEnd(Func<object, object> handler)
        {
            Handler("dragend", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Resize client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Resize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Resize(string handler)
        {
            Handler("resize", handler);
            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Resize client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Resize("onResize"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Resize(Func<object, object> handler)
        {
            Handler("resize", handler);
            return this;
        }  

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Refresh client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Refresh("onRefresh"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Refresh(string handler)
        {
            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Refresh client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Refresh("onRefresh"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Refresh(Func<object, object> handler)
        {
            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Error(string handler)
        {
            Handler("refresh", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Error client-side event.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Events(events => events.Error("onError"))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowEventBuilder Error(Func<object, object> handler)
        {
            Handler("refresh", handler);

            return this;
        }
    }
}