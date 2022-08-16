import { createNavigationContainerRef } from '@react-navigation/native';

import { AuthStackList } from '~types/navigation';

export const navigationRef = createNavigationContainerRef<AuthStackList>();
