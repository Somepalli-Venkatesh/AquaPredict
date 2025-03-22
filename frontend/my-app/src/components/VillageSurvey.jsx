import React from "react";
import {
  MapPin,
  Activity,
  BookOpen,
  Calendar,
  Sun,
  Moon,
  Cloud,
  Star,
} from "lucide-react";

function VillageSurvey() {
  const surveyData = [
    {
      day: 1,
      activity:
        "We studied how villagers are actively involved in their work and how they adjust to help one another.",
      outcome:
        "Gained insights into the community's spirit of cooperation and adaptability in supporting each other.",
    },
    {
      day: 2,
      activity:
        "We have observed that many residents face health issues stemming from various water problems.",
      outcome:
        "Understood the need for better health awareness and the importance of preventive measures.",
    },
    {
      day: 3,
      activity:
        "We realized how some villagers efficiently harness natural resources to farm their land.",
      outcome:
        "Learned about sustainable agricultural methods and resource management techniques that can benefit local communities.",
    },
    {
      day: 4,
      activity:
        "We observed the significance of communal gatherings to discuss ways of tackling common difficulties.",
      outcome:
        "Recognized the power of collective problem-solving and the value of open dialogue in addressing shared concerns.",
    },
    {
      day: 5,
      activity:
        "We noted that, despite limited work opportunities, villagers in that village are supportive of one another.",
      outcome:
        "Witnessed how solidarity and mutual aid help communities remain resilient in the face of socioeconomic challenges.",
    },
    {
      day: 6,
      activity:
        "We noticed that people in the village rely on river water and agriculture needs.",
      outcome: "Learned that they need access to clean drinking water.",
    },
    {
      day: 7,
      activity:
        "We noticed that they didn't have proper drainage facilities, leading to an increase in mosquitoes and other health issues.",
      outcome:
        "Realized that inadequate drainage systems lead to problems like increased mosquito breeding and health issues.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 min-h-screen py-12">
      {/* Decorative Icons */}
      <div className="fixed top-10 left-10 animate-pulse">
        <Sun className="text-yellow-400 w-8 h-8" />
      </div>
      <div className="fixed top-20 right-10 animate-bounce">
        <Moon className="text-blue-400 w-6 h-6" />
      </div>
      <div className="fixed bottom-10 left-20 animate-pulse">
        <Star className="text-yellow-200 w-5 h-5" />
      </div>
      <div className="fixed top-40 right-20 animate-bounce delay-200">
        <Cloud className="text-white/60 w-10 h-10" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12 bg-black/40 p-8 rounded-2xl backdrop-blur-sm">
          <div className="flex justify-center items-center gap-4 mb-4">
            <MapPin className="text-red-500 w-12 h-12 animate-bounce" />
            <h1 className="text-5xl font-bold text-white">
              Village Survey Observations
            </h1>
          </div>
          <p className="text-xl text-gray-300 mt-4">
            A comprehensive study of rural life and community dynamics
          </p>
        </div>

        {/* Enhanced Table Container */}
        <div className="overflow-x-auto bg-black/40 rounded-3xl backdrop-blur-md p-6">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            {/* Enhanced Table Header */}
            <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-xl text-white">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-yellow-300 w-6 h-6" />
                    <span>Day</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold text-xl text-white">
                  <div className="flex items-center gap-3">
                    <Activity className="text-green-300 w-6 h-6" />
                    <span>Activities</span>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold text-xl text-white">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-blue-300 w-6 h-6" />
                    <span>Learnings</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Enhanced Table Body */}
            <tbody>
              {surveyData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <td className="py-6 px-6 text-2xl font-bold text-yellow-400">
                    Day {row.day}
                  </td>
                  <td className="py-6 px-6 text-white">
                    <div className="bg-black/30 p-4 rounded-lg">
                      {row.activity}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-white">
                    <div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-400">
                      {row.outcome}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VillageSurvey;
