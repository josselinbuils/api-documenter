import React from 'react';
import { Warning } from './Warning';

export const BetaWarning = () => (
  <Warning>
    This API is provided as a preview for developers and may change based on
    feedback that we receive. Do not use this API in a production environment.
  </Warning>
);
