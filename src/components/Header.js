import React from 'react';

const Header = ({ daysInMonth }) => {
  const today = new Date().getDate();

  return (
    <div className="d-flex border-bottom mb-2">
      <div className="col-2"></div>
      <div className="d-flex flex-grow-1">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isWeekend = (i + 1) % 7 === 6 || (i + 1) % 7 === 0;
          const isToday = day === today;

          return (
            <div
              key={day}
              className={`text-center border ${isWeekend ? 'bg-light' : ''} ${isToday ? 'bg-warning' : ''}`}
              style={{ width: '20px' }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;