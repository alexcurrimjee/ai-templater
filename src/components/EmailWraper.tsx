import React from 'react';

interface EmailWrapperProps {
  children: React.ReactNode;
}

export const EmailWrapper = ({ children }: EmailWrapperProps) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        transform: 'scale(1)', // Forces containment
        transformOrigin: 'top left',
      }}>
      {children}
    </div>
  );
};
