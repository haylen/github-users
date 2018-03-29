import reducer, {
  INITIAL_STATE,
  getError,
  getUsersList,
  getFetching,
  getNextUserId,
} from '../../reducers/usersList';
import {
  startFetchingUsers,
  errorFetchingUsers,
  finishFetchingUsers,
} from '../../actions/usersList';

describe('usersList reducer', () => {
  describe('actual reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should start fetching', () => {
      const state = reducer(INITIAL_STATE, startFetchingUsers());

      expect(state.fetching).toEqual(true);
    });

    it('should update data when fetching finshed', () => {
      const currentState = {
        ...INITIAL_STATE,
        fetching: true,
        data: ['test1'],
      };
      const state = reducer(currentState, finishFetchingUsers(['test2', 'test3'], 546));

      expect(state.fetching).toEqual(false);
      expect(state.nextUserId).toEqual(546);
      expect(state.data).toEqual(['test1', 'test2', 'test3']);
    });

    it('should update errors on fetching error', () => {
      const currentState = {
        ...INITIAL_STATE,
        fetching: true,
        error: 'No real error message',
      };
      const state = reducer(currentState, errorFetchingUsers('Test error message'));

      expect(state.fetching).toEqual(false);
      expect(state.error).toEqual('Test error message');
    });
  });

  describe('selectors', () => {
    describe('getError', () => {
      it('should return error value', () => {
        const state = {
          usersList: {
            ...INITIAL_STATE,
            error: 'TEST test',
          }
        };

        expect(getError(state)).toEqual('TEST test');
      });
    });

    describe('getUsersList', () => {
      it('should return data value', () => {
        const state = {
          usersList: {
            ...INITIAL_STATE,
            data: ['test1', 'test2'],
          }
        };

        expect(getUsersList(state)).toEqual(['test1', 'test2']);
      });
    });

    describe('getFetching', () => {
      it('should return fetching value', () => {
        const state = { usersList: INITIAL_STATE };

        expect(getFetching(state)).toEqual(false);
      });
    });

    describe('getNextUserId', () => {
      it('should return nextUserId value', () => {
        const state = {
          usersList: {
            ...INITIAL_STATE,
            nextUserId: 736,
          }
        };

        expect(getNextUserId(state)).toEqual(736);
      });
    });
  });
});
