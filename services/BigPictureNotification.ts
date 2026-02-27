import { registerPlugin, PluginListenerHandle } from '@capacitor/core';

export interface BigPictureOptions {
  title: string;
  body: string;
  imageUrl: string;
  type?: string;
}

export interface ScheduleOptions extends BigPictureOptions {
  at: number; // Milliseconds timestamp
}

export interface BigPictureNotificationPlugin {
  show(options: BigPictureOptions): Promise<void>;
  schedule(options: ScheduleOptions): Promise<{ id: number }>;
  addListener(
    eventName: 'notificationActionPerformed',
    listenerFunc: (data: { action: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

const BigPictureNotification = registerPlugin<BigPictureNotificationPlugin>('BigPictureNotification');

export default BigPictureNotification;
