namespace Kendo.Mvc
{
    using System;
    using Kendo.Mvc.Extensions;
    
    /// <summary>
    /// Represents a client-side event handler of a Kendo UI widget
    /// </summary>
    public class ClientHandlerDescriptor
    {
        /// <summary>
        /// A Razor template delegate.
        /// </summary>
        public Func<object, object> TemplateDelegate { get; set; }

        /// <summary>
        /// The name of the JavaScript function which will be called as a handler.
        /// </summary>
        public string HandlerName { get; set; }

        public bool HasValue()
        {
            return HandlerName.HasValue() || TemplateDelegate != null;
        }
    }
}