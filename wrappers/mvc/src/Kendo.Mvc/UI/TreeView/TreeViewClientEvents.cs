namespace Kendo.Mvc.UI
{
    public class TreeViewClientEvents
    {
        public TreeViewClientEvents()
        {
            OnExpand = new ClientEvent();
            OnCollapse = new ClientEvent();
            OnSelect = new ClientEvent();
            OnChecked = new ClientEvent();
            OnLoad = new ClientEvent();
            OnError = new ClientEvent();
            OnNodeDragStart = new ClientEvent();
            OnNodeDragging = new ClientEvent();
            OnNodeDragCancelled = new ClientEvent();
            OnNodeDrop = new ClientEvent();
            OnNodeDropped = new ClientEvent();
            OnDataBinding = new ClientEvent();
            OnDataBound = new ClientEvent();
        }

        public ClientEvent OnExpand { get; set; }

        public ClientEvent OnCollapse { get; set; }

        public ClientEvent OnSelect { get; set; }

        public ClientEvent OnChecked { get; set; }

        public ClientEvent OnLoad { get; set; }

        public ClientEvent OnError { get; set; }

        public ClientEvent OnNodeDragStart { get; set; }

        public ClientEvent OnNodeDragging { get; set; }

        public ClientEvent OnNodeDragCancelled { get; set; }

        public ClientEvent OnNodeDrop { get; set; }

        public ClientEvent OnNodeDropped { get; set; }

        public ClientEvent OnDataBinding { get; set; }

        public ClientEvent OnDataBound { get; set; }
    }
}