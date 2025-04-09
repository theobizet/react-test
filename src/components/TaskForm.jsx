import React from "react";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const TaskForm = ({ form, handleChange, handleSubmit, editingTaskId, resetForm, error, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="relative bg-white rounded-xl text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {editingTaskId ? "Modifier la tâche" : "Ajouter une tâche"}
                </DialogTitle>
                <div className="mt-4">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom de la tâche"
                      value={form.name}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Nom de la tâche"
                      required
                    />
                    <input
                      type="text"
                      name="dependencies"
                      placeholder="Dépendances (ex: Task 1)"
                      value={form.dependencies}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Dépendances"
                    />
                    <input
                      type="date"
                      name="start"
                      value={form.start}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Date de début"
                      required
                    />
                    <input
                      type="date"
                      name="end"
                      value={form.end}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Date de fin"
                      required
                    />
                    <input
                      type="number"
                      name="progress"
                      min="0"
                      max="100"
                      value={form.progress}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Progrès"
                      required
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto bg-blue-600 hover:bg-blue-500"
            >
              {editingTaskId ? "Mettre à jour" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Annuler
            </button>
          </div>
          {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TaskForm;
