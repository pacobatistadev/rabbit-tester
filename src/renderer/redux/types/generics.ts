export type ReducerAction<A = any> = { type: string, payload: A }
export type Reducer<S, A = any> = (state: S, action: ReducerAction<A>) => S