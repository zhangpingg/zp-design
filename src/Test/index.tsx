import React, { FC } from 'react';

interface IProps {
  title: string;
}

const Test: FC<IProps> = (props) => {
  const { title } = props;
  return (
    <div>
      {title}
    </div>
  )
}
export default Test;
