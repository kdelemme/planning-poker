class AnalyticsService {
  track(eventName, props = {}) {
    mixpanel.track(eventName, props);
  }
}

export default new AnalyticsService();
