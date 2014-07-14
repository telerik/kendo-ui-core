DROP TABLE GanttDependencies
GO

DROP TABLE GanttTasks
GO

CREATE TABLE GanttDependencies (
    ID INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    PredecessorID INTEGER NOT NULL,
    SuccessorID INTEGER NOT NULL,
    Type INTEGER NOT NULL
)

GO
/****** Object:  Table GanttTasks    Script Date: 6/10/2014 2:13:08 PM ******/
CREATE TABLE GanttTasks (
    ID INTEGER PRIMARY KEY ASC AUTOINCREMENT,
    ParentID INTEGER NULL,
    OrderID INTEGER NOT NULL,
    Title TEXT NOT NULL,
    Start NUMBER NOT NULL,
    End NUMBER NOT NULL,
    PercentComplete REAL NOT NULL,
    Expanded INTEGER NOT NULL,
    Summary INTEGER NOT NULL
)

GO

INSERT INTO GanttDependencies (ID, PredecessorID, SuccessorID, Type) VALUES
(528, 18, 19, 1),
(533, 22, 23, 1),
(534, 23, 24, 1),
(535, 24, 26, 1),
(536, 26, 27, 1),
(537, 26, 28, 1),
(538, 27, 29, 1),
(539, 28, 29, 0),
(540, 29, 32, 1),
(541, 29, 33, 1),
(543, 29, 36, 1),
(544, 34, 35, 1),
(545, 32, 33, 0),
(546, 33, 17, 1),
(547, 35, 17, 1),
(548, 38, 17, 1),
(549, 36, 37, 1),
(550, 37, 38, 1),
(551, 13, 29, 0),
(553, 18, 20, 1),
(554, 20, 39, 1),
(555, 19, 39, 1),
(556, 39, 22, 1)

GO

INSERT INTO GanttTasks (ID, ParentID, OrderID, Title, Start, End, PercentComplete, Expanded, Summary) VALUES
(7, NULL, 0, 'Software validation, research and implementation', 1401685200000, 1405141200000, 0.43, 1, 1),
(11, 7, 1, 'Research', 1401685200000, 1402117200000, 0.43, 1, 1),
(12, 7, 2, 'Design', 1402290000000, 1402722000000, 0.60, 1, 1),
(13, 7, 3, 'Implementation', 1402462800000, 1404277200000, 0.77, 1, 1),
(14, 7, 4, 'Testing', 1404104400000, 1404536400000, 0.52, 1, 1),
(17, 7, 7, 'Release', 1405141200000, 1405141200000, 0.00, 1, 0),
(18, 7, 0, 'Project Kickoff', 1401685200000, 1401685200000, 0.23, 1, 0),
(19, 11, 0, 'Validation with Customers', 1401685200000, 1401858000000, 0.25, 1, 0),
(20, 11, 1, 'Market Research', 1401685200000, 1401858000000, 0.82, 1, 0),
(22, 12, 0, 'UI Design', 1402290000000, 1402462800000, 0.56, 1, 0),
(23, 12, 1, 'HTML Prototype', 1402462800000, 1402722000000, 0.64, 1, 0),
(24, 13, 0, 'Prototype', 1402462800000, 1402981200000, 0.77, 1, 0),
(26, 13, 1, 'Architecture', 1402981200000, 1403067600000, 0.82, 1, 0),
(27, 13, 2, 'Data Layer', 1403067600000, 1403586000000, 1.00, 1, 0),
(28, 13, 4, 'Unit Tests', 1403067600000, 1403845200000, 0.68, 1, 0),
(29, 13, 3, 'UI and Interaction', 1403845200000, 1404277200000, 0.60, 1, 0),
(30, 7, 5, 'Documentation', 1403499600000, 1404536400000, 0.14, 1, 1),
(31, 7, 6, 'Demos', 1404104400000, 1405141200000, 0.82, 0, 1),
(32, 14, 0, 'Integration Testing', 1404104400000, 1404536400000, 0.94, 1, 0),
(33, 14, 1, 'Load Testing', 1404104400000, 1404536400000, 0.10, 1, 0),
(34, 30, 0, 'Structure', 1403499600000, 1403758800000, 0.28, 1, 0),
(35, 30, 1, 'Articles', 1403758800000, 1404536400000, 0.00, 1, 0),
(36, 31, 0, 'Structure', 1404104400000, 1404277200000, 0.94, 1, 0),
(37, 31, 1, 'Design', 1404277200000, 1404536400000, 0.80, 1, 0),
(38, 31, 2, 'Demos', 1404104400000, 1405141200000, 0.72, 1, 0),
(39, 11, 2, 'Functional and Technical Specification', 1401858000000, 1402117200000, 0.23, 1, 0)

GO

