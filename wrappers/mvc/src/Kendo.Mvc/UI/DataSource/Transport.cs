using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    public class Transport : JsonObject
    {
        public Transport()
        {
            Read = new CrudOperation();
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var read = Read.ToJson();

            if (read.Keys.Any())
            {
                json["read"] = read;
            }
        }

        public CrudOperation Read { get; private set; }
    }
}