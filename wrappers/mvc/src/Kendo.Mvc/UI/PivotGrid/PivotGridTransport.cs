namespace Kendo.Mvc.UI
{
    using System.Linq;

    public class PivotGridTransport : Transport
    {
        public PivotGridTransport()
            : base()
        {
            Connection = new PivotGridTransportConnection();
            Discovery = new CrudOperation();
        }

        public CrudOperation Discovery { get; private set; }

        public PivotGridTransportConnection Connection 
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

            var discovery = Discovery.ToJson();

            if (discovery.Keys.Any())
            {
                json["discovery"] = discovery;
            }
        }
    }
}