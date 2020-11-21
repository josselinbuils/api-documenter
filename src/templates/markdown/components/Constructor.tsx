import { ApiClass } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getConstructor } from '../../utils/getConstrucor';
import { ParameterTable } from './ParameterTable';
import { Signature } from './Signature';
import { Title } from './Title';

export const Constructor: FC<Props> = ({ apiClass }) => {
  const apiConstructor = getConstructor(apiClass);

  if (apiConstructor === undefined || apiConstructor.parameters.length === 0) {
    return null;
  }

  return (
    <>
      <Title level={2}>Constructor</Title>
      <Signature apiItem={apiConstructor} />
      <ParameterTable apiParameterListMixin={apiConstructor} noTitle />
    </>
  );
};

interface Props {
  apiClass: ApiClass;
}
