export const validateForm = (form, tasks, setError) => {
    const { name, start, end, progress } = form;
    if (!name || !start || !end) {
      setError("Veuillez remplir les champs nom, date de début et date de fin.");
      return false;
    }
    if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
      setError("Les dates doivent être valides.");
      return false;
    }
    if (new Date(start) > new Date(end)) {
      setError("La date de début ne peut pas être postérieure à la date de fin.");
      return false;
    }
    const prog = parseInt(progress, 10);
    if (isNaN(prog) || prog < 0 || prog > 100) {
      setError("Le progrès doit être un nombre entre 0 et 100.");
      return false;
    }
    // Check for overlapping tasks
    const overlappingTask = tasks.find((task) => {
      const taskStart = new Date(task.start);
      const taskEnd = new Date(task.end);
      const newStart = new Date(start);
      const newEnd = new Date(end);
      return (
        (newStart >= taskStart && newStart <= taskEnd) ||
        (newEnd >= taskStart && newEnd <= taskEnd) ||
        (newStart <= taskStart && newEnd >= taskEnd)
      );
    });
    if (overlappingTask) {
      setError("La nouvelle tâche chevauche une tâche existante.");
      return false;
    }
    return true;
  };
  