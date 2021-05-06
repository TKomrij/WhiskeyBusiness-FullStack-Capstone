USE [master]

IF db_id('WhiskeyBusiness') IS NULl
  CREATE DATABASE [WhiskeyBusiness]
GO

USE [WhiskeyBusiness]
GO

CREATE TABLE [UserProfile] (
  [id] int PRIMARY KEY IDENTITY,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
  [FirebaseUserId] nvarchar(28) NOT NULL
)
GO

CREATE TABLE [Note] (
  [id] int PRIMARY KEY IDENTITY,
  [UserProfileId] int NOT NULL,
  [WhiskeyId] int NOT NULL,
  [Description] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Favorite] (
  [id] int PRIMARY KEY IDENTITY,
  [UserProfileId] int NOT NULL,
  [WhiskeyId] int NOT NULL
)
GO

CREATE TABLE [TagNote] (
  [id] int PRIMARY KEY IDENTITY,
  [TagId] int NOT NULL,
  [NoteId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Whiskey] (
  [id] int PRIMARY KEY IDENTITY,
  [WhiskeyApiId] int NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Note] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([id])
GO

ALTER TABLE [TagNote] ADD FOREIGN KEY ([NoteId]) REFERENCES [Note] ([id])
GO

ALTER TABLE [TagNote] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([id])
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([WhiskeyId]) REFERENCES [Whiskey] ([id])
GO
