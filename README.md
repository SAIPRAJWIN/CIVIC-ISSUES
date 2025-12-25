# 🚀 Project: Civicsense AI (Civic Engagement Platform)

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

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/c9de3ba0-c074-467d-8f24-55d7612e304b" />


---

* **2. Registration:** New users can create a secure account by providing their details through a validated registration form.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/869b4a7f-d1af-43c1-9513-d0a82bebd82b" />


---

* **3. Login:** Registered users can securely access their personalized portal by entering their credentials.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/45fb1384-796b-4f50-8cfc-02ffc13a5b3d" />

---

* **4. User Dashboard:** After logging in, the user is greeted with a personalized dashboard summarizing their activity and recent submissions.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/d6b833d5-318f-45c0-b6b5-248e7d0b2d8d" />

---

* **5. Report an Issue:** The user can fill out an intuitive, multi-step form to report a new civic issue, complete with location details and image uploads.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/e6e5fe91-e090-48f0-9bee-f8df3b11b6f5" />


---

* **6. My Submissions:** The user can view a comprehensive list of all their previously reported issues and see their current status at a glance.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/da5894b3-174a-4f04-990b-6c1e2f5fd9fb" />

---
* **7. Check Status:** Anyone can track the progress of a specific issue by entering its unique tracking ID, promoting transparency.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/69871ffa-82cc-477d-aaf3-6e4ca63e301a" />

---

* **8. Viewing the Report:** Upon submission, the user receives a unique ID and can view a detailed, professional report of their submission, which can be printed or saved as a PDF.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/9a68a220-70da-4104-beac-647b15808d2c" />


---

* **9. Submitting Feedback:** The user can provide valuable feedback and rate their experience with the platform to help improve the service.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/c5e2c331-d1a4-416f-87e8-e4fb9576cf24" />

---

* **10. Managing Profile:** Users can view and update their personal information, manage their password, and customize their profile photo.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/35ec8480-1b76-45f8-beb6-dca3f47b58a6" />

---

* **11. AI Chatbot:** The user can interact with an intelligent AI assistant to get help, ask questions about city services, or get guidance on reporting an issue.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/58f4483b-4970-4914-b4f4-c1d6cb192968" />


---
### **Administrator's Journey**

* **1. Admin Login:** Administrators securely access their dedicated management portal through a separate login page.
<img width="1848" height="1001" alt="image" src="https://github.com/user-attachments/assets/51240108-c220-4fcd-b281-95d05b63c8d4" />


---

* **2. Admin Dashboard:** The admin is presented with a high-level overview of all platform activity, including key metrics and real-time analytics.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/5cc4c88d-258d-479a-861a-2e5a88e82d4f" />


---

* **3. Managing Issues:** All user-submitted issues are displayed in a central location, where the admin can view details and update their status (e.g., from 'Submitted' to 'In Progress').

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/217f37cd-37be-4d53-9393-97cd15c8229c" />


---

* **4. Managing Users:** The admin can view, search, filter, suspend, or delete user accounts through a comprehensive management interface.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/ed1c431d-3c8f-49cb-be63-6483f6acf38b" />


---

* **5. Viewing User Feedbacks:** The admin can review all feedback and ratings submitted by users to gauge satisfaction and identify areas for improvement.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/63e87912-e7f5-4974-8347-070745585c73" />


---

* **6. Viewing Analytics:** The admin can dive deep into platform-wide data with advanced analytics, charts, and trends on user engagement and issue resolution.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/b95f6a83-9e5c-44e6-9b5b-4d0e82d5fe57" />


---

* **7. Managing "About Us" Content:** The admin can dynamically update the content of the public-facing "About Us" page, including team member profiles and guide information.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/68fb8447-eb81-49de-814d-d9d0115408f1" />


---

* **8. Managing Admin Profile:** Administrators can manage their own account details, including their username and password.

<img width="975" height="548" alt="image" src="https://github.com/user-attachments/assets/74fe2921-2f67-4c98-a433-e28a1f08af43" />


---
### ✨ **Features in Detail**

The platform is divided into two main portals, each with a suite of powerful features:

#### **Citizen Portal**
* **Intelligent Issue Reporting**: An intuitive, multi-step form for users to report civic issues, complete with image uploads for evidence.
* **Real-Time Status Tracking**: A dedicated page for users to check the live status of their reported issues using a unique tracking ID.
* **Personalized Dashboard**: A user-specific dashboard visualizing personal submission statistics and trends using dynamic charts.
* **AI Chatbot ("Civicsense AI Assistant")**: An integrated assistant powered by Google Gemini to guide users, answer questions about city services, and help with the reporting process.
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
git clone https://github.com/Rohith1202/Civicsense-AI-Smart-Reporting-and-PrioritIzation-of-Civic-Issues-using-AI
.git
cd Civicsense-AI-Smart-Reporting-and-PrioritIzation-of-Civic-Issues-using-AI
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
    * Create a new database for the project. The application is configured to use the name `civicsense_ai`.
        ```sql
        CREATE DATABASE civicsense_ai;
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

## 👨‍💻 About Me

Hi, I’m **Rohith Boppana** — a passionate and driven **final-year B.Tech student** in **Computer Science and Engineering** with a specialization in **Artificial Intelligence & Machine Learning**.

I'm deeply interested in building real-world tech solutions that combine data, intelligence, and intuitive design. My academic journey and hands-on projects reflect a strong foundation in both theory and practical application.

### 👇 My Core Interests
- 🤖 Artificial Intelligence & Machine Learning  
- 🔍 Data Science & Analytics   
- 📊 BI Dashboards & Predictive Modeling  
- 💡 Problem-Solving with Scalable Technologies

I enjoy translating business needs and data insights into impactful software solutions that solve real problems and enhance user experiences.

---

## 🔗 Let’s Connect

📫 **LinkedIn**  
Let’s connect and grow professionally:  
[linkedin.com/in/rohith-boppana-39ab57279](https://www.linkedin.com/in/rohith-boppana-39ab57279/)

🌐 **Portfolio**  
Explore my latest work, skills, and projects here:  
[rohith-boppana.vercel.app](https://rohith-boppana.vercel.app)

---


> 💡 _“Final-year student, forever learner — building the future, one project at a time.”_

Feel free to explore my repositories and reach out for **collaborations**, **internships**, or to discuss **innovative ideas**!
