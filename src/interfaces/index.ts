
import firebase from 'firebase/app';
import { FormApi } from "final-form";

export interface MessageProps {
  [x: string]: any;
  message: string | string[];
  timestamp: number;
}

export interface MessagePropsItems {
  message: MessageProps;
}

export interface ValuesProps {
  message: string;
}

export interface ChatProps {
  chatMessagePlaceholder: string;
  loading?: boolean;
  handleSubmitMessage: (values: ValuesProps, form: FormApi<ValuesProps, Partial<ValuesProps>>) => void;
  messages: firebase.database.DataSnapshot[] | undefined;
}

export interface ScrollableListProps {
  messages: firebase.database.DataSnapshot[] | undefined;
  style: any;
  className?: any;
}