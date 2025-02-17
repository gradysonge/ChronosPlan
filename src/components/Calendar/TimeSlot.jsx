import React from 'react';

const TimeSlot = ({ startTime, endTime, professor, consecutive, color }) => {
  return (
    <div
      className={`rounded-lg p-3 mb-2 ${color.bg} transition-transform hover:scale-[1.02]`}
      style={{ height: consecutive > 1 ? `${consecutive * 5}rem` : 'auto' }}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">
          {startTime} - {endTime}
        </span>
        {consecutive > 1 && (
          <span className={`text-xs ${color.badge} text-white px-2 py-1 rounded`}>
            {consecutive}h
          </span>
        )}
      </div>
      <div className="flex items-center">
        <img
          src={professor.avatar}
          alt={professor.name}
          className="w-6 h-6 rounded-full mr-2"
        />
        <span className="text-sm">{professor.name}</span>
      </div>
    </div>
  );
};

export default TimeSlot;