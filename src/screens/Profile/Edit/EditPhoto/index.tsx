import React from 'react';

import { TWBottomAction } from '~components';
import { ProfileNavProps } from '~types/navigation';

type Props = {
  navigation: ProfileNavProps;
};

const EditPhoto = ({ navigation }: Props) => {
  // TODO: refactor code currently in Profile/Edit/EditTab into this component probably ?
  const handleRemoveImage = () => {};

  const onOpenLibrary = () => {};

  const onOpenCamera = () => {};

  const actionItems = [
    {
      label: 'Remove Current Photo',
      onPress: () => handleRemoveImage(),
    },
    {
      label: 'Take photo',
      onPress: () => onOpenCamera(),
    },
    {
      label: 'Choose from library',
      onPress: () => onOpenLibrary(),
    },
  ];

  const onCancel = () => {
    navigation.pop();
  };

  return (
    <TWBottomAction
      isVisible={true}
      actionItems={actionItems}
      onCancel={onCancel}
    />
  );
};

export default EditPhoto;
