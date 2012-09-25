namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the Editor events.
    /// </summary>
    public class EditorEventBuilder : EventBuilder
    {
        public EditorEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        public EditorEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        public EditorEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        public EditorEventBuilder Execute(string handler)
        {
            Handler("execute", handler);

            return this;
        }

        public EditorEventBuilder Execute(Func<object, object> handler)
        {
            Handler("execute", handler);

            return this;
        }

        public EditorEventBuilder Paste(string handler)
        {
            Handler("paste", handler);

            return this;
        }

        public EditorEventBuilder Paste(Func<object, object> handler)
        {
            Handler("paste", handler);

            return this;
        }

        public EditorEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }

        public EditorEventBuilder Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this;
        }

        public EditorEventBuilder KeyUp(string handler)
        {
            Handler("keyup", handler);

            return this;
        }

        public EditorEventBuilder KeyUp(Func<object, object> handler)
        {
            Handler("keyup", handler);

            return this;
        }

        public EditorEventBuilder KeyDown(string handler)
        {
            Handler("keydown", handler);

            return this;
        }

        public EditorEventBuilder KeyDown(Func<object, object> handler)
        {
            Handler("keydown", handler);

            return this;
        }
    }
}
