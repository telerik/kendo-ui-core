#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

YEARS_TO_ADD = Time.now.year - 2009

puts %Q{
    DROP TABLE Meetings;

    CREATE TABLE Meetings (
        [MeetingID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [Start] INT NOT NULL,
        [End] INT NOT NULL,
        [Title] TEXT,
        [Description] TEXT,
        [RecurrenceRule] TEXT,
        [RecurrenceException] TEXT,
        [RecurrenceID] INT,
        [IsAllDay] INT NOT NULL,
        [RoomID] INT
    );

    DROP TABLE MeetingAtendees;

    CREATE TABLE MeetingAtendees (
        [MeetingID] INTEGER,
        [AtendeeID] INTEGER
    );

    DROP TABLE Tasks;

    CREATE TABLE Tasks (
        [TaskID] INTEGER PRIMARY KEY AUTOINCREMENT,
        [Start] INT NOT NULL,
        [End] INT NOT NULL,
        [Title] TEXT,
        [Description] TEXT,
        [RecurrenceRule] TEXT,
        [RecurrenceException] TEXT,
        [RecurrenceID] INT,
        [IsAllDay] INT NOT NULL,
        [OwnerID] INT
    );


    BEGIN TRANSACTION;
}

def parse_date(d)
    DateTime.iso8601(d.sub(" ", "T"))
end

CSV.foreach('meetings.csv', :headers => true) do |row|
    start_date = parse_date(row['Start'])
    end_date = parse_date(row['End'])

    puts %Q{
    INSERT INTO Meetings
        ([MeetingID], [Start], [End], [Title], [Description], [RecurrenceException], [RecurrenceRule], [RecurrenceID], [IsAllDay], [RoomID])
    VALUES
        (#{row['MeetingID']}, #{start_date.to_time.to_i * 1000}, #{end_date.to_time.to_i * 1000}, "#{row['Title']}", "#{row['Description']}", "#{row['RecurrenceException']}",  "#{row['RecurrenceRule']}", "#{row['RecurrenceID']}", #{row['IsAllDay'] == 'True' ? 1 : 0}, #{row['RoomID']});
    }
end

CSV.foreach('tasks.csv', :headers => true) do |row|
    start_date = parse_date(row['Start'])
    end_date = parse_date(row['End'])

    puts %Q{
    INSERT INTO Tasks
        ([TaskID], [Start], [End], [Title], [Description], [RecurrenceException], [RecurrenceRule], [RecurrenceID], [IsAllDay], [OwnerID])
    VALUES
        (#{row['TaskID']}, #{start_date.to_time.to_i * 1000}, #{end_date.to_time.to_i * 1000}, "#{row['Title']}", "#{row['Description']}", "#{row['RecurrenceException']}",  "#{row['RecurrenceRule']}", "#{row['RecurrenceID']}", #{row['IsAllDay'] == 'True' ? 1 : 0}, #{row['OwnerID']});
    }
end

CSV.foreach('meeting-atendees.csv', :headers => true) do |row|
    puts %Q{
    INSERT INTO MeetingAtendees
        ([MeetingID], [AtendeeID])
    VALUES
        (#{row['MeetingID']}, #{row['AtendeeID']});
    }
end

puts %Q{
    COMMIT TRANSACTION;
}
