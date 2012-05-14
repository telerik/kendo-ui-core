namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the client-side events of the <see cref="Upload"/> component.
    /// </summary>
    public class UploadClientEvents
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UploadClientEvents" /> class.
        /// </summary>
        public UploadClientEvents()
        {
            OnLoad = new ClientEvent();
            OnSelect = new ClientEvent();
            OnUpload = new ClientEvent();
            OnSuccess = new ClientEvent();
            OnError = new ClientEvent();
            OnComplete = new ClientEvent();
            OnCancel = new ClientEvent();
            OnRemove = new ClientEvent();
        }

        /// <summary>
        /// Defines the Load client-side event handler
        /// </summary>
        public ClientEvent OnLoad
        { 
            get; 
            private set; 
        }

        /// <summary>
        /// Defines the Select client-side event handler
        /// </summary>
        public ClientEvent OnSelect
        { 
            get; 
            private set; 
        }

        /// <summary>
        /// Defines the Upload client-side event handler
        /// </summary>
        public ClientEvent OnUpload
        { 
            get; 
            private set; 
        }

        /// <summary>
        /// Defines the Success client-side event handler
        /// </summary>
        public ClientEvent OnSuccess
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
        /// Defines the Complete client-side event handler
        /// </summary>
        public ClientEvent OnComplete
        { 
            get; 
            private set; 
        }

        /// <summary>
        /// Defines the Cancel client-side event handler
        /// </summary>
        public ClientEvent OnCancel
        { 
            get; 
            private set; 
        }

        /// <summary>
        /// Defines the Remove client-side event handler
        /// </summary>
        public ClientEvent OnRemove
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
            writer.AppendClientEvent("load", OnLoad);
            writer.AppendClientEvent("select", OnSelect);
            writer.AppendClientEvent("upload", OnUpload);
            writer.AppendClientEvent("success", OnSuccess);
            writer.AppendClientEvent("error", OnError);
            writer.AppendClientEvent("complete", OnComplete);
            writer.AppendClientEvent("cancel", OnCancel);
            writer.AppendClientEvent("remove", OnRemove);
        }
    }
}
