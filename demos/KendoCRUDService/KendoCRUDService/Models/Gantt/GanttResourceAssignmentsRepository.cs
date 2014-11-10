using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KendoCRUDService.Models.EF;
using System.Data;

namespace KendoCRUDService.Models
{
    public class GanttResourceAssignmentsRepository
    {
        private static bool UpdateDatabase = false;

        public static IList<GanttResourceAssignmentModel> All()
        {
            var result = HttpContext.Current.Session["GanttAssignments"] as IList<GanttResourceAssignmentModel>;

            if (result == null || UpdateDatabase)
            {
                using (SampleEntities context = new SampleEntities())
                {
                    result = context.GanttResourceAssignments.ToList()
                        .Select(a => new GanttResourceAssignmentModel
                        {
                            ID = a.ID,
                            TaskID = a.TaskID,
                            ResourceID = a.ResourceID,
                            Units = a.Units
                        })
                        .ToList();
                }

                HttpContext.Current.Session["GanttAssignments"] = result;
            }

            return result;
        }

        public static GanttResourceAssignmentModel One(Func<GanttResourceAssignmentModel, bool> predicate)
        {
            return All().FirstOrDefault(predicate);
        }

        public static void Insert(IEnumerable<GanttResourceAssignmentModel> assignments)
        {
            foreach (var task in assignments)
            {
                Insert(task);
            }
        }

        public static void Insert(GanttResourceAssignmentModel assignment)
        {
            if (!UpdateDatabase)
            {
                var first = All().OrderByDescending(a => a.ID).FirstOrDefault();
                var id = 0;

                if (first != null)
                {
                    id = first.ID;
                }

                assignment.ID = id + 1;

                All().Add(assignment);
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = assignment.ToEntity();

                    db.GanttResourceAssignments.AddObject(entity);

                    db.SaveChanges();
                }
            }
        }

        public static void Update(IEnumerable<GanttResourceAssignmentModel> assigments)
        {
            foreach (var assigment in assigments)
            {
                Update(assigment);
            }
        }

        public static void Update(GanttResourceAssignmentModel assigment)
        {
            if (!UpdateDatabase)
            {
                var target = One(a => a.ID == assigment.ID);

                if (target != null)
                {
                    target.Units = assigment.Units;
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = assigment.ToEntity();

                    db.GanttResourceAssignments.Attach(entity);
                    db.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);

                    db.SaveChanges();
                }
            }
        }

        public static void Delete(IEnumerable<GanttResourceAssignmentModel> assigments)
        {
            foreach (var assigment in assigments)
            {
                Delete(assigment);
            }
        }

        public static void Delete(GanttResourceAssignmentModel assigment)
        {
            if (!UpdateDatabase)
            {
                var target = One(a => a.ID == assigment.ID);
                if (target != null)
                {
                    All().Remove(target);
                }
            }
            else
            {
                using (var db = new SampleEntities())
                {
                    var entity = assigment.ToEntity();
                    db.GanttResourceAssignments.Attach(entity);

                    db.GanttResourceAssignments.DeleteObject(entity);

                    db.SaveChanges();
                }
            }
        }
    }
}