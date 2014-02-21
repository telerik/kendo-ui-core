using System.Collections.Generic;
using System;

namespace Kendo.Mvc.Examples.Models
{
    public partial class MapDataRepository
    {
        public static IList<Marker> StoreLocations() 
        {
            return new Marker[]
            {
                new Marker(30.2675,-97.7409, "Zevo Toys"),
                new Marker(30.2707,-97.7490, "Foo Bars"),
                new Marker(30.2705,-97.7409, "Mainway Toys"),
                new Marker(30.2686,-97.7494, "Acme Toys")
            };
        }
    }
}