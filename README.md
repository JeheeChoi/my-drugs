
# Full Stack Project - MyDrugs (Back End)
*This is a student project*

- A drug prescription app that allows user to create/delete/update prescriptions.
- I've thought about this app idea when I personally experienced how impossible it is
to remember the names of the meds/when did I get it/refill/dr's name/description/etc.
- Any patients who get prescriptions from a doctor

### Timetable

- Day 1 - Setting up repos, READme, consulting with instructor, pseudo code, start working on userSchema
- Day 2 - Working on user - server.js/model/user routes/curl scripts
- Day 3 - Working on prescription - server.js/model/prescription routes/curl scripts
- Day 4 - Finishing up Working on front end

During the project my schedule's got adjusted as:

- Day 1 - Setting up repos, READme, consulting with instructor, start working on userSchema & back end routes
- Day 2 - Worked on back end CRUD and front end CRUD at the same time. Completed both back end/front end's 'Get' completed. 
- Day 3 - Completed Get/Post 
- Day 4 - Completed Patch/Delete and finished ui
- Extra days - Fixed hide/show issues

### Unsolved Problems

- I need to make each prescription clickable on Update Prescription page, so that user can select the prescription he/she wants to update(edit)
- I would like to make the update prescription form card to be collapsed from the selected prescription to be updated
- I would like to update client side Create/Delete/Update process more user-friendly especially with the id# 
- I would like to add user profile feature 

### Important Links

- [Project Repo Front End](https://github.com/JeheeChoi/my-drugs-client)
- [Project Repo Back End](https://github.com/JeheeChoi/my-drugs)
- [Deployed API](https://salty-woodland-25840.herokuapp.com/prescriptions)
- [Deployed Client](https://jeheechoi.github.io/my-drugs-client/)

### Technologies Used

- JavaScript
- HTML/CSS
- jQuery
- Express
- MongoDB
- Mongoose

### User stories

- User can sign up/sign in/sign out/change pw
- User can create(add) a record of a prescription
- User can see all the prescriptions that are stored
- User can update the prescriptions(log side effects, likes/dislikes)
- User can delete(archieve) the prescriptions

### Resources

resources: user, prescription
User attributes: firstName, lastName, DOB
Prescription attributes: drugName, description, orderBy(dr's name), date, refills?


### ERD (entity relationship diagram)

One to many relationship: a user to many prescriptions.
user routes-prescription routes
![ERD1](https://i.imgur.com/ctfBUsw.png)
https://imgur.com/a/NTsBb3s


### Wireframes

![wireframe1](https://i.imgur.com/GNA3lxo.png)
https://imgur.com/a/EnDex7R


