import React from "react";
import { debug, log } from "../constants";

/*
// make TaskInputProps extends ExtraInfoType, by that ctrl + space in 
the destructuring of props inside TaskInput functional component will suggest "log" and "debug" */
export interface ExtraInfoType {
  debug: boolean;
  log: (value: any) => void;
}

export interface injectedType {
  user: any;
}

export default function connect<P>(injectedProps: P) {
  return function <T>(Component: React.ComponentType<T & P>) {
    return function (props: Omit<T, keyof P>) {
      return <Component {...(props as T & {})} {...injectedProps} />;
    };
  };
}

/* 

// T and omit to make to  not suggested ExtraInfoType on props of TaskInput when TaskInput being declared
export default function connect<T>(
  Component: React.ComponentType<T & ExtraInfoType>
  ) {
    return function (props: Omit<T, keyof ExtraInfoType>) {
      // props: Omit<T, keyof ExtraInfoType> means that props passed to TaskInput declared take T type but do not take type of ExtraInfoType 
      const _props = props as T;
      return <Component {..._props} debug={debug} log={log} />;
    };
  }
*/

/* 
  - Component: React.ComponentType<T & ExtraInfoType>: 
  Nếu dùng thêm <T & ExtraInfoType> thì khi export 
  
  export default connect<TaskInputProps>(TaskInput) mà ta sẽ định nghĩa TaskInput bên trong dấu ngoặc (). 
  Khi đó props của TaskInput sẽ nhận thêm cả  T và ExtraInfoType
  Tuy nhiên ở đây là định nghĩa TaskInput ở ngoài rồi  trước khi export rồi
  */
