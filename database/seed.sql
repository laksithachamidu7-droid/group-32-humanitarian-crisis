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
    VALUES
        ('Drinking Water', 'Food and Water', 500, 'Bottles', 'Colombo');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'Rice')
    INSERT INTO Resources
        (ResourceName, Category, Quantity, Unit, Location)
    VALUES
        ('Rice', 'Food', 200, 'Kg', 'Gampaha');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'First Aid Kits')
    INSERT INTO Resources
        (ResourceName, Category, Quantity, Unit, Location)
    VALUES
        ('First Aid Kits', 'Medical', 100, 'Kits', 'Negombo');

IF NOT EXISTS (SELECT 1 FROM Resources WHERE ResourceName = 'Blankets')
    INSERT INTO Resources
        (ResourceName, Category, Quantity, Unit, Location)
    VALUES
        ('Blankets', 'Clothing', 150, 'Pieces', 'Kandy');
GO

-- Insert Shelters
IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Negombo Relief Center')
    INSERT INTO Shelters
        (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES
        ('Negombo Relief Center', 'Negombo', 200, 50);

IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Colombo Emergency Shelter')
    INSERT INTO Shelters
        (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES
        ('Colombo Emergency Shelter', 'Colombo', 300, 100);

IF NOT EXISTS (SELECT 1 FROM Shelters WHERE ShelterName = 'Gampaha Safe Center')
    INSERT INTO Shelters
        (ShelterName, Location, Capacity, CurrentOccupancy)
    VALUES
        ('Gampaha Safe Center', 'Gampaha', 150, 40);
GO

-- Insert Users
IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'admin@reliefai.com')
    INSERT INTO Users
        (FullName, Email, Phone, PasswordHash, RoleId)
    SELECT
        'Admin User',
        'admin@reliefai.com',
        '0711111111',
        'AQAAAAIAAYagAAAAEN3101szoMmdaeMO/X8OgMz5GQGusis2lb5otg+qX8UbzwFCBsH48lH7HDIgxglzJQ==',
        RoleId
    FROM Roles
    WHERE RoleName = 'Admin';

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'nimal@gmail.com')
    INSERT INTO Users
        (FullName, Email, Phone, PasswordHash, RoleId)
    SELECT
        'Nimal Perera',
        'nimal@gmail.com',
        '0722222222',
        'AQAAAAIAAYagAAAAENL22A7e7SPCn72sV4OENJ/ljYZD3uaP1Qqx+zBMU03N+4PSUlyvsuC5Nyjuk3Mmzw==',
        RoleId
    FROM Roles
    WHERE RoleName = 'Victim';

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'kamal@gmail.com')
    INSERT INTO Users
        (FullName, Email, Phone, PasswordHash, RoleId)
    SELECT
        'Kamal Silva',
        'kamal@gmail.com',
        '0733333333',
        'AQAAAAIAAYagAAAAELxxD3ojudAusO0qQgbfV2srojftvFpSl21TFjDRUIvhbgrUNuoum5zax7Swfj+syw==',
        RoleId
    FROM Roles
    WHERE RoleName = 'Volunteer';

IF NOT EXISTS (SELECT 1 FROM Users WHERE Email = 'saman@gmail.com')
    INSERT INTO Users
        (FullName, Email, Phone, PasswordHash, RoleId)
    SELECT
        'Saman Fernando',
        'saman@gmail.com',
        '0744444444',
        'AQAAAAIAAYagAAAAEOeKyx7BdHz72/CqSnVwoYiXs4IEW1XoHfnZTYecFMQKlxxbhX721643sLINhiPfBA==',
        RoleId
    FROM Roles
    WHERE RoleName = 'Donor';
GO

-- Insert Assistance Requests
DECLARE @VictimUserId INT;

SELECT @VictimUserId = UserId
FROM Users
WHERE Email = 'nimal@gmail.com';

IF @VictimUserId IS NULL
    THROW 50001, 'Victim user not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AssistanceRequests
    WHERE UserId = @VictimUserId
      AND HelpType = 'Food'
      AND Location = 'Negombo'
)
    INSERT INTO AssistanceRequests
        (UserId, HelpType, Urgency, Location, PeopleAffected, Description)
    VALUES
        (@VictimUserId, 'Food', 'High', 'Negombo', 5, 'Food assistance required');

IF NOT EXISTS (
    SELECT 1
    FROM AssistanceRequests
    WHERE UserId = @VictimUserId
      AND HelpType = 'Drinking Water'
      AND Location = 'Gampaha'
)
    INSERT INTO AssistanceRequests
        (UserId, HelpType, Urgency, Location, PeopleAffected, Description)
    VALUES
        (@VictimUserId, 'Drinking Water', 'High', 'Gampaha', 4, 'Drinking water required');

IF NOT EXISTS (
    SELECT 1
    FROM AssistanceRequests
    WHERE UserId = @VictimUserId
      AND HelpType = 'Medical'
      AND Location = 'Colombo'
)
    INSERT INTO AssistanceRequests
        (UserId, HelpType, Urgency, Location, PeopleAffected, Description)
    VALUES
        (@VictimUserId, 'Medical', 'Critical', 'Colombo', 2, 'Medical assistance required');

IF NOT EXISTS (
    SELECT 1
    FROM AssistanceRequests
    WHERE UserId = @VictimUserId
      AND HelpType = 'Shelter'
      AND Location = 'Kandy'
)
    INSERT INTO AssistanceRequests
        (UserId, HelpType, Urgency, Location, PeopleAffected, Description)
    VALUES
        (@VictimUserId, 'Shelter', 'Medium', 'Kandy', 6, 'Temporary shelter required');
GO

-- Insert Volunteers
DECLARE @VolunteerUserId INT;

SELECT @VolunteerUserId = UserId
FROM Users
WHERE Email = 'kamal@gmail.com';

IF @VolunteerUserId IS NULL
    THROW 50002, 'Volunteer user not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM Volunteers
    WHERE UserId = @VolunteerUserId
)
    INSERT INTO Volunteers
        (UserId, Skills, Availability, Location)
    VALUES
        (@VolunteerUserId, 'First Aid, Rescue Support', 'Available', 'Negombo');
GO

-- Insert Resource Allocations
DECLARE @ResourceId INT;
DECLARE @RequestId INT;
DECLARE @VictimId INT;

SELECT @VictimId = UserId
FROM Users
WHERE Email = 'nimal@gmail.com';

IF @VictimId IS NULL
    THROW 50004, 'Victim user not found for resource allocations.', 1;

-- Drinking Water -> Food request
SET @ResourceId = NULL;
SET @RequestId = NULL;

SELECT @ResourceId = ResourceId
FROM Resources
WHERE ResourceName = 'Drinking Water';

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Food'
  AND Location = 'Negombo';

IF @ResourceId IS NULL OR @RequestId IS NULL
    THROW 50010, 'Drinking Water resource or Food request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM ResourceAllocations
    WHERE ResourceId = @ResourceId
      AND RequestId = @RequestId
)
    INSERT INTO ResourceAllocations (ResourceId, RequestId, Quantity)
    VALUES (@ResourceId, @RequestId, 50);

-- Rice -> Drinking Water request
SET @ResourceId = NULL;
SET @RequestId = NULL;

SELECT @ResourceId = ResourceId
FROM Resources
WHERE ResourceName = 'Rice';

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Drinking Water'
  AND Location = 'Gampaha';

IF @ResourceId IS NULL OR @RequestId IS NULL
    THROW 50011, 'Rice resource or Drinking Water request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM ResourceAllocations
    WHERE ResourceId = @ResourceId
      AND RequestId = @RequestId
)
    INSERT INTO ResourceAllocations (ResourceId, RequestId, Quantity)
    VALUES (@ResourceId, @RequestId, 25);

-- First Aid Kits -> Medical request
SET @ResourceId = NULL;
SET @RequestId = NULL;

SELECT @ResourceId = ResourceId
FROM Resources
WHERE ResourceName = 'First Aid Kits';

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Medical'
  AND Location = 'Colombo';

IF @ResourceId IS NULL OR @RequestId IS NULL
    THROW 50012, 'First Aid Kits resource or Medical request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM ResourceAllocations
    WHERE ResourceId = @ResourceId
      AND RequestId = @RequestId
)
    INSERT INTO ResourceAllocations (ResourceId, RequestId, Quantity)
    VALUES (@ResourceId, @RequestId, 10);

-- Blankets -> Shelter request
SET @ResourceId = NULL;
SET @RequestId = NULL;

SELECT @ResourceId = ResourceId
FROM Resources
WHERE ResourceName = 'Blankets';

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Shelter'
  AND Location = 'Kandy';

IF @ResourceId IS NULL OR @RequestId IS NULL
    THROW 50013, 'Blankets resource or Shelter request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM ResourceAllocations
    WHERE ResourceId = @ResourceId
      AND RequestId = @RequestId
)
    INSERT INTO ResourceAllocations (ResourceId, RequestId, Quantity)
    VALUES (@ResourceId, @RequestId, 20);
GO

-- Insert Volunteer Assignments
DECLARE @VolunteerId INT;
DECLARE @VictimId INT;
DECLARE @RequestId INT;

SELECT @VolunteerId = VolunteerId
FROM Volunteers v
INNER JOIN Users u ON v.UserId = u.UserId
WHERE u.Email = 'kamal@gmail.com';

SELECT @VictimId = UserId
FROM Users
WHERE Email = 'nimal@gmail.com';

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Food'
  AND Location = 'Negombo';

IF @VolunteerId IS NULL OR @RequestId IS NULL
    THROW 50003, 'Volunteer or assistance request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM VolunteerAssignments
    WHERE VolunteerId = @VolunteerId
      AND RequestId = @RequestId
)
    INSERT INTO VolunteerAssignments
        (VolunteerId, RequestId, TaskDescription, Status)
    VALUES
        (@VolunteerId, @RequestId, 'Deliver food supplies', 'Assigned');
GO

-- Insert AI Recommendations
DECLARE @VictimId INT;
DECLARE @RequestId INT;

SELECT @VictimId = UserId
FROM Users
WHERE Email = 'nimal@gmail.com';

IF @VictimId IS NULL
    THROW 50014, 'Victim user not found for AI recommendations.', 1;

-- Food recommendation
SET @RequestId = NULL;

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Food'
  AND Location = 'Negombo';

IF @RequestId IS NULL
    THROW 50015, 'Food request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AIRecommendations
    WHERE RequestId = @RequestId
)
    INSERT INTO AIRecommendations (RequestId, Recommendation)
    VALUES (@RequestId, 'Prioritize food distribution to affected people.');

-- Drinking Water recommendation
SET @RequestId = NULL;

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Drinking Water'
  AND Location = 'Gampaha';

IF @RequestId IS NULL
    THROW 50016, 'Drinking Water request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AIRecommendations
    WHERE RequestId = @RequestId
)
    INSERT INTO AIRecommendations (RequestId, Recommendation)
    VALUES (@RequestId, 'Arrange safe drinking water supplies.');

-- Medical recommendation
SET @RequestId = NULL;

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Medical'
  AND Location = 'Colombo';

IF @RequestId IS NULL
    THROW 50017, 'Medical request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AIRecommendations
    WHERE RequestId = @RequestId
)
    INSERT INTO AIRecommendations (RequestId, Recommendation)
    VALUES (@RequestId, 'Prioritize medical support for affected people.');

-- Shelter recommendation
SET @RequestId = NULL;

SELECT @RequestId = RequestId
FROM AssistanceRequests
WHERE UserId = @VictimId
  AND HelpType = 'Shelter'
  AND Location = 'Kandy';

IF @RequestId IS NULL
    THROW 50018, 'Shelter request not found.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AIRecommendations
    WHERE RequestId = @RequestId
)
    INSERT INTO AIRecommendations (RequestId, Recommendation)
    VALUES (@RequestId, 'Identify suitable temporary shelter facilities.');
GO

-- Insert Notifications
DECLARE @AdminId INT;
DECLARE @VictimId INT;
DECLARE @VolunteerUserId INT;
DECLARE @DonorId INT;

SELECT @AdminId = UserId FROM Users WHERE Email = 'admin@reliefai.com';
SELECT @VictimId = UserId FROM Users WHERE Email = 'nimal@gmail.com';
SELECT @VolunteerUserId = UserId FROM Users WHERE Email = 'kamal@gmail.com';
SELECT @DonorId = UserId FROM Users WHERE Email = 'saman@gmail.com';

IF @AdminId IS NULL
   OR @VictimId IS NULL
   OR @VolunteerUserId IS NULL
   OR @DonorId IS NULL
    THROW 50008, 'One or more users not found for notifications.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM Notifications
    WHERE UserId = @AdminId
      AND Message = 'Welcome to Relief AI system, Admin.'
)
    INSERT INTO Notifications (UserId, Message)
    VALUES (@AdminId, 'Welcome to Relief AI system, Admin.');

IF NOT EXISTS (
    SELECT 1
    FROM Notifications
    WHERE UserId = @VictimId
      AND Message = 'Your assistance request has been received.'
)
    INSERT INTO Notifications (UserId, Message)
    VALUES (@VictimId, 'Your assistance request has been received.');

IF NOT EXISTS (
    SELECT 1
    FROM Notifications
    WHERE UserId = @VolunteerUserId
      AND Message = 'A new volunteer task is available.'
)
    INSERT INTO Notifications (UserId, Message)
    VALUES (@VolunteerUserId, 'A new volunteer task is available.');

IF NOT EXISTS (
    SELECT 1
    FROM Notifications
    WHERE UserId = @DonorId
      AND Message = 'Thank you for supporting Relief AI.'
)
    INSERT INTO Notifications (UserId, Message)
    VALUES (@DonorId, 'Thank you for supporting Relief AI.');
GO

-- Insert Audit Logs
DECLARE @AdminId INT;
DECLARE @VictimId INT;
DECLARE @VolunteerUserId INT;
DECLARE @DonorId INT;

SELECT @AdminId = UserId FROM Users WHERE Email = 'admin@reliefai.com';
SELECT @VictimId = UserId FROM Users WHERE Email = 'nimal@gmail.com';
SELECT @VolunteerUserId = UserId FROM Users WHERE Email = 'kamal@gmail.com';
SELECT @DonorId = UserId FROM Users WHERE Email = 'saman@gmail.com';

IF @AdminId IS NULL
   OR @VictimId IS NULL
   OR @VolunteerUserId IS NULL
   OR @DonorId IS NULL
    THROW 50009, 'One or more users not found for audit logs.', 1;

IF NOT EXISTS (
    SELECT 1
    FROM AuditLogs
    WHERE UserId = @AdminId
      AND Action = 'User Login'
)
    INSERT INTO AuditLogs (UserId, Action, Details)
    VALUES (@AdminId, 'User Login', 'Admin logged into the system.');

IF NOT EXISTS (
    SELECT 1
    FROM AuditLogs
    WHERE UserId = @VictimId
      AND Action = 'Request Submitted'
)
    INSERT INTO AuditLogs (UserId, Action, Details)
    VALUES (@VictimId, 'Request Submitted', 'A new assistance request was submitted.');

IF NOT EXISTS (
    SELECT 1
    FROM AuditLogs
    WHERE UserId = @VolunteerUserId
      AND Action = 'Volunteer Registered'
)
    INSERT INTO AuditLogs (UserId, Action, Details)
    VALUES (@VolunteerUserId, 'Volunteer Registered', 'Volunteer registration completed.');

IF NOT EXISTS (
    SELECT 1
    FROM AuditLogs
    WHERE UserId = @DonorId
      AND Action = 'User Login'
)
    INSERT INTO AuditLogs (UserId, Action, Details)
    VALUES (@DonorId, 'User Login', 'Donor logged into the system.');
GO
