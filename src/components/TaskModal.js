import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const TaskModal = ({ task, onClose }) => (
  <Modal show={!!task} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{task.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p><strong>Date de début:</strong> {task.start.toDateString()}</p>
      <p><strong>Date de fin:</strong> {task.end.toDateString()}</p>
      <p><strong>Description:</strong> {task.description || 'Aucune description'}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>Fermer</Button>
    </Modal.Footer>
  </Modal>
);

TaskModal.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string,
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskModal;
