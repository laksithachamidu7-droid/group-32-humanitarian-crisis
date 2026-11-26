USE ReliefAIDB;
GO

-- 1. Roles Table
CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- 2. Users Table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    PasswordHash NVARCHAR(255) NOT NULL,
    RoleId INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
);
GO

-- 3. Assistance Requests Table
CREATE TABLE AssistanceRequests (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    HelpType NVARCHAR(100) NOT NULL,
    Urgency NVARCHAR(30) NOT NULL,
    Location NVARCHAR(200) NOT NULL,
    Latitude DECIMAL(10,7),
    Longitude DECIMAL(10,7),
    PeopleAffected INT NOT NULL,
    Description NVARCHAR(MAX),
    Status NVARCHAR(30) DEFAULT 'Pending',
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- 4. Resources Table
CREATE TABLE Resources (
    ResourceId INT IDENTITY(1,1) PRIMARY KEY,
    ResourceName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(100),
    Quantity INT NOT NULL DEFAULT 0,
    Unit NVARCHAR(30),
    Location NVARCHAR(200),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);
GO

-- 5. Shelters Table
CREATE TABLE Shelters (
    ShelterId INT IDENTITY(1,1) PRIMARY KEY,
    ShelterName NVARCHAR(150) NOT NULL,
    Location NVARCHAR(200) NOT NULL,
    Latitude DECIMAL(10,7),
    Longitude DECIMAL(10,7),
    Capacity INT NOT NULL,
    CurrentOccupancy INT NOT NULL DEFAULT 0
);
GO

-- 6. Volunteers Table
CREATE TABLE Volunteers (
    VolunteerId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    Skills NVARCHAR(300),
    Availability NVARCHAR(50),
    Location NVARCHAR(200),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- 7. Resource Allocations Table
CREATE TABLE ResourceAllocations (
    AllocationId INT IDENTITY(1,1) PRIMARY KEY,
    ResourceId INT NOT NULL,
    RequestId INT NOT NULL,
    Quantity INT NOT NULL,
    AllocatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ResourceId) REFERENCES Resources(ResourceId),
    FOREIGN KEY (RequestId) REFERENCES AssistanceRequests(RequestId)
);
GO

-- 8. Volunteer Assignments Table
CREATE TABLE VolunteerAssignments (
    AssignmentId INT IDENTITY(1,1) PRIMARY KEY,
    VolunteerId INT NOT NULL,
    RequestId INT,
    TaskDescription NVARCHAR(500),
    Status NVARCHAR(30) DEFAULT 'Assigned',
    AssignedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (VolunteerId) REFERENCES Volunteers(VolunteerId),
    FOREIGN KEY (RequestId) REFERENCES AssistanceRequests(RequestId)
);
GO

-- 9. AI Recommendations Table
CREATE TABLE AIRecommendations (
    RecommendationId INT IDENTITY(1,1) PRIMARY KEY,
    RequestId INT NOT NULL,
    Recommendation NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (RequestId) REFERENCES AssistanceRequests(RequestId)
);
GO

-- 10. Notifications Table
CREATE TABLE Notifications (
    NotificationId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Message NVARCHAR(500) NOT NULL,
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO

-- 11. Audit Logs Table
CREATE TABLE AuditLogs (
    LogId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT,
    Action NVARCHAR(200) NOT NULL,
    Details NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
GO
-- Add CHECK Constraints

ALTER TABLE Resources
ADD CONSTRAINT CK_Resources_Quantity
CHECK (Quantity >= 0);

ALTER TABLE AssistanceRequests
ADD CONSTRAINT CK_AssistanceRequests_PeopleAffected
CHECK (PeopleAffected > 0);

ALTER TABLE Shelters
ADD CONSTRAINT CK_Shelters_Capacity
CHECK (Capacity >= 0);

ALTER TABLE Shelters
ADD CONSTRAINT CK_Shelters_CurrentOccupancy
CHECK (CurrentOccupancy >= 0 AND CurrentOccupancy <= Capacity);

ALTER TABLE ResourceAllocations
ADD CONSTRAINT CK_ResourceAllocations_Quantity
CHECK (Quantity > 0);

GO