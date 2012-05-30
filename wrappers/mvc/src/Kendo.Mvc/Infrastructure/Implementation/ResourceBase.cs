				
namespace Kendo.Mvc.Infrastructure.Implementation
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
