class AnalyticsService {
  track(eventName, props = {}) {
    if (window.mixpanel) {
      mixpanel.track(eventName, props);
    }
  }
}

export default new AnalyticsService();
