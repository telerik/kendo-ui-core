namespace Kendo.Mvc
{
    using System.Collections.Generic;

    public abstract class JsonObject
    {
        public IDictionary<string, object> ToJson()
        {
            var json = new Dictionary<string, object>();

            Serialize(json);

            return json;
        }

        protected abstract void Serialize(IDictionary<string, object> json);
    }    
}