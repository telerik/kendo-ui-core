namespace Kendo.Mvc.UI
{
    using System;

    /// <summary>
    /// Represents a client-side event of a view component
    /// </summary>
    public class ClientEvent
    {
        public ClientEvent(string name = "")
        {
            Name = name;
        }

        public string Name { get; set; }

        /// <summary>
        /// An action that renders the code of the client-side handler upon execution.
        /// </summary>
        public Action CodeBlock { get; set; }

        /// <summary>
        /// A function that returns the code of the client-side handler.
        /// </summary>
        public Func<object, object> InlineCodeBlock { get; set; }

        /// <summary>
        /// The name of the client-side handler function.
        /// </summary>
        public string HandlerName { get; set; }

        public void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            //if (this.CodeBlock != null) //does not work
            //{
            //    //some how we should deffer the execution of the Action
            //    json[Name] = "";
            //    this.CodeBlock();
            //}
            //else 
            
            object eventsValue;
            json.TryGetValue("events", out eventsValue);

            var events = eventsValue as string;
            var clientEvent = string.Empty;

            if (this.InlineCodeBlock != null)
            {
                var result = this.InlineCodeBlock(this);
                if (result != null)
                {
                    clientEvent = string.Format("{0}:{1}", Name, result);
                }
            }
            else if (!string.IsNullOrEmpty(this.HandlerName)) //does not work
            {
                clientEvent = string.Format("{0}:{1}", Name, this.HandlerName);
            }

            if (!string.IsNullOrEmpty(clientEvent))
            {
                if (!string.IsNullOrEmpty(events))
                {
                    events = events + "," + clientEvent;
                }
                else
                {
                    events = clientEvent;
                }

                json["events"] = events;
            }
        }
    }
}