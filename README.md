# React TypeScript Reusable Table Component

This project contains theese specific subjects;

- It was made with TypeScript.
- Pagination.
- Data search bar.
- Custom Page sizer (user can change data number which will listed at the table).
- Users can hide any column and also unhide that column if they wish.

## To Run the Project

### Back-End

- Firstly we have to install our fake backend which is Json Server.

  - At the main directory of project, right click to `backend` folder and select `Open in Integrated Terminal`.
  - And install json-server;
  - ```
    npm install -g json-server
    ```
  - After installation of json-server, we have to run json-server to fetch our data's with command line like below;

  - ```
    json-server --watch api.json --port 6161
    ```

- Our server is ready. Now, take a look for Front-End.

### Front-End

- At the main directory, just run the code below;
- ```
  npm start
  ```

## Installation is Done ! Now, you can see project in browser !

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Open [http://localhost:6161/users](http://localhost:6161/users) to view `Data's` in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Here some additional pictures;
![foto](/public/TableComponent.png)
![foto2](/public/TableComponent2.png)

## Author : [Ahmet Salih KARAGÖZ](https://github.com/krgzsalih)
