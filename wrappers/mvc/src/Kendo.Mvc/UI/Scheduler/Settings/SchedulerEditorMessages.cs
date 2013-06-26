namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;

    public class SchedulerEditorMessages : JsonObject
    {
        private const string DefaultTitle = "Title";

        private const string DefaultStart = "Start";

        private const string DefaultEnd = "End";

        private const string DefaultAllDayEvent = "All day event";

        private const string DefaultDescription = "Description";

        private const string DefaultRepeat = "Repeat";

        private const string DefaultTimezone = " ";

        private const string DefaultStartTimezone = "Start timezone";

        private const string DefaultEndTimezone = "End timezone";

        private const string DefaultSeparateTimezones = "Use separate start and end time zones";

        private const string DefaultTimezoneEditorTitle = "Timezones";

        private const string DefaultTimezoneEditorButton = "Time zone";

        private const string DefaultEditorTitle = "Event";

        public SchedulerEditorMessages()
        {
            Title = Messages.Scheduler_Editor_Title;

            Start = Messages.Scheduler_Editor_Start;

            End = Messages.Scheduler_Editor_End;

            AllDayEvent = Messages.Scheduler_Editor_AllDayEvent;

            Description = Messages.Scheduler_Editor_Description;

            Repeat = Messages.Scheduler_Editor_Repeat;

            Timezone = Messages.Scheduler_Editor_Timezone;

            StartTimezone = Messages.Scheduler_Editor_StartTimezone;

            EndTimezone = Messages.Scheduler_Editor_EndTimezone;

            SeparateTimezones = Messages.Scheduler_Editor_SeparateTimezones;

            TimezoneEditorTitle = Messages.Scheduler_Editor_TimezoneEditorTitle;

            TimezoneEditorButton = Messages.Scheduler_Editor_TimezoneEditorButton;

            EditorTitle = Messages.Scheduler_Editor_EditorTitle;
        }

        public string Title { get; set; }

        public string Start { get; set; }

        public string End { get; set; }

        public string AllDayEvent { get; set; }

        public string Description { get; set; }

        public string Repeat { get; set; }

        public string Timezone { get; set; }

        public string StartTimezone { get; set; }

        public string EndTimezone { get; set; }

        public string SeparateTimezones { get; set; }

        public string TimezoneEditorTitle { get; set; }

        public string TimezoneEditorButton { get; set; }

        public string EditorTitle { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Title != DefaultTitle)
            {
                json["title"] = Title;
            }

            if (Start != DefaultStart)
            {
                json["start"] = Start;
            }

            if (End != DefaultEnd)
            {
                json["end"] = End;
            }

            if (AllDayEvent != DefaultAllDayEvent)
            {
                json["allDayEvent"] = AllDayEvent;
            }

            if (Description != DefaultDescription)
            {
                json["description"] = Description;
            }

            if (Repeat != DefaultRepeat)
            {
                json["repeat"] = Repeat;
            }

            if (Timezone != DefaultTimezone)
            {
                json["timezone"] = Timezone;
            }

            if (StartTimezone != DefaultStartTimezone)
            {
                json["startTimezone"] = StartTimezone;
            }

            if (EndTimezone != DefaultEndTimezone)
            {
                json["endTimezone"] = EndTimezone;
            }

            if (SeparateTimezones != DefaultSeparateTimezones)
            {
                json["separateTimezones"] = SeparateTimezones;
            }

            if (TimezoneEditorTitle != DefaultTimezoneEditorTitle)
            {
                json["timezoneEditorTitle"] = TimezoneEditorTitle;
            }

            if (TimezoneEditorButton != DefaultTimezoneEditorButton)
            {
                json["timezoneEditorButton"] = TimezoneEditorButton;
            }

            if (EditorTitle != DefaultEditorTitle)
            {
                json["editorTitle"] = EditorTitle;
            }
        }
    }
}
