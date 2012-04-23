// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
				
namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    
    internal abstract class ResourceBase
    {
        private bool isLoaded;
        private object syncLock = new object();

        protected ResourceBase()
        {
            CurrentResources = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        }

        protected IDictionary<string, string> CurrentResources { get; private set; }

        public string GetByKey(string key)
        {
            LoadResources();

            return CurrentResources[key];
        }

        public IDictionary<string, string> GetAll()
        {
            LoadResources();

            return CurrentResources;
        }

        protected abstract void Load();

        private void LoadResources()
        {
            lock (syncLock)
            {
                if (!isLoaded)
                {
                    Load();
                    isLoaded = true;
                }
            }
        }
    }
}
