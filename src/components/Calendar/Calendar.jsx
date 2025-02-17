import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import TimeSlot from './TimeSlot';
import { professors } from '../../data/mockData';

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8:00 to 22:00

// Color palette for different professors
const professorColors = {
  P1: { bg: 'bg-blue-100 hover:bg-blue-200', badge: 'bg-blue-500' },
  P2: { bg: 'bg-green-100 hover:bg-green-200', badge: 'bg-green-500' },
  P3: { bg: 'bg-purple-100 hover:bg-purple-200', badge: 'bg-purple-500' },
  P4: { bg: 'bg-orange-100 hover:bg-orange-200', badge: 'bg-orange-500' },
  P5: { bg: 'bg-pink-100 hover:bg-pink-200', badge: 'bg-pink-500' },
  P6: { bg: 'bg-yellow-100 hover:bg-yellow-200', badge: 'bg-yellow-500' },
  P7: { bg: 'bg-indigo-100 hover:bg-indigo-200', badge: 'bg-indigo-500' },
  P8: { bg: 'bg-red-100 hover:bg-red-200', badge: 'bg-red-500' },
  P9: { bg: 'bg-teal-100 hover:bg-teal-200', badge: 'bg-teal-500' },
  P10: { bg: 'bg-cyan-100 hover:bg-cyan-200', badge: 'bg-cyan-500' },
  // Add more colors for remaining professors...
};

const Calendar = () => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [filters, setFilters] = useState({
    professor: null,
    course: null,
    step: null,
    token: null
  });

  // Group consecutive slots by professor and time
  const groupConsecutiveSlots = (slots) => {
    const grouped = [];
    let currentGroup = null;

    slots.forEach((slot) => {
      if (!currentGroup || 
          currentGroup.professor.id !== slot.professor.id ||
          currentGroup.day !== slot.day ||
          parseInt(slot.startTime) !== parseInt(currentGroup.endTime)) {
        if (currentGroup) {
          grouped.push(currentGroup);
        }
        currentGroup = {
          ...slot,
          consecutive: 1,
          originalEndTime: slot.endTime
        };
      } else {
        currentGroup.consecutive++;
        currentGroup.endTime = slot.endTime;
      }
    });

    if (currentGroup) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const isSlotAvailable = (day, hour) => {
    return !selectedSlots.some(slot => 
      slot.day === day && 
      parseInt(slot.startTime) === hour
    );
  };

  const areAllFiltersSelected = () => {
    return filters.professor && filters.course && filters.step && filters.token;
  };

  const groupedTimeSlots = groupConsecutiveSlots(selectedSlots);

  return (
    <div className="p-6">
      <CalendarHeader onFilterChange={handleFilterChange} />
      
      {!areAllFiltersSelected() && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            Veuillez sélectionner tous les critères (Code Professeur, Code Cours, Étapes, Token shift) avant d'attribuer une disponibilité.
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-5 border-b">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="px-4 py-3 text-center font-semibold text-gray-700 border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5">
          {daysOfWeek.map((day) => (
            <div key={day} className="border-r last:border-r-0">
              {hours.map((hour) => {
                const timeSlots = groupedTimeSlots.filter(
                  (slot) => slot.day === day && 
                  parseInt(slot.startTime) === hour
                );

                const isAvailable = isSlotAvailable(day, hour);
                const canSelect = areAllFiltersSelected() && isAvailable;

                return (
                  <div
                    key={hour}
                    className={`h-24 border-b last:border-b-0 p-2 ${
                      canSelect ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed bg-gray-50'
                    }`}
                    onClick={() => {
                      if (!areAllFiltersSelected()) {
                        alert('Veuillez sélectionner tous les critères avant d\'attribuer une disponibilité');
                        return;
                      }
                      
                      if (filters.professor && isAvailable) {
                        const professorSlots = selectedSlots.filter(
                          slot => slot.professor.id === filters.professor.id
                        );
                        
                        if (professorSlots.length < 3) {
                          setSelectedSlots([...selectedSlots, {
                            id: `${day}-${hour}-${filters.professor.id}`,
                            day,
                            startTime: `${hour}:00`,
                            endTime: `${hour + 1}:00`,
                            professor: filters.professor,
                            color: professorColors[filters.professor.id]
                          }]);
                        } else {
                          alert('Maximum 3 heures par professeur atteint');
                        }
                      } else if (!isAvailable) {
                        alert('Cette plage horaire est déjà réservée');
                      }
                    }}
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {`${hour}:00`}
                    </div>
                    {timeSlots.map((slot) => (
                      <TimeSlot
                        key={slot.id}
                        startTime={slot.startTime}
                        endTime={slot.endTime}
                        professor={slot.professor}
                        consecutive={slot.consecutive}
                        color={slot.color}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;