import { showMessage } from 'react-native-flash-message';
import { colors } from '../../assets';

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: 'yellow',
    color: colors.black,
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.primaryBlue,
    color: colors.white,
  });
};
