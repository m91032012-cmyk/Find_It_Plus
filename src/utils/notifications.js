import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// ❌ Disable notifications inside Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

if (!isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotifyPermission() {
  if (isExpoGo) return false; // 🚫 skip in Expo Go
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function notifyNewItem(title, type) {
  if (isExpoGo) return; // 🚫 skip in Expo Go

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'FindIt+',
      body: `${type} item reported: ${title}`,
    },
    trigger: null,
  });
}
