import { action, SUCCESS, REQUEST, FAILURE, createRequestTypes} from '../../actions';

export const INSIGHTS = createRequestTypes('INSIGHTS');

export const LOAD_INSIGHTS = 'LOAD_INSIGHTS';

export const insights = {
  request: () => action(INSIGHTS[REQUEST]),
  success: (response) => action(INSIGHTS[SUCCESS], {response}),
  failure: (error) => action(INSIGHTS[FAILURE], {error}),
};

export const loadInsights = (mode, startDate, endDate) => action(LOAD_INSIGHTS, {mode, startDate, endDate});


