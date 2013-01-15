#!/usr/bin/ruby
require 'csv'

# Switch to CRLF in output
$/ = "\r\n"

YEARS_TO_ADD = Time.now.year - 2009
DATE_FORMAT = '%d-%m-%Y %H:%M:%S'

puts %Q{
    CREATE TABLE Intraday (
        [ID] INT IDENTITY(1,1) NOT NULL,
        [Symbol] VARCHAR(10) NOT NULL,
        [Date] DATETIME NOT NULL,
        [Open] DECIMAL(9,3) NOT NULL,
        [High] DECIMAL(9,3) NOT NULL,
        [Low] DECIMAL(9,3) NOT NULL,
        [Close] DECIMAL(9,3) NOT NULL,
        [Volume] BIGINT NOT NULL
    )
    GO

    CREATE INDEX IX_Intraday_Date
        ON Intraday ([Date])
    GO
}

CSV.foreach('data.csv', :headers => true) do |row|
    date = DateTime.strptime("#{row['Date']} #{row['Time']}", '%m/%d/%Y %H:%M')
    date = date << -YEARS_TO_ADD * 12

    puts %Q{
    INSERT INTO Intraday
        ([Symbol], [Date], [Open], [High], [Low], [Close], [Volume])
    VALUES
        ('ACME', CONVERT(DATETIME, '#{date.strftime(DATE_FORMAT)}', 103), #{row['Open']}, #{row['High']}, #{row['Low']}, #{row['Close']}, #{row['Volume']})
    }
end
