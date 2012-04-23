// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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
            writer.AppendClientEvent("onLoad", OnLoad);
            writer.AppendClientEvent("onSelect", OnSelect);
            writer.AppendClientEvent("onUpload", OnUpload);
            writer.AppendClientEvent("onSuccess", OnSuccess);
            writer.AppendClientEvent("onError", OnError);
            writer.AppendClientEvent("onComplete", OnComplete);
            writer.AppendClientEvent("onCancel", OnCancel);
            writer.AppendClientEvent("onRemove", OnRemove);
        }
    }
}
