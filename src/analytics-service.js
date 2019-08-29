class AnalyticsService {
  track(eventName, props = {}) {
    if (window.mixpanel) {
      window.mixpanel.track(eventName, props);
    }
  }
}

export default new AnalyticsService();
