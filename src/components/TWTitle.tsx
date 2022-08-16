import React, { ReactNode } from 'react';

import TWLabel from './atoms/TWLabel';

type Props = {
  children: ReactNode;
};

const TWTitle = ({ children }: Props) => {
  return (
    <TWLabel size={26} lineHeight={34} weight="bold">
      {children}
    </TWLabel>
  );
};

export default TWTitle;
