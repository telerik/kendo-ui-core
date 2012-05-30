using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class Transport : JsonObject
    {
        public Transport()
        {
            Read = new CrudOperation();
            Update = new CrudOperation();
            Destroy = new CrudOperation();
            Create = new CrudOperation();
        }

        public string Prefix { get; set; }
        
        protected override void Serialize(IDictionary<string, object> json)
        {
            var read = Read.ToJson();

            if (Prefix.HasValue())
            {
                json["prefix"] = Prefix;
            }

            if (read.Keys.Any())
            {
                json["read"] = read;
            }

            var update = Update.ToJson();

            if (update.Keys.Any())
            {
                json["update"] = update;
            }

            var create = Create.ToJson();

            if (create.Keys.Any())
            {
                json["create"] = create;
            }

            var destroy = Destroy.ToJson();

            if (destroy.Keys.Any())
            {
                json["destroy"] = destroy;
            }
        }

        public CrudOperation Read { get; private set; }

        public CrudOperation Update { get; private set; }

        public CrudOperation Create { get; private set; }

        public CrudOperation Destroy { get; private set; }
    }
}