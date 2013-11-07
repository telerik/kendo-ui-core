namespace Kendo.Mvc.UI
{    
    using System.Linq;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;
    using System.Collections;

    public class HierarchicalDataSource : JsonObject
    {
        public HierarchicalDataSource()
        {
            Transport = new Transport();
            Events = new Dictionary<string, object>();
            Model = new HierarchicalModelDescriptor();            
        }

        public IEnumerable Data
        { 
            get; 
            set; 
        }

        public bool ServerFiltering
        {
            get;
            set;
        }

        public IDictionary<string, object> Events 
        { 
            get; 
            private set; 
        }

        public Transport Transport
        {
            get;
            private set;
        }

        public HierarchicalModelDescriptor Model
        {
            get;
            private set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {            
            var transport = Transport.ToJson();

            if (transport.Keys.Any())
            {
                json["transport"] = transport;
            }

            if (Events.Keys.Any())
            {
                json.Merge(Events);
            }

            var schema = new Dictionary<string, object>();
            json["schema"] = schema;

            var model = Model.ToJson();
            if (model.Keys.Any())
            {             
                schema["model"] = model;
            }

            if (ServerFiltering)
            {
                json["serverFiltering"] = ServerFiltering;
            }
        }
    }
}
