USE ReliefAIDB;
GO

-- Insert Roles
INSERT INTO Roles (RoleName)
VALUES
('Admin'),
('Victim'),
('Volunteer'),
('Donor');
GO

-- Insert Resources
INSERT INTO Resources (ResourceName, Category, Quantity, Unit, Location)
VALUES
('Drinking Water', 'Food and Water', 500, 'Bottles', 'Colombo'),
('Rice', 'Food', 200, 'Kg', 'Gampaha'),
('First Aid Kits', 'Medical', 100, 'Kits', 'Negombo'),
('Blankets', 'Clothing', 150, 'Pieces', 'Kandy');
GO

-- Insert Shelters
INSERT INTO Shelters
(ShelterName, Location, Capacity, CurrentOccupancy)
VALUES
('Negombo Relief Center', 'Negombo', 200, 50),
('Colombo Emergency Shelter', 'Colombo', 300, 100),
('Gampaha Safe Center', 'Gampaha', 150, 40);
GO