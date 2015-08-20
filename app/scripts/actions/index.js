export let taskAdd = name => ({
    name: 'TASK_ADD',
    data: {
        name
    }
});

export let taskDone = id => ({
    name: 'TASK_DONE',
    data: {
        id: id
    }
});

export let taskUndone = id => ({
    name: 'TASK_UNDONE',
    data: {
        id: id
    }
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export let setVisibilityFilter = filter => ({
    name: 'SET_VISIBILITY_FILTER',
    data: {
        filter: filter
    }
});