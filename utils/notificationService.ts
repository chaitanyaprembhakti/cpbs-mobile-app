import { LocalNotifications } from "@capacitor/local-notifications";
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import BigPictureNotification from "../services/BigPictureNotification";

// --- Helper to generate Quote URL (Synced with DailyQuotes.tsx logic) ---
const getStaticDayOfYear = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  // Using 2024 (Leap Year) as reference for day-of-year calculation
  const leapYearDate = new Date(2024, month, day);
  const start = new Date(2024, 0, 0);
  const diff = leapYearDate.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getQuoteImageUrl = (date: Date) => {
  const dayOfYear = getStaticDayOfYear(date);
  const dayOfYearStr = String(dayOfYear).padStart(3, "0");

  const dayOfMonth = date.getDate();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthStr = months[date.getMonth()];

  // We try to match the exact filename pattern used in your GitHub releases
  return `https://github.com/Damodar29/CPBS-APP-ORIGNAL-PHASE-1/releases/download/1/${dayOfYearStr}.${dayOfMonth}.${monthStr}.JPG`;
};

const LAST_SCHEDULED_KEY = "last_scheduled_quote_time";

export const NotificationService = {
  async requestPermissions() {
    if (Capacitor.isNativePlatform()) {
      const result = await LocalNotifications.requestPermissions();
      return result.display === "granted";
    }
    return true;
  },

  async createChannel() {
    if (!Capacitor.isNativePlatform()) return;
    await LocalNotifications.createChannel({
      id: "daily_quote",
      name: "Daily Quote",
      description: "Daily spiritual quotes",
      importance: 4,
      visibility: 1,
      sound: "default",
      vibration: true,
    });
  },

  async scheduleDailyQuote() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      const granted = await this.requestPermissions();
      if (!granted) return;

      // 1. Retrieve already scheduled dates to prevent duplicates (bulk notifications)
      const { value } = await Preferences.get({ key: "scheduled_quote_dates" });
      let scheduledDates: string[] = value ? JSON.parse(value) : [];

      // Clean up old dates from storage to save space
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      scheduledDates = scheduledDates.filter(
        (dateStr) => new Date(dateStr).getTime() >= now.getTime(),
      );

      let newSchedules = 0;

      // 2. Schedule for the next 7 days to ensure delivery even if app isn't opened daily
      for (let i = 0; i < 7; i++) {
        const scheduleDate = new Date();
        scheduleDate.setHours(8, 0, 0, 0);

        // If it's already past 8:00 AM today, start scheduling from tomorrow
        const now = new Date();
        if (now.getTime() >= scheduleDate.getTime()) {
          // Past 8 AM today, so start from tomorrow
          scheduleDate.setDate(scheduleDate.getDate() + 1 + i);
        } else {
          // Not yet 8 AM today, so start from today
          scheduleDate.setDate(scheduleDate.getDate() + i);
        }

        const dateKey = scheduleDate.toDateString();

        // 3. Only schedule if we haven't already scheduled for this specific date
        if (!scheduledDates.includes(dateKey)) {
          const quoteUrl = getQuoteImageUrl(scheduleDate);

          await BigPictureNotification.schedule({
            title: "Daily Quote - Nitya Vani",
            body: "Tap to view today's divine quote",
            imageUrl: quoteUrl,
            type: "quote",
            at: scheduleDate.getTime(),
          });

          scheduledDates.push(dateKey);
          newSchedules++;
          console.log(
            `[Scheduled] Quote for ${dateKey} at ${scheduleDate.toLocaleTimeString()}`,
          );
        }
      }

      // 4. Save the updated list of scheduled dates
      if (newSchedules > 0) {
        await Preferences.set({
          key: "scheduled_quote_dates",
          value: JSON.stringify(scheduledDates),
        });
      }
    } catch (error) {
      console.error("Failed to schedule daily quote", error);
    }
  },

  async sendTestNotification() {
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        alert("Notification permissions not granted");
        return;
      }

      // Test notification uses the CURRENT device date/time
      const now = new Date();
      const quoteUrl = getQuoteImageUrl(now);

      if (Capacitor.isNativePlatform()) {
        await BigPictureNotification.show({
          title: "Daily Quote - Nitya Vani (Test)",
          body: `Today is ${now.toLocaleDateString()}. Tap to view the quote!`,
          imageUrl: quoteUrl,
          type: "quote",
        });
      } else {
        console.log("BigPicture notification not supported on web");
        alert("BigPicture notification is only for Android native");
      }
    } catch (error: any) {
      console.error("Test notification failed", error);
      const errorMessage =
        error instanceof Error ? error.message : JSON.stringify(error);
      alert(`Failed to send test notification:\n${errorMessage}`);
    }
  },
};
