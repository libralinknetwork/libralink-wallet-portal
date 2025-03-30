import { ValuesType } from "utility-types";

type KeyValue<K extends keyof any, T> = Record<K, T | undefined>;

export type Config = {
  dictionary: KeyValue<string, string>;
  debugName?: string;
  prefix?: string;
  defaults?: {
    [mappedKey: string]: string;
  };
};

const getErrorMessage = (keys: string[], debugName: string): string => {
  const keysString = keys.join(", ");
  return `Dictionary "${debugName}" is missing the following keys: ${keysString}`;
};

/**
 * Get environment variables
 */
export const makeGetDynamicVariables =
  ({ dictionary, debugName = "", prefix = "", defaults = {} }: Config) =>
  <V extends string, T extends Record<string, V>>(
    args: T
  ): { readonly [key in ValuesType<T>]: string } => {
    const missingKeys: string[] = [];
    const dict = Object.entries(args).reduce<any>((acc, [key, mappedKey]) => {
      const fullKey = `${prefix}${key}`;
      const value = dictionary[fullKey];
      const defaultValue = defaults[mappedKey];
      if (value === undefined && defaultValue === undefined) {
        missingKeys.push(fullKey);
      }
      acc[mappedKey] = value === undefined ? defaultValue : value;
      return acc;
    }, {});
    if (missingKeys.length > 0) {
      throw new Error(getErrorMessage(missingKeys, debugName));
    }
    return dict;
  };
