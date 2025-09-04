# **Simple CRM \- Frontend UI**

This project is a modern single-page application (SPA) built with Angular. It provides a clean, responsive, and user-friendly interface for the Simple CRM backend, allowing users to manage their business data effectively.

## **✨ Features**

* **Component-Based Architecture:** A well-organized structure with components for each feature (Contacts, Companies, Deals, Dashboard).  
* **Secure JWT Handling:** Implements a login page, an auth guard to protect routes, and an HTTP interceptor to automatically attach the authentication token to all API requests.  
* **Reactive Forms:** Uses Angular's powerful Reactive Forms for robust data entry and validation.  
* **Dynamic Routing:** A full routing module for navigating between different views.  
* **User-Friendly Notifications:** Uses ngx-toastr to provide clear feedback for user actions.  
* **Dashboard View:** A central dashboard with metric cards and a custom bar chart to visualize data.  
* **Consistent UI/UX:** A global stylesheet and shared layout classes provide a consistent and professional look and feel.

## **🛠️ Tech Stack**

* **Framework:** Angular (v17+)  
* **Language:** TypeScript  
* **Styling:** CSS3  
* **State Management:** Services with RxJS  
* **UI Libraries:** ngx-toastr for notifications

## **✅ Prerequisites**

Before you begin, ensure you have the following installed on your machine:

* **Node.js:** LTS version (18.x or later is recommended). [Download Node.js](https://nodejs.org/)  
* **Angular CLI:** After installing Node.js, run npm install \-g @angular/cli in your terminal.  
* **The Simple CRM Backend API** must be running for the UI to function.

## **🚀 Setup and Installation**

1. **Clone the repository:**  
    ```git clone \<your-repo-url\>```

2. **Navigate to the project folder:**  
   ```cd crm-ui```

3. **Install Dependencies:**  
   ```npm install```

4. **Configure the API URL:**  
   Open the file src/environments/environment.ts and ensure the apiUrl property points to the URL where your backend API is running.  
   ```
   export const environment \= {  
     production: false,  
     apiUrl: 'https://localhost:7123/api' // Your .NET API's URL  
   };
   ```

5. **Run the Application:**  
   ```
   ng serve \--open
   ```

   Your browser will automatically open to http://localhost:4200, and you will be redirected to the login page. You can log in with the default super admin credentials (admin@example.com).