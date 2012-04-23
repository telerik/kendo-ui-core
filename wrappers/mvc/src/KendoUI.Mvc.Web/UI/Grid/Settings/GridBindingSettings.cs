// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Text.RegularExpressions;

    public class GridBindingSettings : IClientSerializable
    {
        private readonly IGrid grid;

        public GridBindingSettings(IGrid grid)
        {
            this.grid = grid;
            Select = new RequestSettings();
            Insert = new RequestSettings();
            Update = new RequestSettings();
            Delete = new RequestSettings();
        }

        public bool Enabled
        {
            get;
            set;
        }

        public RequestSettings Select
        {
            get;
            private set;
        }

        public RequestSettings Insert
        {
            get;
            private set;
        }

        public RequestSettings Update
        {
            get;
            private set;
        }

        public RequestSettings Delete
        {
            get;
            private set;
        }

        private string Encode(string value)
        {
            if (grid.IsSelfInitialized)
            {
                value = Regex.Replace(value, "(%20)*%3C%23%3D(%20)*", "<#=", RegexOptions.IgnoreCase);
                value = Regex.Replace(value, "(%20)*%23%3E(%20)*", "#>", RegexOptions.IgnoreCase);
            }

            return value;
        }

        protected virtual bool SerializeEmptySelectUrl
        {
            get
            {
                return true;
            }
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                var urlBuilder = grid.UrlBuilder;

                var urls = new Dictionary<string, string>();

                if (Select.HasValue() || (SerializeEmptySelectUrl && !Select.HasValue()))
                {
                    urls["selectUrl"] = Encode(urlBuilder.Url(Select));
                }

                if (Insert.HasValue())
                {
                    urls["insertUrl"] = Encode(urlBuilder.Url(Insert));
                }

                if (Update.HasValue())
                {
                    urls["updateUrl"] = Encode(urlBuilder.Url(Update));
                }

                if (Delete.HasValue())
                {
                    urls["deleteUrl"] = Encode(urlBuilder.Url(Delete));
                }

                writer.AppendObject(key, urls);
            }
        }
    }

    public class GridClientBindingSettings : GridBindingSettings
    {
        public GridClientBindingSettings(IGrid grid) : base(grid)
        {
            OperationMode = GridOperationMode.Server;
        }

        public GridOperationMode OperationMode
        {
            get;
            set;
        }

        protected override bool SerializeEmptySelectUrl
        {
            get
            {
                return false;
            }
        }
    }
}
