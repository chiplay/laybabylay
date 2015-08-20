import { createSelectorCreator } from 'reselect';
import Immutable from 'immutable';
import { VisibilityFilters } from './../actions';

// create a "selector creator" that uses Immutable.is instead of ===
const immutableCreateSelector = createSelectorCreator(Immutable.is);

/*
 * Definition of simple selectors.
 * Simple selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed
 * and memoization wouldn't provide any benefits.
 */
const tasksSelector = state => state.get('tasks');
const visibilitySelector = state => state.get('visibilityFilter');
const completedTasksSelector = immutableCreateSelector([tasksSelector], tasks => tasks.filter(task => task.get('done')));

/*
 * Definition of combined selectors.
 * In the subsequent examples selectors are combined to derive new information.
 * To prevent expensive recalculation of these selectors memoization is applied.
 * Hence, these selectors are only recomputed whenever their input selectors change.
 * In all other cases the precomputed values are returned.
 */
const visibleTasksSelector = immutableCreateSelector(
  [tasksSelector, visibilitySelector],
  (tasks, filter) => {
    console.log(filter);
    console.log(tasks);
    switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return tasks;
    case VisibilityFilters.SHOW_COMPLETED:
      return tasks.filter(task => task.get('done'));
    case VisibilityFilters.SHOW_ACTIVE:
      return tasks.filter(task => !task.get('done'));
    }
  }
);

export default (state) => {
    console.log(state);
    return {
        visibleTasks: visibleTasksSelector(state),
        visibilityFilter: visibilitySelector(state),
        taskCount: tasksSelector(state).count(),
        doneTaskCount: completedTasksSelector(state).count()
    };
};