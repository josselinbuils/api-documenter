import * as React from 'react';

export const Signature: React.FC = ({ children }) =>
  `\n\n**Signature:**\n\n\`\`\`typescript\n${children}\n\`\`\``;
