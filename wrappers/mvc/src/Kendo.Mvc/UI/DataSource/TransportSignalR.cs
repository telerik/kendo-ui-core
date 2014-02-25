using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class TransportSignalR : JsonObject
    {
        public TransportSignalR()
        {
            Hub = new ClientHandlerDescriptor();
            Promise = new ClientHandlerDescriptor();
            Server = new Dictionary<string, object>();
            Client = new Dictionary<string, object>();
        }

        public ClientHandlerDescriptor Hub { get; set; }
        public ClientHandlerDescriptor Promise { get; set; }
        public Dictionary<string, object> Server { get; set; }
        public Dictionary<string, object> Client { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Hub.HasValue())
            {
                json["hub"] = Hub;
            }

            if (Promise.HasValue())
            {
                json["promise"] = Promise;
            }

            if (Server.Keys.Any())
            {
                json["server"] = Server;
            }

            if (Client.Keys.Any())
            {
                json["client"] = Client;
            }
        }
    }
}
