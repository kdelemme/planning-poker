class AnalyticsService {
  track(eventName, props = {}) {
    if (mixpanel) {
      mixpanel.track(eventName, props);
    }
  }
}

export default new AnalyticsService();
