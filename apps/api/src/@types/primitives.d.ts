type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;
type NoParamFunction = () => void;
type NullOrUndefined = null | undefined;

interface ObjectOf<T> {
  [key:string]: T;
};
