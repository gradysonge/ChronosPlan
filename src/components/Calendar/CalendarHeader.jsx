import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { professors, courses, steps } from '../../data/mockData';

const Dropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-left flex justify-between items-center ${
          value ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200'
        }`}
      >
        <span className={`${value ? 'text-emerald-700' : 'text-gray-700'}`}>
          {value || label}
        </span>
        <ChevronDown className={`w-5 h-5 ${value ? 'text-emerald-400' : 'text-gray-400'}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.id || option.code}
              className="px-4 py-2 hover:bg-emerald-50 cursor-pointer"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.code ? `${option.code} - ${option.name}` : option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CalendarHeader = ({ onFilterChange }) => {
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const tokens = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `${i + 1} heure${i > 0 ? 's' : ''}`
  }));

  const handleProfessorChange = (prof) => {
    setSelectedProfessor(prof);
    onFilterChange?.({ professor: prof });
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    onFilterChange?.({ course });
  };

  const handleStepChange = (step) => {
    setSelectedStep(step);
    onFilterChange?.({ step });
  };

  const handleTokenChange = (token) => {
    setSelectedToken(token);
    onFilterChange?.({ token });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        <Dropdown
          label="Code Professeur"
          options={professors}
          value={selectedProfessor ? `${selectedProfessor.code} - ${selectedProfessor.name}` : ''}
          onChange={handleProfessorChange}
        />
        <Dropdown
          label="Code Cours"
          options={courses}
          value={selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : ''}
          onChange={handleCourseChange}
        />
        <Dropdown
          label="Étapes"
          options={steps}
          value={selectedStep?.name || ''}
          onChange={handleStepChange}
        />
        <Dropdown
          label="Token shift"
          options={tokens}
          value={selectedToken?.name || ''}
          onChange={handleTokenChange}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;