namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the client-side events of the <see cref="Chart{T}"/> component.
    /// </summary>
    public class ChartClientEvents
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartClientEvents" /> class.
        /// </summary>
        public ChartClientEvents()
        {
            OnDataBound = new ClientEvent();
            OnDataBinding = new ClientEvent();
            OnSeriesHover = new ClientEvent();
            OnSeriesClick = new ClientEvent();
            OnAxisLabelClick = new ClientEvent();
            OnError = new ClientEvent();
        }

        /// <summary>
        /// Defines the DataBound client-side event handler
        /// </summary>
        public ClientEvent OnDataBound
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines the DataBinding client-side event handler
        /// </summary>
        public ClientEvent OnDataBinding
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines the SeriesHover client-side event handler
        /// </summary>
        public ClientEvent OnSeriesHover
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines the SeriesClick client-side event handler
        /// </summary>
        public ClientEvent OnSeriesClick
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines the Error client-side event handler
        /// </summary>
        public ClientEvent OnError
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines the AxisLabelClick client-side event handler
        /// </summary>
        public ClientEvent OnAxisLabelClick
        {
            get;
            private set;
        }

        /// <summary>
        /// Serializes the client-side events.
        /// </summary>
        /// <param name="writer">The writer object to serialize to.</param>
        public void SerializeTo(IClientSideObjectWriter writer)
        {
            writer.AppendClientEvent("onDataBound", OnDataBound);
            writer.AppendClientEvent("onDataBinding", OnDataBinding);
            writer.AppendClientEvent("onSeriesClick", OnSeriesClick);
            writer.AppendClientEvent("onError", OnError);
        }
    }
}
