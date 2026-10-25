# ⚡ AMCREO: Autonomous Campus Resource & Energy Optimizer

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-Flask-green.svg)
![React](https://img.shields.io/badge/React-Vite-cyan.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)

**AMCREO** is a cutting-edge, enterprise-grade multi-tenant web application engineered for advanced university and campus resource optimization. Utilizing an autonomous multi-agent simulation framework, AMCREO monitors, regulates, and optimizes critical campus utilities—including electrical power grids, smart water lines, carbon offsets, and building infrastructure loads in real-time.

---

## 🌟 Key Features

* **Multi-Tenant Dynamic Authentication**: Secure college-specific portal access supporting pre-configured institutions (like BBDU, IIT Delhi, DU, NIT Trichy) as well as dynamic fallback profiling for any custom college ID.
* **Autonomous Multi-Agent Ticker**: Real-time simulated logs displaying AI agent actions (e.g., zero-occupancy lighting adjustments, automated valve pressure regulation).
* **Live Command Center**: Interactive metrics tracking energy saved (kWh), water conserved (Liters), carbon offset equivalents, and active AI cluster units.
* **Building Infrastructure Management**: Granular tracking of individual campus blocks (e.g., School of Engineering, Central Library, Hostels) with live load percentages and status indicators.
* **Neural Analytics & Graphs**: Visual efficiency graphs and regression metrics processed via backend analytical models.
* **Interactive AI Actions**: Instant trigger capabilities for emergency load balancing and automated waste management agent dispatching.

---

## 🛠️ Tech Stack

* **Frontend**: React.js (Vite), Modern CSS, Responsive Grid Layouts, Inter Typography.
* **Backend**: Python Flask, Flask-CORS, Secure Hashing Algorithms for Dynamic Multi-Tenant Provisioning.
* **Architecture**: RESTful API integration connecting a decoupled frontend SPA with an autonomous backend decision loop.

---

## 🚀 Getting Started & Installation

Follow these steps to set up and run the project locally on your machine.

### Prerequisites
* Node.js & npm installed
* Python (v3.8 or higher) installed

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/AMCREO-Project.git](https://github.com/your-username/AMCREO-Project.git)
cd AMCREO-Project


2. Backend Setup (Flask)
Navigate to the backend directory, install dependencies, and start the server:

Bash
cd backend
pip install flask flask-cors
python app.py
The backend server will start running at http://localhost:5000.

3. Frontend Setup (React)
Open a new terminal window, navigate to the frontend directory, install packages, and start the development server:

Bash
cd frontend
npm install
npm run dev
The frontend application will run at http://localhost:5173.

🔐 Credentials for Testing
You can use the following pre-configured credentials to test different university dashboards:

Babu Banarasi Das University (BBDU):

College ID: bbdu

Password: bbd123

IIT Delhi Campus:

College ID: iit_delhi

Password: admin123

Delhi University (DU):

College ID: du

Password: du123

NIT Trichy:

College ID: nit_trichy

Password: nit123

(Note: Entering any other custom college ID will instantly trigger the dynamic profiling generator and initialize a unique live dashboard!)

📸 Dashboard Preview
Secure Login Portal: Multi-tenant institutional gateway.

Live Command Center: Real-time KPI cards and agent activity tickers.

Infrastructure Monitor: Building load status bars and eco-mode indicators.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is open-source and available under the MIT License.
