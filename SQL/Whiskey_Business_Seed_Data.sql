USE [WhiskeyBusiness];
GO

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirstName, LastName, Email, image_url, FirebaseUserId) values (1, 'Test', 'Test', 'test@gmail.com', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 'G42tY8bldtQlLCqaAKJQbZbOXWu1');
set identity_insert [UserProfile] off


