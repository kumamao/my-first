// type Machine<S> = Record<string, Record<string, S>>
type MachineState<T> = keyof T;
type ReduceValue<T> = T extends infer U ? keyof U : never;
type MachineEvent<T> = ReduceValue<T[keyof T]>;

export const useStateMachine = <T extends Record<string, Record<string, MachineState<T>>>>(
  initialState: MachineState<T>,
  machine: T
) => {
  let state = $state<MachineState<T>>(initialState);

  return {
    get state() {
      return state;
    },
    dispatch(event: MachineEvent<T>) {
      console.log(state, event);
      state = machine[state][event] ?? state;
    }
  };
};

// /* eslint-disable @typescript-eslint/no-explicit-any */
// interface Machine<S> {
//   [k: string]: { [k: string]: S };
// }
// type MachineState<T> = keyof T;
// type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

// // 🤯 https://fettblog.eu/typescript-union-to-intersection/
// type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
//   ? R
//   : never;

// /**
//  * The `useStateMachine` function is a TypeScript function that creates a state machine and returns the
//  * current state and a dispatch function to update the state based on events.
//  * @param initialState - The `initialState` parameter is the initial state of the state machine. It
//  * represents the starting point of the state machine's state.
//  * @param machine - The `machine` parameter is an object that represents a state machine. It should
//  * have keys that correspond to the possible states of the machine, and the values should be objects
//  * that represent the possible events and their corresponding next states.
//  * @returns The `useStateMachine` function returns an object with two properties: `state` and
//  * `dispatch`.
//  */
// export function useStateMachine<M>(
//   initialState: MachineState<M>,
//   machine: M & Machine<MachineState<M>>
// ) {
//   let state = $state(initialState) as MachineState<M>;

//   function reducer(event: MachineEvent<M>) {
//     // @ts-expect-error  state.value is keyof M
//     const nextState = machine[state][event];
//     return nextState ?? state;
//   }

//   const dispatch = (event: MachineEvent<M>) => {
//     state = reducer(event);
//   };

//   return {
//     get state() {
//       return state;
//     },
//     dispatch
//   };
// }
