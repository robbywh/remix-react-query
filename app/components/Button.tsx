import * as React from 'react';

export enum Type {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface Configs {
  isClear?: boolean;
  type?: Type;
}

interface ButtonProps {
  title: string;
  onClick?: () => void;
  configs?: Configs;
}

const defaultConfigs = {
  type: Type.PRIMARY,
  isClear: false,
}
const Button = ({
  title,
  onClick,
  configs = defaultConfigs
}: ButtonProps) => {
  const configuration = {
    ...defaultConfigs,
    ...configs
  }
  const bgColor = configuration.type === Type.PRIMARY ? 'bg-red-flash-coffee' : 'bg-green-flash-coffee'
  const txtColor = configuration.type === Type.PRIMARY ? 'text-red-flash-coffee' : 'text-green-flash-coffee' ;
  const borderColor = configuration.type === Type.PRIMARY ? 'border-red-flash-coffee' : 'border-green-flash-coffee';
  const className = configuration.isClear ? 
    `p-2 pl-5 pr-5 w-full bg-transparent border-2 ${borderColor} ${txtColor} text-base rounded-md` :
    `p-2 pl-5 pr-5 w-full ${bgColor} text-white text-base rounded-md`;

  return (
    <button 
      className={className}
      onClick={() => onClick && onClick()}>
        {title}
    </button>
  )
}

const areEqual = (prevProps: ButtonProps, nextProps: ButtonProps) => {
  if (prevProps.title === nextProps.title) return true // props are equal, NOT RERENDER
  return false // props are not equal, RERENDER
}

export default React.memo(Button, areEqual)