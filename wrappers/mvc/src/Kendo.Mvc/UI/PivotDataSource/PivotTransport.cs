namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class PivotTransport : Transport
    {
        public PivotTransport()
            : base()
        {
            Connection = new PivotTransportConnection();
            Discover = new CrudOperation();
            FunctionDiscover = new ClientHandlerDescriptor();
        }

        public CrudOperation Discover { get; private set; }

        public IDictionary<string, object> CustomDiscover { get; set; }

        public ClientHandlerDescriptor FunctionDiscover { get; set; }

        public PivotTransportConnection Connection 
        { 
            get; 
            private set; 
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            base.Serialize(json);

            var connection = Connection.ToJson();
            if (connection.Keys.Any())
            {
                json["connection"] = connection;
            }

            if (CustomDiscover != null)
            {
                json["discover"] = CustomDiscover;
            }
            else if (FunctionDiscover.HasValue())
            {
                json["discover"] = FunctionDiscover;
            }
            else
            {
                var discover = Discover.ToJson();

                if (discover.Keys.Any())
                {
                    json["discover"] = discover;
                }
            }
        }
    }
}