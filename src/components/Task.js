import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, onClick }) => {
  const { name, start, end } = task;
  const dayStart = start.getDate();
  const dayEnd = end.getDate();
  const duration = dayEnd - dayStart + 1;
  const leftOffset = (dayStart - 1) * 20;
  const width = duration * 20;
  const startDate = start.toISOString().split('T')[0];
  const endDate = end.toISOString().split('T')[0];

  return (
    <div className="d-flex align-items-center mb-2">
      <div className="col-2">{name}</div>
      <div className="d-flex flex-grow-1 position-relative" style={{ height: '30px' }}>
        <div
          className="position-absolute bg-success text-dark text-center"
          style={{
            left: `${leftOffset}px`,
            width: `${width}px`,
            height: '100%',
            lineHeight: '30px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={onClick}
        >
          {startDate} - {endDate}
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Task;