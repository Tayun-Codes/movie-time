# Movie Forum Full-Stack App
This is a full-stack application that features private personal movie ratings that can be published to a communal forum.
Create an account or login and access your personal list. Add the movie title, the date you watched it, as well as a comment. Once the movie is inputted you can click on the stars to rate them.
You can also choose to publish your comment to a public forum and view other published reviews on the movie page.

![스크린샷 2024-11-25 001337](https://github.com/user-attachments/assets/e73bbe32-7d59-4fc2-bb61-547fe7040022)
![스크린샷 2024-11-25 003609](https://github.com/user-attachments/assets/0f3b8f1e-39c6-41e5-a81f-1dc61736f96e)
![스크린샷 2024-11-25 003619](https://github.com/user-attachments/assets/479f28d8-3452-45f8-ab66-0ee04d4d33c2)


## How It's Made:
The Movie Forum is built using the following technologies:

- **Node.js**: Utilized for server-side development.
- **JavaScript (JS)**: Employed for both client and server-side functionality.
- **MongoDB**: Used as the database to store unique user and movie data.
The core functionality is implemented on the server side using CRUD (Create, Read, Update, Delete) operations, enabling the handling of user ratings and movie specific data. On the client side, event listeners are employed. Users initiate CRUD functions by filling out forms and clicking buttons on the interface.

**Key Packages Used:**

- **mongoose**: Facilitates interaction with MongoDB.
- **passport**: Handles user authentication.
- **express**: Provides a framework for building the web application.

## What I Learned
- **Dynamically create unique documents** to store user and movie specific data
- **Code Organization** to clearly route client and server side data

## Have fun!
Interact and play with this full-stack app [here](https://movie-time-u0zn.onrender.com/)!
Feel free to use these two accounts that have some movie reviews already written.
- **Email**: cosisa@velvet-mag.lat **Password**: 123
- **Email**: tafomola@velvet-mag.lat **Password**: 123

If you would like to download my code and connect your own MongoDB databse to it make a database.js document in the root folder with this format:
```
module.exports = {

    'url': 'mongodb cluster Url',
    'dbName': 'dbName'
};
```
Make sure that in the url you include the dbName between "mongodb.net/" and "?retryWrites" should look like this: 'url': '...mongodb.net/dbName?retryWrites...'

