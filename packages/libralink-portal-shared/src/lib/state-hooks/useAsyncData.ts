import { useState, useCallback } from "react";

export type AsyncStateInitial = {
  readonly tag: "initial";
};

export type AsyncStateLoading = {
  readonly tag: "loading";
};

export type AsyncStateFailed = {
  readonly tag: "failed";
  readonly error: Error;
};

export type AsyncStateLoaded<T> = {
  readonly tag: "loaded";
  readonly data: T;
};

export type AsyncState<T> =
  | AsyncStateInitial
  | AsyncStateLoading
  | AsyncStateLoaded<T>
  | AsyncStateFailed;

export const initial: AsyncState<never> = {
  tag: "initial",
};

export const loading: AsyncState<never> = {
  tag: "loading",
};

export function failed(error: Error): AsyncState<never> {
  return {
    tag: "failed",
    error,
  };
}

export function loaded<T>(data: T): AsyncState<T> {
  return {
    tag: "loaded",
    data,
  };
}

type Input<T> = {
  task: () => Promise<T>;
};

export type AsyncData<T> = { state: AsyncState<T>; act: () => void };

export function useAsyncData<T>(input: Input<T>, dispatch: any): AsyncData<T> {
  const [state, setState] = useState<AsyncState<T>>({ tag: "initial" });

  const { task } = input;

  const act = useCallback(async () => {
    setState({ tag: "loading" });
    dispatch({ type: "LOADING" });
    try {
      const data = await task();
      setState({ tag: "loaded", data });
    } catch (error: any) {
      setState({ tag: "failed", error });
    } finally {
      dispatch({ type: "STANDBY" });
    }
  }, [task]);

  return { state, act };
}
