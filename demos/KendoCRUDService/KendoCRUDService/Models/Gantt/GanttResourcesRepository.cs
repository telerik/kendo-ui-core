using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;

namespace KendoCRUDService.Models
{
    public class GanttResourcesRepository
    {
        public static IList<GanttResourceModel> All()
        {
            var result = HttpContext.Current.Session["GanttResources"] as IList<GanttResourceModel>;

            if (result == null)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.GanttResources.ToList()
                        .Select(r => new GanttResourceModel
                        {
                            ID = r.ID   ,
                            Name = r.Name,
                            Color = r.Color
                        })
                        .ToList();
                }

                HttpContext.Current.Session["GanttResources"] = result;
            }

            return result;
        }
    }
}