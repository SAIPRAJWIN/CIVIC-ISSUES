# 🚀 Project: JanConnect AI (Civic Engagement Platform)

![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Generative AI](https://img.shields.io/badge/generative--ai-%23FF6F00.svg?style=for-the-badge)
![Google Maps API](https://img.shields.io/badge/google%20maps-API-%234285F4.svg?style=for-the-badge&logo=googlemaps&logoColor=white)
![India Post API](https://img.shields.io/badge/india%20post-API-%23CC0000.svg?style=for-the-badge)
![ReportLab PDF](https://img.shields.io/badge/reportlab-PDF-%2300599C.svg?style=for-the-badge&logo=file&logoColor=white)



This project is a comprehensive, Flask-based web application designed to modernize civic engagement. It serves as a vital bridge between citizens and city administration, providing a streamlined platform for reporting civic issues, tracking their resolution, and fostering community interaction through an intelligent AI assistant. The platform features distinct, feature-rich portals for both regular users and administrators.

---
### **Table of Contents**
1. [Project Screenshots](#-project-screenshots)
2. [Features in Detail](#-features-in-detail)
3. [Technology Stack](#-technology-stack)
4. [Getting Started](#-getting-started)
5. [Project Structure](#-project-structure)
6. [Architectural Highlights](#️-architectural-highlights)

---
### 📸 **Project Screenshots**

A showcase of the application's clean, responsive, and feature-rich user interface, available in both light and dark themes.

#### **The Citizen's Journey**

* **1. Main Landing Page:** The user is introduced to the platform's mission and can easily navigate to the citizen or admin portals.

<img width="1350" height="642" alt="image" src="https://github.com/user-attachments/assets/03450593-3626-4b12-840d-ca4d2b36ff25" />

---

* **2. Registration:** New users can create a secure account by providing their details through a validated registration form.

<img width="1350" height="643" alt="image" src="https://github.com/user-attachments/assets/bb7cfc46-5752-4c5e-9e66-6cd2244ffa56" />

---

* **3. Login:** Registered users can securely access their personalized portal by entering their credentials.

<img width="1349" height="643" alt="image" src="https://github.com/user-attachments/assets/503606d2-348a-44f1-8de4-9c2c8e2877be" />

---

* **4. User Dashboard:** After logging in, the user is greeted with a personalized dashboard summarizing their activity and recent submissions.

<img width="1350" height="642" alt="image" src="https://github.com/user-attachments/assets/7f84f537-826b-4d17-9dea-39a533d5596d" />

---

* **5. Report an Issue:** The user can fill out an intuitive, multi-step form to report a new civic issue, complete with location details and image uploads.

<img width="1348" height="644" alt="image" src="https://github.com/user-attachments/assets/f71697c3-fe50-4543-bd90-525e4202216a" />

---

* **6. My Submissions:** The user can view a comprehensive list of all their previously reported issues and see their current status at a glance.

<img width="1348" height="643" alt="image" src="https://github.com/user-attachments/assets/fd4ce4b5-a27a-4cb5-bed2-332b9857c451" />

---
* **7. Check Status:** Anyone can track the progress of a specific issue by entering its unique tracking ID, promoting transparency.

<img width="1350" height="640" alt="image" src="https://github.com/user-attachments/assets/cf8bd9bf-97e1-485a-985f-99717de8f4e4" />

---

* **8. Viewing the Report:** Upon submission, the user receives a unique ID and can view a detailed, professional report of their submission, which can be printed or saved as a PDF.

<img width="1350" height="639" alt="image" src="https://github.com/user-attachments/assets/0e72047b-c3be-45e4-886f-c219b86cc0b4" />

---

* **9. Submitting Feedback:** The user can provide valuable feedback and rate their experience with the platform to help improve the service.

<img width="1349" height="640" alt="image" src="https://github.com/user-attachments/assets/3bab6c7d-2357-45c5-a123-27f6687c06a4" />

---

* **10. Managing Profile:** Users can view and update their personal information, manage their password, and customize their profile photo.

<img width="1349" height="644" alt="image" src="https://github.com/user-attachments/assets/e67166aa-64af-46ce-a1e4-7d872313cb2f" />

---

* **11. AI Chatbot:** The user can interact with an intelligent AI assistant to get help, ask questions about city services, or get guidance on reporting an issue.

<img width="1362" height="643" alt="image" src="https://github.com/user-attachments/assets/9bcc579c-7837-4600-b14d-5856148a7f44" />

---
### **Administrator's Journey**

* **1. Admin Login:** Administrators securely access their dedicated management portal through a separate login page.
<img width="1349" height="645" alt="image" src="https://github.com/user-attachments/assets/7f570d27-08ca-42bf-b9cf-62e1601a2dd2" />

---

* **2. Admin Dashboard:** The admin is presented with a high-level overview of all platform activity, including key metrics and real-time analytics.

<img width="1347" height="643" alt="image" src="https://github.com/user-attachments/assets/62bd99cf-ab9a-4b14-86f2-6e37c8423f83" />

---

* **3. Managing Issues:** All user-submitted issues are displayed in a central location, where the admin can view details and update their status (e.g., from 'Submitted' to 'In Progress').

<img width="1351" height="642" alt="image" src="https://github.com/user-attachments/assets/cb063541-b175-41cd-b45c-c8c862fe343b" />

---

* **4. Managing Users:** The admin can view, search, filter, suspend, or delete user accounts through a comprehensive management interface.

<img width="1348" height="638" alt="image" src="https://github.com/user-attachments/assets/1393bf2d-314e-4177-9de9-1bbf970b9290" />

---

* **5. Viewing User Feedbacks:** The admin can review all feedback and ratings submitted by users to gauge satisfaction and identify areas for improvement.

<img width="1349" height="638" alt="image" src="https://github.com/user-attachments/assets/8ed94198-adcc-4189-8b0a-fcff8c094d9e" />

---

* **6. Viewing Analytics:** The admin can dive deep into platform-wide data with advanced analytics, charts, and trends on user engagement and issue resolution.

<img width="1351" height="642" alt="image" src="https://github.com/user-attachments/assets/c1bb93c2-a53a-4ae5-913e-4b5369214f1e" />

---

* **7. Managing "About Us" Content:** The admin can dynamically update the content of the public-facing "About Us" page, including team member profiles and guide information.

<img width="1351" height="642" alt="image" src="https://github.com/user-attachments/assets/b5e6a74e-3712-4934-85cd-573c940cd65a" />

---

* **8. Managing Admin Profile:** Administrators can manage their own account details, including their username and password.

<img width="1340" height="630" alt="image" src="https://github.com/user-attachments/assets/54ff0ac0-6416-4949-9187-82379c9a1ae8" />

---
### ✨ **Features in Detail**

The platform is divided into two main portals, each with a suite of powerful features:

#### **Citizen Portal**
* **Intelligent Issue Reporting**: An intuitive, multi-step form for users to report civic issues, complete with image uploads for evidence.
* **Real-Time Status Tracking**: A dedicated page for users to check the live status of their reported issues using a unique tracking ID.
* **Personalized Dashboard**: A user-specific dashboard visualizing personal submission statistics and trends using dynamic charts.
* **AI Chatbot ("JanConnect AI Assistant")**: An integrated assistant powered by Google Gemini to guide users, answer questions about city services, and help with the reporting process.
* **Feedback System**: A feature for users to provide ratings and detailed feedback on their experience with the platform.
* **Secure Profile Management**: A secure area for users to manage their personal details and profile information, including image cropping for avatars.

#### **Administrator Portal**
* **Comprehensive Admin Dashboard**: A central hub displaying key platform KPIs, recent activities, and system health at a glance using Chart.js.
* **Advanced User Management**: Tools for administrators to view, manage, suspend, and monitor all registered users on the platform.
* **Powerful Analytics Engine**: A dedicated analytics page with detailed charts on issue trends, categories, geographic distribution, and user engagement.
* **Feedback Management**: A dedicated section to review, analyze, and act on user-submitted feedback.
* **Content Management System (CMS)**: An interface for admins to dynamically update the content and team members on the public-facing "About Us" page.

---
### 💻 **Technology Stack**

| Category      | Technology / Library                                      |
|---------------|-----------------------------------------------------------|
| **Backend** | Python, **Flask** |
| **Database** | **MySQL** |
| **Frontend** | HTML, CSS, JavaScript, **Bootstrap**, **MDB-UI-Kit** |
| **AI** | **Google Gemini** |
| **Data Viz** | **Chart.js** |
| **Security** | **bcrypt** (for password hashing)                   |
| **Reporting** | **ReportLab** (for PDF generation), CSV Export |

---
### 🚀 **Getting Started**

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

#### **Prerequisites**
* Python 3.9+
* MySQL Server
* Git

#### **Installation & Setup**
1.  **Clone the repository:**
   ```sh
git clone https://github.com/PantalaAnusha93/JanConnectAI.git
cd JanConnectAI
 ```
   

2.  **Create a virtual environment and activate it:**
    ```sh
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4.  **Set up the MySQL Database:**
    * Log in to your MySQL server.
    * Create a new database for the project. The application is configured to use the name `janconnect_ai`.
        ```sql
        CREATE DATABASE janconnect_ai;
        ```

5.  **Configure Database Connection:**
    * Open the `app.py` file.
    * Locate the `db_config` dictionary and update the `user` and `password` fields with your MySQL credentials.

6.  **Run the Application:**
    * Execute the `app.py` script. The application will automatically create the necessary tables on its first run.
        ```sh
        python app.py
        ```
    * Open your web browser and navigate to `http://127.0.0.1:5000`.

---
### 📂 **Project Structure**

The project follows a modular structure that separates concerns for maintainability and scalability.


 ```bash
├── app.py                  # Main Flask application, routes, and backend logic
├── requirements.txt        # Python dependencies
├── Al_Prompt.txt           # System prompt for the Gemini AI model
├── static/
│   ├── uploads/            # For user-uploaded images and files
│   └── images/             # Static assets like logos and favicons
└── templates/
├── admin/              # Admin-facing HTML templates
│   ├── admin_dashboard.html
│   └── ... (10+ other admin files)
├── Main.html           # Main public landing page
├── login.html          # User login page
├── report_view.html    # Detailed view of a single issue
└── ... (10+ other user-facing files)

 ```

---
### 🏛️ **Architectural Highlights**

* **Modular Design**: The application is well-structured with separate folders for user (`templates`) and admin (`templates/admin`) HTML templates, promoting clean code and scalability.
* **Responsive UI/UX**: The frontend is built with a mobile-first approach, ensuring a seamless experience across all devices.
* **Theming Engine**: A consistent theming system with support for both **Light and Dark Modes** is implemented across the entire application, enhancing user accessibility and preference.
* **Robust Backend Logic**: The `app.py` script manages all core functionalities, including routing, database interactions, file uploads, and API services for a dynamic frontend.
* **Logging and Monitoring**: The application includes a logging system (`app.log`) to track events and diagnose errors efficiently.

---
---

## 👩‍💻 About Me

Hi, I’m **Anusha Pantala** — a passionate and driven **final-year B.Tech student** in **Computer Science and Engineering** with a specialization in **Data Science**.

I'm deeply interested in building real-world tech solutions that combine data, intelligence, and intuitive design. My academic journey and hands-on projects reflect a strong foundation in both theory and practical application.

### 👇 My Core Interests
- 🔍 Data Science & Analytics  
- 🤖 Artificial Intelligence & Machine Learning  
- 📊 BI Dashboards & Predictive Modeling  
- 💡 Problem-Solving with Scalable Technologies

I enjoy translating business needs and data insights into impactful software solutions that solve real problems and enhance user experiences.

---

## 🔗 Let’s Connect

📫 **LinkedIn**  
Let’s connect and grow professionally:  
[linkedin.com/in/pantala-anusha](https://www.linkedin.com/in/pantala-anusha/)

🌐 **Portfolio**  
Explore my latest work, skills, and projects here:  
[anusha-pantala.vercel.app](https://anusha-pantala.vercel.app)

---

> 💡 _“Final-year student, forever learner — building the future, one project at a time.”_

Feel free to explore my repositories and reach out for **collaborations**, **internships**, or to discuss **innovative ideas**!
