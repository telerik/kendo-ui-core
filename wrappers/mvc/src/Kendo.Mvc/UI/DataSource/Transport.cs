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

            FunctionRead = new ClientHandlerDescriptor();
            FunctionUpdate = new ClientHandlerDescriptor();
            FunctionDestroy = new ClientHandlerDescriptor();
            FunctionCreate = new ClientHandlerDescriptor();
            ParameterMap = new ClientHandlerDescriptor();
            SerializeEmptyPrefix = true;
            SignalR = new TransportSignalR();
        }

        public string Prefix { get; set; }
        public bool StringifyDates { get; set; }
        public string IdField { get; set; }
        public ClientHandlerDescriptor ParameterMap { get; set; }
        public bool SerializeEmptyPrefix { get; set; }
        public TransportSignalR SignalR { get; set; }
        
        protected override void Serialize(IDictionary<string, object> json)
        {
            if (CustomRead != null)
            {
                json["read"] = CustomRead;
            }
            else if (FunctionRead.HasValue())
            {
                json["read"] = FunctionRead;
            }
            else
            {
                var read = Read.ToJson();
                if (read.Keys.Any())
                {
                    json["read"] = read;
                }
            }

            if (SerializeEmptyPrefix)
            {
                json["prefix"] = Prefix.HasValue() ? Prefix : string.Empty;
            }
            else if (Prefix.HasValue())
            {
                json["prefix"] = Prefix;
            }

            if (CustomUpdate != null)
            {
                json["update"] = CustomUpdate;
            }
            else if (FunctionUpdate.HasValue())
            {
                json["update"] = FunctionUpdate;
            }
            else
            {
                var update = Update.ToJson();

                if (update.Keys.Any())
                {
                    json["update"] = update;
                }
            }

            if (CustomCreate != null)
            {
                json["create"] = CustomCreate;
            }
            else if (FunctionCreate.HasValue())
            {
                json["create"] = FunctionCreate;
            }
            else
            {
                var create = Create.ToJson();

                if (create.Keys.Any())
                {
                    json["create"] = create;
                }
            }

            if (CustomDestroy != null)
            {
                json["destroy"] = CustomDestroy;
            }
            else if (FunctionDestroy.HasValue())
            {
                json["destroy"] = FunctionDestroy;
            }
            else
            {
                var destroy = Destroy.ToJson();

                if (destroy.Keys.Any())
                {
                    json["destroy"] = destroy;
                }
            }

            if (StringifyDates)
            {
                json["stringifyDates"] = StringifyDates;
            }

            if (!string.IsNullOrEmpty(IdField))
            {
                json["idField"] = IdField;
            }

            if (ParameterMap.HasValue())
            {
                json["parameterMap"] = ParameterMap;
            }

            var signalR = SignalR.ToJson();

            if (signalR.Keys.Any())
            {
                json["signalr"] = signalR;
            }
        }

        public CrudOperation Read { get; private set; }

        public CrudOperation Update { get; private set; }

        public CrudOperation Create { get; private set; }

        public CrudOperation Destroy { get; private set; }

        public IDictionary<string, object> CustomRead { get; set; }

        public IDictionary<string, object> CustomUpdate { get; set; }

        public IDictionary<string, object> CustomCreate { get; set; }

        public IDictionary<string, object> CustomDestroy { get; set; }

        public ClientHandlerDescriptor FunctionRead { get; set; }

        public ClientHandlerDescriptor FunctionUpdate { get; set; }

        public ClientHandlerDescriptor FunctionCreate { get; set; }

        public ClientHandlerDescriptor FunctionDestroy { get; set; }
    }
}