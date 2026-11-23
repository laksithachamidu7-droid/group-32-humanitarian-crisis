USE ReliefAIDB;
GO

-- Insert Roles
IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleName = 'Admin')
    INSERT INTO Roles (RoleName) VALUES ('Admin');

IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleName = 'Victim')
    INSERT INTO Roles (RoleName) VALUES ('Victim');

IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleName = 'Volunteer')
    INSERT INTO Roles (RoleName) VALUES ('Volunteer');

IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleName = 'Donor')
    INSERT INTO Roles (RoleName) VALUES ('Donor');
GO

-- Insert Resources
IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'Drinking Water')
    INSERT INTO Resources
    (ResourceName, Category, Quantity, Unit, Location)
    VALUES ('Drinking Water', 'Food and Water', 500, 'Bottles', 'Colombo');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'Rice')
    INSERT INTO Resources
    (ResourceName, Category, Quantity, Unit, Location)
    VALUES ('Rice', 'Food', 200, 'Kg', 'Gampaha');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'First Aid Kits')
    INSERT INTO Resources
    (ResourceName, Category, Quantity, Unit, Location)
    VALUES ('First Aid Kits', 'Medical', 100, 'Kits', 'Negombo');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'Blankets')
    INSERT INTO Resources
    (ResourceName, Category, Quantity, Unit, Location)
    VALUES ('Blankets', 'Clothing', 150, 'Pieces', 'Kandy');
GO

-- Insert Shelters
IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Negombo Relief Center')
    INSERT INTO Shelters
    (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES ('Negombo Relief Center', 'Negombo', 200, 50);

IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Colombo Emergency Shelter')
    INSERT INTO Shelters
    (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES ('Colombo Emergency Shelter', 'Colombo', 300, 100);

IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Gampaha Safe Center')
    INSERT INTO Shelters
    (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES ('Gampaha Safe Center', 'Gampaha', 150, 40);
GO

-- Insert Users
IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@reliefai.com')
    INSERT INTO Users
    (FullName, Email, Phone, PasswordHash, RoleId)
    VALUES
    ('Admin User', 'admin@reliefai.com', '0711111111', 'demo_hash_admin', 1);

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'nimal@gmail.com')
    INSERT INTO Users
    (FullName, Email, Phone, PasswordHash, RoleId)
    VALUES
    ('Nimal Perera', 'nimal@gmail.com', '0722222222', 'demo_hash_victim', 2);

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'kamal@gmail.com')
    INSERT INTO Users
    (FullName, Email, Phone, PasswordHash, RoleId)
    VALUES
    ('Kamal Silva', 'kamal@gmail.com', '0733333333', 'demo_hash_volunteer', 3);

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'saman@gmail.com')
    INSERT INTO Users
    (FullName, Email, Phone, PasswordHash, RoleId)
    VALUES
    ('Saman Fernando', 'saman@gmail.com', '0744444444', 'demo_hash_donor', 4);
GO

-- Insert Assistance Requests
IF NOT EXISTS (
    SELECT 1 FROM AssistanceRequests
    WHERE UserId = 2 AND HelpType = 'Food' AND Location = 'Negombo'
)
INSERT INTO AssistanceRequests
(UserId, HelpType, Urgency, Location, PeopleAffected, Description)
VALUES
(2, 'Food', 'High', 'Negombo', 5, 'Food assistance required');

IF NOT EXISTS (
    SELECT 1 FROM AssistanceRequests
    WHERE UserId = 2 AND HelpType = 'Drinking Water' AND Location = 'Gampaha'
)
INSERT INTO AssistanceRequests
(UserId, HelpType, Urgency, Location, PeopleAffected, Description)
VALUES
(2, 'Drinking Water', 'High', 'Gampaha', 4, 'Drinking water required');

IF NOT EXISTS (
    SELECT 1 FROM AssistanceRequests
    WHERE UserId = 2 AND HelpType = 'Medical' AND Location = 'Colombo'
)
INSERT INTO AssistanceRequests
(UserId, HelpType, Urgency, Location, PeopleAffected, Description)
VALUES
(2, 'Medical', 'Critical', 'Colombo', 2, 'Medical assistance required');

IF NOT EXISTS (
    SELECT 1 FROM AssistanceRequests
    WHERE UserId = 2 AND HelpType = 'Shelter' AND Location = 'Kandy'
)
INSERT INTO AssistanceRequests
(UserId, HelpType, Urgency, Location, PeopleAffected, Description)
VALUES
(2, 'Shelter', 'Medium', 'Kandy', 6, 'Temporary shelter required');

GO

-- Insert Volunteers
IF NOT EXISTS (
    SELECT 1 FROM Volunteers WHERE UserId = 3
)
INSERT INTO Volunteers
(UserId, Skills, Availability, Location)
VALUES
(3, 'First Aid, Rescue Support', 'Available', 'Negombo');

GO
-- Insert Resource Allocations
IF NOT EXISTS (
    SELECT 1 FROM ResourceAllocations
    WHERE ResourceId = 1 AND RequestId = 1
)
INSERT INTO ResourceAllocations
(ResourceId, RequestId, Quantity)
VALUES
(1, 1, 50);

IF NOT EXISTS (
    SELECT 1 FROM ResourceAllocations
    WHERE ResourceId = 2 AND RequestId = 2
)
INSERT INTO ResourceAllocations
(ResourceId, RequestId, Quantity)
VALUES
(2, 2, 25);

IF NOT EXISTS (
    SELECT 1 FROM ResourceAllocations
    WHERE ResourceId = 3 AND RequestId = 3
)
INSERT INTO ResourceAllocations
(ResourceId, RequestId, Quantity)
VALUES
(3, 3, 10);

IF NOT EXISTS (
    SELECT 1 FROM ResourceAllocations
    WHERE ResourceId = 4 AND RequestId = 4
)
INSERT INTO ResourceAllocations
(ResourceId, RequestId, Quantity)
VALUES
(4, 4, 20);

GO
-- Insert Volunteer Assignments
IF NOT EXISTS (
    SELECT 1 FROM VolunteerAssignments
    WHERE VolunteerId = 1 AND RequestId = 1
)
INSERT INTO VolunteerAssignments
(VolunteerId, RequestId, TaskDescription, Status)
VALUES
(1, 1, 'Deliver drinking water to affected people', 'Assigned');

GO
-- Insert AI Recommendations
IF NOT EXISTS (
    SELECT 1 FROM AIRecommendations WHERE RequestId = 1
)
INSERT INTO AIRecommendations (RequestId, Recommendation)
VALUES (1, 'Provide emergency food supplies as soon as possible.');

IF NOT EXISTS (
    SELECT 1 FROM AIRecommendations WHERE RequestId = 2
)
INSERT INTO AIRecommendations (RequestId, Recommendation)
VALUES (2, 'Arrange clean drinking water for the affected family.');

IF NOT EXISTS (
    SELECT 1 FROM AIRecommendations WHERE RequestId = 3
)
INSERT INTO AIRecommendations (RequestId, Recommendation)
VALUES (3, 'Prioritize medical assistance and first aid supplies.');

IF NOT EXISTS (
    SELECT 1 FROM AIRecommendations WHERE RequestId = 4
)
INSERT INTO AIRecommendations (RequestId, Recommendation)
VALUES (4, 'Find a temporary shelter with available capacity.');

GO
-- Insert Notifications
IF NOT EXISTS (
    SELECT 1 FROM Notifications
    WHERE UserId = 1 AND Message = 'Welcome to Relief AI system, Admin.'
)
INSERT INTO Notifications (UserId, Message)
VALUES (1, 'Welcome to Relief AI system, Admin.');

IF NOT EXISTS (
    SELECT 1 FROM Notifications
    WHERE UserId = 2 AND Message = 'Your assistance request has been received.'
)
INSERT INTO Notifications (UserId, Message)
VALUES (2, 'Your assistance request has been received.');

IF NOT EXISTS (
    SELECT 1 FROM Notifications
    WHERE UserId = 3 AND Message = 'A new volunteer task is available.'
)
INSERT INTO Notifications (UserId, Message)
VALUES (3, 'A new volunteer task is available.');

IF NOT EXISTS (
    SELECT 1 FROM Notifications
    WHERE UserId = 4 AND Message = 'Thank you for supporting Relief AI.'
)
INSERT INTO Notifications (UserId, Message)
VALUES (4, 'Thank you for supporting Relief AI.');

GO
-- Insert Audit Logs
IF NOT EXISTS (
    SELECT 1 FROM AuditLogs
    WHERE UserId = 1 AND Action = 'User Login'
)
INSERT INTO AuditLogs (UserId, Action, Details)
VALUES (1, 'User Login', 'Admin logged into the system.');

IF NOT EXISTS (
    SELECT 1 FROM AuditLogs
    WHERE UserId = 2 AND Action = 'Request Submitted'
)
INSERT INTO AuditLogs (UserId, Action, Details)
VALUES (2, 'Request Submitted', 'A new assistance request was submitted.');

IF NOT EXISTS (
    SELECT 1 FROM AuditLogs
    WHERE UserId = 3 AND Action = 'Volunteer Registered'
)
INSERT INTO AuditLogs (UserId, Action, Details)
VALUES (3, 'Volunteer Registered', 'Volunteer registration completed.');

IF NOT EXISTS (
    SELECT 1 FROM AuditLogs
    WHERE UserId = 4 AND Action = 'User Login'
)
INSERT INTO AuditLogs (UserId, Action, Details)
VALUES (4, 'User Login', 'Donor logged into the system.');

GO