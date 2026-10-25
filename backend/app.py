from flask import Flask, jsonify, request
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)

# Multiple Pre-configured Universities Database
college_database = {
    "bbdu": {
        "password": "bbd123",
        "collegeName": "Babu Banarasi Das University (BBDU, Lucknow)",
        "energySaved": 88,
        "waterConserved": 3400,
        "carbonOffset": "2.4 Tons",
        "activeAgents": 5,
        "systemStatus": "Fully Autonomous Active",
        "buildings": [
            {"name": "School of Engineering", "load": "48%", "status": "Optimized"},
            {"name": "Management Block", "load": "35%", "status": "Eco-Mode"},
            {"name": "Central Library", "load": "22%", "status": "AI Regulating"},
            {"name": "Hostel Complex C", "load": "60%", "status": "Normal"}
        ],
        "logs": [
            "[11:45 AM] Agent Alpha optimized HVAC load in Engineering block.",
            "[11:30 AM] Agent Beta regulated water supply valves in Hostel Wing.",
            "[11:15 AM] Agent Gamma shifted server load to solar microgrid."
        ]
    },
    "iit_delhi": {
        "password": "admin123",
        "collegeName": "IIT Delhi Campus",
        "energySaved": 142,
        "waterConserved": 4500,
        "carbonOffset": "3.8 Tons",
        "activeAgents": 6,
        "systemStatus": "Fully Autonomous Active",
        "buildings": [
            {"name": "Main Technical Block", "load": "42%", "status": "Optimized"},
            {"name": "Research Complex", "load": "65%", "status": "AI Regulating"},
            {"name": "Central Library", "load": "28%", "status": "Eco-Mode"},
            {"name": "Student Hostel Wing", "load": "55%", "status": "Normal"}
        ],
        "logs": [
            "[11:15 AM] Agent Alpha reduced HVAC load in Block A by 15%.",
            "[11:10 AM] Agent Beta detected optimal pipeline pressure.",
            "[11:02 AM] Agent Delta synchronized solar grid storage."
        ]
    },
    "du": {
        "password": "du123",
        "collegeName": "Delhi University (DU)",
        "energySaved": 110,
        "waterConserved": 2900,
        "carbonOffset": "3.1 Tons",
        "activeAgents": 4,
        "systemStatus": "Fully Autonomous Active",
        "buildings": [
            {"name": "Arts Faculty", "load": "55%", "status": "Normal"},
            {"name": "Science Complex", "load": "68%", "status": "Optimized"},
            {"name": "Central Library", "load": "30%", "status": "Eco-Mode"},
            {"name": "Admin Block", "load": "45%", "status": "AI Regulating"}
        ],
        "logs": [
            "[10:50 AM] Agent Alpha optimized power distribution in Arts faculty.",
            "[10:35 AM] Agent Beta monitored water conservation levels."
        ]
    },
    "nit_trichy": {
        "password": "nit123",
        "collegeName": "NIT Trichy Campus",
        "energySaved": 98,
        "waterConserved": 3200,
        "carbonOffset": "2.8 Tons",
        "activeAgents": 5,
        "systemStatus": "Fully Autonomous Active",
        "buildings": [
            {"name": "Administrative Block", "load": "38%", "status": "Eco-Mode"},
            {"name": "Computer Centre", "load": "75%", "status": "AI Regulating"},
            {"name": "Mechanical Workshop", "load": "52%", "status": "Optimized"},
            {"name": "Hostel Zone", "load": "62%", "status": "Normal"}
        ],
        "logs": [
            "[11:00 AM] Agent Alpha adjusted cooling systems in Computer Centre.",
            "[10:40 AM] Agent Gamma ran diagnostic on solar arrays."
        ]
    }
}

@app.route('/api/login', methods=['POST'])
def college_login():
    req_data = request.get_json()
    college_id = req_data.get('collegeId', '').strip().lower()
    password = req_data.get('password', '')

    if not college_id or not password:
        return jsonify({"error": "Please enter both College ID and Password."}), 400

    # Check if college exists in pre-configured list
    if college_id in college_database:
        if college_database[college_id]["password"] == password:
            data = college_database[college_id].copy()
            del data["password"]
            return jsonify(data), 200
        else:
            return jsonify({"error": "Incorrect password for this College ID!"}), 401
    else:
        # Dynamic fallback for any other college ID typed by user
        name_hash = int(hashlib.md5(college_id.encode()).hexdigest(), 16)
        energy_saved = 85 + (name_hash % 65)
        water_conserved = 2400 + (name_hash % 1800)
        carbon_offset = f"{float(energy_saved / 35):.1f} Tons"
        active_agents = 4 + (name_hash % 3)
        college_display_name = college_id.upper().replace('_', ' ') + " Campus"

        dynamic_data = {
            "collegeName": college_display_name,
            "energySaved": energy_saved,
            "waterConserved": water_conserved,
            "carbonOffset": carbon_offset,
            "activeAgents": active_agents,
            "systemStatus": "Fully Autonomous Active",
            "buildings": [
                {"name": "Main Academic Complex", "load": f"{45 + (name_hash % 20)}%", "status": "Optimized"},
                {"name": "Research & Innovation Wing", "load": f"{55 + (name_hash % 25)}%", "status": "AI Regulating"},
                {"name": "Central Library & Media Center", "load": f"{25 + (name_hash % 15)}%", "status": "Eco-Mode"},
                {"name": "Student Residential Hostels", "load": f"{60 + (name_hash % 20)}%", "status": "Normal"}
            ],
            "logs": [
                f"[Live] Agent Alpha optimized HVAC grid for {college_display_name}.",
                "[Live] Agent Beta regulated smart water pressure valves successfully.",
                "[Live] Autonomous neural cluster synchronized peak load shifting."
            ]
        }
        return jsonify(dynamic_data), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)