export const validateForm = (form, tasks, setError) => {
  const { name, start, end, progress } = form;

  if (!name || !start || !end) {
    setError("Veuillez remplir les champs nom, date de début et date de fin.");
    return false;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate) || isNaN(endDate)) {
    setError("Les dates doivent être valides.");
    return false;
  }

  if (startDate > endDate) {
    setError("La date de début ne peut pas être postérieure à la date de fin.");
    return false;
  }

  const prog = parseInt(progress, 10);
  if (isNaN(prog) || prog < 0 || prog > 100) {
    setError("Le progrès doit être un nombre entre 0 et 100.");
    return false;
  }

  // Check for overlapping tasks
  const otherTasks = tasks.filter((task) => task.id !== form.id);
  if (checkForOverlaps({ start: startDate, end: endDate }, otherTasks)) {
    setError("La nouvelle tâche chevauche une tâche existante.");
    return false;
  }

  return true;
};

export const checkForOverlaps = (task, otherTasks) => {
  const taskStart = task.start;
  const taskEnd = task.end;

  for (const otherTask of otherTasks) {
    const otherStart = new Date(otherTask.start);
    const otherEnd = new Date(otherTask.end);

    if (
      (taskStart >= otherStart && taskStart <= otherEnd) ||
      (taskEnd >= otherStart && taskEnd <= otherEnd) ||
      (taskStart <= otherStart && taskEnd >= otherEnd)
    ) {
      return true; // Overlap detected
    }
  }
  return false; // No overlap
};
