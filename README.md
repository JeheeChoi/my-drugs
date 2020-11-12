
# Full Stack Project - MyDrugs (back end)

This project is a student work

- A drug prescription app(stores the prescription and the drug info)
- I've thought about this app idea when I personally experienced how impossible it is
to remember the names of the meds/when did I get it/refill?/dr's name?/description/etc.
- Any patients who get prescriptions from a doctor

## Important Links

- [Project Repo] (https://github.com/JeheeChoi/my-drugs-client)
- [Deployed API](https://salty-woodland-25840.herokuapp.com/prescriptions)
- [Deployed Client](https://jeheechoi.github.io/my-drugs-client/)


### User stories

- User can sign up/sign in/sign out/change pw
- User can create(add) a record of a prescription
- User can see all the prescriptions that are stored
- User can update the prescriptions(log side effects, likes/dislikes)
- User can delete(archieve) the prescriptions


## Wireframes

Please create a wireframe of your planned front end.

![wireframe1](https://i.imgur.com/GNA3lxo.png)
https://imgur.com/a/EnDex7R


## Resources

What resources will you need? What will the attributes and relationships be?


resources: user, prescription
User attributes: firstName, lastName, DOB
Prescription attributes: drugName, description, orderBy(dr's name), date, refills?



## ERD (entity relationship diagram)


One to many relationship: a user to many prescriptions.
![ERD1](https://i.imgur.com/ctfBUsw.png)
https://imgur.com/a/NTsBb3s


## Routing

What routes will you need to make the proper request to your API?


user routes
prescription routes


## Timetable

Write a basic timetable for yourself, you don't have to stick to it but it
helps to go in with a plan.


Day 1 - Setting up repos, READme, consulting with instructor, pseudo code, start working on userSchema
Day 2 - Working on user - server.js/model/user routes/curl scripts
Day 3 - Working on prescription - server.js/model/prescription routes/curl scripts
Day 4 - Finishing up Working on front end
